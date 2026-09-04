import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImg from "@/assets/images/hero.jpg";
import { getPerangkat, getIdentitas } from "@/lib/db";

export const metadata = {
  title: "Profil Umum - Desa Wringinanom",
};

export default async function TentangDesaPage() {
  const [perangkatata, identitasData] = await Promise.all([
    getPerangkat(),
    getIdentitas(),
  ]);
  const namaDesa = identitasData.namaDesa || "Desa Kita";
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-16 mb-8 md:mb-16">
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImg.src}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 md:via-black/60 md:to-black/20 pointer-events-none"></div>
          <div className="relative z-10 px-6 md:px-20 py-12 max-w-3xl">
            <span className="label-md text-primary-fixed font-bold tracking-widest uppercase text-xs mb-4 block font-label">
              Mengenal Lebih Dekat
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 md:mb-6 leading-[1.1] font-headline">
              Profil {namaDesa}
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
              Sebuah harmoni antara warisan leluhur dan inovasi digital untuk
              kemajuan bersama.
            </p>
          </div>
        </div>
      </section>

      {/* Brief History (Sejarah Singkat) */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative px-4 md:px-0">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-0 md:rotate-2">
              <img
                className="w-full h-full object-cover"
                alt="Traditional Heritage"
                src="https://i.ibb.co.com/wFKWKFsb/1000364727.jpg"
              />
            </div>
            <div className="absolute bottom-4 left-0 md:-bottom-6 md:-left-6 bg-surface-container-lowest p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl max-w-[150px] md:max-w-[200px] -rotate-3 border border-outline-variant/30">
              <p className="text-[10px] md:text-xs font-bold text-tertiary mb-1 font-label">
                DIDIRIKAN
              </p>
              <p className="text-2xl md:text-3xl font-black text-primary font-headline">
                1746
              </p>
            </div>
          </div>
          <div className="md:col-span-7 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-6 md:mb-8 tracking-tight font-headline">
              Sejarah Singkat
            </h2>
            <div className="space-y-4 md:space-y-6 text-on-surface-variant leading-relaxed text-base md:text-lg">
              <p>
                Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo,
                bermula dari pemukiman kecil di wilayah pesisir yang subur. Nama
                desa ini berasal dari “Wringin Anom” atau beringin muda, yang
                konon menjadi saksi awal berdirinya pemukiman para pendahulu
                yang membuka lahan pertanian.
              </p>
              <p>
                Selama bertahun-tahun, desa ini berkembang dari pusat pertanian
                tradisional menjadi sentra budidaya sayuran seperti sawi dan
                kangkung yang dikenal di seantero kecamatan. Meski zaman terus
                berubah, semangat gotong royong dan kebersamaan warga tetap
                menjadi kekuatan utama Desa Wringinanom dalam menghadapi
                berbagai tantangan dan mewujudkan pembangunan yang
                berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-8 md:py-12 min-h-[calc(50vh-100px)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                label: "Luas Wilayah",
                value: 840,
                suffix: " Ha",
                icon: "public",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                label: "Jumlah Penduduk",
                value: 6930,
                suffix: " Jiwa",
                icon: "groups",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Jumlah KK",
                value: 2448,
                suffix: " KK",
                icon: "holiday_village",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                label: "Wilayah",
                value: 8,
                suffix: " Dusun",
                icon: "map",
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-surface-container rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-sm border border-outline-variant/30 transition-transform hover:scale-105"
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
                <p className="font-extrabold font-headline text-3xl md:text-4xl text-on-surface mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs md:text-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/profil/sejarah"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-md flex items-center justify-center gap-2"
            >
              Baca Sejarah Desa
              <span className="material-symbols-outlined text-xl">history</span>
            </Link>
            <Link
              href="/profil/geografis"
              className="bg-surface-container-high text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all border border-outline-variant/30 hover:-translate-y-1 shadow-sm flex items-center justify-center gap-2"
            >
              Lihat Peta Geografis
              <span className="material-symbols-outlined text-xl">map</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
