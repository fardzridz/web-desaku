"use server";

import { revalidatePath } from "next/cache";
import { getGoogleSheets } from "@/lib/googleClient";
import { requireAdmin } from "@/lib/adminAuth";
import bcrypt from "bcryptjs";

export interface ActionState {
  success: boolean;
  message: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

export async function saveAkunAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const idAsli = formData.get("idAsli") as string; // email asli sebelum diedit
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const namaLengkap = formData.get("namaLengkap") as string;
  const role = formData.get("role") as string;
  const fotoFile = formData.get("foto_file") as File;

  if (!email || !namaLengkap) {
    return { success: false, message: "Email dan Nama tidak boleh kosong" };
  }

  try {
    const sheets = getGoogleSheets();
    let finalFotoUrl = "";

    // 1. Upload Gambar
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
        throw new Error(`Gagal Upload: ${imgDataObj.error?.message}`);
      }
    }

    // 2. Sinkronisasi Data
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "akun!A:E",
    });

    const rows = readResponse.data.values || [];
    const rowIndex = idAsli ? rows.findIndex((row: string[]) => row[0] === idAsli) : -1;

    // Gunakan password lama jika dikosongkan saat update
    let finalPassword = password;
    if (idAsli && rowIndex !== -1 && (!password || password.trim() === "")) {
      finalPassword = rows[rowIndex][1] || "";
    } else if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(12);
      finalPassword = await bcrypt.hash(password, salt);
    }

    if (idAsli && rowIndex !== -1 && finalFotoUrl === "") {
      finalFotoUrl = rows[rowIndex][4] || "";
    }

    const rowData = [email, finalPassword, namaLengkap, role, finalFotoUrl];

    if (idAsli && rowIndex !== -1) {
      const exactRow = rowIndex + 1;
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `akun!A${exactRow}:E${exactRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
    } else {
      // Cek apakah email sudah ada saat proses create
      const existIndex = rows.findIndex((row: string[]) => row[0] === email);
      if (existIndex !== -1) {
        return { success: false, message: "Email ini sudah terdaftar sebagai admin." };
      }

      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "akun!A:E",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [rowData] },
      });
    }

    revalidatePath("/admin/accounts");

    return { 
      success: true, 
      message: idAsli ? "Data akun berhasil diperbarui!" : "Akun baru berhasil ditambahkan!" 
    };
  } catch (error: unknown) {
    console.error("❌ GOOGLE APIs ERROR:", error);
    return { success: false, message: "Gagal menyimpan data akun." };
  }
}

export async function deleteAkunAction(email: string) {
  await requireAdmin();

  try {
    const sheets = getGoogleSheets();
    
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "akun!A:A", 
    });

    const rows = readResponse.data.values || [];
    const rowIndex = rows.findIndex((row: string[]) => row[0] === email);

    if (rowIndex === -1) {
      return { success: false, message: "Akun tidak ditemukan." };
    }

    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title?.toLowerCase() === "akun");
    const sheetId = sheet?.properties?.sheetId;

    if (sheetId === undefined) {
      return { success: false, message: "Tab akun tidak ditemukan di Spreadsheet." };
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

    revalidatePath("/admin/accounts");
    return { success: true, message: `Akun ${email} berhasil dihapus!` };
  } catch (error: unknown) {
    console.error("Hapus Error:", error);
    return { success: false, message: "Gagal menghapus akun." };
  }
}
