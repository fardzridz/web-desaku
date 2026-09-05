import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Desa Wringinanom — Portal Resmi Pemerintah Desa",
    short_name: "Wringinanom",
    description:
      "Portal resmi Pemerintah Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo: profil, layanan surat-menyurat, kabar desa, dan transparansi APBDes.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#064e3b",
    lang: "id",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
