"use server";

import { getAkunAdmin } from "@/lib/sheets";
import { clearAdminSession, setAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cfTurnstileResponse = formData.get("cf-turnstile-response") as string;
  let isSuccess = false;

  if (!email || !password) {
    return { success: false, message: "Email dan Password wajib diisi!" };
  }

  if (process.env.TURNSTILE_SECRET_KEY && !cfTurnstileResponse) {
    return { success: false, message: "Validasi Captcha wajib diselesaikan!" };
  }

  try {
    const akunList = await getAkunAdmin();
    // Validate against Google Sheets data
    const match = akunList.find((akun) => akun.email.toLowerCase() === email.toLowerCase());

    if (!match) {
      return { success: false, message: "Alamat Email tidak ditemukan di sistem Desa!" };
    }

    // Verifikasi Turnstile
    if (process.env.TURNSTILE_SECRET_KEY && cfTurnstileResponse) {
      const turnstileVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: cfTurnstileResponse,
        }),
      });
      
      const turnstileResult = await turnstileVerify.json();
      if (!turnstileResult.success) {
        return { success: false, message: "Validasi anti-bot gagal. Silakan muat ulang halaman dan coba lagi." };
      }
    }

    // Verifikasi Hash Password API secara ketat (Tanpa fallback Teks Biasa)
    let isVerified = false;
    
    if (match.password.startsWith("$2a$") || match.password.startsWith("$2b$")) {
      isVerified = await bcrypt.compare(password, match.password);
    } else {
      return { success: false, message: "Keamanan ditolak" };
    }

    if (!isVerified) {
      return { success: false, message: "Kata sandi yang Anda masukkan salah!" };
    }

    await setAdminSession(match.email);
    isSuccess = true;

  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Login Server Action Error:", error);
    return { success: false, message: "Terjadi kesalahan internal server saat memvalidasi otentikasi." };
  }

  if (isSuccess) {
    redirect("/admin");
  }
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
