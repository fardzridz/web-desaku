import React from "react";
import { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Visi & Misi - Desa Wringinanom",
  description: "Visi dan Misi jangka menengah dan panjang Kepala Desa Wringinanom.",
  alternates: { canonical: "/profil/visi-misi" },
};

export default function VisiMisiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-16 pb-20 md:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Beranda", url: "/" }, { name: "Profil", url: "/profil" }, { name: "Visi & Misi" }]} />
      {/* Page Header */}
      <header className="mb-12 md:mb-20 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 font-label">
          Arah & Tujuan
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight font-headline mb-4 md:mb-6">
          Visi & Misi <span className="text-on-surface">Pembangunan.</span>
        </h1>
        <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
          Menjadi kompas utama penggerak seluruh program keberlanjutan. Janji kerja yang dipersembahkan untuk kemaslahatan dan kemandirian masyarakat Desa Wringinanom seutuhnya.
        </p>
      </header>

      <div className="space-y-12 md:space-y-24">
        {/* Section 1: VISI */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8 justify-center">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              visibility
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-center">
              Visi Desa
            </h2>
          </div>

          <div className="bg-primary-container p-8 md:p-16 lg:p-20 rounded-[3rem] text-on-primary-container shadow-xl overflow-hidden relative group text-center border-4 border-primary/10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <span
                className="material-symbols-outlined text-[300px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <blockquote className="text-3xl md:text-5xl lg:text-6xl font-headline font-black leading-[1.2] tracking-tight relative">
                <span className="text-7xl md:text-9xl text-primary/20 absolute -top-12 md:-top-16 -left-6 md:-left-16 font-serif">
                  &ldquo;
                </span>
                <span className="relative z-10">
                  Terwujudnya Desa Wringinanom yang Maju, Mandiri, Sejahtera, Berbasis
                  Pertanian Unggulan dan Gotong Royong yang Kuat Menuju Masyarakat
                  yang Adil dan Berkelanjutan.
                </span>
                <span className="text-7xl md:text-9xl text-primary/20 absolute -bottom-16 md:-bottom-24 -right-6 md:-right-16 font-serif h-0">
                  &rdquo;
                </span>
              </blockquote>
            </div>
            
            <div className="mt-16 flex justify-center relative z-10">
               <div className="inline-flex items-center gap-2 bg-on-primary-container text-primary-container px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs">
                 <span className="material-symbols-outlined text-[1rem]">calendar_month</span>
                 Peta Jalan 2025-2030
               </div>
            </div>
          </div>
        </section>

        {/* Section 2: MISI */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-12 justify-center">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              published_with_changes
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-center">
              Misi Bekerja
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {[
              {
                icon: "agriculture",
                title: "Pertanian Berkelanjutan",
                desc: "Mengembangkan pertanian modern dan berkelanjutan"
              },
              {
                icon: "storefront",
                title: "Ekonomi Kerakyatan",
                desc: "Memberdayakan ekonomi kerakyatan"
              },
              {
                icon: "volunteer_activism",
                title: "Kualitas Hidup",
                desc: "Meningkatkan kualitas hidup masyarakat"
              },
              {
                icon: "foundation",
                title: "Membangun Infrastruktur",
                desc: "Membangun infrastruktur yang memadai"
              },
              {
                icon: "gavel",
                title: "Pemerintahan Transparan",
                desc: "Mewujudkan pemerintahan desa yang transparan dan melayani"
              }
            ].map((misi, index) => (
              <div key={index} className="bg-surface-container-low p-8 md:p-10 rounded-3xl group hover:bg-surface-container transition-colors border border-outline-variant/30 relative overflow-hidden">
                <span className="absolute -right-4 -bottom-4 text-[10rem] font-black text-on-surface/5 font-sans leading-none pointer-events-none group-hover:scale-110 transition-transform">
                  0{index + 1}
                </span>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm">
                     <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{misi.icon}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-headline mb-4 text-on-surface">
                    {misi.title}
                  </h3>
                  <p className="text-on-surface-variant font-medium leading-relaxed md:text-lg flex-grow">
                    {misi.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
