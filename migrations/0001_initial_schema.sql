-- Schema awal: migrasi dari Google Sheets ke D1
-- Identitas desa: single row (id = 1)
CREATE TABLE identitas (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  nama_desa TEXT NOT NULL DEFAULT 'Pemerintah Desa',
  alamat TEXT NOT NULL DEFAULT '-',
  no_wa TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '-',
  sambutan_kades TEXT NOT NULL DEFAULT '',
  link_maps TEXT NOT NULL DEFAULT '',
  kecamatan TEXT NOT NULL DEFAULT '-',
  kab_kota TEXT NOT NULL DEFAULT '-',
  logo_desa_url TEXT NOT NULL DEFAULT '',
  facebook_url TEXT NOT NULL DEFAULT '',
  instagram_url TEXT NOT NULL DEFAULT '',
  tiktok_url TEXT NOT NULL DEFAULT '',
  website_url TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT ''
);

-- Akun admin
CREATE TABLE akun (
  email TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  nama_lengkap TEXT NOT NULL DEFAULT 'Administrator',
  role TEXT NOT NULL DEFAULT 'Operator',
  foto_url TEXT NOT NULL DEFAULT ''
);

-- Berita / warta desa
CREATE TABLE berita (
  id TEXT PRIMARY KEY,
  tanggal TEXT NOT NULL DEFAULT '-',
  judul TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  ringkasan TEXT NOT NULL DEFAULT '-',
  konten TEXT NOT NULL DEFAULT '-',
  foto_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  penulis TEXT NOT NULL DEFAULT 'Admin Desa'
);
CREATE INDEX idx_berita_status ON berita (status);

-- Layanan surat-menyurat
CREATE TABLE layanan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_layanan TEXT NOT NULL,
  syarat TEXT NOT NULL DEFAULT '-',
  durasi TEXT NOT NULL DEFAULT '-',
  biaya TEXT NOT NULL DEFAULT '-',
  kategori TEXT NOT NULL DEFAULT 'Kependudukan'
);

-- Perangkat desa
CREATE TABLE perangkat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL DEFAULT '-',
  urutan INTEGER NOT NULL DEFAULT 99,
  foto_url TEXT NOT NULL DEFAULT ''
);

-- Laporan APBDes (angka disimpan sebagai REAL, sudah dinormalisasi)
CREATE TABLE apbdes (
  tahun_anggaran TEXT PRIMARY KEY,
  total_pendapatan REAL NOT NULL DEFAULT 0,
  total_belanja REAL NOT NULL DEFAULT 0,
  silpa REAL NOT NULL DEFAULT 0,
  pend_dana_desa REAL NOT NULL DEFAULT 0,
  pend_add REAL NOT NULL DEFAULT 0,
  pend_bantuan_kab REAL NOT NULL DEFAULT 0,
  pend_bagi_hasil REAL NOT NULL DEFAULT 0,
  pend_pades REAL NOT NULL DEFAULT 0,
  pend_lain_lain REAL NOT NULL DEFAULT 0,
  bel_pembangunan REAL NOT NULL DEFAULT 0,
  bel_pemerintahan REAL NOT NULL DEFAULT 0,
  bel_pembinaan REAL NOT NULL DEFAULT 0,
  bel_bencana REAL NOT NULL DEFAULT 0,
  bel_pemberdayaan REAL NOT NULL DEFAULT 0,
  pembiayaan_penerimaan REAL NOT NULL DEFAULT 0,
  pembiayaan_pengeluaran REAL NOT NULL DEFAULT 0,
  pembiayaan_netto REAL NOT NULL DEFAULT 0,
  file_pdf TEXT NOT NULL DEFAULT '#',
  tanggal_disahkan TEXT NOT NULL DEFAULT '-',
  nama_pengesah TEXT NOT NULL DEFAULT '-'
);
