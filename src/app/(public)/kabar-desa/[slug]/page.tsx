import { getBerita, getIdentitas } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumb, buildNewsArticle, SITE_URL } from "@/lib/entity";
import type { Metadata } from "next";

// Whitelist tag HTML yang diizinkan dari editor konten berita.
// h1 dari konten dinormalisasi ke h2 (hanya 1 H1 per halaman = judul artikel).
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption", "h2"]),
  transformTags: { h1: "h2" },
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "title", "width", "height", "loading"],
    a: ["href", "name", "target", "rel"],
    "*": ["style"],
  },
  allowedSchemes: ["http", "https", "mailto"],
};

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const beritaData = await getBerita();
  const berita = beritaData.find((item) => item.slug === resolvedParams.slug);

  if (!berita) return { title: "Berita Tidak Ditemukan" };

  const judulSeo = `${berita.judul} | Desa Wringinanom, Tongas, Probolinggo`;
  const desc =
    berita.ringkasan ||
    `Berita resmi dari Pemerintah Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur.`;

  return {
    title: judulSeo,
    description: desc,
    alternates: { canonical: `/kabar-desa/${berita.slug}` },
    openGraph: {
      type: "article",
      title: judulSeo,
      description: desc,
      url: `${SITE_URL}/kabar-desa/${berita.slug}`,
      siteName: "Desa Wringinanom",
      locale: "id_ID",
      publishedTime: undefined,
      images: berita.fotoUrl
        ? [{ url: berita.fotoUrl, alt: `Foto berita: ${berita.judul} — Desa Wringinanom, Tongas, Probolinggo` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: judulSeo,
      description: desc,
      images: berita.fotoUrl ? [berita.fotoUrl] : undefined,
    },
  };
}

export default async function DetilBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const [beritaData, identitasData] = await Promise.all([getBerita(), getIdentitas()]);
  const berita = beritaData.find((item) => item.slug === resolvedParams.slug);

  if (!berita) {
    notFound();
  }

  // Rekomendasi: ambil maksimal 3 berita lain yang bukan berita saat ini
  const rekomendasi = beritaData.filter(item => item.slug !== resolvedParams.slug).slice(0, 3);

  const articleJsonLd = buildNewsArticle({
    url: `${SITE_URL}/kabar-desa/${berita.slug}`,
    judul: berita.judul,
    ringkasan: berita.ringkasan,
    fotoUrl: berita.fotoUrl && !berita.fotoUrl.includes("placehold.co") ? berita.fotoUrl : undefined,
    penulis: berita.penulis,
    tanggal: berita.tanggal,
  });
  const breadcrumbJsonLd = buildBreadcrumb([
    { name: "Beranda", url: "/" },
    { name: "Kabar Desa", url: "/kabar-desa" },
    { name: berita.judul },
  ]);
  const safeKonten = sanitizeHtml(berita.konten, SANITIZE_OPTIONS);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 md:mt-8 mb-20 md:mb-32 flex flex-col lg:flex-row gap-10 lg:gap-16">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Main Article Content */}
      <article className="lg:w-2/3">
        {/* Back Link */}
        <Link 
          href="/kabar-desa" 
          className="inline-flex items-center gap-2 text-primary hover:bg-primary/10 px-3 md:px-4 py-2 rounded-full transition-colors font-bold mb-6 md:mb-10 font-label text-[10px] md:text-xs uppercase tracking-widest -ml-2 md:-ml-4 w-fit"
        >
          <span className="material-symbols-outlined text-base md:text-lg">arrow_back</span>
          Daftar Warta
        </Link>
        
        {/* Article Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-wrap items-center gap-3 text-tertiary mb-4 md:mb-6 font-bold text-[10px] md:text-xs font-label uppercase tracking-widest">
            <div className="flex items-center gap-2 bg-tertiary-container text-on-tertiary-container w-fit px-3 py-1 rounded-md">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              <span>{berita.tanggal}</span>
            </div>
            {berita.penulis && (
              <div className="flex items-center gap-2 bg-surface-container-high text-on-surface-variant w-fit px-3 py-1 rounded-md">
                <span className="material-symbols-outlined text-sm">edit_document</span>
                <span>Oleh: {berita.penulis}</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold text-on-surface leading-[1.1] md:leading-[1.1] tracking-tight font-headline text-balance">
            {berita.judul}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm mb-10 md:mb-16">
          <img
            src={berita.fotoUrl}
            alt={`Foto berita: ${berita.judul} — Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo`}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Content Body */}
        <div
          className="prose prose-base md:prose-xl prose-emerald max-w-none text-on-surface-variant leading-relaxed font-body prose-headings:font-headline prose-headings:text-on-surface prose-headings:font-bold prose-a:text-primary marker:text-primary [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-2 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic"
          dangerouslySetInnerHTML={{ __html: safeKonten }}
        />
      </article>

      {/* Sidebar: Related / Widgets */}
      <aside className="lg:w-1/3 pt-8 border-t border-outline-variant/20 lg:border-none lg:pt-32">
        <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl sticky top-24 space-y-10 md:space-y-12">
          <h4 className="text-xl font-bold text-on-surface mb-6 font-headline flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">share</span>
            Bagikan Tulisan
          </h4>
          <div className="flex gap-4 mb-10">
             <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary-container transition-colors"><span className="material-symbols-outlined">link</span></button>
             <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary-container transition-colors"><span className="material-symbols-outlined">forum</span></button>
             <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary-container transition-colors"><span className="material-symbols-outlined">mail</span></button>
          </div>

          {rekomendasi.length > 0 && (
            <div className="mb-10">
              <h4 className="text-xl font-bold text-on-surface mb-6 font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">library_books</span>
                Baca Juga
              </h4>
              <div className="space-y-6">
                {rekomendasi.map((item) => (
                  <Link href={`/kabar-desa/${item.slug}`} key={item.id} className="group flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.fotoUrl} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors font-headline">
                        {item.judul}
                      </h5>
                      <span className="text-[10px] text-outline font-medium font-label mt-1 block">
                        {item.tanggal}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-primary-container p-8 rounded-[2rem] text-on-primary-container relative overflow-hidden">
             <div className="relative z-10">
               <h4 className="text-xl font-bold mb-2 font-headline">Tak Ingin Ketinggalan?</h4>
               <p className="text-sm opacity-90 mb-6 font-body leading-relaxed">Dapatkan update terkait warta dan pengumuman desa langsung ke WhatsApp atau Email Anda.</p>
               <button className="w-full py-3 bg-on-primary-container text-primary-container font-bold rounded-xl text-sm transition-transform hover:scale-[0.98] active:scale-95 font-body">Berlangganan</button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-on-primary-container/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </aside>
    </div>
  );
}
