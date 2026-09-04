import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Menghubungkan dev server Next.js dengan bindings Cloudflare lokal (D1, R2)
// via miniflare/platform proxy. Data lokal tersimpan di .wrangler/state.
// https://opennext.js.org/cloudflare/get-started
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost:3000", "portal-wringinanom.web.id"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.ibb.co.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "placeholder.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "portal-wringinanom.web.id"],
      bodySizeLimit: "5mb",
    },
    // Batasi static generation ke 1 worker: build workers paralel saling
    // mengunci file SQLite D1 lokal (miniflare) → SQLITE_BUSY saat prerender.
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 100,
  },
};

export default nextConfig;
