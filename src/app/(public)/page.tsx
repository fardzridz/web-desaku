import {
  getBerita,
  getPerangkat,
} from "@/lib/db";
import Link from "next/link";
import heroImg from "@/assets/images/hero.webp";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [beritaData, perangkatData] =
    await Promise.all([
      getBerita(),
      getPerangkat(),
    ]);

  // Ambil 3 berita terbaru untuk layout warta desa
  const latestBerita = beritaData.slice(0, 3);

  // Ambil data identitas
  const kades = perangkatData.find((p) =>
    p.jabatan.toLowerCase().includes("kepala desa"),
  ) || {
    nama: "Bp. Saiful Rizal Habibi",
    jabatan: "Kepala Desa Wringinanom",
    fotoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBJHfGOBtUw_EdYebq9BnpiN79t0JSPCMCVZhiH0N0lPAHWf15wrSXset4YM2dYaJtiVGoxPOyVnC5pOwYnvF4-PPoLMzSJBaFBhLCB2TYmkGXAmYy2GP3ST6fbpZf5x61VE-5hQxj5LrsOd1HCApJoFZAQpr_sBkpi2GJEI6ILL_d2aC_nNoa-ACAqN2ZCZXWKD8eL0vvhrupScDloaJQBj6IcX3-pMdULgWMkj07Fi_4vY_gAKhgPrKTF3OUpqiNzHcBvHSxMDo",
  };

  return (
    <>
      {/* 2. Hero Section */}
      <section className="relative min-h-[calc(100svh-80px)] flex flex-col justify-center overflow-hidden md:py-24">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Suasana Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur"
            src={heroImg.src}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-0 flex-grow md:flex-grow-0 flex flex-col justify-center">
          <div className="max-w-3xl relative z-20 pt-8 pb-8 md:py-0">
            <span className="inline-block px-3 md:px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md text-primary-fixed text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 border border-primary/30">
              Desa Wringinanom — Tongas, Probolinggo
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 font-headline drop-shadow-lg md:whitespace-nowrap">
              Desa Wringinanom,{" "}
              <span className="text-primary-fixed italic">Tongas</span>{" "}
              <br />
              Probolinggo.
            </h1>
            <p className="text-base md:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl font-light drop-shadow-md">
              &quot;Selamat datang di Portal Resmi Pemerintahan Desa
              Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur.
              Kami berkomitmen melayani dengan transparan, cepat, dan inovatif
              demi Wringinanom yang maju dan mandiri.&quot;
              <br />
              <span className="block mt-3 text-sm md:text-base font-bold text-white">
                — {kades.nama}, Kepala Desa
              </span>
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-30">
              <Link
                href="/layanan"
                className="w-full sm:w-auto text-center bg-primary text-on-primary px-8 py-4 md:py-5 rounded-2xl font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-xl text-lg flex items-center justify-center gap-3 font-headline"
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  description
                </span>
                Persyaratan Layanan Surat
              </Link>
              <Link
                href="/profil"
                className="w-full sm:w-auto text-center bg-white/10 backdrop-blur-md text-white px-8 py-4 md:py-5 rounded-2xl font-bold hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-95 border border-white/20 text-lg flex items-center justify-center gap-3 font-headline"
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  info
                </span>
                Pelajari Profil Desa
              </Link>
            </div>
          </div>
        </div>

        {/* Foto Kades & Ibu Kades */}
        <div className="relative md:absolute md:bottom-0 md:bg-transparent md:right-0 xl:right-16 z-0 md:z-10 w-full flex justify-center md:justify-end mt-auto pointer-events-none self-center md:self-end overflow-hidden md:overflow-visible">
          <img
            src="/images/kepala-desa-ibu-kades.webp"
            alt="Kepala Desa dan Ibu Kades Desa Wringinanom, Tongas, Probolinggo"
            width={966}
            height={1092}
            className="w-full md:w-auto h-[380px] sm:h-[450px] md:h-[80vh] md:max-h-[850px] object-cover md:object-contain object-top md:object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:mr-16 scale-[1.15] md:scale-100 origin-top md:origin-bottom mt-4 md:mt-0"
          />
        </div>
      </section>

      {/* 3. Section Tentang Desa (Ringkasan Profil) */}
      <section className="py-20 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12 text-center lg:text-left">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block font-label flex items-center justify-center lg:justify-start gap-2">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  landscape
                </span>
                Tentang Kami
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-6 font-headline tracking-tight">
                Kanal Profil & Geografis
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Wringinanom adalah desa yang terletak di Kecamatan Tongas,
                Kabupaten Probolinggo, Jawa Timur dengan ketinggian wilayah
                sekitar 25 meter di atas permukaan laut. Sebagian besar
                penduduknya menggantungkan hidup pada sektor pertanian yang
                subur.
              </p>
              <Link
                href="/profil"
                className="text-primary font-bold flex items-center gap-2 group w-fit mx-auto lg:mx-0 text-lg hover:underline decoration-2 underline-offset-4"
              >
                Jelajahi Data Lengkap Desa
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="lg:w-7/12 w-full grid grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  label: "Total Penduduk",
                  value: 6930,
                  suffix: " Jiwa",
                  icon: "groups",
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  label: "Luas Wilayah",
                  value: 840,
                  suffix: " Ha",
                  icon: "public",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Wilayah Kerja",
                  value: 8,
                  suffix: " Dusun",
                  icon: "map",
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                },
                {
                  label: "Kepala Keluarga",
                  value: 2448,
                  suffix: " KK",
                  icon: "holiday_village",
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container rounded-3xl p-6 sm:p-8 flex flex-col justify-center items-center text-center shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-16 h-16 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}
                  >
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {stat.icon}
                    </span>
                  </div>
                  <p className="font-extrabold font-headline text-3xl sm:text-4xl text-on-surface mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs sm:text-sm text-on-surface-variant font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Potensi & Keunggulan Desa */}
      <section className="py-20 md:py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block font-label">
              Potensi Lokal
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface font-headline tracking-tight mb-6">
              Keunggulan Wringinanom
            </h2>
            <p className="text-lg text-on-surface-variant">
              Dari hamparan sawah hijau hingga UMKM yang menggeliat, ketahui apa
              yang membuat desa kami luar biasa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kartu 1: Pertanian */}
            <div className="group rounded-[2rem] overflow-hidden bg-surface-container border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="/images/pertanian-sawah-wringinanom.webp"
                  alt="Pertanian unggulan Desa Wringinanom, Tongas, Probolinggo"
                  width={375}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <span
                    className="material-symbols-outlined text-emerald-600 text-3xl block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    agriculture
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold font-headline mb-4 text-on-surface group-hover:text-primary transition-colors">
                  Pertanian Unggulan
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Sentra budidaya sawi dan kangkung terkemuka, serta penghasil
                  padi dan jagung dengan hasil panen mencapai 11,5 Ton/Ha.
                </p>
              </div>
            </div>

            {/* Kartu 2: Peternakan */}
            <div className="group rounded-[2rem] overflow-hidden bg-surface-container border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="/images/peternakan-wringinanom.webp"
                  alt="Peternakan berkembang Desa Wringinanom, Tongas, Probolinggo"
                  width={736}
                  height={431}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <span
                    className="material-symbols-outlined text-orange-600 text-3xl block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    pets
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold font-headline mb-4 text-on-surface group-hover:text-primary transition-colors">
                  Peternakan Berkembang
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Potensi peternakan yang besar dengan populasi lebih dari 700
                  ekor sapi, ratusan kambing, dan ribuan unggas lokal.
                </p>
              </div>
            </div>

            {/* Kartu 3: UMKM */}
            <div className="group rounded-[2rem] overflow-hidden bg-surface-container border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden relative">
                <img
                  src="/images/umkm-wringinanom.webp"
                  alt="Geliat UMKM Desa Wringinanom, Tongas, Probolinggo"
                  width={736}
                  height={736}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <span
                    className="material-symbols-outlined text-blue-600 text-3xl block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    storefront
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold font-headline mb-4 text-on-surface group-hover:text-primary transition-colors">
                  Geliat UMKM
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Didukung oleh puluhan pelaku UMKM yang bergerak di sektor
                  perdagangan kelontong, jasa penjahit, pertukangan, hingga
                  reparasi elektronik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Transparansi & Layanan Cepat */}
      <section className="py-20 md:py-24 bg-surface-container-high">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold font-headline mb-4 text-on-surface">
              Akses Layanan Cepat
            </h2>
            <p className="text-on-surface-variant text-lg">
              Pemerintahan yang transparan dan adaptif untuk kebutuhan
              masyarakat Wringinanom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/layanan"
              className="bg-surface hover:bg-surface-container border border-outline-variant/30 p-8 rounded-3xl transition-all hover:-translate-y-2 shadow-sm hover:shadow-md group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  description
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-on-surface group-hover:text-primary transition-colors leading-tight">
                Laporan APBDes Tahunan
              </h3>
              <p className="text-on-surface-variant text-sm">
                Akses dokumen anggaran desa secara terbuka.
              </p>
            </Link>

            <Link
              href="/profil"
              className="bg-surface hover:bg-surface-container border border-outline-variant/30 p-8 rounded-3xl transition-all hover:-translate-y-2 shadow-sm hover:shadow-md group"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_tree
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-on-surface group-hover:text-primary transition-colors leading-tight">
                17 Perangkat Pemerintahan
              </h3>
              <p className="text-on-surface-variant text-sm">
                Susunan SOTK pengelola pemerintahan desa.
              </p>
            </Link>

            <Link
              href="/layanan"
              className="bg-primary text-on-primary p-8 rounded-3xl shadow-xl transition-all hover:-translate-y-2 scale-105 sm:scale-100 lg:scale-105 group relative z-10 hover:bg-primary/90"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white backdrop-blur-sm">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  outgoing_mail
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-white leading-tight">
                Persyaratan Layanan Surat
              </h3>
              <p className="text-primary-fixed text-sm">
                Persyaratan untuk mengajukan berbagai jenis surat.
              </p>
            </Link>

            <Link
              href="/kontak"
              className="bg-surface hover:bg-surface-container border border-outline-variant/30 p-8 rounded-3xl transition-all hover:-translate-y-2 shadow-sm hover:shadow-md group"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  support_agent
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-2 text-on-surface group-hover:text-primary transition-colors leading-tight">
                Layanan Aspirasi Warga
              </h3>
              <p className="text-on-surface-variant text-sm">
                Sampaikan kritik, saran, dan pengaduan Anda.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Berita & Pengumuman Terbaru */}
      <section className="py-20 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block font-label">
                Update Desa
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface font-headline tracking-tight">
                Berita & Pengumuman
              </h2>
            </div>
            <Link
              href="/kabar-desa"
              className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 group w-fit"
            >
              Lihat Semua Berita
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBerita.length > 0
              ? latestBerita.map((item) => (
                  <Link
                    href={`/kabar-desa/${item.slug}`}
                    key={item.id}
                    className="group outline-none"
                  >
                    <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/30 h-full flex flex-col hover:shadow-xl transition-all focus:ring-4 focus:ring-primary/20">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={item.fotoUrl}
                          alt={`${item.judul} — Berita Desa Wringinanom, Tongas, Probolinggo`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                          {item.kategori || "Berita"}
                        </div> */}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-sm font-bold text-tertiary mb-3 uppercase tracking-widest flex items-center gap-2">
                          <span className="material-symbols-outlined text-[1rem]">
                            calendar_today
                          </span>
                          {item.tanggal}
                        </span>
                        <h3 className="text-xl font-bold font-headline mb-3 text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {item.judul}
                        </h3>
                        <p className="text-on-surface-variant text-sm line-clamp-3 mb-4">
                          {item.ringkasan}
                        </p>
                        <div className="mt-auto text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Baca Selengkapnya
                          <span className="material-symbols-outlined text-[1rem]">
                            arrow_right_alt
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : // Fallback Berita
                [
                  {
                    judul:
                      "Jadwal Posyandu Balita Bulan Ini di 6 Titik Posyandu Desa",
                    ringkasan:
                      "Pemerintah Desa mengingatkan jadwal posyandu balita akan dilaksanakan serentak bulan ini. Warga diharap hadir membawa buku KIA.",
                    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
                    kategori: "Kesehatan",
                  },
                  {
                    judul:
                      "Penyaluran Bantuan Bibit untuk Kelompok Tani Wringinanom",
                    ringkasan:
                      "Dinas Pertanian bekerjasama dengan BUMDes telah menyalurkan 2000 bibit tanaman hortikultura unggul untuk para kelompok tani kita.",
                    img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800&auto=format&fit=crop",
                    kategori: "Pertanian",
                  },
                  {
                    judul: "Kerja Bakti Rutin di Saluran Irigasi Desa",
                    ringkasan:
                      "Menghadapi musim penghujan, warga desa bergotong-royong membersihkan saluran irigasi utama untuk mencegah banjir bandang.",
                    img: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800&auto=format&fit=crop",
                    kategori: "Lingkungan",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group cursor-pointer outline-none">
                    <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/30 h-full flex flex-col hover:shadow-xl transition-all">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={item.img}
                          alt={`${item.judul} — Berita Desa Wringinanom, Tongas, Probolinggo`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                          {item.kategori}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-sm font-bold text-tertiary mb-3 uppercase tracking-widest flex items-center gap-2">
                          <span className="material-symbols-outlined text-[1rem]">
                            calendar_today
                          </span>
                          Hari Ini
                        </span>
                        <h3 className="text-xl font-bold font-headline mb-3 text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {item.judul}
                        </h3>
                        <p className="text-on-surface-variant text-sm line-clamp-3 mb-4">
                          {item.ringkasan}
                        </p>
                        <div className="mt-auto text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Baca Selengkapnya
                          <span className="material-symbols-outlined text-[1rem]">
                            arrow_right_alt
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* 7. Galeri Foto / Video (Visual Desa)
      <section className="py-20 md:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-3 block font-label flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">perm_media</span>
            Visual Desa
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-6">Galeri Wringinanom</h2>
          <p className="text-stone-300 text-lg mb-12 max-w-2xl mx-auto">Potret kehidupan, infrastruktur, dan keindahan alam di sekitar desa kami.</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              "https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&q=80&w=600", // Masjid
              "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=600", // Sawah
              "https://images.unsplash.com/photo-1518556360408-72b22bb8fae5?auto=format&fit=crop&q=80&w=600", // Aktivitas Warga
              "https://images.unsplash.com/photo-1620959134015-6fcde8cded3e?auto=format&fit=crop&q=80&w=600", // Pertanian
              "https://images.unsplash.com/photo-1588691506443-4dc392de6b56?auto=format&fit=crop&q=80&w=600", // Jalan Desa
              "https://images.unsplash.com/photo-1550993510-18cd7abf23a3?auto=format&fit=crop&q=80&w=600", // Panen
              "https://images.unsplash.com/photo-1579482811697-3f33cc2d1e8c?auto=format&fit=crop&q=80&w=1200", // Balai Desa / Area luas
            ].map((src, idx) => (
              <div key={idx} className={`relative overflow-hidden group rounded-2xl bg-stone-800 ${idx === 6 ? 'col-span-2 lg:col-span-2' : ''}`}>
                <div className="aspect-square w-full">
                  <img src={src} alt={`Galeri Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white backdrop-blur-md">
                    <span className="material-symbols-outlined text-2xl">zoom_in</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-stone-900 px-8 py-4 rounded-xl font-bold font-headline transition-all flex items-center gap-2 mx-auto uppercase tracking-widest text-sm group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">photo_library</span>
            Lihat Galeri Lengkap
          </button>
        </div>
      </section> */}
    </>
  );
}
