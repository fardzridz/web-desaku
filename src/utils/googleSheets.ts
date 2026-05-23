export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

/**
 * Mengambil data berita dari Google Sheets API v4
 * Membutuhkan environment variable GOOGLE_SHEETS_API_KEY dan GOOGLE_SHEETS_ID
 */
export async function getLatestNews(): Promise<NewsItem[]> {
  const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
  const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

  // Tab/Sheet name and Range. Sesuaikan dengan nama sheet yang ada.
  const TAB_NAME = "berita";
  const RANGE = "A2:E10";

  // Guard clause jika env diset belum benar, untuk menghindari error build/render
  if (!SHEET_ID || !API_KEY) {
    console.warn(
      "⚠️ Google Sheets API Key atau Sheet ID belum dikonfigurasi di .env.local",
    );
    return [];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB_NAME}!${RANGE}?key=${API_KEY}`;

  try {
    // Penggunaan fetch dengan revalidation 1 jam (3600 detik) untuk performa dan kesegaran data
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Gagal mengambil data dari endpoint Sheets: ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!data.values) {
      return [];
    }

    // Mapping raw data array ke bentuk Object yang type-safe
    return data.values.map((row: string[]) => ({
      id: row[0] || crypto.randomUUID(),
      title: row[1] || "Tanpa Judul",
      date: row[2] || "Tanggal tidak diketahui",
      excerpt: row[3] || "Tidak ada ringkasan...",
      imageUrl: row[4] || "/placeholder.jpg",
    }));
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
            .replace(/key=[^&\s]+/g, "key=[redacted]")
            .replace(/spreadsheets\/[^/]+/g, "spreadsheets/[redacted]")
        : String(error);
    console.error("❌ Error fetching Google Sheets:", message);
    return []; // Return array kosong jika gagal (graceful degradation)
  }
}
