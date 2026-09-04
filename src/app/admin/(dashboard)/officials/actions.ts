"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getDb, uploadImageToR2 } from "@/lib/cf";
import { requireAdmin } from "@/lib/adminAuth";
import { CACHE_TAGS } from "@/lib/db";

export interface ActionState {
  success: boolean;
  message: string;
}

export async function saveOfficialAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("idAsli") as string;
  const nama = (formData.get("nama") as string)?.trim();
  const jabatan = formData.get("jabatan") as string;
  const urutan = formData.get("urutan") as string;
  const fotoFile = formData.get("foto_file") as File;

  if (!nama) {
    return { success: false, message: "Nama tidak boleh kosong" };
  }

  try {
    const db = await getDb();

    const existing = idAsli
      ? await db.prepare(`SELECT id, foto_url FROM perangkat WHERE id = ?`).bind(idAsli).first<{ id: number; foto_url: string }>()
      : null;

    // Upload gambar (jika ada file baru), else pakai foto lama
    let finalFotoUrl = existing?.foto_url || "";
    if (fotoFile && fotoFile.size > 0 && fotoFile.name !== "undefined") {
      finalFotoUrl = await uploadImageToR2(fotoFile, "perangkat");
    }

    const urutanNum = parseInt(urutan) || 99;

    if (existing) {
      await db
        .prepare(`UPDATE perangkat SET nama = ?, jabatan = ?, urutan = ?, foto_url = ? WHERE id = ?`)
        .bind(nama, jabatan, urutanNum, finalFotoUrl, existing.id)
        .run();
    } else {
      await db
        .prepare(`INSERT INTO perangkat (nama, jabatan, urutan, foto_url) VALUES (?, ?, ?, ?)`)
        .bind(nama, jabatan, urutanNum, finalFotoUrl)
        .run();
    }

    revalidateTag(CACHE_TAGS.perangkat, "max");
    revalidatePath("/admin/officials");
    revalidatePath("/"); // Update beranda penduduk

    return {
      success: true,
      message: idAsli ? "Profil berhasil diperbarui!" : "Aparatur baru berhasil ditambahkan!"
    };
  } catch (error: unknown) {
    console.error("❌ DB ERROR:", error);
    return { success: false, message: "Terjadi kesalahan sinkronisasi gagal menyimpan." };
  }
}

export async function deleteOfficialAction(id: string) {
  await requireAdmin();

  try {
    const db = await getDb();
    const result = await db.prepare(`DELETE FROM perangkat WHERE id = ?`).bind(id).run();

    if (!result.meta.changes) {
      return { success: false, message: "Aparatur tidak ditemukan di database." };
    }

    revalidateTag(CACHE_TAGS.perangkat, "max");
    revalidatePath("/admin/officials");
    revalidatePath("/");
    return { success: true, message: `Aparatur berhasil diturunkan jabatan / dihapus!` };
  } catch (error: unknown) {
    console.error("Hapus Error:", error);
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}
