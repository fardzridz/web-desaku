"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/lib/cf";
import { requireAdmin } from "@/lib/adminAuth";
import { CACHE_TAGS } from "@/lib/db";

export interface ActionState {
  success: boolean;
  message: string;
}

function parseNum(val: unknown): number {
  if (!val) return 0;
  const parsed = parseFloat(String(val).replace(/\./g, "").replace(/,/g, "."));
  return isNaN(parsed) ? 0 : parsed;
}

export async function saveApbdesAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const tahunAnggaranAsli = formData.get("tahunAnggaranAsli") as string;
  const tahun_anggaran = (formData.get("tahun_anggaran") as string)?.trim();

  if (!tahun_anggaran) {
    return { success: false, message: "Tahun Anggaran tidak boleh kosong" };
  }

  // Parse Number Fields
  const pend_dana_desa = parseNum(formData.get("pend_dana_desa"));
  const pend_add = parseNum(formData.get("pend_add"));
  const pend_bantuan_kab = parseNum(formData.get("pend_bantuan_kab"));
  const pend_bagi_hasil = parseNum(formData.get("pend_bagi_hasil"));
  const pend_pades = parseNum(formData.get("pend_pades"));
  const pend_lain_lain = parseNum(formData.get("pend_lain_lain"));

  const bel_pembangunan = parseNum(formData.get("bel_pembangunan"));
  const bel_pemerintahan = parseNum(formData.get("bel_pemerintahan"));
  const bel_pembinaan = parseNum(formData.get("bel_pembinaan"));
  const bel_bencana = parseNum(formData.get("bel_bencana"));
  const bel_pemberdayaan = parseNum(formData.get("bel_pemberdayaan"));

  const pembiayaan_penerimaan = parseNum(formData.get("pembiayaan_penerimaan"));
  const pembiayaan_pengeluaran = parseNum(formData.get("pembiayaan_pengeluaran"));

  const file_pdf = (formData.get("file_pdf") as string) || "#";
  const tanggal_disahkan = (formData.get("tanggal_disahkan") as string) || "-";
  const nama_pengesah = (formData.get("nama_pengesah") as string) || "-";

  // Periksa Kalkulasi Otomatis secara Backend
  const total_pendapatan = pend_dana_desa + pend_add + pend_bantuan_kab + pend_bagi_hasil + pend_pades + pend_lain_lain;
  const total_belanja = bel_pembangunan + bel_pemerintahan + bel_pembinaan + bel_bencana + bel_pemberdayaan;
  const surplus_defisit = total_pendapatan - total_belanja;
  const pembiayaan_netto = pembiayaan_penerimaan - pembiayaan_pengeluaran;
  const silpa = surplus_defisit + pembiayaan_netto;

  try {
    const db = await getDb();

    const existing = tahunAnggaranAsli
      ? await db.prepare(`SELECT tahun_anggaran FROM apbdes WHERE tahun_anggaran = ?`).bind(tahunAnggaranAsli).first<{ tahun_anggaran: string }>()
      : null;

    // Jika ini adalah aksi Tambah Baru, tapi Tahun Anggaran tersebut sudah ada, kita blokir.
    if (!existing) {
      const duplicate = await db
        .prepare(`SELECT tahun_anggaran FROM apbdes WHERE tahun_anggaran = ?`)
        .bind(tahun_anggaran)
        .first<{ tahun_anggaran: string }>();
      if (duplicate) {
        return { success: false, message: `Tahun Anggaran ${tahun_anggaran} sudah terdaftar, silakan edit saja.` };
      }
    }

    if (existing) {
      await db
        .prepare(
          `UPDATE apbdes SET tahun_anggaran = ?, total_pendapatan = ?, total_belanja = ?, silpa = ?,
           pend_dana_desa = ?, pend_add = ?, pend_bantuan_kab = ?, pend_bagi_hasil = ?, pend_pades = ?, pend_lain_lain = ?,
           bel_pembangunan = ?, bel_pemerintahan = ?, bel_pembinaan = ?, bel_bencana = ?, bel_pemberdayaan = ?,
           pembiayaan_penerimaan = ?, pembiayaan_pengeluaran = ?, pembiayaan_netto = ?,
           file_pdf = ?, tanggal_disahkan = ?, nama_pengesah = ?
           WHERE tahun_anggaran = ?`
        )
        .bind(
          tahun_anggaran, total_pendapatan, total_belanja, silpa,
          pend_dana_desa, pend_add, pend_bantuan_kab, pend_bagi_hasil, pend_pades, pend_lain_lain,
          bel_pembangunan, bel_pemerintahan, bel_pembinaan, bel_bencana, bel_pemberdayaan,
          pembiayaan_penerimaan, pembiayaan_pengeluaran, pembiayaan_netto,
          file_pdf, tanggal_disahkan, nama_pengesah,
          tahunAnggaranAsli
        )
        .run();
    } else {
      await db
        .prepare(
          `INSERT INTO apbdes (tahun_anggaran, total_pendapatan, total_belanja, silpa,
           pend_dana_desa, pend_add, pend_bantuan_kab, pend_bagi_hasil, pend_pades, pend_lain_lain,
           bel_pembangunan, bel_pemerintahan, bel_pembinaan, bel_bencana, bel_pemberdayaan,
           pembiayaan_penerimaan, pembiayaan_pengeluaran, pembiayaan_netto,
           file_pdf, tanggal_disahkan, nama_pengesah)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          tahun_anggaran, total_pendapatan, total_belanja, silpa,
          pend_dana_desa, pend_add, pend_bantuan_kab, pend_bagi_hasil, pend_pades, pend_lain_lain,
          bel_pembangunan, bel_pemerintahan, bel_pembinaan, bel_bencana, bel_pemberdayaan,
          pembiayaan_penerimaan, pembiayaan_pengeluaran, pembiayaan_netto,
          file_pdf, tanggal_disahkan, nama_pengesah
        )
        .run();
    }

    revalidateTag(CACHE_TAGS.apbdes, "max");
    revalidatePath("/admin/apbdes");
    revalidatePath("/transparansi/apbdes");
    revalidatePath("/");

    return {
      success: true,
      message: tahunAnggaranAsli ? "Laporan APBDes berhasil diperbarui!" : "Laporan APBDes berhasil ditambahkan!"
    };
  } catch (error: unknown) {
    console.error("❌ DB FATAL ERROR:", error);
    return { success: false, message: "Terjadi kesalahan koneksi saat menyimpan ke cloud." };
  }
}

export async function deleteApbdesAction(tahun_anggaran: string) {
  await requireAdmin();

  try {
    const db = await getDb();
    const result = await db.prepare(`DELETE FROM apbdes WHERE tahun_anggaran = ?`).bind(tahun_anggaran).run();

    if (!result.meta.changes) {
      return { success: false, message: "Data Tahun Anggaran tidak ditemukan di database." };
    }

    revalidateTag(CACHE_TAGS.apbdes, "max");
    revalidatePath("/admin/apbdes");
    revalidatePath("/transparansi/apbdes");
    revalidatePath("/");

    return { success: true, message: `Laporan APBDes Tahun ${tahun_anggaran} berhasil dihapus!` };
  } catch (error: unknown) {
    console.error("Hapus Error:", error);
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}
