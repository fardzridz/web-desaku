"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(1);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? 0 : index);
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
      {/* 1. Geografi & Batas Wilayah */}
      <div 
        className={`transition-all duration-300 border border-outline-variant/30 rounded-3xl overflow-hidden ${
          openIndex === 1 ? "bg-surface shadow-lg ring-1 ring-primary/20" : "bg-surface-container-lowest hover:bg-surface-container-low"
        }`}
      >
        <button 
          onClick={() => toggle(1)} 
          className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none"
        >
          <div className="flex items-center gap-4 text-emerald-700">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openIndex === 1 ? 'bg-emerald-100' : 'bg-surface-container'}`}>
               <span className="material-symbols-outlined text-2xl">public</span>
            </div>
            <h3 className="text-lg md:text-2xl font-bold font-headline text-on-surface">1. Geografi & Batas Wilayah</h3>
          </div>
          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${openIndex === 1 ? 'rotate-180' : 'rotate-0'}`}>
            expand_more
          </span>
        </button>
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            openIndex === 1 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-6 md:p-8 pt-0 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 border-t border-outline-variant/10 mt-2">
              <div className="lg:col-span-5">
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                  Desa Wringinanom membentang pada daratan yang subur dengan total
                  luas wilayah mencapai <b>840,09 Hektare (Ha)</b>. Posisi desa
                  ini berbatasan langsung dengan beberapa desa tetangga yang
                  saling terintegrasi secara ekonomi dan sosial.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-emerald-600">
                  <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Sebelah Utara</span>
                  <span className="font-bold text-primary text-sm md:text-base">Desa Tongas Wetan</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-emerald-600">
                  <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Sebelah Selatan</span>
                  <span className="font-bold text-primary text-sm md:text-base">Desa Sumberkramat</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-emerald-600">
                  <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Sebelah Barat</span>
                  <span className="font-bold text-primary text-sm md:text-base">Desa Tongas Wetan</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-emerald-600">
                  <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Sebelah Timur</span>
                  <span className="font-bold text-primary text-sm md:text-base">Desa Sumendi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Aksesibilitas */}
      <div 
        className={`transition-all duration-300 border border-outline-variant/30 rounded-3xl overflow-hidden ${
          openIndex === 2 ? "bg-tertiary-container shadow-lg ring-1 ring-tertiary/20" : "bg-surface-container-lowest hover:bg-surface-container-low"
        }`}
      >
        <button 
          onClick={() => toggle(2)} 
          className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none"
        >
          <div className="flex items-center gap-4 text-tertiary">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openIndex === 2 ? 'bg-tertiary/20' : 'bg-surface-container'}`}>
               <span className="material-symbols-outlined text-2xl">commute</span>
            </div>
            <h3 className={`text-lg md:text-2xl font-bold font-headline ${openIndex === 2 ? 'text-on-tertiary-container' : 'text-on-surface'}`}>2. Aksesibilitas (Orbitasi)</h3>
          </div>
          <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === 2 ? 'text-on-tertiary-container rotate-180' : 'text-on-surface-variant rotate-0'}`}>
            expand_more
          </span>
        </button>
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            openIndex === 2 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-6 md:p-8 pt-0 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 border-t border-on-tertiary-container/10 mt-2 text-on-tertiary-container">
               <div className="lg:col-span-5 relative">
                  <span className="material-symbols-outlined absolute -left-4 -bottom-4 text-[8rem] opacity-5 pointer-events-none">route</span>
                  <p className="text-sm md:text-base leading-relaxed opacity-90 relative z-10">
                    Letak geografis Desa Wringinanom sangat strategis karena dekat
                    dengan pusat pemerintahan dan roda ekonomi pusat maupun daerah.
                  </p>
                </div>
                <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 relative z-10">
                  <div className="flex-1 bg-on-tertiary-container/5 p-5 rounded-2xl border border-on-tertiary-container/10 text-center">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-80">store</span>
                    <p className="text-sm md:text-base font-bold mb-1">Pusat Kecamatan</p>
                    <p className="text-2xl md:text-3xl font-black mb-2">4 KM</p>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-on-tertiary-container/10 px-3 py-1 rounded-full">± 30 Menit Tempuh</span>
                  </div>
                  <div className="flex-1 bg-on-tertiary-container/5 p-5 rounded-2xl border border-on-tertiary-container/10 text-center">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-80">location_city</span>
                    <p className="text-sm md:text-base font-bold mb-1">Pusat Kab. Probolinggo</p>
                    <p className="text-2xl md:text-3xl font-black mb-2">17 KM</p>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-on-tertiary-container/10 px-3 py-1 rounded-full">Lewat Akses Pantura</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sekilas Data Warga */}
      <div 
        className={`transition-all duration-300 border border-outline-variant/30 rounded-3xl overflow-hidden ${
          openIndex === 3 ? "bg-surface shadow-lg ring-1 ring-blue-600/20" : "bg-surface-container-lowest hover:bg-surface-container-low"
        }`}
      >
        <button 
          onClick={() => toggle(3)} 
          className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none"
        >
          <div className="flex items-center gap-4 text-blue-600">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openIndex === 3 ? 'bg-blue-100' : 'bg-surface-container'}`}>
               <span className="material-symbols-outlined text-2xl">groups</span>
            </div>
            <h3 className="text-lg md:text-2xl font-bold font-headline text-on-surface">3. Sekilas Data Warga</h3>
          </div>
          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${openIndex === 3 ? 'rotate-180' : 'rotate-0'}`}>
            expand_more
          </span>
        </button>
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            openIndex === 3 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
             <div className="p-6 md:p-8 pt-0 border-t border-outline-variant/10 mt-2 relative">
                <span className="material-symbols-outlined absolute right-6 bottom-6 text-[10rem] text-primary/5 pointer-events-none">nature_people</span>
                <div className="text-on-surface-variant text-sm md:text-base leading-relaxed space-y-4 max-w-4xl relative z-10 mb-6">
                  <p>
                    Desa Wringinanom memiliki lingkungan masyarakat yang guyub dan
                    rukun. Saat ini, total penduduk desa mencapai <b>6.930 jiwa</b>,
                    yang terdiri dari populasi yang seimbang, yaitu 3.434 penduduk
                    laki-laki dan 3.496 penduduk perempuan.
                  </p>
                  <p>
                    Ribuan warga ini bernaung di bawah <b>2.448 Kepala Keluarga (KK)</b>, dengan tingkat kepadatan
                    penduduk mencapai <b>8,09 jiwa per kilometer persegi</b>.
                    Masyarakat Wringinanom ditopang oleh kualitas sumber daya
                    manusia yang giat bekerja, baik sebagai petani, buruh harian,
                    hingga karyawan di sektor swasta.
                  </p>
                </div>
                <Link
                  href="/data-warga"
                  scroll={true}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-[0.98] transition-transform w-[280px] sm:w-fit justify-center relative z-10 shadow-sm"
                >
                  Buka Rincian Menu Demografi <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
             </div>
          </div>
        </div>
      </div>

      {/* 4. Potensi Unggulan */}
      <div 
        className={`transition-all duration-300 border border-outline-variant/30 rounded-3xl overflow-hidden ${
          openIndex === 4 ? "bg-surface shadow-lg ring-1 ring-orange-600/20" : "bg-surface-container-lowest hover:bg-surface-container-low"
        }`}
      >
        <button 
          onClick={() => toggle(4)} 
          className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none"
        >
          <div className="flex items-center gap-4 text-orange-600">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openIndex === 4 ? 'bg-orange-100' : 'bg-surface-container'}`}>
               <span className="material-symbols-outlined text-2xl">star_rate</span>
            </div>
            <h3 className="text-lg md:text-2xl font-bold font-headline text-on-surface">4. Potensi Unggulan Desa</h3>
          </div>
          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${openIndex === 4 ? 'rotate-180' : 'rotate-0'}`}>
            expand_more
          </span>
        </button>
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            openIndex === 4 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
             <div className="p-6 md:p-8 pt-0 border-t border-outline-variant/10 mt-2">
                <p className="text-on-surface-variant text-sm md:text-base mb-8 max-w-3xl">
                  Roda perekonomian Desa Wringinanom berputar sangat pesat berkat
                  berbagai potensi sumber daya alam dan wilayahnya:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-surface-container-low p-6 rounded-2xl border-t-4 border-emerald-600">
                    <span className="material-symbols-outlined text-emerald-600 text-3xl mb-3">agriculture</span>
                    <h4 className="font-bold text-lg mb-2 text-on-surface">Sektor Pertanian</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Lahan seluas <b>204 Ha</b> menghasilkan komoditas utama berupa
                      Jagung dan Padi Sawah dengan hasil luar biasa, capai <b>11,50 Ton/Ha</b>.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-2xl border-t-4 border-rose-600">
                    <span className="material-symbols-outlined text-rose-600 text-3xl mb-3">cruelty_free</span>
                    <h4 className="font-bold text-lg mb-2 text-on-surface">Sektor Peternakan</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Mengelola peternakan sukses terbukti perputaran tinggi Ayam Kambing (427 ekor), Ayam Kampung (2.000 ekor), dan Sapi (712 ekor).
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-6 rounded-2xl border-t-4 border-indigo-600">
                    <span className="material-symbols-outlined text-indigo-600 text-3xl mb-3">factory</span>
                    <h4 className="font-bold text-lg mb-2 text-on-surface">Kawasan Industri</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Tersedianya area Kawasan Industri seluas <b>97 Ha</b> membuka
                      potensi tinggi penanaman modal luar biasa terstruktur.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 5. Fasilitas & Infrastruktur */}
      <div 
        className={`transition-all duration-300 border border-outline-variant/30 rounded-3xl overflow-hidden ${
          openIndex === 5 ? "bg-primary shadow-xl text-on-primary ring-1 ring-primary-container" : "bg-surface-container-lowest hover:bg-surface-container-low"
        }`}
      >
        <button 
          onClick={() => toggle(5)} 
          className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none relative z-20"
        >
          <div className={`flex items-center gap-4 ${openIndex === 5 ? 'text-primary-container' : 'text-primary'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openIndex === 5 ? 'bg-on-primary/20' : 'bg-surface-container'}`}>
               <span className="material-symbols-outlined text-2xl">apartment</span>
            </div>
            <h3 className={`text-lg md:text-2xl font-bold font-headline ${openIndex === 5 ? 'text-on-primary' : 'text-on-surface'}`}>5. Fasilitas & Infrastruktur</h3>
          </div>
          <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === 5 ? 'text-on-primary-container rotate-180' : 'text-on-surface-variant rotate-0'}`}>
            expand_more
          </span>
        </button>
        <div 
          className={`grid transition-all duration-300 ease-in-out relative z-10 ${
            openIndex === 5 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
             <span className="material-symbols-outlined absolute right-0 bottom-0 text-[20rem] opacity-[0.05] pointer-events-none -rotate-12">domain</span>
             <div className="p-6 md:p-8 pt-0 border-t border-on-primary/10 mt-2">
                <p className="text-on-primary text-sm md:text-base leading-relaxed mb-8 max-w-3xl opacity-90">
                  Untuk memastikan kenyamanan dan kualitas hidup warga, Desa
                  Wringinanom dilengkapi dengan fasilitas publik yang sangat
                  lengkap dan memadai di berbagai bidang.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
                  {/* Pendidikan */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-sm">
                    <span className="material-symbols-outlined mb-2 text-yellow-300">school</span>
                    <h4 className="font-bold text-lg mb-2 text-white">Lembaga Pendidikan</h4>
                    <p className="text-sm opacity-90 leading-relaxed text-white">
                      Tersedia 4 TK, 6 SD, 3 SMP, 1 SMA, hingga 3 Pondok Pesantren
                      untuk menjamin generasi penerus terdidik.
                    </p>
                  </div>
                  {/* Kesehatan */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-sm">
                    <span className="material-symbols-outlined mb-2 text-yellow-300">medical_services</span>
                    <h4 className="font-bold text-lg mb-2 text-white">Layanan Kesehatan</h4>
                    <p className="text-sm opacity-90 leading-relaxed text-white">
                      Layanan siaga oleh tenaga medis terpadu melalui 1 Puskesmas Pembantu
                      (Pustu) dan 6 unit Posyandu tersebar.
                    </p>
                  </div>
                  {/* Sosial Ibadah */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 md:col-span-2 flex flex-col md:flex-row gap-6 shadow-sm">
                    <div className="flex-1">
                      <span className="material-symbols-outlined mb-2 text-yellow-300">mosque</span>
                      <h4 className="font-bold text-lg mb-2 text-white">Fasilitas Keagamaan</h4>
                      <p className="text-sm opacity-90 leading-relaxed text-white">
                         Kehidupan spiritual difasilitasi dengan baik melalui tersedianya 6 buah Masjid
                         Jami&apos; dan 33 Mushola/Langgar.
                      </p>
                    </div>
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-6 w-full flex flex-col justify-center">
                       <span className="block text-[10px] font-bold uppercase tracking-widest text-primary-container mb-3 opacity-80">Sarana Olahraga Publik</span>
                       <ul className="space-y-3 text-sm font-bold text-white">
                         <li className="flex items-center gap-3"><span className="material-symbols-outlined text-2xl">sports_soccer</span> Lapangan Sepak Bola Induk</li>
                         <li className="flex items-center gap-3"><span className="material-symbols-outlined text-2xl">sports_volleyball</span> Lapangan Voli Desa</li>
                       </ul>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
