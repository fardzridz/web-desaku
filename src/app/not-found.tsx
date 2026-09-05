import Link from "next/link";

export const metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <span className="material-symbols-outlined text-8xl text-primary mb-6">wrong_location</span>
      <p className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-4 font-label">
        Error 404
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tighter mb-6 font-headline">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-on-surface-variant max-w-md leading-relaxed mb-10 font-body">
        Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan. Silakan kembali ke
        beranda Portal Resmi Desa Wringinanom.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 font-body"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
