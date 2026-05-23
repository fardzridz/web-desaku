import Link from "next/link";
import React from "react";
import { getAllBeritaAdmin, getIdentitas } from "@/lib/sheets";
import DeleteNewsButton from "./DeleteNewsButton";

export default async function AdminNewsPage() {
  const [berita, identitas] = await Promise.all([
    getAllBeritaAdmin(),
    getIdentitas(),
  ]);

  return (
    <>
      <header className="h-16 md:h-20 flex items-center justify-between px-4 md:p-6 lg:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 transition-all border-b border-surface-variant/20">
        <h1 className="text-lg md:text-2xl font-headline font-extrabold text-on-surface tracking-tight truncate">
          Kabar Desa
        </h1>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-32 md:w-64 transition-all"
              placeholder="Cari artikel..."
              type="text"
            />
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 lg:p-10 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Article Table Section */}
          <div className="xl:col-span-7 space-y-6 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-headline font-bold text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  format_list_bulleted
                </span>
                Kabar Desa
              </h2>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/news/new"
                  className="ml-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-xs shadow hover:shadow-md transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Artikel Baru
                </Link>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full text-left border-collapse border-spacing-0 whitespace-nowrap min-w-[600px]">
                  <thead>
                    <tr className="text-xs uppercase tracking-widest text-stone-500 font-label border-b border-outline-variant/10">
                      <th className="px-6 py-5 font-semibold">Judul</th>
                      <th className="px-6 py-5 font-semibold">Status</th>
                      <th className="px-6 py-5 font-semibold">Tanggal</th>
                      <th className="px-6 py-5 font-semibold text-right">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {berita.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-surface-container-lowest transition-colors group"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">
                              <img
                                alt={item.judul}
                                className="w-full h-full object-cover"
                                src={item.fotoUrl}
                              />
                            </div>
                            <span className="font-semibold text-sm text-on-surface line-clamp-2 whitespace-normal max-w-[200px] md:max-w-xs w-full">
                              {item.judul}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${
                              item.status === "publish" ||
                              item.status === "terbit"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-200 text-stone-600"
                            }`}
                          >
                            {item.status === "publish" ? "Terbit" : "Draf"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-stone-500">
                          {item.tanggal}
                        </td>
                        <td className="px-6 py-5 text-right space-x-2">
                          <Link
                            href={`/admin/news/${item.slug}`}
                            className="inline-block p-2 text-stone-400 hover:text-primary transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              edit
                            </span>
                          </Link>
                          <DeleteNewsButton id={item.id} />
                        </td>
                      </tr>
                    ))}
                    {berita.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-12 text-center text-stone-500 text-sm"
                        >
                          Belum ada artikel. Halaman lembar desa masih kosong.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 flex items-center justify-between bg-surface-container">
                <span className="text-xs text-stone-500">
                  Menampilkan {berita.length} data
                </span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      chevron_left
                    </span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines Section */}
          <div className="xl:col-span-5 space-y-6 min-w-0">
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl shadow-sm space-y-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <span className="material-symbols-outlined text-2xl">
                  tips_and_updates
                </span>
              </div>
              <h3 className="font-headline font-bold text-emerald-900 text-xl">
                Panduan Menulis
              </h3>
              <div className="space-y-4 mt-8">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-semibold text-emerald-900 text-sm">
                      Validasi Fakta
                    </h4>
                    <p className="text-emerald-700 text-xs leading-relaxed mt-1">
                      Pastikan nama narasumber, warga, dan lokasi desa
                      terverifikasi sebelum tulisan dipublikasikan.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0">
                    image
                  </span>
                  <div>
                    <h4 className="font-semibold text-emerald-900 text-sm">
                      Gambar Sampul
                    </h4>
                    <p className="text-emerald-700 text-xs leading-relaxed mt-1">
                      Gunakan dimensi foto horizontal (landscape). Jika kosong
                      sistem secara otomatis memakai gambar bawaan.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0">
                    history_edu
                  </span>
                  <div>
                    <h4 className="font-semibold text-emerald-900 text-sm">
                      Konsep Draf
                    </h4>
                    <p className="text-emerald-700 text-xs leading-relaxed mt-1">
                      Simpan tulisan sebagai Draf jika belum selesai agar tidak
                      ditayangkan pada warga secara terpotong.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-200/50">
                <p className="text-[10px] text-emerald-600 font-label font-bold uppercase tracking-widest text-center">
                  Tetap Objektif & Informatif
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-stone-200 mt-8 w-full py-8 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 rounded-2xl shrink-0">
          <div className="text-base font-bold text-emerald-900 mb-6 md:mb-0 text-center">
            Buku Catatan {identitas?.namaDesa || "Desa Kita"}
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4">
              <Link
                href="#"
                className="font-label text-[10px] md:text-xs tracking-widest uppercase text-stone-500 hover:text-emerald-800 transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="#"
                className="font-label text-[10px] md:text-xs tracking-widest uppercase text-stone-500 hover:text-emerald-800 transition-colors"
              >
                Syarat Ketentuan
              </Link>
              <Link
                href="#"
                className="font-label text-[10px] md:text-xs tracking-widest uppercase text-stone-500 hover:text-emerald-800 transition-colors"
              >
                Pusat Bantuan
              </Link>
            </div>
            <p className="font-body text-[8px] md:text-[10px] tracking-widest uppercase text-stone-400 text-center md:text-right">
              © 2024 Panel Manajemen {identitas?.namaDesa || "Desa Kita"}. Hak
              cipta dilindungi.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
