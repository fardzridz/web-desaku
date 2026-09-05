import { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Potensi Desa - Desa Wringinanom",
  description:
    "Data potensi kekayaan alam, pertanian, peternakan, dan UMKM Desa Wringinanom.",
  alternates: { canonical: "/profil/potensi" },
};

export default function PotensiDesaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-16 pb-20 md:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Beranda", url: "/" }, { name: "Profil", url: "/profil" }, { name: "Potensi Desa" }]} />
      {/* Page Header */}
      <header className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 font-label">
          Kekayaan & Sumber Daya
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight font-headline mb-4 md:mb-6">
          Potensi & Kekayaan <span className="text-on-surface">Desa.</span>
        </h1>
        <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
          Desa Wringinanom dianugerahi bentang alam daratan yang subur seluas 840,09 Hektar. Melalui Badan Usaha Milik Desa (BUMDes) dan kemandirian warga, kami terus mengoptimalkan kekayaan alam ini untuk menggerakkan roda perekonomian lokal. Berikut adalah potensi unggulan utama di Desa Wringinanom:
        </p>
      </header>

      <div className="space-y-20 md:space-y-32">
        {/* Section 1: Pertanian */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
             <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">eco</span>
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
                  Potensi Pertanian
                </h2>
             </div>
             <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                Pertanian adalah urat nadi utama Desa Wringinanom yang dikelola oleh lebih dari 1.500 petani lokal. Desa ini memiliki lahan sawah dan tegalan produktif seluas ratusan hektar.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-surface-container-low p-6 rounded-3xl border-t-4 border-emerald-500 hover:shadow-md transition-all">
                   <span className="material-symbols-outlined text-emerald-600 mb-2 text-3xl">grass</span>
                   <h3 className="font-bold text-lg font-headline mb-2">Sentra Sayur Mayor</h3>
                   <p className="text-xs text-on-surface-variant leading-relaxed">Wringinanom sangat dikenal sebagai sentra utama budidaya Sawi dan Kangkung di seantero Kecamatan Tongas.</p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-3xl border-t-4 border-emerald-500 hover:shadow-md transition-all">
                   <span className="material-symbols-outlined text-emerald-600 mb-2 text-3xl">spa</span>
                   <h3 className="font-bold text-lg font-headline mb-2">Padi Sawah</h3>
                   <p className="text-xs text-on-surface-variant leading-relaxed">Memiliki luas tanam 204 Hektar dengan hasil panen mencapai 11,50 Ton per hektarnya.</p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-3xl border-t-4 border-emerald-500 hover:shadow-md transition-all md:col-span-2">
                   <span className="material-symbols-outlined text-emerald-600 mb-2 text-3xl">agriculture</span>
                   <h3 className="font-bold text-lg font-headline mb-2">Jagung</h3>
                   <p className="text-xs text-on-surface-variant leading-relaxed">Selain padi, ladang jagung juga memiliki luas tanam 204 Hektar dengan hasil produktivitas mencapai 11,50 Ton per hektarnya.</p>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2 h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
             <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 w-full h-full border-4 border-surface shadow-inner"></div>
             <img src="/images/pertanian-sawah-wringinanom.webp" alt="Pertanian Sawah Wringinanom" width={375} height={500} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
          </div>
        </section>

        {/* Section 2: Peternakan */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
             <div className="absolute inset-0 bg-amber-900/10 group-hover:bg-transparent transition-colors z-10 w-full border-4 border-surface shadow-inner"></div>
             <img src="/images/peternakan-wringinanom.webp" alt="Peternakan Wringinanom" width={736} height={431} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
          </div>
          <div className="space-y-6">
             <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">cruelty_free</span>
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
                  Potensi Peternakan
                </h2>
             </div>
             <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                Ketersediaan pakan alami yang melimpah menjadikan Wringinanom lokasi yang sangat ideal untuk peternakan. Ratusan warga secara mandiri memiliki dan mengelola peternakan yang menyuplai kebutuhan daging dan telur.
             </p>
             <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="bg-surface-container p-5 md:p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-outline-variant/10">
                   <div className="w-16 h-16 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-3xl">sound_detection_dog_barking</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-xl font-headline mb-1 text-on-surface">712 Ekor Sapi</h3>
                      <p className="text-xs text-on-surface-variant">Dikelola dan diternakkan oleh 458 orang warga secara mandiri.</p>
                   </div>
                </div>
                <div className="bg-surface-container p-5 md:p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-outline-variant/10">
                   <div className="w-16 h-16 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-3xl">pets</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-xl font-headline mb-1 text-on-surface">427 Ekor Kambing</h3>
                      <p className="text-xs text-on-surface-variant">Dimiliki skala perumahan oleh 160 orang peternak aktif desa.</p>
                   </div>
                </div>
                <div className="bg-surface-container p-5 md:p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-outline-variant/10">
                   <div className="w-16 h-16 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-3xl">egg</span>
                   </div>
                   <div>
                      <h3 className="font-bold text-xl font-headline mb-1 text-on-surface">2.000+ Ayam Kampung</h3>
                      <p className="text-xs text-on-surface-variant">Populasi unggas komersial dan rumahan di seluruh elemen masyarakat.</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Section 3: UMKM, Perdagangan & Jasa */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="material-symbols-outlined text-5xl text-primary mb-4 p-4 bg-primary/10 rounded-full">storefront</span>
            <h2 className="text-2xl md:text-4xl font-bold font-headline mb-4">UMKM, Perdagangan & Jasa</h2>
            <p className="text-sm md:text-base text-on-surface-variant">Selain bertani, masyarakat Wringinanom memiliki jiwa wirausaha dan keterampilan yang tinggi. Perekonomian desa berputar cepat melalui berbagai layanan jasa dan perdagangan mandiri.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/20 shadow-lg shadow-surface-container-high flex flex-col group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
               <span className="material-symbols-outlined text-primary text-4xl mb-6 relative z-10 bg-primary/10 w-fit p-3 rounded-xl">local_convenience_store</span>
               <h3 className="text-xl font-bold font-headline mb-4 relative z-10 text-on-surface">Aktivitas Perdagangan</h3>
               <ul className="space-y-4 relative z-10 flex-grow">
                 <li className="flex items-center justify-between text-sm"><span className="text-on-surface-variant font-medium">Toko Kelontong</span><span className="font-bold text-on-surface">19 Unit</span></li>
                 <li className="flex items-center justify-between text-sm"><span className="text-on-surface-variant font-medium">Kios / Toko Jasa</span><span className="font-bold text-on-surface">5 Unit</span></li>
                 <li className="flex items-center justify-between text-sm"><span className="text-on-surface-variant font-medium">Usaha Peternakan</span><span className="font-bold text-on-surface">4 Unit</span></li>
                 <li className="flex items-center justify-between text-sm"><span className="text-on-surface-variant font-medium">Minuman Kemasan</span><span className="font-bold text-on-surface">3 Unit</span></li>
               </ul>
            </div>

            <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/20 shadow-lg shadow-surface-container-high flex flex-col group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
               <span className="material-symbols-outlined text-secondary text-4xl mb-6 relative z-10 bg-secondary/10 w-fit p-3 rounded-xl">handyman</span>
               <h3 className="text-xl font-bold font-headline mb-4 relative z-10 text-on-surface">Jasa & Keterampilan</h3>
               <ul className="space-y-4 relative z-10 flex-grow">
                 <li className="flex items-center justify-between text-sm"><span className="text-on-surface-variant font-medium">Penjahit & Bordir</span><span className="font-bold text-on-surface">6 Unit</span></li>
                 <li className="flex items-center justify-between text-sm"><span className="text-on-surface-variant font-medium">Service Elektronik</span><span className="font-bold text-on-surface">6 Unit</span></li>
                 <li className="flex items-center justify-between text-sm"><span className="text-on-surface-variant font-medium">Tukang Kayu Mebel</span><span className="font-bold text-on-surface">4 Unit</span></li>
                 <li className="flex items-center justify-between text-sm border-t border-outline-variant/40 pt-3 mt-1"><span className="text-xs text-on-surface-variant italic">Keterampilan lain: Tukang batu (2 unit), pangkas rambut (2 unit).</span></li>
               </ul>
            </div>

            <div className="bg-primary-container text-on-primary-container rounded-[2rem] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg border border-primary/20 hover:-translate-y-1 transition-transform cursor-default">
               <span className="material-symbols-outlined text-[8rem] absolute opacity-5 top-4 left-4 -rotate-12">monitoring</span>
               <span className="material-symbols-outlined text-5xl mb-4 relative z-10">real_estate_agent</span>
               <h3 className="text-3xl font-black font-headline mb-4 relative z-10 tracking-tight">Kinerja BUMDes</h3>
               <p className="text-sm opacity-90 leading-relaxed font-body relative z-10">
                 Desa memiliki struktur BUMDes yang aktif dengan penggerak <strong>7 pengurus yang berdedikasi</strong> mengelola unit usaha strategis di sektor pertanian dan peternakan demi mencerdaskan kesejahteraan anggota secara berkelanjutan.
               </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
