"use server";

import { revalidatePath } from "next/cache";
import { getGoogleSheets } from "@/lib/googleClient";
import { requireAdmin } from "@/lib/adminAuth";
import { redirect } from "next/navigation";

export interface ActionState {
  success: boolean;
  message: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

export async function saveNewsAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("id") as string;
  const judul = formData.get("judul") as string;
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
    const sheets = getGoogleSheets();
    let finalFotoUrl = fotoUrlExisting || "";

    if (fotoFile && fotoFile.size > 0 && fotoFile.name !== "undefined") {
      if (!process.env.IMGBB_API_KEY) {
        throw new Error("Kunci IMGBB_API_KEY belum dipasang!");
      }
      const imgFormData = new FormData();
      imgFormData.append("image", fotoFile);

      const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
        method: "POST",
        body: imgFormData,
      });

      const imgDataObj = await imgResponse.json();
      if (imgDataObj.success) {
        finalFotoUrl = imgDataObj.data.url;
      } else {
        throw new Error(`Gagal Upload ke ImgBB: ${imgDataObj.error?.message}`);
      }
    }

    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "berita!A:I",
    });

    const rows = readResponse.data.values || [];
    const rowIndex = idAsli ? rows.findIndex((row: string[]) => row[0] === idAsli) : -1;

    const id = idAsli || crypto.randomUUID();
    const slug = idAsli ? rows[rowIndex][3] : judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const dateNow = new Date();
    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const tanggal = idAsli && rows[rowIndex]?.[1] ? rows[rowIndex][1] : `${dateNow.getDate()} ${month[dateNow.getMonth()]} ${dateNow.getFullYear()}`;

    const rowData = [id, tanggal, judul, slug, ringkasan || "-", konten || "-", finalFotoUrl, status, penulis || "Admin Desa"];

    if (idAsli && rowIndex !== -1) {
      const exactRow = rowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `berita!A${exactRow}:I${exactRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "berita!A:I",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
    }

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
    const sheets = getGoogleSheets();
    
    // Ambil semua baris untuk mencari posisi indexnya
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "berita!A:A",
    });

    const rows = readResponse.data.values || [];
    const rowIndex = rows.findIndex((row: string[]) => row[0] === id);

    if (rowIndex === -1) {
      return { success: false, message: "Artikel tidak ditemukan." };
    }

    // Mengambil metadata spreadsheet untuk mengetahui sheetId dari tab 'berita'
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title?.toLowerCase() === "berita");
    const sheetId = sheet?.properties?.sheetId;

    if (sheetId === undefined) {
      return { success: false, message: "Tab berita tidak ditemukan di Spreadsheet." };
    }

    // Melakukan penghapusan baris (Dimensi ROW) secara total, bukan sekedar nge-clear text
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: rowIndex, // 0-indexed (contoh: baris ke-2 adalah index 1)
                endIndex: rowIndex + 1, // Batas akhir yang eksklusif
              },
            },
          },
        ],
      },
    });

    revalidatePath("/admin/news");
    revalidatePath("/kabar-desa");
    revalidatePath("/");
    return { success: true, message: `Artikel berhasil dihapus!` };
  } catch {
    return { success: false, message: "Gagal menghapus data di cloud." };
  }
}
