import { unstable_rethrow } from "next/navigation";

export interface AkunItem {
  email: string;
  password: string;
  namaLengkap: string;
  role: string;
  fotoUrl: string;
}

export interface ApbdesItem {
  tahun_anggaran: string;
  total_pendapatan: number;
  total_belanja: number;
  silpa: number;
  pend_dana_desa: number;
  pend_add: number;
  pend_bantuan_kab: number;
  pend_bagi_hasil: number;
  pend_pades: number;
  pend_lain_lain: number;
  bel_pembangunan: number;
  bel_pemerintahan: number;
  bel_pembinaan: number;
  bel_bencana: number;
  bel_pemberdayaan: number;
  pembiayaan_penerimaan: number;
  pembiayaan_pengeluaran: number;
  pembiayaan_netto: number;
  file_pdf: string;
  tanggal_disahkan: string;
  nama_pengesah: string;
}

export interface BeritaItem {
  id: string;
  tanggal: string;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  fotoUrl: string;
  status: string;
  penulis: string;
}

export interface LayananItem {
  namaLayanan: string;
  syarat: string;
  durasi: string;
  biaya: string;
  kategori: string;
}

export interface PerangkatItem {
  nama: string;
  jabatan: string;
  urutan: number;
  fotoUrl: string;
}

export interface IdentitasData {
  namaDesa: string;
  alamat: string;
  noWa: string;
  email: string;
  sambutanKades: string;
  linkMaps: string;
  kecamatan: string;
  kabKota: string;
  logoDesaUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  websiteUrl?: string;
  thumbnailUrl?: string;
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

function toSafeErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return String(error);
  }

  return error.message
    .replace(/key=[^&\s]+/g, "key=[redacted]")
    .replace(/spreadsheets\/[^/]+/g, "spreadsheets/[redacted]");
}

// Memperbaiki link Google Drive agar support ditampilkan dalam elemen <img> dalam resolusi tinggi
function parseDriveUrl(url: string): string {
  if (!url) return "";
  // Cari ID dari link dengan format /file/d/ID/...
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // Tambahkan modifier =s1000 di belakang agar merender gambar kualitas HD, tidak buram
    return `https://lh3.googleusercontent.com/d/${match[1]}=s1000`;
  }
  return url;
}

// Memperbaiki pemformatan angka dari spreedsheet bahasa Indonesia (menghilangkan titik ribuan dan ubah koma jadi titik desimal)
function parseIndonesianNumber(value: string): number {
  if (!value) return 0;
  // Format spreadsheet umumnya "26057003,33" atau "2.424.711.316"
  // Kita hilangkan titik (sebagai pemisah ribuan) dan ubah koma menjadi titik desimal
  const cleanStr = value.replace(/\./g, "").replace(/,/g, ".");
  const parsed = parseFloat(cleanStr);
  return isNaN(parsed) ? 0 : parsed;
}

async function fetchFromSheet(
  tabName: string,
  range: string,
  options: { revalidate?: number; retries?: number; delay?: number } = {}
): Promise<string[][]> {
  if (!SHEET_ID || !API_KEY) {
    console.warn("⚠️ Google Sheets API Key atau Sheet ID belum dikonfigurasi.");
    return [];
  }

  const { revalidate = 300, retries = 2, delay = 1000 } = options;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tabName}!${range}?key=${API_KEY}`;

  try {
    const fetchOptions: RequestInit = {};
    if (revalidate === 0) {
      fetchOptions.cache = "no-store";
    } else {
      fetchOptions.next = { revalidate };
    }

    const response = await fetch(url, fetchOptions);

    if (response.status === 429 && retries > 0) {
      console.warn(`⏳ Rate limit tercapai untuk tab "${tabName}". Mencoba lagi dalam ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchFromSheet(tabName, range, { revalidate, retries: retries - 1, delay: delay * 2 });
    }

    if (!response.ok) {
      console.warn(
        `⚠️ Warning: Gagal memuat tab "${tabName}" dari Google Sheets (${response.status} ${response.statusText}). Pastikan tab sudah ada dan ejaannya persis.`,
      );
      return [];
    }

    const data = await response.json();
    // Memotong baris pertama karena itu adalah header kolom
    return data.values ? data.values.slice(1) : [];
  } catch (error) {
    unstable_rethrow(error);

    if (retries > 0) {
       console.warn(`⏳ Fetch error pada tab "${tabName}". Mencoba lagi dalam ${delay}ms...`);
       await new Promise((resolve) => setTimeout(resolve, delay));
       return fetchFromSheet(tabName, range, { revalidate, retries: retries - 1, delay: delay * 2 });
    }
    console.error(
      `❌ Error sistem saat fetch ${tabName}:`,
      toSafeErrorMessage(error),
    );
    return [];
  }
}

export async function getBerita(): Promise<BeritaItem[]> {
  const rows = await fetchFromSheet("berita", "A:I");
  const berita = rows
    .filter((row) => row[0] && row[0].trim() !== "")
    .map((row) => ({
      id: row[0],
      tanggal: row[1] || "-",
      judul: row[2] || "Tanpa Judul",
      slug: row[3] || crypto.randomUUID(),
      ringkasan: row[4] || "-",
      konten: row[5] || "-",
      fotoUrl: row[6]
        ? parseDriveUrl(row[6])
        : "https://placehold.co/600x400/064e3b/ffffff?text=Berita",
      status: row[7] || "draft",
      penulis: row[8] || "Admin Desa",
    }))
    .reverse();
  // Hanya return yang statusnya publish
  return berita.filter((b) => b.status.toLowerCase() === "publish");
}

export async function getAllBeritaAdmin(): Promise<BeritaItem[]> {
  const rows = await fetchFromSheet("berita", "A:I", { revalidate: 0 });
  return rows
    .filter((row) => row[0] && row[0].trim() !== "")
    .map((row) => ({
      id: row[0],
      tanggal: row[1] || "-",
      judul: row[2] || "Tanpa Judul",
      slug: row[3] || crypto.randomUUID(),
      ringkasan: row[4] || "-",
      konten: row[5] || "-",
      fotoUrl: row[6]
        ? parseDriveUrl(row[6])
        : "https://placehold.co/600x400/064e3b/ffffff?text=Berita",
      status: (row[7] || "draft").toLowerCase().trim(),
      penulis: row[8] || "Admin Desa",
    }))
    .reverse();
}

export async function getBeritaBySlugAdmin(
  slug: string,
): Promise<BeritaItem | null> {
  const allBerita = await getAllBeritaAdmin();
  return allBerita.find((b) => b.slug === slug) || null;
}

export async function getAkunAdmin(): Promise<AkunItem[]> {
  const rows = await fetchFromSheet("akun", "A:E", { revalidate: 0 });
  return rows
    .map((row) => ({
      email: row[0] || "",
      password: row[1] || "",
      namaLengkap: row[2] || "Administrator",
      role: row[3] || "Operator",
      fotoUrl: row[4]
        ? parseDriveUrl(row[4])
        : "https://placehold.co/100x100/064e3b/ffffff?text=Admin",
    }))
    .filter((a) => a.email !== "");
}

export async function getLayanan(): Promise<LayananItem[]> {
  const rows = await fetchFromSheet("layanan", "A:E");
  return rows.map((row) => ({
    namaLayanan: row[0] || "-",
    syarat: row[1] || "-",
    durasi: row[2] || "-",
    biaya: row[3] || "-",
    kategori: (row[4] || "Kependudukan").trim(),
  }));
}

export async function getPerangkat(): Promise<PerangkatItem[]> {
  const rows = await fetchFromSheet("perangkat", "A:D");
  const perangkat = rows.map((row) => ({
    nama: row[0] || "-",
    jabatan: row[1] || "-",
    urutan: parseInt(row[2]),
    fotoUrl: row[3]
      ? parseDriveUrl(row[3])
      : "https://placehold.co/400x400/064e3b/ffffff?text=Foto",
  }));

  // Sortir berdasarkan kolom urutan
  return perangkat.sort((a, b) => a.urutan - b.urutan);
}

export async function getIdentitas(): Promise<IdentitasData> {
  const rows = await fetchFromSheet("identitas", "A:N");
  const row = rows[0] || [];

  return {
    namaDesa: row[0] || "Pemerintah Desa",
    alamat: row[1] || "-",
    noWa: row[2] || "6281234567890",
    email: row[3] || "-",
    sambutanKades: row[4] || "Selamat datang di website desa kami.",
    linkMaps: row[5] || "",
    kecamatan: row[6] || "Kecamatan Kita",
    kabKota: row[7] || "Kabupaten Kita",
    logoDesaUrl: row[8] || "",
    facebookUrl: row[9] || "",
    instagramUrl: row[10] || "",
    tiktokUrl: row[11] || "",
    websiteUrl: row[12] || "",
    thumbnailUrl: row[13] || "",
  };
}

export async function getApbdes(): Promise<ApbdesItem[]> {
  const rows = await fetchFromSheet("apbdes", "A:U");
  return rows.map((row) => ({
    tahun_anggaran: row[0] || "2025",
    total_pendapatan: parseIndonesianNumber(row[1]),
    total_belanja: parseIndonesianNumber(row[2]),
    silpa: parseIndonesianNumber(row[3]),
    pend_dana_desa: parseIndonesianNumber(row[4]),
    pend_add: parseIndonesianNumber(row[5]),
    pend_bantuan_kab: parseIndonesianNumber(row[6]),
    pend_bagi_hasil: parseIndonesianNumber(row[7]),
    pend_pades: parseIndonesianNumber(row[8]),
    pend_lain_lain: parseIndonesianNumber(row[9]),
    bel_pembangunan: parseIndonesianNumber(row[10]),
    bel_pemerintahan: parseIndonesianNumber(row[11]),
    bel_pembinaan: parseIndonesianNumber(row[12]),
    bel_bencana: parseIndonesianNumber(row[13]),
    bel_pemberdayaan: parseIndonesianNumber(row[14]),
    pembiayaan_penerimaan: parseIndonesianNumber(row[15]),
    pembiayaan_pengeluaran: parseIndonesianNumber(row[16]),
    pembiayaan_netto: parseIndonesianNumber(row[17]),
    file_pdf: row[18] || "#",
    tanggal_disahkan: row[19] || "-",
    nama_pengesah: row[20] || "-",
  }));
}
