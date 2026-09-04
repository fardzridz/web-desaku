/**
 * One-time migration: konversi semua aset gambar R2 ke format WebP.
 *
 * Flow per gambar:
 *   1. `wrangler r2 object get`  → file sementara
 *   2. sharp → WebP (quality 82, resize max 2000px)
 *   3. `wrangler r2 object put`  → key *.webp (content-type image/webp)
 *
 * Output: mapping "url-lama → url-baru" untuk UPDATE D1/seed.
 *
 * Jalankan: node scripts/convert-r2-to-webp.mjs
 */
import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WRANGLER = join(ROOT, "node_modules", ".bin", "wrangler.cmd");
const BUCKET = "desaku-assets";
const BASE_URL = "https://assets.portal-wringinanom.web.id";

const KEYS = [
  "berita/hut-81-karnaval-budaya.jpg",
  "legacy/imgbb-1000006822.jpg",
  "legacy/imgbb-1000300351.jpg",
  "legacy/imgbb-1000364727.jpg",
  "legacy/imgbb-1775820327528.png",
  "legacy/imgbb-1777195764263.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-16-1.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-16-3.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-18-2.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-18-3.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-18-5.jpg",
  "legacy/imgbb-Whats-App-Image2026-01-14at12-52-33-1-593135.jpg",
];

const tmp = mkdtempSync(join(tmpdir(), "r2webp-"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function wr(args) {
  try {
    return execSync(`"${WRANGLER}" ${args}`, { stdio: "pipe", shell: true }).toString();
  } catch (e) {
    const msg = e.stderr?.toString() || e.stdout?.toString() || e.message;
    throw new Error(msg.split("\n").slice(0, 3).join(" | "));
  }
}

const mapping = [];
let idx = 0;
for (const key of KEYS) {
  idx++;
  const newKey = key.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const src = join(tmp, `src-${idx}.bin`);
  const out = join(tmp, `out-${idx}.webp`);
  console.log(`\n== ${key}`);
  try {
    wr(`r2 object get ${BUCKET}/${key} --file="${src}" --remote`);
  } catch (e) {
    console.error(`  SKIP (get gagal): ${e.message}`);
    continue;
  }
  await sharp(src)
    .rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  const srcSize = readFileSync(src).length;
  const outSize = readFileSync(out).length;
  console.log(`  ${srcSize} → ${outSize} bytes (${(100 - (outSize / srcSize) * 100).toFixed(0)}% lebih kecil)`);
  await sleep(1500);
  wr(
    `r2 object put ${BUCKET}/${newKey} --file="${out}" --remote --content-type="image/webp" --cache-control="public, max-age=31536000, immutable"`
  );
  console.log(`  ✓ terunggah: ${newKey}`);
  mapping.push([`${BASE_URL}/${key}`, `${BASE_URL}/${newKey}`]);
}

writeFileSync(join(tmp, "mapping.json"), JSON.stringify(mapping, null, 2));
console.log(`\n\n=== MAPPING (${mapping.length} gambar) ===`);
for (const [oldUrl, newUrl] of mapping) console.log(`${oldUrl}\n  → ${newUrl}`);
console.log(`\nMapping disimpan di: ${join(tmp, "mapping.json")}`);
console.log(`Temp dir (jangan dihapus selama mapping dibutuhkan): ${tmp}`);
