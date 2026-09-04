"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getDb, getMediaBaseUrl, uploadImageToR2 } from "@/lib/cf";
import { requireAdmin } from "@/lib/adminAuth";
import { CACHE_TAGS } from "@/lib/db";
import { redirect } from "next/navigation";

export interface ActionState {
  success: boolean;
  message: string;
}

function slugify(judul: string): string {
  return judul
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uniqueSlug(db: D1Database, base: string, excludeId?: string): Promise<string> {
  let slug = base || crypto.randomUUID();
  let n = 2;
  for (;;) {
    const existing = await db
      .prepare(`SELECT id FROM berita WHERE slug = ? AND id != ? LIMIT 1`)
      .bind(slug, excludeId || "")
      .first<{ id: string }>();
    if (!existing) return slug;
    slug = `${base}-${n++}`;
  }
}

const MONTHS_ID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export async function saveNewsAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("id") as string;
  const judul = (formData.get("judul") as string)?.trim();
  const status = formData.get("status") as string;
  const ringkasan = formData.get("ringkasan") as string;
  const konten = formData.get("konten") as string;
  const penulis = formData.get("penulis") as string;
  const fotoFile = formData.get("foto_file") as File;
  const fotoUrlExisting = formData.get("foto_url_existing") as string;

  if (!judul || !konten) {
    return { success: false, message: "Judul dan Konten tidak boleh kosong" };
  }

  let isSuccess = false;
  try {
    const db = await getDb();
    let finalFotoUrl = fotoUrlExisting || "";

    if (fotoFile && fotoFile.size > 0 && fotoFile.name !== "undefined") {
      finalFotoUrl = await uploadImageToR2(fotoFile, "berita");
    }

    const existing = idAsli
      ? await db.prepare(`SELECT id, slug, tanggal FROM berita WHERE id = ?`).bind(idAsli).first<{ id: string; slug: string; tanggal: string }>()
      : null;

    const id = idAsli || crypto.randomUUID();
    const slug = await uniqueSlug(db, slugify(judul), idAsli);

    let tanggal: string;
    if (existing?.tanggal && existing.tanggal !== "-") {
      tanggal = existing.tanggal;
    } else {
      const now = new Date();
      tanggal = `${now.getDate()} ${MONTHS_ID[now.getMonth()]} ${now.getFullYear()}`;
    }

    if (existing) {
      await db
        .prepare(
          `UPDATE berita SET tanggal = ?, judul = ?, slug = ?, ringkasan = ?, konten = ?, foto_url = ?, status = ?, penulis = ? WHERE id = ?`
        )
        .bind(tanggal, judul, slug, ringkasan || "-", konten, finalFotoUrl, status, penulis || "Admin Desa", id)
        .run();
    } else {
      await db
        .prepare(
          `INSERT INTO berita (id, tanggal, judul, slug, ringkasan, konten, foto_url, status, penulis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(id, tanggal, judul, slug, ringkasan || "-", konten, finalFotoUrl, status, penulis || "Admin Desa")
        .run();
    }

    revalidateTag(CACHE_TAGS.berita, "max");
    revalidatePath("/admin/news");
    revalidatePath("/kabar-desa");
    revalidatePath("/");
    revalidatePath(`/kabar-desa/${slug}`);

    isSuccess = true;
  } catch (error: unknown) {
    console.error(error);
    return { success: false, message: "Terjadi kesalahan sinkronisasi gagal menyimpan." };
  }

  if (isSuccess) {
    redirect("/admin/news");
  }

  return { success: false, message: "Kesalahan tak terduga." };
}

export async function deleteNewsAction(id: string) {
  await requireAdmin();

  try {
    const db = await getDb();
    const result = await db.prepare(`DELETE FROM berita WHERE id = ?`).bind(id).run();

    if (!result.meta.changes) {
      return { success: false, message: "Artikel tidak ditemukan." };
    }

    revalidateTag(CACHE_TAGS.berita, "max");
    revalidatePath("/admin/news");
    revalidatePath("/kabar-desa");
    revalidatePath("/");
    return { success: true, message: `Artikel berhasil dihapus!` };
  } catch {
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}

// Dipakai NewsFormClient untuk menampilkan URL media yang tersimpan
export async function getMediaBaseAction(): Promise<string> {
  try {
    return getMediaBaseUrl();
  } catch {
    return "";
  }
}
