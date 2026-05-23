"use server";

import { revalidatePath } from "next/cache";
import { getGoogleSheets } from "@/lib/googleClient";
import { requireAdmin } from "@/lib/adminAuth";

export interface ActionState {
  success: boolean;
  message: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

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
    const sheets = getGoogleSheets();
    let finalFotoUrl = "";

    // 1. Tangani Upload Gambar ke ImgBB (Bebas Quota)
    if (fotoFile && fotoFile.size > 0 && fotoFile.name !== "undefined") {
      console.log(`[1/4] Memulai proses upload gambar '${fotoFile.name}' (${fotoFile.size} bytes) ke server ImgBB...`);
      
      if (!process.env.IMGBB_API_KEY) {
        throw new Error("Kunci IMGBB_API_KEY belum dipasang di .env.local!");
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
        console.log(`[2/4] Upload berhasil! Link Final dari ImgBB: ${finalFotoUrl}`);
      } else {
        throw new Error(`Gagal Upload ke ImgBB: ${imgDataObj.error?.message || "Kesalahan tidak diketahui"}`);
      }
    } else {
      console.log(`[1/4] Tidak ada gambar baru yang diperbarui atau file kosong.`);
    }

    // 2. Baca isi Lembar Kerja saat ini
    console.log(`[3/4] Menyinkronkan identitas desa ke lembar Google Sheets...`);
    
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "identitas!A:M",
    });

    const rows = readResponse.data.values || [];
    
    // Asumsikan baris pertama (index 0) adalah header, dan baris kedua (index 1) adalah data sebenarnya
    // Jika update, kita ambil foto url lamanya.
    if (rows.length > 1 && finalFotoUrl === "") {
      finalFotoUrl = rows[1][8] || ""; // Kolom I adalah index 8 (logoDesaUrl)
    }

    const rowData = [
      namaDesa, 
      alamat, 
      noWa, 
      email, 
      sambutanKades, 
      linkMaps, 
      kecamatan, 
      kabKota, 
      finalFotoUrl, 
      facebookUrl, 
      instagramUrl, 
      tiktokUrl, 
      websiteUrl
    ];

    // Jika baris data sudah ada (rows > 1), kita UPDATE baris 2 (A2:M2)
    if (rows.length > 1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `identitas!A2:M2`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data identitas berhasil di-update di Sheets.");
    } else {
      // Jika belum ada datanya sama sekali, kita APPEND
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "identitas!A:M",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
      console.log("✅ SUKSES: Data identitas baru berhasil ditambahkan ke Sheets.");
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
    revalidatePath("/profil");

    return { 
      success: true, 
      message: "Profil dan identitas desa berhasil diperbarui!" 
    };
  } catch (error: unknown) {
    console.error("❌ GOOGLE APIs FATAL ERROR:");
    console.error(error);
    return { success: false, message: "Terjadi kesalahan sinkronisasi gagal menyimpan." };
  }
}
