import Link from "next/link";
import React from "react";
import { getAllBeritaAdmin, getIdentitas, getPerangkat, getLayanan, getAkunAdmin } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [berita, identitas, perangkat, layanan, akun] = await Promise.all([
    getAllBeritaAdmin(),
    getIdentitas(),
    getPerangkat(),
    getLayanan(),
    getAkunAdmin()
  ]);

  const totalArticles = berita.length;
  const publishedArticles = berita.filter(b => b.status === 'publish' || b.status === 'terbit').length;
  
  return (
    <>
      <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 transition-all border-b border-surface-variant/20">
        <h1 className="text-lg md:text-2xl font-headline font-extrabold text-on-surface tracking-tight truncate">Dasbor Admin</h1>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-32 md:w-64 transition-all" 
              placeholder="Pencarian cepat..." 
              type="text" 
            />
          </div>
          <Link href="/admin/settings" className="p-2 bg-surface-container-low hover:bg-surface-container rounded-full text-stone-500 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </Link>
        </div>
      </header>

      {/* Kurangi padding untuk mobile: p-4 vs p-10 */}
      <div className="p-4 md:p-6 lg:p-10 space-y-6 md:space-y-10">
        
        {/* Banner Selamat Datang */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl font-headline font-bold mb-2">Selamat datang kembali!</h2>
            <p className="opacity-80 text-xs md:text-sm max-w-xl leading-relaxed">
              Ini adalah panel pusat manajemen website {identitas?.namaDesa || 'Desa Kita'}. Gunakan menu navigasi untuk mengedit pemerintahan, layanan, hingga laporan transparansi.
            </p>
          </div>
          <span className="material-symbols-outlined absolute -bottom-10 -right-5 text-[150px] opacity-10 text-emerald-100 rotate-12 pointer-events-none">
            dashboard
          </span>
        </div>

        {/* Dashboard Stats - Bento Style Mobile Responsive */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-28 md:h-32 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] md:text-xs font-label uppercase tracking-widest text-stone-500">Artikel Berita</span>
              <span className="material-symbols-outlined text-emerald-600/50 group-hover:text-emerald-600 transition-colors text-xl">newspaper</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-headline font-bold text-emerald-800">{totalArticles}</span>
              <span className="text-[10px] md:text-xs text-stone-500 hidden sm:inline">({publishedArticles} Terbit)</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-28 md:h-32 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] md:text-xs font-label uppercase tracking-widest text-stone-500">Aparatur</span>
              <span className="material-symbols-outlined text-amber-600/50 group-hover:text-amber-600 transition-colors text-xl">badge</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-headline font-bold text-amber-700">{perangkat.length}</span>
              <span className="text-[10px] md:text-xs text-stone-500 hidden sm:inline">Pejabat</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-28 md:h-32 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] md:text-xs font-label uppercase tracking-widest text-stone-500">Layanan</span>
              <span className="material-symbols-outlined text-blue-600/50 group-hover:text-blue-600 transition-colors text-xl">assignment</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-headline font-bold text-blue-700">{layanan.length}</span>
              <span className="text-[10px] md:text-xs text-stone-500 hidden sm:inline">Aktif</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-28 md:h-32 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] md:text-xs font-label uppercase tracking-widest text-stone-500">Total Akses</span>
              <span className="material-symbols-outlined text-purple-600/50 group-hover:text-purple-600 transition-colors text-xl">manage_accounts</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-headline font-bold text-purple-700">{akun.length}</span>
              <span className="text-[10px] md:text-xs text-stone-500 hidden sm:inline">Admin</span>
            </div>
          </div>
        </section>

        {/* Akses Cepat */}
        <div>
          <h2 className="text-base md:text-lg font-headline font-bold text-stone-800 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            Akses Cepat
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Link href="/admin/news" className="flex flex-col items-center justify-center gap-2 bg-surface-container-low hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 p-4 md:p-6 rounded-2xl transition-all border border-transparent hover:border-emerald-200">
              <span className="material-symbols-outlined text-3xl md:text-4xl">edit_document</span>
              <span className="text-xs md:text-sm font-bold text-center">Tulis Berita</span>
            </Link>
            <Link href="/admin/apbdes" className="flex flex-col items-center justify-center gap-2 bg-surface-container-low hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 p-4 md:p-6 rounded-2xl transition-all border border-transparent hover:border-emerald-200">
              <span className="material-symbols-outlined text-3xl md:text-4xl">account_balance_wallet</span>
              <span className="text-xs md:text-sm font-bold text-center">Input APBDes</span>
            </Link>
            <Link href="/admin/services" className="flex flex-col items-center justify-center gap-2 bg-surface-container-low hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 p-4 md:p-6 rounded-2xl transition-all border border-transparent hover:border-emerald-200">
              <span className="material-symbols-outlined text-3xl md:text-4xl">design_services</span>
              <span className="text-xs md:text-sm font-bold text-center">Data Layanan</span>
            </Link>
            <Link href="/admin/settings" className="flex flex-col items-center justify-center gap-2 bg-surface-container-low hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 p-4 md:p-6 rounded-2xl transition-all border border-transparent hover:border-emerald-200">
              <span className="material-symbols-outlined text-3xl md:text-4xl">storefront</span>
              <span className="text-xs md:text-sm font-bold text-center">Profil Desa</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10">
          {/* Article Table Section */}
          <div className="xl:col-span-8 space-y-4 md:space-y-6 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-headline font-bold text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">history</span>
                Berita Terakhir
              </h2>
              <Link href="/admin/news" className="text-[10px] md:text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
                Lihat Semua
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full text-left border-collapse border-spacing-0 whitespace-nowrap min-w-[500px]">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-stone-500 font-label border-b border-outline-variant/10 bg-surface-container-low/50">
                    <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Judul Artikel</th>
                    <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Status</th>
                    <th className="px-4 md:px-6 py-4 md:py-5 font-semibold">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {berita.slice(0, 4).map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container-low/30 transition-colors group">
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant/10">
                            <img alt={item.judul} className="w-full h-full object-cover" src={item.fotoUrl} />
                          </div>
                          <Link href={`/admin/news`} className="font-semibold text-xs md:text-sm text-on-surface hover:text-primary transition-colors line-clamp-2 whitespace-normal w-full max-w-[200px] md:max-w-xs">{item.judul}</Link>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <span className={`px-2 py-1 md:px-3 md:py-1 text-[9px] md:text-[10px] font-bold uppercase rounded-full tracking-wider ${
                          item.status === 'publish' || item.status === 'terbit' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {item.status === 'publish' ? 'Terbit' : 'Draf'}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm text-stone-500">{item.tanggal}</td>
                    </tr>
                  ))}
                  {berita.length === 0 && (
                     <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-stone-500 text-sm">
                           Belum ada artikel yang ditulis.
                        </td>
                     </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          
          {/* Sisi Kanan Widget Papan Informasi */}
          <div className="xl:col-span-4 space-y-4 md:space-y-6">
             <h2 className="text-base md:text-lg font-headline font-bold text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">info</span>
                Sistem Info
              </h2>
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-5 md:p-6 shadow-sm space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-800">Sistem Aktif & Aman</h4>
                    <p className="text-xs text-stone-500 mt-1">Google Sheets terhubung dengan sempurna. Keamanan enkripsi sandi menyala.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">cloud_sync</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-800">Sinkronisasi Cloud</h4>
                    <p className="text-xs text-stone-500 mt-1">Sistem melakukan caching otomatis untuk load page yang super cepat bagi warga.</p>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <footer className="bg-stone-200 mt-6 md:mt-8 w-full py-6 md:py-8 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 rounded-2xl shrink-0">
          <div className="text-sm md:text-base font-bold text-emerald-900 mb-4 md:mb-0 text-center">Buku Catatan {identitas?.namaDesa || 'Desa Kita'}</div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="font-body text-[9px] md:text-[10px] tracking-widest uppercase text-stone-500 text-center md:text-right">© 2024 Panel Manajemen. Membangun Desa Lebih Baik.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
