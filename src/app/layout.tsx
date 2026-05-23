import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { getIdentitas } from "@/lib/sheets";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export async function generateMetadata(): Promise<Metadata> {
  const identitas = await getIdentitas();
  const namaDesa = identitas?.namaDesa || "Desa Wringinanom";
  const desc = identitas?.sambutanKades ? identitas.sambutanKades.slice(0, 155) + "..." : "Portal resmi pemerintah desa dengan pelayanan modern dan informatif.";
  
  return {
    metadataBase: new URL(identitas?.websiteUrl || "https://portal-wringinanom.web.id"),
    title: {
      template: `%s | ${namaDesa}`,
      default: `${namaDesa} - Portal Resmi Pemerintahan Desa`,
    },
    description: desc,
    authors: [{ name: `Pemerintah ${namaDesa}` }],
    keywords: ["desa", namaDesa, "pelayanan desa", "wringinanom", "probolinggo", "website desa", "pemerintahan desa", "desa digital"],
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
      title: `${namaDesa} - Portal Resmi Pemerintahan Desa`,
      description: desc,
      url: identitas?.websiteUrl || "https://portal-wringinanom.web.id",
      siteName: namaDesa,
      images: [
        {
          url: identitas?.thumbnailUrl || identitas?.logoDesaUrl || "https://placehold.co/1200x630/064e3b/ffffff?text=Portal+Desa",
          width: 1200,
          height: 630,
          alt: `Thumbnail ${namaDesa}`,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    icons: {
      icon: identitas?.logoDesaUrl || "/favicon.ico",
      shortcut: identitas?.logoDesaUrl || "/favicon.ico",
      apple: identitas?.logoDesaUrl || "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="referrer" content="no-referrer" />
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
