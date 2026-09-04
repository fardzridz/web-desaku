// Augmentasi binding Cloudflare yang dipakai aplikasi ini.
// Selain yang dideklarasikan @opennextjs/cloudflare (mis. NEXT_INC_CACHE_R2_BUCKET).
declare global {
  interface CloudflareEnv {
    DB?: D1Database;
    MEDIA_BUCKET?: R2Bucket;
  }
}

export {};
