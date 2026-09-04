"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getDb, uploadImageToR2 } from "@/lib/cf";
import { requireAdmin } from "@/lib/adminAuth";
import { CACHE_TAGS } from "@/lib/db";
import bcrypt from "bcryptjs";

export interface ActionState {
  success: boolean;
  message: string;
}

export async function saveAkunAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("idAsli") as string; // email asli sebelum diedit
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const namaLengkap = formData.get("namaLengkap") as string;
  const role = formData.get("role") as string;
  const fotoFile = formData.get("foto_file") as File;

  if (!email || !namaLengkap) {
    return { success: false, message: "Email dan Nama tidak boleh kosong" };
  }

  try {
    const db = await getDb();

    const existing = idAsli
      ? await db.prepare(`SELECT email, foto_url FROM akun WHERE email = ?`).bind(idAsli).first<{ email: string; foto_url: string }>()
      : null;

    // Cek apakah email baru sudah dipakai akun lain
    const emailConflict = await db
      .prepare(`SELECT email FROM akun WHERE email = ? AND email != ? LIMIT 1`)
      .bind(email, idAsli || "")
      .first<{ email: string }>();

    if (!existing && emailConflict) {
      return { success: false, message: "Email ini sudah terdaftar sebagai admin." };
    }
    if (existing && emailConflict) {
      return { success: false, message: "Email ini sudah terdaftar sebagai admin." };
    }

    // 1. Upload gambar (jika ada file baru)
    let finalFotoUrl = existing?.foto_url || "";
    if (fotoFile && fotoFile.size > 0 && fotoFile.name !== "undefined") {
      finalFotoUrl = await uploadImageToR2(fotoFile, "akun");
    }

    // 2. Password: gunakan hash lama jika dikosongkan saat update
    let finalPasswordHash = "";
    if (existing && (!password || password.trim() === "")) {
      const row = await db.prepare(`SELECT password_hash FROM akun WHERE email = ?`).bind(idAsli).first<{ password_hash: string }>();
      finalPasswordHash = row?.password_hash || "";
    } else if (password && password.trim() !== "") {
      finalPasswordHash = await bcrypt.hash(password, 12);
    } else {
      return { success: false, message: "Password wajib diisi untuk akun baru." };
    }

    if (existing) {
      await db
        .prepare(`UPDATE akun SET email = ?, password_hash = ?, nama_lengkap = ?, role = ?, foto_url = ? WHERE email = ?`)
        .bind(email, finalPasswordHash, namaLengkap, role, finalFotoUrl, idAsli)
        .run();
    } else {
      await db
        .prepare(`INSERT INTO akun (email, password_hash, nama_lengkap, role, foto_url) VALUES (?, ?, ?, ?, ?)`)
        .bind(email, finalPasswordHash, namaLengkap, role, finalFotoUrl)
        .run();
    }

    revalidatePath("/admin/accounts");

    return {
      success: true,
      message: idAsli ? "Data akun berhasil diperbarui!" : "Akun baru berhasil ditambahkan!"
    };
  } catch (error: unknown) {
    console.error("❌ DB ERROR:", error);
    return { success: false, message: "Gagal menyimpan data akun." };
  }
}

export async function deleteAkunAction(email: string) {
  await requireAdmin();

  try {
    const db = await getDb();

    // Proteksi: jangan sampai akun terakhir terhapus
    const count = await db.prepare(`SELECT COUNT(*) AS c FROM akun`).first<{ c: number }>();
    const current = await db.prepare(`SELECT COUNT(*) AS c FROM akun WHERE email = ?`).bind(email).first<{ c: number }>();

    if (!current?.c) {
      return { success: false, message: "Akun tidak ditemukan." };
    }
    if ((count?.c ?? 0) <= 1) {
      return { success: false, message: "Tidak bisa menghapus satu-satunya akun admin." };
    }

    await db.prepare(`DELETE FROM akun WHERE email = ?`).bind(email).run();

    revalidatePath("/admin/accounts");
    return { success: true, message: `Akun ${email} berhasil dihapus!` };
  } catch (error: unknown) {
    console.error("Hapus Error:", error);
    return { success: false, message: "Gagal menghapus akun." };
  }
}
