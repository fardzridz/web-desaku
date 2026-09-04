/**
 * One-off migration: Google Sheets (public CSV export) → Cloudflare D1 + R2
 *
 * Tidak butuh Google API key — memakai export CSV publik (gviz endpoint).
 * Otentikasi Cloudflare mengikuti `wrangler login` (OAuth).
 *
 * Jalankan:
 *   npx tsx scripts/migrate.ts           (dry-run)
 *   npx tsx scripts/migrate.ts --apply   (eksekusi: upload R2 + generate SQL)
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const APPLY = process.argv.includes("--apply");
const SHEET_ID = "1ZAw3xW97HJRhUgwYwAKm1FekRdEqFmbHcW0jvw2En8A";
const CUSTOM_DOMAIN = "https://assets.portal-wringinanom.web.id";
const R2_BUCKET = "desaku-assets";

// ---- CSV parser (RFC 4180) ----

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  while (i < src.length) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

async function fetchTab(tab: string): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.warn(`Tab "${tab}" gagal dimuat (${res.status}) — dilewati.`);
    return [];
  }
  const text = await res.text();
  const all = parseCsv(text);
  return all.slice(1).filter((r) => r.some((c) => c.trim() !== ""));
}

function parseIndonesianNumber(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = value.replace(/\s/g, "").replace(/\./g, "").replace(/,/g, ".");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function sqlString(value: string | number): string {
  if (typeof value === "number") {
    return isFinite(value) ? String(value) : "0";
  }
  return `'${value.replace(/'/g, "''")}'`;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

// ---- Klasifikasi URL gambar ----

function classify(url: string): { key: string; fetchUrl: string } | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("/") || trimmed === "#") return null;
  if (/placehold\.co|placeholder\.co|images\.unsplash\.com/.test(trimmed)) return null;

  const driveMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const drive = driveMatch[1];
    return {
      key: `drive/${drive}`,
      fetchUrl: `https://drive.google.com/uc?export=download&id=${drive}`,
    };
  }
  if (/i\.ibb\.co|ibb\.co/.test(trimmed)) {
    const name = trimmed.split("/").pop() || "imgbb.jpg";
    return { key: `legacy/imgbb-${name}`, fetchUrl: trimmed };
  }
  if (/googleusercontent\.com/.test(trimmed)) {
    const name = trimmed.split("/").pop()?.split("=")[0]?.split("?")[0] || "gimg.jpg";
    return { key: `legacy/gimg-${name}`, fetchUrl: trimmed };
  }
  if (/^https?:\/\//.test(trimmed)) {
    const safe = trimmed
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 120);
    return { key: `external/${safe}`, fetchUrl: trimmed };
  }
  return null;
}

const pendingUploads = new Map<string, { key: string; fetchUrl: string }>();

function migrateImageUrl(url: string): string {
  const info = classify(url);
  if (!info) return url;
  if (!pendingUploads.has(url)) pendingUploads.set(url, info);
  return `${CUSTOM_DOMAIN}/${info.key}`;
}

// ---- Wrangler runner (OAuth dari `wrangler login`) ----

function runWrangler(args: string[]): Promise<{ code: number; out: string }> {
  return new Promise((resolve, reject) => {
    const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
    // shell: true diperlukan di Windows agar npx.cmd jalan; argumen dengan
    // karakter khusus di-quote manual.
    const quoted = args.map((a) => (/[^\w.@\\\/:-]/.test(a) ? `"${a}"` : a));
    const child = spawn(npxCmd, quoted, { stdio: ["ignore", "pipe", "pipe"], shell: true });
    let out = "";
    child.stdout.on("data", (d: Buffer) => (out += d.toString()));
    child.stderr.on("data", (d: Buffer) => (out += d.toString()));
    child.on("close", (code) => resolve({ code: code ?? 1, out }));
    child.on("error", reject);
  });
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "application/pdf": ".pdf",
};

async function uploadToR2(
  idx: number,
  total: number,
  src: string,
  info: { key: string; fetchUrl: string }
): Promise<boolean> {
  // Fallback URL: i.ibb.co kadang kena DNS pollution di sebagian ISP
  // (SSL cert nyasar). Versi .co.com terbukti aman.
  const candidateUrls: string[] = [info.fetchUrl];
  if (info.fetchUrl.includes("i.ibb.co/")) {
    candidateUrls.push(info.fetchUrl.replace("i.ibb.co/", "i.ibb.co.com/"));
  }

  for (const fetchUrl of candidateUrls) {
    try {
      const res = await fetch(fetchUrl, { redirect: "follow" });
      if (!res.ok) {
        console.warn(`  [${idx}/${total}] unduh gagal (${res.status}): ${src.slice(0, 80)}`);
        continue;
      }
      const contentType = (res.headers.get("content-type") || "").split(";")[0].trim();
      if (!contentType.startsWith("image/") && contentType !== "application/pdf") {
        console.warn(`  [${idx}/${total}] bukan media (${contentType}): ${src.slice(0, 80)}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 64) {
        console.warn(`  [${idx}/${total}] file terlalu kecil: ${src.slice(0, 80)}`);
        continue;
      }

      const ext = EXT_BY_TYPE[contentType] || ".jpg";
      const finalKey = info.key + ext;
      const tmpFile = path.join(tmpDir, `f${idx}${ext}`);
      fs.writeFileSync(tmpFile, buf);

      const { code, out } = await runWrangler([
        "wrangler", "r2", "object", "put",
        `${R2_BUCKET}/${finalKey}`,
        "--file", tmpFile,
        "--content-type", contentType,
        "--remote",
      ]);
      try { fs.unlinkSync(tmpFile); } catch {}

      if (code === 0) {
        console.log(`  [${idx}/${total}] OK ${finalKey} (${Math.round(buf.length / 1024)}KB)`);
        return true;
      }
      console.warn(`  [${idx}/${total}] upload gagal: ${out.slice(-200).replace(/\n/g, " ")}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`  [${idx}/${total}] error: ${src.slice(0, 60)} → ${msg.slice(0, 80)}`);
    }
  }
  return false;
}

// ---- Main ----

type Row = Record<string, string | number>;
const tables: { name: string; rows: Row[] }[] = [];
let tmpDir = "";

async function main() {
  console.log(`Migrasi dimulai (mode: ${APPLY ? "APPLY" : "DRY-RUN"})\n`);

  // 1. identitas
  const identRows = await fetchTab("identitas");
  const ident = identRows[0] || [];
  tables.push({
    name: "identitas",
    rows: [
      {
        id: 1,
        nama_desa: ident[0] || "Pemerintah Desa",
        alamat: ident[1] || "-",
        no_wa: ident[2] || "",
        email: ident[3] || "-",
        sambutan_kades: ident[4] || "",
        link_maps: ident[5] || "",
        kecamatan: ident[6] || "-",
        kab_kota: ident[7] || "-",
        logo_desa_url: ident[8] ? migrateImageUrl(ident[8]) : "",
        facebook_url: ident[9] || "",
        instagram_url: ident[10] || "",
        tiktok_url: ident[11] || "",
        website_url: ident[12] || "",
        thumbnail_url: ident[13] || "",
      },
    ],
  });

  // 2. akun — sengaja TIDAK dimigrasi (hash password sensitif; admin prod
  //    sudah di-seed manual ke D1).
  tables.push({ name: "akun", rows: [] });

  // 3. berita
  const beritaRows = await fetchTab("berita");
  const seenSlugs = new Set<string>();
  tables.push({
    name: "berita",
    rows: beritaRows.map((r) => {
      const baseSlug = r[3]?.trim() || slugify(r[2] || "") || crypto.randomUUID();
      let slug = baseSlug;
      let n = 2;
      while (seenSlugs.has(slug)) slug = `${baseSlug}-${n++}`;
      seenSlugs.add(slug);
      return {
        id: r[0]?.trim() || crypto.randomUUID(),
        tanggal: r[1] || "-",
        judul: r[2] || "Tanpa Judul",
        slug,
        ringkasan: r[4] || "-",
        konten: r[5] || "-",
        foto_url: r[6] ? migrateImageUrl(r[6]) : "",
        status: (r[7] || "draft").toLowerCase().trim(),
        penulis: r[8] || "Admin Desa",
      };
    }),
  });

  // 4. layanan
  const layananRows = await fetchTab("layanan");
  tables.push({
    name: "layanan",
    rows: layananRows.map((r) => ({
      nama_layanan: r[0] || "-",
      syarat: r[1] || "-",
      durasi: r[2] || "-",
      biaya: r[3] || "-",
      kategori: (r[4] || "Kependudukan").trim(),
    })),
  });

  // 5. perangkat
  const perangkatRows = await fetchTab("perangkat");
  tables.push({
    name: "perangkat",
    rows: perangkatRows.map((r) => ({
      nama: r[0] || "-",
      jabatan: r[1] || "-",
      urutan: parseInt(r[2]) || 99,
      foto_url: r[3] ? migrateImageUrl(r[3]) : "",
    })),
  });

  // 6. apbdes
  const apbRows = await fetchTab("apbdes");
  tables.push({
    name: "apbdes",
    rows: apbRows.map((r) => ({
      tahun_anggaran: r[0] || "2025",
      total_pendapatan: parseIndonesianNumber(r[1]),
      total_belanja: parseIndonesianNumber(r[2]),
      silpa: parseIndonesianNumber(r[3]),
      pend_dana_desa: parseIndonesianNumber(r[4]),
      pend_add: parseIndonesianNumber(r[5]),
      pend_bantuan_kab: parseIndonesianNumber(r[6]),
      pend_bagi_hasil: parseIndonesianNumber(r[7]),
      pend_pades: parseIndonesianNumber(r[8]),
      pend_lain_lain: parseIndonesianNumber(r[9]),
      bel_pembangunan: parseIndonesianNumber(r[10]),
      bel_pemerintahan: parseIndonesianNumber(r[11]),
      bel_pembinaan: parseIndonesianNumber(r[12]),
      bel_bencana: parseIndonesianNumber(r[13]),
      bel_pemberdayaan: parseIndonesianNumber(r[14]),
      pembiayaan_penerimaan: parseIndonesianNumber(r[15]),
      pembiayaan_pengeluaran: parseIndonesianNumber(r[16]),
      pembiayaan_netto: parseIndonesianNumber(r[17]),
      file_pdf: r[18] || "#",
      tanggal_disahkan: r[19] || "-",
      nama_pengesah: r[20] || "-",
    })),
  });

  // Preview
  console.log("Ringkasan data:");
  for (const t of tables) {
    console.log(`  ${t.name}: ${t.rows.length} baris`);
  }
  console.log(`  gambar untuk dipindah ke R2: ${pendingUploads.size}\n`);

  if (!APPLY) {
    console.log("DRY-RUN selesai. Jalankan dengan --apply untuk eksekusi.");
    return;
  }

  // Upload gambar ke R2
  tmpDir = fs.mkdtempSync(path.join(process.env.TEMP || "/tmp", "r2up-"));
  console.log("\nUpload gambar ke R2...");
  let ok = 0;
  let fail = 0;
  let idx = 0;
  const total = pendingUploads.size;
  for (const [src, info] of pendingUploads) {
    idx++;
    if (await uploadToR2(idx, total, src, info)) {
      ok++;
    } else {
      fail++;
    }
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log(`\nUpload selesai: ${ok} OK, ${fail} gagal\n`);

  // Generate SQL seed
  const stmts: string[] = ["PRAGMA foreign_keys = OFF;"];
  for (const t of tables) {
    if (t.rows.length === 0) continue;
    const cols = Object.keys(t.rows[0]);
    stmts.push(`DELETE FROM ${t.name};`);
    for (const row of t.rows) {
      const vals = cols.map((c) => sqlString(row[c] ?? ""));
      stmts.push(`INSERT INTO ${t.name} (${cols.join(", ")}) VALUES (${vals.join(", ")});`);
    }
  }

  const sqlFile = path.join(".wrangler", "migrate-data.sql");
  fs.mkdirSync(path.dirname(sqlFile), { recursive: true });
  fs.writeFileSync(sqlFile, stmts.join("\n"), "utf8");
  console.log(`SQL seed ditulis ke ${sqlFile}`);
  console.log(`
Langkah berikutnya:
  1. npx wrangler d1 execute desaku-db --remote --file=${sqlFile}
  2. Verifikasi: npx wrangler d1 execute desaku-db --remote --command "SELECT COUNT(*) FROM berita"
`);
}

main().catch((e) => {
  console.error("Migrasi gagal:", e);
  process.exit(1);
});
