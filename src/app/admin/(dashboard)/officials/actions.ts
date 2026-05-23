"use server";

import { revalidatePath } from "next/cache";
import { getGoogleSheets } from "@/lib/googleClient";
import { requireAdmin } from "@/lib/adminAuth";

export interface ActionState {
  success: boolean;
  message: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

export async function saveOfficialAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("idAsli") as string;
  const nama = formData.get("nama") as string;
  const jabatan = formData.get("jabatan") as string;
  const urutan = formData.get("urutan") as string;
  const fotoFile = formData.get("foto_file") as File;

  if (!nama) {
    return { success: false, message: "Nama tidak boleh kosong" };
  }

  try {
    const sheets = getGoogleSheets();
    let finalFotoUrl = "";

    // 1. Tangani Upload Gambar ke ImgBB (Bebas Quota)
    if (fotoFile && fotoFile.size > 0 && fotoFile.name !== "undefined") {
      console.log(`[1/4] Memulai proses upload gambar '${fotoFile.name}' (${fotoFile.size} bytes) ke server ImgBB...`);
      
      if (!process.env.IMGBB_API_KEY) {
        throw new Error("Kunci IMGBB_API_KEY belum dipasang di .env.local!");
      }

      // Memanfaatkan objek FormData murni bawaan Javascript
      const imgFormData = new FormData();
      imgFormData.append("image", fotoFile);

      const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
        method: "POST",
        body: imgFormData,
      });

      const imgDataObj = await imgResponse.json();

      if (imgDataObj.success) {
        finalFotoUrl = imgDataObj.data.url; // Langsung menghasilkan public link misal. https://i.ibb.co/xyz/...
        console.log(`[2/4] Upload berhasil! Link Final dari ImgBB: ${finalFotoUrl}`);
      } else {
        throw new Error(`Gagal Upload ke ImgBB: ${imgDataObj.error?.message || "Kesalahan tidak diketahui"}`);
      }
    } else {
      console.log(`[1/4] Tidak ada gambar baru yang diperbarui atau file kosong.`);
    }

    // 2. Baca isi Lembar Kerja saat ini untuk menentukan apakah Update atau Create
    console.log(`[3/4] Menyinkronkan profil pindahan '${nama}' ke lembar Google Sheets...`);
    
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "perangkat!A:D",
    });

    const rows = readResponse.data.values || [];
    const rowIndex = idAsli ? rows.findIndex((row: string[]) => row[0] === idAsli) : -1;

    // Jika sedang memperbarui, gunakan foto lama bila foto baru tidak diunggah
    if (idAsli && rowIndex !== -1 && finalFotoUrl === "") {
      finalFotoUrl = rows[rowIndex][3] || "";
    }

    const rowData = [nama, jabatan, urutan, finalFotoUrl];

    if (idAsli && rowIndex !== -1) {
      // UPDATE: Baris indeks 0 di JSON adalah baris 1 di Spreadsheets
      const exactRow = rowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `perangkat!A${exactRow}:D${exactRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data perangkat berhasil di-update di Sheets.");
    } else {
      // CREATE
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "perangkat!A:D",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data perangkat baru berhasil ditambahkan ke Sheets.");
    }

    revalidatePath("/admin/officials");
    revalidatePath("/"); // Update beranda penduduk

    return { 
      success: true, 
      message: idAsli ? "Profil berhasil diperbarui!" : "Aparatur baru berhasil ditambahkan!" 
    };
  } catch (error: unknown) {
    console.error("❌ GOOGLE APIs FATAL ERROR:");
    console.error(error); // Tampilkan log raksasa detailnya
    return { success: false, message: "Terjadi kesalahan sinkronisasi gagal menyimpan." };
  }
}

export async function deleteOfficialAction(nama: string) {
  await requireAdmin();

  try {
    const sheets = getGoogleSheets();
    
    // Cari barisnya
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "perangkat!A:A", // Cukup cari di kolom nama
    });

    const rows = readResponse.data.values || [];
    const rowIndex = rows.findIndex((row: string[]) => row[0] === nama);

    if (rowIndex === -1) {
      return { success: false, message: "Aparatur tidak ditemukan di lembar kerja." };
    }

    // Mengambil metadata spreadsheet untuk mengetahui sheetId dari tab 'perangkat'
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title?.toLowerCase() === "perangkat");
    const sheetId = sheet?.properties?.sheetId;

    if (sheetId === undefined) {
      return { success: false, message: "Tab perangkat tidak ditemukan di Spreadsheet." };
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

    revalidatePath("/admin/officials");
    return { success: true, message: `Aparatur ${nama} berhasil diturunkan jabatan / dihapus!` };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Hapus Error:", errMsg);
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}
