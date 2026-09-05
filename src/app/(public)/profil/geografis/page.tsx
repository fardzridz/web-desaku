import { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Geografis & Peta - Desa Wringinanom",
  description:
    "Informasi letak geografis, kondisi iklim, orbitasi, batas wilayah, dan tata guna lahan Desa Wringinanom.",
  alternates: { canonical: "/profil/geografis" },
};

export default function GeografisPage() {
  const koordinat = `"7°45'21"S 113°6'18"E"`;
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-16 pb-20 md:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Beranda", url: "/" }, { name: "Profil", url: "/profil" }, { name: "Geografis & Peta" }]} />
      {/* Page Header */}
      <header className="mb-12 md:mb-20 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 font-label">
          Ruang & Tata Letak
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight font-headline mb-4 md:mb-6">
          Geografis & Peta <span className="text-on-surface">Wilayah.</span>
        </h1>
        <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
          Kenali lebih dekat topografi, penggunaan lahan, dan bentang alam
          strategis yang menjadikan Desa Wringinanom lumbung pertanian terkemuka
          di Kecamatan Tongas.
        </p>
      </header>

      <div className="space-y-12 md:space-y-24">
        {/* Section 1: Peta Wilayah */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              map
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Peta Satelit Daerah
            </h2>
          </div>

          <div className="bg-surface-container-low p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-sm shadow-black/5 relative overflow-hidden group">
            <div className="w-full h-[400px] md:h-[600px] bg-stone-300 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-outline-variant/30 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.46313883389!2d113.10915995200384!3d-7.73356064731855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd64508ecf63ad3%3A0x6bba8dd7bd09e3e7!2sWringinanom%2C%20Tongas%2C%20Probolinggo%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Wringinanom"
                className="absolute inset-0 filter saturate-[1.2] contrast-[1.1]"
              ></iframe>
            </div>

            <div className="absolute top-10 left-10 hidden lg:block pointer-events-none">
              <div className="bg-white/90 backdrop-blur shadow-xl rounded-2xl p-6 border border-white/40 pointer-events-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 font-label block">
                  Koordinat Dasar
                </span>
                <span className="text-xl font-bold font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-500">
                    location_on
                  </span>
                  {koordinat}
                </span>
                <a
                  href="https://goo.gl/maps/Tk1Gvxv6n5DqV7hM6"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 bg-primary text-white w-full py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
                >
                  Buka di App{" "}
                  <span className="material-symbols-outlined text-[1rem]">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:hidden justify-between items-center text-sm font-bold text-on-surface-variant font-label uppercase tracking-widest gap-2">
              <span>Koordinat: {koordinat}</span>
              <a
                href="https://goo.gl/maps/Tk1Gvxv6n5DqV7hM6"
                target="_blank"
                rel="noreferrer"
                className="text-primary flex items-center gap-1 hover:underline underline-offset-4"
              >
                Buka di Google Maps
                <span className="material-symbols-outlined text-[1rem]">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Iklim & Orbitasi */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              explore
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Iklim & Keterjangkauan
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* Topografi */}
            <div className="bg-primary-container p-6 md:p-10 rounded-3xl relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[10rem] text-on-primary-container/5 transform -rotate-12">
                landscape
              </span>

              <h3 className="text-xl md:text-2xl font-bold font-headline mb-8 text-on-primary-container relative z-10">
                Topografi Wilayah Tropis
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/40 backdrop-blur-sm p-5 rounded-2xl border border-white/50">
                  <span
                    className="material-symbols-outlined text-emerald-800 text-3xl mb-2"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    altitude
                  </span>
                  <span className="block text-xs uppercase font-bold tracking-widest text-emerald-800/70 mb-1 font-label">
                    Ketinggian
                  </span>
                  <span className="text-3xl font-black text-emerald-950 font-headline">
                    25 <span className="text-sm">mdpl</span>
                  </span>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-5 rounded-2xl border border-white/50">
                  <span
                    className="material-symbols-outlined text-orange-600 text-3xl mb-2"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    device_thermostat
                  </span>
                  <span className="block text-xs uppercase font-bold tracking-widest text-orange-800/70 mb-1 font-label">
                    Suhu Harian
                  </span>
                  <span className="text-3xl font-black text-orange-950 font-headline">
                    30°C
                  </span>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-5 rounded-2xl border border-white/50 sm:col-span-2">
                  <span
                    className="material-symbols-outlined text-blue-600 text-3xl mb-2"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    water
                  </span>
                  <span className="block text-xs uppercase font-bold tracking-widest text-blue-800/70 mb-1 font-label">
                    Perairan
                  </span>
                  <span className="text-xl font-bold text-blue-950 font-headline">
                    Dilewati 2 Sungai Utama
                  </span>
                </div>
              </div>
            </div>

            {/* Orbitasi */}
            <div className="bg-surface-container-low p-6 md:p-10 rounded-3xl flex flex-col justify-between">
              <h3 className="text-xl md:text-2xl font-bold font-headline mb-4 text-on-surface">
                Orbitasi Pemerintah
              </h3>
              <p className="text-sm text-on-surface-variant font-medium mb-8 leading-relaxed">
                Jarak dari pusat desa menuju roda penggerak birokrasi, mencakup
                kecamatan hingga ibukota provinsi.
              </p>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">
                      <span className="material-symbols-outlined">
                        signpost
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Kecamatan Tongas
                      </p>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Terdekat
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-2xl font-headline text-on-surface">
                    4 Km
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                      <span className="material-symbols-outlined">
                        corporate_fare
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Kabupaten Probolinggo
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-2xl font-headline text-on-surface">
                    17 Km
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold shrink-0">
                      <span className="material-symbols-outlined">map</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Provinsi Jawa Timur
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-2xl font-headline text-on-surface">
                    100 Km
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Tata Guna Lahan & Batas */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              pie_chart
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Tata Guna & Batas
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            {/* Tata Guna Lahan Chart Simulation */}
            <div className="lg:col-span-7 bg-surface-container-low p-6 md:p-10 rounded-3xl flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-headline mb-2 text-on-surface">
                    Alokasi Pemanfaatan Lahan
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    Sebagian besar wilayah diperuntukkan bagi aktivitas
                    pertanian.
                  </p>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 shrink-0">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary block text-right font-label">
                    Total Luas
                  </span>
                  <span className="font-black text-2xl font-headline text-primary">
                    840,09 <span className="text-sm">Ha</span>
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                {/* Lahan Kering */}
                <div className="group relative">
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-bold flex items-center gap-3 text-on-surface">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <span className="material-symbols-outlined text-[1rem]">
                          filter_hdr
                        </span>
                      </div>
                      Tanah Kering / Tegalan
                    </span>
                    <span className="font-black text-xl text-on-surface text-right leading-none">
                      58,7%{" "}
                      <span className="block text1-[10px] text-xs font-bold text-on-surface-variant opacity-70 mt-1">
                        493,50 Ha
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full group-hover:brightness-110 transition-all origin-left"
                      style={{ width: "58.7%" }}
                    ></div>
                  </div>
                </div>

                {/* Tanah Sawah */}
                <div className="group relative">
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-bold flex items-center gap-3 text-on-surface">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <span className="material-symbols-outlined text-[1rem]">
                          grass
                        </span>
                      </div>
                      Tanah Sawah
                    </span>
                    <span className="font-black text-xl text-on-surface text-right leading-none">
                      38,7%{" "}
                      <span className="block text1-[10px] text-xs font-bold text-on-surface-variant opacity-70 mt-1">
                        325,49 Ha
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full group-hover:brightness-110 transition-all origin-left"
                      style={{ width: "38.7%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-3 pl-11 italic font-medium">
                    Irigasi teknis 162,49 Ha & Irigasi setengah teknis 135 Ha
                  </p>
                </div>

                {/* Fasilitas Umum */}
                <div className="group relative">
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-bold flex items-center gap-3 text-on-surface">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined text-[1rem]">
                          apartment
                        </span>
                      </div>
                      Fasilitas Umum
                    </span>
                    <span className="font-black text-xl text-on-surface text-right leading-none">
                      2,5%{" "}
                      <span className="block text1-[10px] text-xs font-bold text-on-surface-variant opacity-70 mt-1">
                        21,10 Ha
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full group-hover:brightness-110 transition-all origin-left"
                      style={{ width: "2.5%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Batas Administrasi */}
            <div className="lg:col-span-5 bg-tertiary-container text-on-tertiary-container p-6 md:p-10 rounded-3xl relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[12rem] text-on-tertiary-container/5 transform rotate-12">
                location_on
              </span>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold font-headline mb-2">
                  Batas Administrasi
                </h3>
                <p className="text-sm opacity-80 mb-8">
                  Desa Wringinanom diapit oleh wilayah persawahan dan pemukiman
                  dari desa-desa tetangga.
                </p>

                <div className="grid grid-cols-1 gap-4 flex-grow">
                  <div className="bg-white/20 backdrop-blur border border-white/30 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/30 transition-colors cursor-default">
                    <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center font-black">
                      U
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-label block">
                        Sisi Utara
                      </span>
                      <span className="font-bold font-headline text-lg w-full leading-tight">
                        Desa Tongas Wetan
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur border border-white/30 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/30 transition-colors cursor-default">
                    <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center font-black">
                      S
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-label block">
                        Sisi Selatan
                      </span>
                      <span className="font-bold font-headline text-lg w-full leading-tight">
                        D. Sumberkramat & Lumbang
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur border border-white/30 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/30 transition-colors cursor-default">
                    <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center font-black">
                      T
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-label block">
                        Sisi Timur
                      </span>
                      <span className="font-bold font-headline text-lg w-full leading-tight">
                        D. Sumendi & Sumberasih
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur border border-white/30 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/30 transition-colors cursor-default">
                    <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center font-black">
                      B
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-label block">
                        Sisi Barat
                      </span>
                      <span className="font-bold font-headline text-lg w-full leading-tight">
                        D. Tongas Wetan & Nguling
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
