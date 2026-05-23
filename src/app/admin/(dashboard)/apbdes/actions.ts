"use server";

import { revalidatePath } from "next/cache";
import { getGoogleSheets } from "@/lib/googleClient";
import { requireAdmin } from "@/lib/adminAuth";

export interface ActionState {
  success: boolean;
  message: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

function parseNum(val: unknown): number {
  if (!val) return 0;
  const parsed = parseFloat(String(val).replace(/\./g, "").replace(/,/g, "."));
  return isNaN(parsed) ? 0 : parsed;
}

export async function saveApbdesAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const tahunAnggaranAsli = formData.get("tahunAnggaranAsli") as string;
  const tahun_anggaran = formData.get("tahun_anggaran") as string;
  
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

  const file_pdf = formData.get("file_pdf") as string || "#";
  const tanggal_disahkan = formData.get("tanggal_disahkan") as string || "-";
  const nama_pengesah = formData.get("nama_pengesah") as string || "-";

  // Periksa Kalkulasi Otomatis secara Backend
  const total_pendapatan = pend_dana_desa + pend_add + pend_bantuan_kab + pend_bagi_hasil + pend_pades + pend_lain_lain;
  const total_belanja = bel_pembangunan + bel_pemerintahan + bel_pembinaan + bel_bencana + bel_pemberdayaan;
  const surplus_defisit = total_pendapatan - total_belanja;
  const pembiayaan_netto = pembiayaan_penerimaan - pembiayaan_pengeluaran;
  const silpa = surplus_defisit + pembiayaan_netto;

  // Format array untuk spreadsheet (harus 21 kolom sesuai sheets.ts getApbdes)
  // Biarkan sebagai tipe Number, jangan di-toString() agar menghindari konversi lokal desimal yang keliru
  const rowData = [
    tahun_anggaran,
    total_pendapatan,
    total_belanja,
    silpa,
    pend_dana_desa,
    pend_add,
    pend_bantuan_kab,
    pend_bagi_hasil,
    pend_pades,
    pend_lain_lain,
    bel_pembangunan,
    bel_pemerintahan,
    bel_pembinaan,
    bel_bencana,
    bel_pemberdayaan,
    pembiayaan_penerimaan,
    pembiayaan_pengeluaran,
    pembiayaan_netto,
    file_pdf,
    tanggal_disahkan,
    nama_pengesah
  ];

  try {
    const sheets = getGoogleSheets();

    console.log(`[1/2] Menyinkronkan APBDes '${tahun_anggaran}' ke lembar Google Sheets...`);
    
    // Perlu baca API karena kita butuh tau data di line mana yang mau diedit
    let readResponse;
    try {
      readResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "apbdes!A:A", // Cukup cari di kolom Tahun Anggaran (Kolom A)
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("Unable to parse range")) {
        return { success: false, message: "Tab 'apbdes' tidak ditemukan di Spreadsheet Anda." };
      }
      throw err;
    }

    const rows = readResponse.data.values || [];
    const rowIndex = tahunAnggaranAsli ? rows.findIndex(row => row[0] === tahunAnggaranAsli) : -1;

    // Jika ini adalah aksi Tambah Baru, tapi Tahun Anggaran tersebut sudah ada, kita blokir.
    if (!tahunAnggaranAsli && rows.some(row => row[0] === tahun_anggaran)) {
       return { success: false, message: `Tahun Anggaran ${tahun_anggaran} sudah terdaftar, silakan edit saja.` };
    }

    if (tahunAnggaranAsli && rowIndex !== -1) {
      const exactRow = rowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `apbdes!A${exactRow}:U${exactRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data APBDes berhasil di-update di Sheets.");
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "apbdes!A:U",
        valueInputOption: "USER_ENTERED",
        // insertDataOption: "INSERT_ROWS" memastikan tertambah tanpa nindih baris kotor
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data APBDes baru berhasil ditambahkan ke Sheets.");
    }

    revalidatePath("/admin/apbdes");
    revalidatePath("/transparansi/apbdes"); 
    revalidatePath("/");

    return { 
      success: true, 
      message: tahunAnggaranAsli ? "Laporan APBDes berhasil diperbarui!" : "Laporan APBDes berhasil ditambahkan!" 
    };
  } catch (error: unknown) {
    console.error("❌ GOOGLE APIs FATAL ERROR:");
    console.error(error); 
    return { success: false, message: "Terjadi kesalahan koneksi saat menyimpan ke cloud." };
  }
}

export async function deleteApbdesAction(tahun_anggaran: string) {
  await requireAdmin();

  try {
    const sheets = getGoogleSheets();
    
    // Cari barisnya berdasarkan Tahun Anggaran
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "apbdes!A:A", 
    });

    const rows = readResponse.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === tahun_anggaran);

    if (rowIndex === -1) {
      return { success: false, message: "Data Tahun Anggaran tidak ditemukan di lembar kerja." };
    }

    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title?.toLowerCase() === "apbdes");
    const sheetId = sheet?.properties?.sheetId;

    if (sheetId === undefined) {
      return { success: false, message: "Tab apbdes tidak ditemukan di Spreadsheet." };
    }

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: rowIndex, 
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });

    revalidatePath("/admin/apbdes");
    revalidatePath("/transparansi/apbdes");
    revalidatePath("/");
    
    return { success: true, message: `Laporan APBDes Tahun ${tahun_anggaran} berhasil dihapus!` };
  } catch (error: unknown) {
    console.error("Hapus Error:", error instanceof Error ? error.message : String(error));
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}
