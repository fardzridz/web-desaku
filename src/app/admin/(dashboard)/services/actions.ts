"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/lib/cf";
import { requireAdmin } from "@/lib/adminAuth";
import { CACHE_TAGS } from "@/lib/db";

export interface ActionState {
  success: boolean;
  message: string;
}

export async function saveLayananAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("idAsli") as string;
  const namaLayanan = (formData.get("namaLayanan") as string)?.trim();
  const syarat = formData.get("syarat") as string;
  const durasi = formData.get("durasi") as string;
  const biaya = formData.get("biaya") as string;
  const kategori = formData.get("kategori") as string;

  if (!namaLayanan) {
    return { success: false, message: "Nama Layanan tidak boleh kosong" };
  }

  try {
    const db = await getDb();
    const id = idAsli ? parseInt(idAsli) : null;
    const existing = id
      ? await db.prepare(`SELECT id FROM layanan WHERE id = ?`).bind(id).first<{ id: number }>()
      : null;

    if (existing) {
      await db
        .prepare(`UPDATE layanan SET nama_layanan = ?, syarat = ?, durasi = ?, biaya = ?, kategori = ? WHERE id = ?`)
        .bind(namaLayanan, syarat, durasi, biaya, kategori, existing.id)
        .run();
    } else {
      await db
        .prepare(`INSERT INTO layanan (nama_layanan, syarat, durasi, biaya, kategori) VALUES (?, ?, ?, ?, ?)`)
        .bind(namaLayanan, syarat, durasi, biaya, kategori)
        .run();
    }

    revalidateTag(CACHE_TAGS.layanan, "max");
    revalidatePath("/admin/services");
    revalidatePath("/layanan");
    revalidatePath("/");

    return {
      success: true,
      message: idAsli ? "Layanan berhasil diperbarui!" : "Layanan baru berhasil ditambahkan!"
    };
  } catch (error: unknown) {
    console.error("❌ DB ERROR:", error);
    return { success: false, message: "Terjadi kesalahan sinkronisasi gagal menyimpan." };
  }
}

export async function deleteLayananAction(id: string) {
  await requireAdmin();

  try {
    const db = await getDb();
    const result = await db.prepare(`DELETE FROM layanan WHERE id = ?`).bind(id).run();

    if (!result.meta.changes) {
      return { success: false, message: "Layanan tidak ditemukan di database." };
    }

    revalidateTag(CACHE_TAGS.layanan, "max");
    revalidatePath("/admin/services");
    revalidatePath("/layanan");
    revalidatePath("/");

    return { success: true, message: `Layanan berhasil dihapus!` };
  } catch (error: unknown) {
    console.error("Hapus Error:", error);
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}
