import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { getIdentitas } from "@/lib/db";
import { buildGlobalGraph, REGION_CODES } from "@/lib/entity";
import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

async function getGlobalGraphData() {
  const identitas = await getIdentitas();
  return buildGlobalGraph({
    email: identitas?.email,
    noWa: identitas?.noWa,
    logoDesaUrl: identitas?.logoDesaUrl,
    facebookUrl: identitas?.facebookUrl,
    instagramUrl: identitas?.instagramUrl,
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const identitas = await getIdentitas();
  const namaDesa = identitas?.namaDesa || "Desa Wringinanom";
  const desc = `${namaDesa} adalah desa di Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur (kode pos ${REGION_CODES.postalCode}). Portal resmi Pemerintah Desa: profil, layanan surat-menyurat, kabar desa, dan transparansi APBDes.`;

  return {
    metadataBase: new URL(identitas?.websiteUrl || "https://portal-wringinanom.web.id"),
    title: {
      template: `%s | ${namaDesa}, Tongas, Probolinggo`,
      default: `${namaDesa} — Kecamatan Tongas, Kabupaten Probolinggo | Portal Resmi`,
    },
    description: desc,
    authors: [{ name: `Pemerintah ${namaDesa}` }],
    keywords: [
      "Desa Wringinanom",
      "Wringinanom Tongas",
      "Wringinanom Probolinggo",
      "Pemerintah Desa Wringinanom",
      "Kecamatan Tongas",
      "Kabupaten Probolinggo",
      "website desa Wringinanom",
      "layanan desa Probolinggo",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${namaDesa} — Kecamatan Tongas, Kabupaten Probolinggo | Portal Resmi`,
      description: desc,
      url: identitas?.websiteUrl || "https://portal-wringinanom.web.id",
      siteName: namaDesa,
      // Kalau identitas punya thumbnail/logo pakai itu; kalau tidak,
      // file-convention opengraph-image.tsx yang dipakai (fallback branding).
      ...(identitas?.thumbnailUrl || identitas?.logoDesaUrl
        ? {
            images: [
              {
                url: identitas.thumbnailUrl || identitas.logoDesaUrl!,
                width: 1200,
                height: 630,
                alt: `Portal Resmi ${namaDesa}, Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur`,
              },
            ],
          }
        : {}),
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${namaDesa} — Tongas, Probolinggo | Portal Resmi`,
      description: desc,
      ...(identitas?.thumbnailUrl || identitas?.logoDesaUrl
        ? { images: [identitas.thumbnailUrl || identitas.logoDesaUrl!] }
        : {}),
    },
    // Logo dinamis dari identitas; kalau kosong, biarkan file-convention
    // (favicon.ico / icon.svg / apple-icon.png) yang mengisi <link rel="icon">.
    ...(identitas?.logoDesaUrl
      ? {
          icons: {
            icon: identitas.logoDesaUrl,
            shortcut: identitas.logoDesaUrl,
            apple: identitas.logoDesaUrl,
          },
        }
      : {}),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="referrer" content="no-referrer" />
        <JsonLd data={await getGlobalGraphData()} />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          body { font-family: 'Inter', sans-serif; }
          h1, h2, h3, .font-headline { font-family: 'Manrope', sans-serif; }
        `}} />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-body bg-surface text-on-surface min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
