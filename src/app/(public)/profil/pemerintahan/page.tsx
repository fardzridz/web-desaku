import React from "react";
import { Metadata } from "next";
import { getPerangkat, getIdentitas } from "@/lib/db";

export const metadata: Metadata = {
  title: "Pemerintahan Desa - Desa Wringinanom",
  description:
    "Struktur organisasi, aparatur, BPD, dan kelembagaan pendukung Desa Wringinanom.",
};

export default async function PemerintahanPage() {
  const [perangkatData, identitasData] = await Promise.all([
    getPerangkat(),
    getIdentitas(),
  ]);

  // Tentukan Kades untuk ditempatkan di section sambutan jika ada
  const kadesData = perangkatData.find((p) =>
    p.jabatan.toLowerCase().includes("kepala desa"),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-16 pb-20 md:pb-32 relative">
      {/* Page Header */}
      <header className="mb-10 md:mb-12 text-center max-w-4xl mx-auto pt-4">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 font-label">
          Aparatur & Tata Praja
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight font-headline mb-4 md:mb-6">
          Pemerintahan <span className="text-on-surface">Desa.</span>
        </h1>
        <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
          Mengenal lebih dekat struktur kepemimpinan, jajaran perangkat desa,
          serta lembaga-lembaga yang bersinergi mewujudkan tata kelola
          Wringinanom yang berintegritas.
        </p>
      </header>

      {/* Anchor Navigation */}
      <div className="sticky top-[72px] z-40 bg-stone-50/90 backdrop-blur border-y border-outline-variant/20 -mx-4 px-4 md:-mx-8 md:px-8 py-3 mb-12 md:mb-20 overflow-x-auto">
        <div className="flex items-center gap-2 md:gap-4 md:justify-center min-w-max">
          <a
            href="#sambutan"
            className="px-4 py-2 bg-surface-container hover:bg-primary/10 text-on-surface text-sm font-bold rounded-full transition-colors border border-outline-variant/30 font-label"
          >
            Sambutan
          </a>
          <a
            href="#sotk"
            className="px-4 py-2 bg-surface-container hover:bg-primary/10 text-on-surface text-sm font-bold rounded-full transition-colors border border-outline-variant/30 font-label"
          >
            Struktur Organisasi
          </a>
          <a
            href="#perangkat"
            className="px-4 py-2 bg-surface-container hover:bg-primary/10 text-on-surface text-sm font-bold rounded-full transition-colors border border-outline-variant/30 font-label"
          >
            Perangkat Desa
          </a>
          <a
            href="#bpd"
            className="px-4 py-2 bg-surface-container hover:bg-primary/10 text-on-surface text-sm font-bold rounded-full transition-colors border border-outline-variant/30 font-label"
          >
            BPD
          </a>
          <a
            href="#lembaga"
            className="px-4 py-2 bg-surface-container hover:bg-primary/10 text-on-surface text-sm font-bold rounded-full transition-colors border border-outline-variant/30 font-label"
          >
            Lembaga Desa
          </a>
        </div>
      </div>

      <div className="space-y-16 md:space-y-32">
        {/* Section 1: Sambutan & Gambaran Umum */}
        <section id="sambutan" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              record_voice_over
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Sambutan Pemerintahan
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-5 relative">
              <div className="bg-stone-800 rounded-3xl overflow-hidden aspect-[3/4] shadow-xl relative group">
                <img
                  src={
                    kadesData?.fotoUrl ||
                    "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80&w=600"
                  }
                  alt="Kades Wringinanom"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 bg-emerald-950"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8">
                  <h3 className="text-white text-xl md:text-2xl font-bold font-headline leading-tight">
                    {kadesData?.nama || "Saiful Rizal Habibi"}
                  </h3>
                  <p className="text-white/80 text-sm font-bold tracking-widest mt-1 font-label uppercase">
                    {kadesData?.jabatan || "Kepala Desa"}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
              <div className="bg-primary-container text-on-primary-container p-8 md:p-10 rounded-3xl relative">
                <span className="material-symbols-outlined absolute top-4 left-6 text-6xl opacity-10 transform -scale-x-100">
                  format_quote
                </span>
                <p className="text-lg md:text-xl leading-relaxed italic relative z-10 font-serif">
                  &quot;
                  {identitasData.sambutanKades ||
                    "Assalamu’alaikum Warahmatullahi Wabarakatuh. Salam sejahtera bagi kita semua. Selamat datang di portal resmi Pemerintahan Desa Wringinanom. Kami selaku aparatur desa berkomitmen penuh untuk melayani masyarakat dengan transparan, cepat, dan inovatif demi mewujudkan Wringinanom yang maju dan mandiri. Mari bersama-sama bersinergi membangun desa kita tercinta."}
                  &quot;
                </p>
              </div>

              <div className="bg-surface-container p-6 md:p-8 rounded-3xl border-l-8 border-primary flex flex-col justify-center">
                <h4 className="font-bold font-headline text-lg mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    groups
                  </span>
                  Gambaran Umum Aparatur
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Pemerintahan Desa Wringinanom didukung oleh aparatur
                  pemerintahan tangguh yang tersebar di dalam unit kerja
                  perangkat desa. Secara wilayah administratif, pelayanan
                  masyarakat didukung penuh oleh wilayah Kepala Dusun yang
                  semuanya berstatus aktif menjaga kondusivitas warga.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Struktur Organisasi (SOTK) */}
        <section id="sotk" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-tertiary">
              account_tree
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Struktur Organisasi (SOTK)
            </h2>
          </div>

          <div className="bg-surface-container-low p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-outline-variant/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <span
                className="material-symbols-outlined text-[200px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_tree
              </span>
            </div>

            <p className="text-on-surface-variant max-w-2xl text-lg mb-10 relative z-10">
              Alur kepemimpinan yang ditata untuk memastikan percepatan
              pelayanan publik serta pemerataan fungsi pemerintahan:
            </p>

            <div className="flex flex-col items-center space-y-6 relative z-10">
              {/* Kepala Desa */}
              <div className="bg-primary text-white border-2 border-primary-container shadow-lg px-8 py-4 rounded-xl text-center w-full max-w-sm">
                <span className="block text-xs uppercase tracking-widest font-bold opacity-80 mb-1">
                  Pemegang Kekuasaan Tertinggi
                </span>
                <span className="text-xl font-bold font-headline">
                  Kepala Desa
                </span>
              </div>

              {/* Garis Panah */}
              <div className="h-8 w-1 bg-outline-variant/50"></div>

              {/* Sekdes */}
              <div className="bg-tertiary text-on-tertiary border-2 border-tertiary-container shadow-md px-8 py-4 rounded-xl text-center w-full max-w-sm">
                <span className="block text-xs uppercase tracking-widest font-bold opacity-80 mb-1">
                  Koordinator Kesekretariatan
                </span>
                <span className="text-lg font-bold font-headline">
                  Sekretaris Desa
                </span>
              </div>

              <div className="h-8 w-1 bg-outline-variant/50 relative">
                {/* Garis Horizontal Cabang */}
                <div className="absolute top-1/2 left-1/2 -mt-[2px] w-[280px] md:w-[600px] lg:w-[800px] h-1 bg-outline-variant/50 transform -translate-x-1/2"></div>
              </div>

              {/* Cabang-cabang (Kaur) */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                {/* Line down for each */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-1 bg-outline-variant/50"></div>
                  <div className="bg-surface-container-high border border-outline-variant/50 px-4 py-4 rounded-xl text-center h-full w-full">
                    <span className="block text-[10px] uppercase font-bold text-on-surface-variant font-label mb-2">
                      Bidang Administrasi
                    </span>
                    <span className="text-sm font-bold font-headline text-on-surface leading-tight">
                      Kaur Umum
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-1 bg-outline-variant/50"></div>
                  <div className="bg-surface-container-high border border-outline-variant/50 px-4 py-4 rounded-xl text-center h-full w-full">
                    <span className="block text-[10px] uppercase font-bold text-on-surface-variant font-label mb-2">
                      Bidang Keuangan
                    </span>
                    <span className="text-sm font-bold font-headline text-on-surface leading-tight">
                      Kaur Keuangan
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center col-span-2 md:col-span-1">
                  <div className="h-6 w-1 bg-outline-variant/50 hidden md:block"></div>
                  <div className="bg-surface-container-high border border-outline-variant/50 px-4 py-4 rounded-xl text-center h-full w-full md:mt-0 mt-[24px] relative">
                    <div className="absolute -top-[24px] left-1/2 w-1 h-6 bg-outline-variant/50 md:hidden transform -translate-x-1/2"></div>
                    <span className="block text-[10px] uppercase font-bold text-on-surface-variant font-label mb-2">
                      Bidang Hukum & Tata
                    </span>
                    <span className="text-sm font-bold font-headline text-on-surface leading-tight">
                      Kaur Pemerintahan
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-1 bg-outline-variant/50 hidden md:block"></div>
                  <div className="bg-surface-container-high border border-outline-variant/50 px-4 py-4 rounded-xl text-center h-full w-full md:mt-0 mt-[24px] relative">
                    <div className="absolute -top-[24px] left-1/2 w-1 h-6 bg-outline-variant/50 md:hidden transform -translate-x-1/2"></div>
                    <span className="block text-[10px] uppercase font-bold text-on-surface-variant font-label mb-2">
                      Bidang Sosial
                    </span>
                    <span className="text-sm font-bold font-headline text-on-surface leading-tight">
                      Kaur Kesra
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-6 w-1 bg-outline-variant/50 hidden md:block"></div>
                  <div className="bg-surface-container-high border border-outline-variant/50 px-4 py-4 rounded-xl text-center h-full w-full md:mt-0 mt-[24px] relative">
                    <div className="absolute -top-[24px] left-1/2 w-1 h-6 bg-outline-variant/50 md:hidden transform -translate-x-1/2"></div>
                    <span className="block text-[10px] uppercase font-bold text-on-surface-variant font-label mb-2">
                      Bidang Eksekusi
                    </span>
                    <span className="text-sm font-bold font-headline text-on-surface leading-tight">
                      Kaur Perencanaan
                    </span>
                  </div>
                </div>
              </div>

              {/* Bawah */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mt-12 pt-12 border-t-2 border-outline-variant/30 border-dashed">
                <div className="bg-blue-50 text-blue-900 border border-blue-200 px-6 py-4 rounded-xl text-center">
                  <span className="block text-xs uppercase tracking-widest font-bold opacity-60 mb-1">
                    Membantu Operasional Harian
                  </span>
                  <span className="text-lg font-bold font-headline flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">
                      support_agent
                    </span>{" "}
                    Staf Teknis
                  </span>
                </div>
                <div className="bg-orange-50 text-orange-900 border border-orange-200 px-6 py-4 rounded-xl text-center">
                  <span className="block text-xs uppercase tracking-widest font-bold opacity-60 mb-1">
                    Pemimpin Wilayah Bawah
                  </span>
                  <span className="text-lg font-bold font-headline flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">
                      location_city
                    </span>{" "}
                    Kepala Dusun Wilayah
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Perangkat Desa */}
        <section id="perangkat" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              badge
            </span>
            <div className="flex-grow">
              <h2 className="text-2xl md:text-3xl font-bold font-headline">
                Aparatur Pemerintahan
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Susunan petugas yang mendedikasikan diri melayani masyarakat
                Wringinanom.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {perangkatData.length > 0 ? (
              perangkatData.map((pegawai, index) => {
                const isKades = pegawai.jabatan
                  .toLowerCase()
                  .includes("kepala desa");
                return (
                  <div
                    key={index}
                    className="bg-surface-container rounded-[1.25rem] md:rounded-2xl overflow-hidden hover:shadow-lg transition-all group border border-outline-variant/20 min-w-0"
                  >
                    <div className="w-full bg-stone-200 relative overflow-hidden flex items-center justify-center p-3 sm:p-4">
                      <div className="w-full max-w-[145px] sm:max-w-[165px] md:max-w-[180px] aspect-[3/4] rounded-xl overflow-hidden bg-stone-300">
                      <img
                        src={pegawai.fotoUrl}
                        alt={pegawai.nama}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                      />
                      </div>
                      {isKades && (
                        <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                          PIMPINAN
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-5 text-center bg-surface w-full z-10 relative">
                      <h3 className="font-bold text-on-surface font-headline leading-tight mb-1 text-sm md:text-base">
                        {pegawai.nama}
                      </h3>
                      <p className="text-[10px] md:text-xs font-bold text-primary tracking-wider uppercase leading-tight">
                        {pegawai.jabatan}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-on-surface-variant bg-surface-container-low rounded-xl">
                Belum ada data perangkat desa di Spreadsheet.
              </div>
            )}
          </div>
        </section>

        {/* Section 4: BPD */}
        <section
          id="bpd"
          className="scroll-mt-32 bg-primary-container p-6 md:p-12 rounded-[2rem] md:rounded-[3rem]"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-on-primary-container mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl">
                  assured_workload
                </span>
                BPD Wringinanom
              </h2>
              <p className="text-on-primary-container/80 text-lg leading-relaxed mb-6">
                Badan Permusyawaratan Desa (BPD) melaksanakan fungsi pengawasan
                dan permusyawaratan pemerintahan berdasarkan keterwakilan
                wilayah dusun. Di Wringinanom, BPD diperkuat oleh{" "}
                <strong>9 Anggota Aktif</strong>.
              </p>
              <div className="bg-white/20 p-6 rounded-2xl border border-white/30 backdrop-blur-sm">
                <h4 className="font-bold uppercase tracking-widest text-xs opacity-70 mb-4">
                  Pengurus Inti
                </h4>
                <ul className="space-y-3 font-medium text-lg">
                  <li className="flex justify-between border-b border-white/20 pb-2">
                    <span>Ketua</span>{" "}
                    <strong className="font-headline">(Nama Ketua)</strong>
                  </li>
                  <li className="flex justify-between border-b border-white/20 pb-2">
                    <span>Wakil Ketua</span>{" "}
                    <strong className="font-headline">(Nama Wakil)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Sekretaris</span>{" "}
                    <strong className="font-headline">(Nama Sek)</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <div className="bg-white p-5 rounded-2xl shadow-sm h-full rounded-tr-[3rem]">
                <h4 className="font-bold uppercase tracking-widest text-[10px] text-primary mb-3">
                  Daftar Anggota
                </h4>
                <ul className="space-y-4">
                  {["Ahmad Fauzi", "Suyono", "Buhawi"].map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-3 text-on-surface font-bold text-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm">
                          person
                        </span>
                      </div>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm h-full rounded-bl-[3rem]">
                <h4 className="font-bold uppercase tracking-widest text-[10px] text-primary mb-3 text-transparent selection:text-transparent">
                  Lanjutan
                </h4>
                <ul className="space-y-4 mt-[3px]">
                  {["Abdul Hamid", "Moh. Agus", "Muhammad Taif"].map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-3 text-on-surface font-bold text-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm">
                          person
                        </span>
                      </div>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Kelembagaan Desa */}
        <section id="lembaga" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              diversity_1
            </span>
            <div className="flex-grow">
              <h2 className="text-2xl md:text-3xl font-bold font-headline">
                Kelembagaan Masyarakat
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Pilar-pilar penggerak pemberdayaan warga, kemandirian desa, dan
                gotong royong terpadu.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-surface-container hover:bg-surface-container-high transition-colors p-6 md:p-8 rounded-[2rem] border border-outline-variant/20 flex flex-col h-full group">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  storefront
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-3 text-on-surface">
                BUMDes
              </h3>
              <p className="text-on-surface-variant text-sm flex-grow leading-relaxed">
                Unit Usaha Milik Desa beranggotakan <strong>7 Pengurus</strong>{" "}
                di Dusun Kulak Utara RT.03 RW.01. Bergerak aktif mencetak profit
                bagi desa dari sektor Pertanian dan Peternakan warga.
              </p>
            </div>

            <div className="bg-surface-container hover:bg-surface-container-high transition-colors p-6 md:p-8 rounded-[2rem] border border-outline-variant/20 flex flex-col h-full group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  handshake
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-3 text-on-surface">
                LPM (Lembaga Pemberdayaan)
              </h3>
              <p className="text-on-surface-variant text-sm flex-grow leading-relaxed">
                Mitra solid pemerintah desa dalam menyerap dan membumikan
                aspirasi pembangunan fisik maupun sosio-kultural masyarakat
                Wringinanom dari bawah ke atas.
              </p>
            </div>

            <div className="bg-surface-container hover:bg-surface-container-high transition-colors p-6 md:p-8 rounded-[2rem] border border-outline-variant/20 flex flex-col h-full group">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  family_restroom
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-3 text-on-surface">
                PKK Pusat & Ranting
              </h3>
              <p className="text-on-surface-variant text-sm flex-grow leading-relaxed">
                Dinahkodai kaum puan yang tangguh, PKK Desa Wringinanom tercatat
                menjalankan <strong>9 jenis program terpadu</strong> demi
                menekan stunting dan meningkatkan kesejahteraan keluarga.
              </p>
            </div>

            <div className="bg-surface-container hover:bg-surface-container-high transition-colors p-6 md:p-8 rounded-[2rem] border border-outline-variant/20 flex flex-col h-full group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sports_martial_arts
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-3 text-on-surface">
                Karang Taruna
              </h3>
              <p className="text-on-surface-variant text-sm flex-grow leading-relaxed">
                Wadah penyalur agresivitas dan bakat kepemudaan dengan{" "}
                <strong>5 pilar kegiatan kepemudaan</strong> yang menjauhkan
                generasi muda penerus bangsa dari aktivitas negatif.
              </p>
            </div>

            <div className="bg-surface-container hover:bg-surface-container-high transition-colors p-6 md:p-8 rounded-[2rem] border border-outline-variant/20 flex flex-col h-full group lg:col-span-2">
              <div className="w-14 h-14 rounded-2xl bg-stone-200 flex items-center justify-center text-stone-700 mb-6 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_police
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-3 text-on-surface flex items-center gap-2">
                Hansip & Satgas Linmas
              </h3>
              <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <p className="text-on-surface-variant text-sm leading-relaxed sm:w-1/2">
                  Garda keamanan sosial yang digerakkan oleh dedikasi tanpa
                  pamrih para warga menjaga stabilitas kamtibmas lingkungan di
                  setiap pelosok sudut jalanan.
                </p>
                <div className="sm:w-1/2 flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-outline-variant/30 pt-4 sm:pt-0 sm:pl-6">
                  <div className="text-center">
                    <span className="block font-black text-2xl text-stone-700">
                      25
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                      Personel Hansip
                    </span>
                  </div>
                  <div className="text-center border-l-2 border-outline-variant/30 pl-4">
                    <span className="block font-black text-2xl text-stone-700">
                      5
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                      Satgas Linmas
                    </span>
                  </div>
                  <div className="text-center border-l-2 border-outline-variant/30 pl-4">
                    <span className="block font-black text-2xl text-stone-700">
                      10
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                      Titik Pos Kamling
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 md:p-8 rounded-[2rem] border border-primary/20 flex flex-col h-full group lg:col-span-3">
              <h3 className="text-xl font-bold font-headline mb-2 text-primary flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl">
                  maps_home_work
                </span>{" "}
                RT & RW
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Lembaga permusyawaratan akar rumput yang sangat esensial sebagai
                basis fondasi gotong royong dan pusat sirkulasi pelayanan
                administrasi cepat tanggap tahap awal di level lingkungan
                langsung yang dipimpin oleh ketua RT dan ketua RW.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
