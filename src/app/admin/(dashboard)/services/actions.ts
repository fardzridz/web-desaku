"use server";

import { revalidatePath } from "next/cache";
import { getGoogleSheets } from "@/lib/googleClient";
import { requireAdmin } from "@/lib/adminAuth";

export interface ActionState {
  success: boolean;
  message: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

export async function saveLayananAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("idAsli") as string;
  const namaLayanan = formData.get("namaLayanan") as string;
  const syarat = formData.get("syarat") as string;
  const durasi = formData.get("durasi") as string;
  const biaya = formData.get("biaya") as string;
  const kategori = formData.get("kategori") as string;

  if (!namaLayanan) {
    return { success: false, message: "Nama Layanan tidak boleh kosong" };
  }

  try {
    const sheets = getGoogleSheets();

    console.log(`[1/2] Menyinkronkan layanan '${namaLayanan}' ke lembar Google Sheets...`);
    
    // Sesuaikan range dengan jumlah kolom (A sampai E)
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "layanan!A:E",
    });

    const rows = readResponse.data.values || [];
    const rowIndex = idAsli ? rows.findIndex((row: string[]) => row[0] === idAsli) : -1;

    const rowData = [namaLayanan, syarat, durasi, biaya, kategori];

    if (idAsli && rowIndex !== -1) {
      const exactRow = rowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `layanan!A${exactRow}:E${exactRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data layanan berhasil di-update di Sheets.");
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "layanan!A:E",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data layanan baru berhasil ditambahkan ke Sheets.");
    }

    revalidatePath("/admin/services");
    revalidatePath("/layanan"); 
    revalidatePath("/");

    return { 
      success: true, 
      message: idAsli ? "Layanan berhasil diperbarui!" : "Layanan baru berhasil ditambahkan!" 
    };
  } catch (error: unknown) {
    console.error("❌ GOOGLE APIs FATAL ERROR:");
    console.error(error); 
    return { success: false, message: "Terjadi kesalahan sinkronisasi gagal menyimpan." };
  }
}

export async function deleteLayananAction(namaLayanan: string) {
  await requireAdmin();

  try {
    const sheets = getGoogleSheets();
    
    // Cari barisnya
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "layanan!A:A", // Cukup cari di kolom nama layanan (Kolom A)
    });

    const rows = readResponse.data.values || [];
    const rowIndex = rows.findIndex((row: string[]) => row[0] === namaLayanan);

    if (rowIndex === -1) {
      return { success: false, message: "Layanan tidak ditemukan di lembar kerja." };
    }

    // Mengambil metadata spreadsheet untuk mengetahui sheetId dari tab 'layanan'
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title?.toLowerCase() === "layanan");
    const sheetId = sheet?.properties?.sheetId;

    if (sheetId === undefined) {
      return { success: false, message: "Tab layanan tidak ditemukan di Spreadsheet." };
    }

    // Melakukan penghapusan baris (Dimensi ROW) secara total
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: rowIndex, // 0-indexed
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/layanan");
    revalidatePath("/");
    
    return { success: true, message: `Layanan "${namaLayanan}" berhasil dihapus!` };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Hapus Error:", errMsg);
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}
