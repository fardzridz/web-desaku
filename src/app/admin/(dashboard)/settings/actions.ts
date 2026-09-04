"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getDb, uploadImageToR2 } from "@/lib/cf";
import { requireAdmin } from "@/lib/adminAuth";
import { CACHE_TAGS } from "@/lib/db";

export interface ActionState {
  success: boolean;
  message: string;
}

export async function saveIdentitasAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const namaDesa = formData.get("namaDesa") as string;
  const alamat = formData.get("alamat") as string;
  const noWa = formData.get("noWa") as string;
  const email = formData.get("email") as string;
  const sambutanKades = formData.get("sambutanKades") as string;
  const linkMaps = formData.get("linkMaps") as string;
  const kecamatan = formData.get("kecamatan") as string;
  const kabKota = formData.get("kabKota") as string;
  const facebookUrl = formData.get("facebookUrl") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const tiktokUrl = formData.get("tiktokUrl") as string;
  const websiteUrl = formData.get("websiteUrl") as string;

  const fotoFile = formData.get("logoDesaUrl") as File;

  if (!namaDesa) {
    return { success: false, message: "Nama Desa tidak boleh kosong" };
  }

  try {
    const db = await getDb();

    const existing = await db
      .prepare(`SELECT logo_desa_url, thumbnail_url FROM identitas WHERE id = 1`)
      .first<{ logo_desa_url: string; thumbnail_url: string }>();

    // 1. Tangani Upload Logo ke R2 (jika ada file baru)
    let finalFotoUrl = existing?.logo_desa_url || "";
    if (fotoFile && fotoFile.size > 0 && fotoFile.name !== "undefined") {
      finalFotoUrl = await uploadImageToR2(fotoFile, "logo");
    }

    // 2. Upsert single row (id = 1)
    await db
      .prepare(
        `INSERT INTO identitas (id, nama_desa, alamat, no_wa, email, sambutan_kades, link_maps,
          kecamatan, kab_kota, logo_desa_url, facebook_url, instagram_url, tiktok_url, website_url, thumbnail_url)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
          nama_desa = excluded.nama_desa,
          alamat = excluded.alamat,
          no_wa = excluded.no_wa,
          email = excluded.email,
          sambutan_kades = excluded.sambutan_kades,
          link_maps = excluded.link_maps,
          kecamatan = excluded.kecamatan,
          kab_kota = excluded.kab_kota,
          logo_desa_url = excluded.logo_desa_url,
          facebook_url = excluded.facebook_url,
          instagram_url = excluded.instagram_url,
          tiktok_url = excluded.tiktok_url,
          website_url = excluded.website_url,
          thumbnail_url = excluded.thumbnail_url`
      )
      .bind(
        namaDesa, alamat, noWa, email, sambutanKades, linkMaps,
        kecamatan, kabKota, finalFotoUrl, facebookUrl, instagramUrl, tiktokUrl, websiteUrl,
        existing?.thumbnail_url || ""
      )
      .run();

    revalidateTag(CACHE_TAGS.identitas, "max");
    revalidatePath("/admin/settings");
    revalidatePath("/");
    revalidatePath("/profil");

    return {
      success: true,
      message: "Profil dan identitas desa berhasil diperbarui!"
    };
  } catch (error: unknown) {
    console.error("❌ DB FATAL ERROR:", error);
    return { success: false, message: "Terjadi kesalahan sinkronisasi gagal menyimpan." };
  }
}
