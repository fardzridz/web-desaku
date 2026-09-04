import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Mengambil binding D1 aplikasi. Harus dipanggil di dalam fungsi async
 * (server component / server action / route handler) — JANGAN di module scope.
 *
 * Memakai mode `async: true` agar juga bekerja saat prerendering
 * (SSG/ISR) di build time, bukan hanya saat runtime request.
 */
export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error(
      "Binding D1 'DB' tidak tersedia. Pastikan wrangler.toml terkonfigurasi dan jalankan `npx wrangler d1 migrations apply desaku-db --local` untuk development."
    );
  }
  return env.DB;
}

/**
 * Mengambil binding R2 untuk media (gambar).
 */
export async function getMediaBucket(): Promise<R2Bucket> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.MEDIA_BUCKET) {
    throw new Error("Binding R2 'MEDIA_BUCKET' tidak tersedia. Cek wrangler.toml.");
  }
  return env.MEDIA_BUCKET;
}

/**
 * Domain publik R2 untuk media. Di-set via [vars] wrangler.toml atau .env.local.
 */
export function getMediaBaseUrl(): string {
  const domain = process.env.R2_ASSETS_CUSTOM_DOMAIN;
  if (!domain) {
    throw new Error("R2_ASSETS_CUSTOM_DOMAIN belum di-set (wrangler.toml [vars] / .env.local).");
  }
  return domain.replace(/\/+$/, "");
}

/**
 * Upload gambar ke R2 dan mengembalikan URL publiknya.
 * Melempar error jika file bukan gambar atau melebihi batas ukuran.
 */
export async function uploadImageToR2(file: File, folder: string): Promise<string> {
  // Allowlist ketat — SVG sengaja TIDAK diizinkan (bisa membawa script → XSS)
  const ALLOWED_MIME = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
  ]);
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error("Format gambar tidak didukung. Gunakan JPG, PNG, WebP, GIF, atau AVIF.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Ukuran gambar maksimal 5MB.");
  }

  const extMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };
  const ext = extMap[file.type] || "jpg";
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;

  const bucket = await getMediaBucket();
  await bucket.put(key, file, {
    httpMetadata: { contentType: file.type },
  });

  return `${getMediaBaseUrl()}/${key}`;
}
