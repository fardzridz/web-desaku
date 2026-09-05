import { unstable_cache } from "next/cache";
import { getDb } from "./cf";

// ============================================================
// Types — identik dengan kontrak lama (sheets.ts) agar semua
// pemanggil (server components, actions, client components)
// tidak perlu diubah.
// ============================================================

export interface AkunItem {
  email: string;
  /** bcrypt hash — JANGAN pernah dikirim ke client component. */
  password: string;
  namaLengkap: string;
  role: string;
  fotoUrl: string;
}

export type SafeAkunItem = Omit<AkunItem, "password">;

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
  id: number;
  namaLayanan: string;
  syarat: string;
  durasi: string;
  biaya: string;
  kategori: string;
}

export interface PerangkatItem {
  id: number;
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

// Tag cache — dipakai actions untuk revalidateTag
export const CACHE_TAGS = {
  identitas: "identitas",
  berita: "berita",
  layanan: "layanan",
  perangkat: "perangkat",
  apbdes: "apbdes",
} as const;

const PUBLIC_REVALIDATE = 300;

// Link Google Drive lama tetap dikonversi agar tetap tampil
function parseDriveUrl(url: string): string {
  if (!url) return "";
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}=s1000`;
  }
  return url;
}

// ============================================================
// Berita
// ============================================================

/**
 * Mengubah string tanggal ("2026-04-26" atau "30 Agustus 2026") menjadi
 * angka yang bisa dibandingkan (epoch hari, YYYYMMDD). Mengembalikan 0 jika
 * tidak bisa diparse — tanggal "0" akan dianggap paling lama.
 */
function parseTanggalKey(tanggal: string): number {
  if (!tanggal) return 0;

  const iso = tanggal.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    return Number(`${iso[1]}${iso[2]}${iso[3]}`);
  }

  const bulanIndex = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const idn = tanggal.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (idn) {
    const bulan = bulanIndex.findIndex(
      (b) => b.toLowerCase() === idn[2]?.toLowerCase()
    );
    if (bulan >= 0) {
      const hari = String(Number(idn[1])).padStart(2, "0");
      return Number(`${idn[3]}${String(bulan + 1).padStart(2, "0")}${hari}`);
    }
  }

  return 0;
}

async function getBeritaUncached(): Promise<BeritaItem[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(
      `SELECT id, tanggal, judul, slug, ringkasan, konten, foto_url, status, penulis
       FROM berita WHERE status = 'publish' ORDER BY rowid DESC`
    )
    .all<{
      id: string;
      tanggal: string;
      judul: string;
      slug: string;
      ringkasan: string;
      konten: string;
      foto_url: string;
      status: string;
      penulis: string;
    }>();

  const sorted = [...results].sort(
    (a, b) => parseTanggalKey(b.tanggal) - parseTanggalKey(a.tanggal)
  );

  return sorted.map((r) => ({
    id: r.id,
    tanggal: r.tanggal || "-",
    judul: r.judul || "Tanpa Judul",
    slug: r.slug,
    ringkasan: r.ringkasan || "-",
    konten: r.konten || "-",
    fotoUrl: r.foto_url
      ? parseDriveUrl(r.foto_url)
      : "https://placehold.co/600x400/064e3b/ffffff?text=Berita",
    status: r.status,
    penulis: r.penulis || "Admin Desa",
  }));
}

export const getBerita = unstable_cache(getBeritaUncached, ["berita-public"], {
  revalidate: PUBLIC_REVALIDATE,
  tags: [CACHE_TAGS.berita],
});

/**
 * Versi admin: selalu fresh dari D1 (tanpa cache). Membuat route admin dinamis.
 */
export async function getAllBeritaAdmin(): Promise<BeritaItem[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(
      `SELECT id, tanggal, judul, slug, ringkasan, konten, foto_url, status, penulis
       FROM berita ORDER BY rowid DESC`
    )
    .all<{
      id: string;
      tanggal: string;
      judul: string;
      slug: string;
      ringkasan: string;
      konten: string;
      foto_url: string;
      status: string;
      penulis: string;
    }>();

  const sorted = [...results].sort(
    (a, b) => parseTanggalKey(b.tanggal) - parseTanggalKey(a.tanggal)
  );

  return sorted.map((r) => ({
    id: r.id,
    tanggal: r.tanggal || "-",
    judul: r.judul || "Tanpa Judul",
    slug: r.slug,
    ringkasan: r.ringkasan || "-",
    konten: r.konten || "-",
    fotoUrl: r.foto_url
      ? parseDriveUrl(r.foto_url)
      : "https://placehold.co/600x400/064e3b/ffffff?text=Berita",
    status: (r.status || "draft").toLowerCase().trim(),
    penulis: r.penulis || "Admin Desa",
  }));
}

export async function getBeritaBySlugAdmin(
  slug: string
): Promise<BeritaItem | null> {
  const all = await getAllBeritaAdmin();
  return all.find((b) => b.slug === slug) || null;
}

// ============================================================
// Akun admin
// ============================================================

/**
 * Versi admin: selalu fresh dari D1 (tanpa cache).
 */
export async function getAkunAdmin(): Promise<AkunItem[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(`SELECT email, password_hash, nama_lengkap, role, foto_url FROM akun ORDER BY email`)
    .all<{
      email: string;
      password_hash: string;
      nama_lengkap: string;
      role: string;
      foto_url: string;
    }>();

  return results.map((r) => ({
    email: r.email,
    password: r.password_hash,
    namaLengkap: r.nama_lengkap || "Administrator",
    role: r.role || "Operator",
    fotoUrl: r.foto_url
      ? parseDriveUrl(r.foto_url)
      : "https://placehold.co/100x100/064e3b/ffffff?text=Admin",
  }));
}

/**
 * Akun tunggal untuk verifikasi login (hash ikut diambil).
 * HANYA boleh dipakai di server (login action), jangan sampai ke client.
 */
export async function getAkunForLogin(email: string): Promise<AkunItem | null> {
  const db = await getDb();
  const row = await db
    .prepare(`SELECT email, password_hash, nama_lengkap, role, foto_url FROM akun WHERE lower(email) = lower(?) LIMIT 1`)
    .bind(email)
    .first<{
      email: string;
      password_hash: string;
      nama_lengkap: string;
      role: string;
      foto_url: string;
    }>();

  if (!row) return null;
  return {
    email: row.email,
    password: row.password_hash,
    namaLengkap: row.nama_lengkap || "Administrator",
    role: row.role || "Operator",
    fotoUrl: row.foto_url
      ? parseDriveUrl(row.foto_url)
      : "https://placehold.co/100x100/064e3b/ffffff?text=Admin",
  };
}

/** Versi aman untuk dikirim ke client component (tanpa hash password). */
function toSafeAkun(a: AkunItem): SafeAkunItem {
  return {
    email: a.email,
    namaLengkap: a.namaLengkap,
    role: a.role,
    fotoUrl: a.fotoUrl,
  };
}

export async function getAkunAdminSafe(): Promise<SafeAkunItem[]> {
  const all = await getAkunAdmin();
  return all.map(toSafeAkun);
}

export async function getAkunByEmailSafe(email: string): Promise<SafeAkunItem | null> {
  const akun = await getAkunForLogin(email);
  return akun ? toSafeAkun(akun) : null;
}

// ============================================================
// Layanan
// ============================================================

async function getLayananUncached(): Promise<LayananItem[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(`SELECT id, nama_layanan, syarat, durasi, biaya, kategori FROM layanan ORDER BY id`)
    .all<{
      id: number;
      nama_layanan: string;
      syarat: string;
      durasi: string;
      biaya: string;
      kategori: string;
    }>();

  return results.map((r) => ({
    id: r.id,
    namaLayanan: r.nama_layanan || "-",
    syarat: r.syarat || "-",
    durasi: r.durasi || "-",
    biaya: r.biaya || "-",
    kategori: (r.kategori || "Kependudukan").trim(),
  }));
}

export const getLayanan = unstable_cache(getLayananUncached, ["layanan-public"], {
  revalidate: PUBLIC_REVALIDATE,
  tags: [CACHE_TAGS.layanan],
});

// ============================================================
// Perangkat desa
// ============================================================

async function getPerangkatUncached(): Promise<PerangkatItem[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(`SELECT id, nama, jabatan, urutan, foto_url FROM perangkat ORDER BY urutan ASC`)
    .all<{ id: number; nama: string; jabatan: string; urutan: number; foto_url: string }>();

  return results.map((r) => ({
    id: r.id,
    nama: r.nama || "-",
    jabatan: r.jabatan || "-",
    urutan: r.urutan ?? 99,
    fotoUrl: r.foto_url
      ? parseDriveUrl(r.foto_url)
      : "https://placehold.co/400x400/064e3b/ffffff?text=Foto",
  }));
}

export const getPerangkat = unstable_cache(
  getPerangkatUncached,
  ["perangkat-public"],
  { revalidate: PUBLIC_REVALIDATE, tags: [CACHE_TAGS.perangkat] }
);

// ============================================================
// Identitas desa (single row)
// ============================================================

async function getIdentitasUncached(): Promise<IdentitasData> {
  const db = await getDb();
  const row = await db
    .prepare(
      `SELECT nama_desa, alamat, no_wa, email, sambutan_kades, link_maps, kecamatan,
              kab_kota, logo_desa_url, facebook_url, instagram_url, tiktok_url,
              website_url, thumbnail_url
       FROM identitas WHERE id = 1`
    )
    .first<{
      nama_desa: string;
      alamat: string;
      no_wa: string;
      email: string;
      sambutan_kades: string;
      link_maps: string;
      kecamatan: string;
      kab_kota: string;
      logo_desa_url: string;
      facebook_url: string;
      instagram_url: string;
      tiktok_url: string;
      website_url: string;
      thumbnail_url: string;
    }>();

  return {
    namaDesa: row?.nama_desa || "Pemerintah Desa",
    alamat: row?.alamat || "-",
    noWa: row?.no_wa || "6281234567890",
    email: row?.email || "-",
    sambutanKades: row?.sambutan_kades || "Selamat datang di website desa kami.",
    linkMaps: row?.link_maps || "",
    kecamatan: row?.kecamatan || "Kecamatan Kita",
    kabKota: row?.kab_kota || "Kabupaten Kita",
    logoDesaUrl: row?.logo_desa_url || "",
    facebookUrl: row?.facebook_url || "",
    instagramUrl: row?.instagram_url || "",
    tiktokUrl: row?.tiktok_url || "",
    websiteUrl: normalizeWebsiteUrl(row?.website_url || ""),
    thumbnailUrl: row?.thumbnail_url || "",
  };
}

/**
 * Paksa URL situs selalu https:// tanpa trailing slash.
 * Sumber semua canonical/OG/sitemap/robots — tidak boleh ada http yang lolos.
 */
function normalizeWebsiteUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim().replace(/\/+$/, "");
  if (/^http:\/\//i.test(trimmed)) return `https://${trimmed.slice(7)}`;
  return trimmed;
}

export const getIdentitas = unstable_cache(
  getIdentitasUncached,
  ["identitas-public"],
  { revalidate: PUBLIC_REVALIDATE, tags: [CACHE_TAGS.identitas] }
);

// ============================================================
// APBDes
// ============================================================

async function getApbdesUncached(): Promise<ApbdesItem[]> {
  const db = await getDb();
  const { results } = await db
    .prepare(`SELECT * FROM apbdes ORDER BY tahun_anggaran DESC`)
    .all<ApbdesItem>();

  return results.map((r) => ({
    tahun_anggaran: r.tahun_anggaran || "2025",
    total_pendapatan: r.total_pendapatan ?? 0,
    total_belanja: r.total_belanja ?? 0,
    silpa: r.silpa ?? 0,
    pend_dana_desa: r.pend_dana_desa ?? 0,
    pend_add: r.pend_add ?? 0,
    pend_bantuan_kab: r.pend_bantuan_kab ?? 0,
    pend_bagi_hasil: r.pend_bagi_hasil ?? 0,
    pend_pades: r.pend_pades ?? 0,
    pend_lain_lain: r.pend_lain_lain ?? 0,
    bel_pembangunan: r.bel_pembangunan ?? 0,
    bel_pemerintahan: r.bel_pemerintahan ?? 0,
    bel_pembinaan: r.bel_pembinaan ?? 0,
    bel_bencana: r.bel_bencana ?? 0,
    bel_pemberdayaan: r.bel_pemberdayaan ?? 0,
    pembiayaan_penerimaan: r.pembiayaan_penerimaan ?? 0,
    pembiayaan_pengeluaran: r.pembiayaan_pengeluaran ?? 0,
    pembiayaan_netto: r.pembiayaan_netto ?? 0,
    file_pdf: r.file_pdf || "#",
    tanggal_disahkan: r.tanggal_disahkan || "-",
    nama_pengesah: r.nama_pengesah || "-",
  }));
}

export const getApbdes = unstable_cache(getApbdesUncached, ["apbdes-public"], {
  revalidate: PUBLIC_REVALIDATE,
  tags: [CACHE_TAGS.apbdes],
});
