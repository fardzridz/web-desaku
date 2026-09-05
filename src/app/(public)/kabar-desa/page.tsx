import { getBerita, getIdentitas } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const resolved = await searchParams;
  const page = Number(resolved?.page) || 1;

  return {
    title: "Kabar Desa",
    description:
      "Berita, pengumuman, dan warta resmi Pemerintah Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur.",
    alternates: {
      canonical: page > 1 ? `/kabar-desa?page=${page}` : "/kabar-desa",
    },
  };
}

export default async function KabarDesaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = searchParams ? await Promise.resolve(searchParams) : {};
  const currentPage = Number(resolvedParams.page) || 1;
  const ITEMS_PER_PAGE = 4;

  const [beritaDataRaw, identitasData] = await Promise.all([
    getBerita(),
    getIdentitas(),
  ]);

  // getBerita() sudah mengembalikan berita terbaru dulu (sort by tanggal DESC)
  const beritaData = beritaDataRaw;

  // Featured is the very latest article
  const featuredBerita = beritaData.length > 0 ? beritaData[0] : null;
  
  // Others are sliced sequentially (newest to oldest)
  const regularBeritaSemua = beritaData.slice(1);
  const totalPages = Math.ceil(regularBeritaSemua.length / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const regularBerita = regularBeritaSemua.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const popularBerita = beritaData.slice(0, 3); // mock popular

  const namaDesa = identitasData?.namaDesa || "Desa Kita";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 md:mt-8 pb-20 md:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Beranda", url: "/" }, { name: "Kabar Desa" }]} />
      {/* Page Header */}
      <header className="mb-10 md:mb-16">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase mb-4 font-label">
          Warta Terkini
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold text-on-surface tracking-tighter max-w-3xl leading-tight font-headline">
          Kabar {namaDesa} <span className="text-primary italic">Digital</span>
        </h1>
        <p className="mt-4 md:mt-6 text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
          Kumpulan cerita, pengumuman, dan perkembangan terbaru dari ekosistem
          desa kami yang terus bertumbuh.
        </p>
      </header>

      {/* Main Layout: Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Article List (8 Cols) */}
        <div className="lg:col-span-8 space-y-10 md:space-y-16">
          {/* Featured Article */}
          {featuredBerita ? (
            <Link
              href={`/kabar-desa/${featuredBerita.slug}`}
              className="group relative flex flex-col gap-6 md:gap-8 bg-surface-container-low rounded-[2rem] overflow-hidden p-2 block"
            >
              <div className="relative h-[250px] md:h-[400px] overflow-hidden rounded-[1.5rem] md:rounded-2xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={`${featuredBerita.judul} — Kabar Desa Wringinanom, Tongas, Probolinggo`}
                  src={featuredBerita.fotoUrl}
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2">
                  <span className="bg-primary text-on-primary px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider font-label shadow-sm">
                    Unggulan
                  </span>
                </div>
              </div>
              <div className="px-4 md:px-6 pb-6 md:pb-8">
                <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-medium text-on-surface-variant mb-3 md:mb-4 uppercase tracking-widest font-label">
                  <span>{featuredBerita.tanggal}</span>
                  <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                  <span>Oleh: Admin {namaDesa}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-3 md:mb-4 leading-tight group-hover:text-primary transition-colors font-headline">
                  {featuredBerita.judul}
                </h2>
                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-4 md:mb-6 max-w-2xl line-clamp-3 md:line-clamp-none">
                  {featuredBerita.ringkasan}
                </p>
                <div className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all text-sm md:text-base">
                  Baca Selengkapnya
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-surface-container-lowest border border-dashed border-outline-variant/30 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">
                newspaper
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2 font-headline">Belum Ada Kabar Desa</h3>
              <p className="text-sm text-on-surface-variant max-w-md">
                Admin desa kami belum menerbitkan artikel atau pengumuman baru. Silakan kembali lagi nanti untuk update terbaru seputar desa.
              </p>
            </div>
          )}

          {/* Regular Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {regularBerita.length > 0 ? (
              regularBerita.map((item, index) => (
                <Link
                  href={`/kabar-desa/${item.slug}`}
                  key={`${item.id}-${index}`}
                  className="group flex flex-col block"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container-high mb-6">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={`${item.judul} — Kabar Desa Wringinanom, Tongas, Probolinggo`}
                      src={item.fotoUrl}
                    />
                  </div>
                  <span className="text-tertiary font-bold text-[10px] uppercase tracking-widest mb-3 font-label">
                    Berita Desa
                  </span>
                  <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug font-headline line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-4 leading-relaxed">
                    {item.ringkasan}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] md:text-xs font-medium text-outline font-label mt-auto">
                    <span>{item.tanggal}</span>
                    <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                    <span>Oleh: Admin {namaDesa}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-12 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/30 flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-outline-variant/50 mb-3">inbox</span>
                <p className="text-on-surface-variant font-medium text-sm">Daftar berita tambahan belum tersedia.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 pt-10">
              <Link
                href={`?page=${Math.max(1, currentPage - 1)}`}
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container-high transition-colors ${currentPage > 1 ? "text-on-surface hover:bg-surface-container-highest" : "text-outline/30 pointer-events-none"}`}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </Link>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <Link
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl font-headline transition-colors ${isActive ? "bg-primary text-on-primary font-bold shadow-md" : "hover:bg-surface-container text-on-surface"}`}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              <Link
                href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container-high transition-colors ${currentPage < totalPages ? "text-on-surface hover:bg-surface-container-highest" : "text-outline/30 pointer-events-none"}`}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-10 md:space-y-12 sticky top-28 h-fit self-start mt-8 lg:mt-0">
          {/* Search Widget */}
          <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl">
            <h4 className="text-lg font-bold text-on-surface mb-6 font-headline">
              Cari Berita
            </h4>
            <div className="relative">
              <input
                className="w-full bg-surface-container-lowest border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50 transition-all font-body"
                placeholder="Masukkan kata kunci..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                search
              </span>
            </div>
          </div>

          {/* Categories */}
          {/* <div className="bg-surface-container-low p-8 rounded-3xl">
            <h4 className="text-lg font-bold text-on-surface mb-6 font-headline">Kategori Populer</h4>
            <div className="flex flex-wrap gap-2">
              <Link href="#" className="px-4 py-2 bg-surface-container-lowest hover:bg-primary-fixed-dim transition-colors rounded-xl text-xs font-semibold text-on-surface-variant font-label">Semua</Link>
              <Link href="#" className="px-4 py-2 bg-surface-container-lowest hover:bg-primary-fixed-dim transition-colors rounded-xl text-xs font-semibold text-on-surface-variant font-label">Lingkungan (12)</Link>
              <Link href="#" className="px-4 py-2 bg-surface-container-lowest hover:bg-primary-fixed-dim transition-colors rounded-xl text-xs font-semibold text-on-surface-variant font-label">Ekonomi (8)</Link>
              <Link href="#" className="px-4 py-2 bg-surface-container-lowest hover:bg-primary-fixed-dim transition-colors rounded-xl text-xs font-semibold text-on-surface-variant font-label">Pendidikan (5)</Link>
              <Link href="#" className="px-4 py-2 bg-surface-container-lowest hover:bg-primary-fixed-dim transition-colors rounded-xl text-xs font-semibold text-on-surface-variant font-label">Infrastruktur (7)</Link>
              <Link href="#" className="px-4 py-2 bg-surface-container-lowest hover:bg-primary-fixed-dim transition-colors rounded-xl text-xs font-semibold text-on-surface-variant font-label">Kesehatan (4)</Link>
            </div>
          </div> */}

          {/* Popular Posts (Bento Style) */}
          <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl">
            <h4 className="text-lg font-bold text-on-surface mb-5 md:mb-6 font-headline">
              Paling Banyak Dibaca
            </h4>
            <div className="space-y-6">
              {popularBerita.length > 0 ? (
                popularBerita.map((item, idx) => (
                  <Link
                    href={`/kabar-desa/${item.slug}`}
                    key={idx}
                    className="group flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={`${item.judul} — Kabar Desa Wringinanom, Tongas, Probolinggo`}
                        src={item.fotoUrl}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors font-headline">
                        {item.judul}
                      </h5>
                      <span className="text-[10px] text-outline font-medium font-label">
                        {item.tanggal}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-outline-variant text-sm font-medium">Belum ada data tulisan.</p>
                </div>
              )}
            </div>
          </div>

          {/* Village Newsletter Widget */}
          <div className="bg-primary-container p-6 md:p-8 rounded-3xl text-on-primary-container relative overflow-hidden">
            <div className="relative z-10">
              <span
                className="material-symbols-outlined text-3xl md:text-4xl mb-3 md:mb-4"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mail
              </span>
              <h4 className="text-lg md:text-xl font-bold mb-2 font-headline">
                Berlangganan Kabar
              </h4>
              <p className="text-xs md:text-sm opacity-90 mb-5 md:mb-6 font-body">
                Dapatkan berita langsung ke WhatsApp atau Email Anda setiap hari
                Senin.
              </p>
              <button className="w-full py-3 bg-on-primary-container text-primary-container font-bold rounded-xl text-sm transition-transform hover:scale-[0.98] active:scale-95 font-body">
                Daftar Sekarang
              </button>
            </div>
            {/* Abstract texture circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-on-primary-container/10 rounded-full blur-2xl"></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
