import Link from "next/link";
import React from "react";
import NewsFormClient from "../NewsFormClient";
import { getAllBeritaAdmin } from "@/lib/db";

export default async function AdminNewArticlePage() {
  const allBerita = await getAllBeritaAdmin();
  const recentBerita = allBerita.slice(0, 6);

  return (
    <>
      <header className="h-20 flex items-center px-4 md:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 transition-all border-b border-outline-variant/10">
        <Link href="/admin/news" className="mr-4 p-2 text-stone-500 hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-surface-container-high cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-xl md:text-2xl font-headline font-extrabold text-on-surface tracking-tight">Tulis Berita Baru</h1>
      </header>

      <div className="p-4 md:p-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <NewsFormClient />
          </div>
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 shadow-sm sticky top-28">
              <h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Berita Terakhir
              </h3>
              <div className="space-y-4">
                {recentBerita.map((item) => (
                  <Link href={`/admin/news/${item.slug}`} key={item.id} className="group flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={item.judul}
                        src={item.fotoUrl}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors font-headline">
                        {item.judul}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded-full tracking-wider ${
                          item.status === 'publish' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {item.status === 'publish' ? 'Terbit' : 'Draf'}
                        </span>
                        <span className="text-[10px] text-outline font-medium font-label">
                          {item.tanggal}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {recentBerita.length === 0 && (
                  <p className="text-sm text-stone-500 text-center py-4">Belum ada berita yang diterbitkan.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
