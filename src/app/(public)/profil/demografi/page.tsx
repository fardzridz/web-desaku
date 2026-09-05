import { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Data Warga - Desa Wringinanom",
  description:
    "Transparansi data demografi dan statistik kependudukan Desa Wringinanom tahun 2026.",
  alternates: { canonical: "/profil/demografi" },
};

export default function DataWargaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-16 pb-20 md:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Beranda", url: "/" }, { name: "Profil", url: "/profil" }, { name: "Demografi" }]} />
      {/* Page Header */}
      <header className="mb-12 md:mb-20 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 font-label">
          Kependudukan 2026
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight font-headline mb-4 md:mb-6">
          Data & Demografi <span className="text-on-surface">Warga.</span>
        </h1>
        <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
          Rincian lengkap data demografi dan statistik kependudukan Desa
          Wringinanom. Kami berkomitmen memberikan transparansi dan informasi
          berkala bagi masyarakat serta pemangku kepentingan.
        </p>
      </header>

      <div className="space-y-12 md:space-y-24">
        {/* Section 1: Rekapitulasi Penduduk Utama */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              group
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Rekapitulasi Utama
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary-container p-6 md:p-8 rounded-3xl relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[8rem] text-on-primary-container/5">
                public
              </span>
              <p className="text-sm font-bold text-on-primary-container/80 tracking-widest uppercase mb-2 font-label">
                Total Penduduk
              </p>
              <h3 className="text-4xl md:text-5xl font-black text-on-primary-container font-headline">
                6.930 <span className="text-xl font-bold">Jiwa</span>
              </h3>
              <p className="text-xs text-on-primary-container/70 mt-4 font-bold">
                *100% Warga Negara Indonesia (WNI)
              </p>
            </div>

            <div className="bg-surface-container p-6 md:p-8 rounded-3xl">
              <p className="text-sm font-bold text-on-surface-variant tracking-widest uppercase mb-2 font-label">
                Kepala Keluarga
              </p>
              <h3 className="text-4xl md:text-5xl font-black text-on-surface font-headline">
                2.448 <span className="text-xl font-bold">KK</span>
              </h3>
            </div>

            <div className="bg-surface-container p-6 md:p-8 rounded-3xl">
              <p className="text-sm font-bold text-on-surface-variant tracking-widest uppercase mb-2 font-label">
                Kepadatan
              </p>
              <h3 className="text-4xl md:text-5xl font-black text-on-surface font-headline">
                8,09
              </h3>
              <p className="text-sm text-on-surface-variant mt-2 font-bold">
                Jiwa per KM²
              </p>
            </div>
          </div>

          {/* Gender Ratio Bar */}
          <div className="bg-surface-container-low p-6 md:p-10 rounded-3xl">
            <h4 className="text-lg font-bold font-headline mb-6 text-center">
              Rasio Jenis Kelamin
            </h4>
            <div className="relative h-12 md:h-16 rounded-full overflow-hidden flex bg-surface-container-highest select-none">
              <div
                className="bg-sky-600 flex items-center justify-start pl-6 text-white font-bold"
                style={{ width: "49.55%" }}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg md:text-xl">
                    man
                  </span>
                  <span className="text-sm md:text-base hidden sm:inline">
                    Laki-laki
                  </span>
                </div>
              </div>
              <div
                className="bg-rose-500 flex items-center justify-end pr-6 text-white font-bold"
                style={{ width: "50.45%" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base hidden sm:inline">
                    Perempuan
                  </span>
                  <span className="material-symbols-outlined text-lg md:text-xl">
                    woman
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-sm md:text-base font-body font-bold px-2">
              <div className="text-sky-700">3.434 Jiwa (49,5%)</div>
              <div className="text-rose-600">3.496 Jiwa (50,5%)</div>
            </div>
          </div>
        </section>

        {/* Section 2: Agama & Etnis */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              diversity_3
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Agama & Etnis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl">
              <h3 className="text-lg md:text-xl font-bold font-headline mb-6 border-b border-outline-variant/30 pb-4">
                Pemeluk Agama
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center bg-surface-container px-4 py-3 rounded-xl">
                  <span className="font-bold flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>{" "}
                    Islam
                  </span>
                  <span className="font-black text-lg">6.922</span>
                </li>
                <li className="flex justify-between items-center px-4 py-2 text-on-surface-variant">
                  <span className="font-medium flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>{" "}
                    Kristen
                  </span>
                  <span className="font-bold">5</span>
                </li>
                <li className="flex justify-between items-center px-4 py-2 text-on-surface-variant">
                  <span className="font-medium flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-600"></span>{" "}
                    Katholik
                  </span>
                  <span className="font-bold">3</span>
                </li>
                <li className="flex justify-between items-center px-4 py-2 text-on-surface-variant opacity-60">
                  <span className="font-medium flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-stone-400"></span>{" "}
                    Lainnya
                  </span>
                  <span className="font-bold">0</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl">
              <h3 className="text-lg md:text-xl font-bold font-headline mb-6 border-b border-outline-variant/30 pb-4">
                Latar Belakang Etnis
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center bg-surface-container px-4 py-3 rounded-xl">
                  <span className="font-bold flex items-center gap-3">
                    Jawa
                  </span>
                  <span className="font-black text-lg">6.912</span>
                </li>
                <li className="flex justify-between items-center px-4 py-2 text-on-surface-variant">
                  <span className="font-medium flex items-center gap-3">
                    Madura
                  </span>
                  <span className="font-bold">18</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-tertiary-container text-on-tertiary-container rounded-xl text-xs md:text-sm leading-relaxed border border-tertiary/20">
                Masyarakat hidup berdampingan dengan damai dan sangat didominasi
                oleh kebudayaan serta tradisi Jawa yang kental.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Pendidikan */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              school
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Tingkat Pendidikan
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            <div className="lg:col-span-8 bg-surface-container-low p-6 md:p-10 rounded-3xl">
              <h3 className="text-lg md:text-xl font-bold font-headline mb-6">
                Pendidikan Dasar & Menengah
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 md:w-24 text-xs md:text-sm font-bold text-on-surface-variant">
                    SD / Sederajat
                  </div>
                  <div className="flex-1 bg-surface-container-highest h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="w-12 text-right font-black">1.782</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 md:w-24 text-xs md:text-sm font-bold text-on-surface-variant">
                    SMP / Sederajat
                  </div>
                  <div className="flex-1 bg-surface-container-highest h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-primary/80 h-full"
                      style={{ width: "57%" }}
                    ></div>
                  </div>
                  <div className="w-12 text-right font-black">1.019</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 md:w-24 text-xs md:text-sm font-bold text-on-surface-variant">
                    SMA / Sederajat
                  </div>
                  <div className="flex-1 bg-surface-container-highest h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-primary/60 h-full"
                      style={{ width: "69%" }}
                    ></div>
                  </div>
                  <div className="w-12 text-right font-black">1.238</div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-outline-variant/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-headline mb-2">
                      Pendidikan Tinggi
                    </h3>
                    <p className="text-xs md:text-sm text-on-surface-variant">
                      Tren warga mengejar gelar Diploma dan Sarjana semakin
                      meningkat.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:flex gap-4 md:gap-8">
                    <div className="bg-surface-container px-4 py-2 rounded-xl text-center">
                      <div className="font-extrabold text-xl text-primary">
                        26
                      </div>
                      <div className="text-[10px] font-bold tracking-widest text-on-surface-variant">
                        D1 - D3
                      </div>
                    </div>
                    <div className="bg-surface-container px-4 py-2 rounded-xl text-center">
                      <div className="font-extrabold text-xl text-primary">
                        57
                      </div>
                      <div className="text-[10px] font-bold tracking-widest text-on-surface-variant">
                        STRATA 1
                      </div>
                    </div>
                    <div className="bg-surface-container px-4 py-2 rounded-xl text-center">
                      <div className="font-extrabold text-xl text-primary">
                        5
                      </div>
                      <div className="text-[10px] font-bold tracking-widest text-on-surface-variant">
                        STRATA 2
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-tertiary text-on-tertiary p-6 md:p-10 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden">
              <span className="material-symbols-outlined text-[10rem] absolute opacity-10 -right-8 -top-8">
                local_library
              </span>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl mb-4">
                  menu_book
                </span>
                <h3 className="text-5xl font-black font-headline mb-2">801</h3>
                <p className="font-bold text-lg tracking-widest">
                  PELAJAR AKTIF
                </p>
                <div className="w-12 h-1 bg-on-tertiary/30 mx-auto my-6 rounded-full"></div>
                <p className="text-sm opacity-90">
                  Generasi muda yang saat ini masih berstatus sebagai siswa atau
                  mahasiswa aktif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Profesi & Ekonomi */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              work
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Pekerjaan & Ekonomi
            </h2>
          </div>
          <p className="text-on-surface-variant mb-6 md:mb-10 max-w-3xl text-sm md:text-base leading-relaxed">
            Perekonomian Desa Wringinanom sangat ditopang oleh sektor agraris
            dan industri swasta. Mayoritas warga menggantungkan hidup pada hasil
            tani, namun daya serap tenaga kerja industri juga tinggi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-surface-container p-6 md:p-8 rounded-3xl border-t-8 border-emerald-600">
              <h3 className="font-bold font-headline text-lg mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600">
                  agriculture
                </span>
                Sektor Agraris
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">
                    Petani
                  </span>
                  <span className="font-black text-lg">1.584</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">
                    Buruh Tani
                  </span>
                  <span className="font-black text-lg">118</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">
                    Nelayan
                  </span>
                  <span className="font-black text-lg">35</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container p-6 md:p-8 rounded-3xl border-t-8 border-blue-600">
              <h3 className="font-bold font-headline text-lg mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">
                  factory
                </span>
                Sektor Industri
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">
                    Karyawan Swasta
                  </span>
                  <span className="font-black text-lg">637</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant font-medium">
                    Buruh Harian Lepas
                  </span>
                  <span className="font-black text-lg">193</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container p-6 md:p-8 rounded-3xl border-t-8 border-stone-600 md:col-span-2 lg:col-span-1">
              <h3 className="font-bold font-headline text-lg mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-stone-600">
                  badge
                </span>
                Profesi Lainnya
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-1 font-label">
                    Sopir
                  </span>
                  <span className="font-black text-lg">24</span>
                </div>
                <div>
                  <span className="block text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-1 font-label">
                    Perangkat
                  </span>
                  <span className="font-black text-lg">17</span>
                </div>
                <div>
                  <span className="block text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-1 font-label">
                    Satpam
                  </span>
                  <span className="font-black text-lg">13</span>
                </div>
                <div>
                  <span className="block text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-1 font-label">
                    PNS / TNI
                  </span>
                  <span className="font-black text-lg">8</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Tenaga Kerja & Inklusivitas */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              accessible_forward
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Inklusivitas & Tenaga Kerja
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="space-y-6">
              <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/20 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    psychology
                  </span>
                </div>
                <div>
                  <h3 className="text-On-surface font-bold text-xl font-headline">
                    Usia Produktif Bekerja
                  </h3>
                  <p className="text-3xl font-black text-primary mt-1">
                    2.554{" "}
                    <span className="text-sm font-normal text-on-surface-variant">
                      Jiwa (18-56 th)
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/20 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-3xl">
                    elderly
                  </span>
                </div>
                <div>
                  <h3 className="text-On-surface font-bold text-xl font-headline">
                    Warga Lanjut Usia (Lansia)
                  </h3>
                  <p className="text-3xl font-black text-tertiary mt-1">
                    734{" "}
                    <span className="text-sm font-normal text-on-surface-variant">
                      Jiwa ({">"}56 th)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary-container text-on-secondary-container p-6 md:p-8 rounded-3xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold font-headline mb-2">
                    Sahabat Disabilitas
                  </h3>
                  <p className="text-sm opacity-80">
                    Dari total 27 Warga Berkebutuhan Khusus (19 Laki-laki, 8
                    Perempuan)
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-on-secondary-container/5 px-4 py-3 rounded-xl border border-on-secondary-container/10">
                  <span className="block text-xs uppercase font-bold tracking-widest mb-1 font-label opacity-80">
                    Tuna Rungu
                  </span>
                  <span className="font-black text-2xl">5</span>
                </div>
                <div className="bg-on-secondary-container/5 px-4 py-3 rounded-xl border border-on-secondary-container/10">
                  <span className="block text-xs uppercase font-bold tracking-widest mb-1 font-label opacity-80">
                    Tuna Wicara
                  </span>
                  <span className="font-black text-2xl">4</span>
                </div>
                <div className="bg-on-secondary-container/5 px-4 py-3 rounded-xl border border-on-secondary-container/10">
                  <span className="block text-xs uppercase font-bold tracking-widest mb-1 font-label opacity-80">
                    Tuna Daksa
                  </span>
                  <span className="font-black text-2xl">4</span>
                </div>
                <div className="bg-on-secondary-container/5 px-4 py-3 rounded-xl border border-on-secondary-container/10">
                  <span className="block text-xs uppercase font-bold tracking-widest mb-1 font-label opacity-80">
                    Lainnya
                  </span>
                  <span className="font-black text-2xl">6</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
