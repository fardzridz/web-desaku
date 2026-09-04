"use server";

import { getAkunForLogin } from "@/lib/db";
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
    // Verifikasi Turnstile lebih dulu (sebelum menyentuh database)
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

      const turnstileResult = (await turnstileVerify.json()) as { success: boolean };
      if (!turnstileResult.success) {
        return { success: false, message: "Validasi anti-bot gagal. Silakan muat ulang halaman dan coba lagi." };
      }
    }

    // Pesan error generik untuk mencegah email enumeration
    const GENERIC_ERROR = "Email atau kata sandi salah!";

    const match = await getAkunForLogin(email);

    // Verifikasi Hash Password secara ketat (Tanpa fallback Teks Biasa)
    let isVerified = false;

    if (match) {
      if (match.password.startsWith("$2a$") || match.password.startsWith("$2b$")) {
        isVerified = await bcrypt.compare(password, match.password);
      }
    } else {
      // Tetap lakukan komparasi dummy agar waktu respons seragam
      await bcrypt.compare(password, "$2a$12$C6UzMDM.H6dfI/f/IKcEeO7ZBpQqGPUcc2wz1Ti3EVCw2nVuSpE1G");
    }

    if (!isVerified || !match) {
      return { success: false, message: GENERIC_ERROR };
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
