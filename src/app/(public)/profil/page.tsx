import { getPerangkat, getIdentitas } from "@/lib/sheets";
import heroImg from "@/assets/images/hero.jpg";
import ProfilAccordion from "./ProfilAccordion";

export const metadata = {
  title: "Profil Desa",
};

export default async function ProfilPage() {
  const [perangkatData, identitasData] = await Promise.all([
    getPerangkat(),
    getIdentitas(),
  ]);

  const namaDesa = identitasData.namaDesa || "Desa Kita";

  // Parse organization structure dynamically
  const kades = perangkatData.find(
    (p) =>
      p.jabatan.toLowerCase().includes("kepala") ||
      p.jabatan.toLowerCase().includes("kades"),
  );

  const sekdes = perangkatData.find(
    (p) =>
      p.jabatan.toLowerCase().includes("sekretaris") ||
      p.jabatan.toLowerCase().includes("sekdes"),
  );

  const bendahara = perangkatData.find((p) =>
    p.jabatan.toLowerCase().includes("bendahara"),
  );

  // Ambil sisa perangkat (anggota lain) di luar Kades, Sekdes, Bendahara
  const matchedNames = [kades?.nama, sekdes?.nama, bendahara?.nama].filter(
    Boolean,
  );
  const kaurList = perangkatData.filter((p) => !matchedNames.includes(p.nama));

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-8 mb-16 md:mb-24">
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

      {/* 5 Pilar Data & Potensi Desa */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 border-b border-outline-variant/20">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block font-label">
            Data & Potensi
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4 font-headline tracking-tight">
            Kondisi & Profil Desa
          </h2>
          <div className="w-20 md:w-24 h-1 bg-tertiary mx-auto rounded-full mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto md:text-lg">
            Infrastruktur dan bentang alam strategis mendorong laju pertumbuhan
            yang menjanjikan bagi seluruh warga Wringinanom.
          </p>
        </div>

        <ProfilAccordion />
      </section>

      {/* Vision & Mission (Visi & Misi) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Vision */}
          <div className="bg-primary p-8 md:p-12 rounded-[2rem] text-on-primary shadow-xl flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <span
                className="material-symbols-outlined text-[80px] md:text-[120px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                visibility
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-headline">
                Visi
              </h3>
              <p className="text-xl md:text-2xl font-light leading-relaxed">
                &quot;Terwujudnya Desa Wringinanom yang Maju, Mandiri,
                Sejahtera, Berbasis Pertanian Unggulan dan Gotong Royong yang
                Kuat Menuju Masyarakat yang Adil dan Berkelanjutan.&quot;
              </p>
            </div>
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary-container/30 relative z-10">
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase opacity-60 font-label">
                Peta Jalan 2025-2030
              </span>
            </div>
          </div>
          {/* Mission */}
          <div className="bg-surface-container-high p-8 md:p-12 rounded-[2rem] shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 font-headline">
              Misi
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <p className="text-on-surface-variant font-medium">
                  Mengembangkan pertanian modern dan berkelanjutan
                </p>
              </li>
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <p className="text-on-surface-variant font-medium">
                  Memberdayakan ekonomi kerakyatan
                </p>
              </li>
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <p className="text-on-surface-variant font-medium">
                  Meningkatkan kualitas hidup masyarakat
                </p>
              </li>
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <p className="text-on-surface-variant font-medium">
                  Membangun infrastruktur yang memadai
                </p>
              </li>
              <li className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  5
                </div>
                <p className="text-on-surface-variant font-medium">
                  Mewujudkan pemerintahan desa yang transparan dan melayani
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Organizational Structure (Struktur Organisasi) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 md:pb-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 font-headline">
            Struktur Organisasi
          </h2>
          <div className="w-20 md:w-24 h-1 bg-tertiary mx-auto rounded-full"></div>
          <p className="mt-4 md:mt-6 text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
            Para pelayan masyarakat yang berdedikasi untuk mewujudkan kemajuan{" "}
            {namaDesa}.
          </p>
        </div>
        <div className="space-y-10 md:space-y-14">
          {/* Leader */}
          {kades && (
            <div className="flex justify-center">
              <div className="bg-surface-container-lowest p-4 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-shadow w-full max-w-[260px] sm:max-w-[280px] text-center border border-outline-variant/20">
                <div className="mx-auto w-full max-w-[210px] sm:max-w-[220px] aspect-[3/4] rounded-xl overflow-hidden mb-5 bg-surface-container">
                  <img
                    className="w-full h-full object-cover object-top"
                    alt={kades.jabatan}
                    src={kades.fotoUrl || "https://placeholder.co/400"}
                  />
                </div>
                <h4 className="text-xl font-bold text-primary font-headline">
                  {kades.nama}
                </h4>
                <p className="text-tertiary font-semibold text-sm uppercase tracking-wider mt-1">
                  {kades.jabatan}
                </p>
              </div>
            </div>
          )}
          {/* Secondary Level */}
          {(sekdes || bendahara) && (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
              {sekdes && (
                <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-[1.25rem] md:rounded-[1.5rem] shadow-sm flex flex-col text-center border border-outline-variant/20 hover:shadow-xl transition-shadow min-w-0">
                  <div className="mx-auto w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px] aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0 mb-3 md:mb-4 bg-surface-container">
                    <img
                      className="w-full h-full object-cover object-top"
                      alt={sekdes.jabatan}
                      src={
                        sekdes.fotoUrl ||
                        "https://placehold.co/400x533/064e3b/ffffff?text=Foto"
                      }
                    />
                  </div>
                  <div className="mb-1 md:mb-2 flex-grow flex flex-col justify-end">
                    <h4 className="text-sm md:text-lg font-bold text-on-surface font-headline leading-tight">
                      {sekdes.nama}
                    </h4>
                    <p className="text-emerald-700 text-[9px] md:text-xs font-bold uppercase mt-1">
                      {sekdes.jabatan}
                    </p>
                  </div>
                </div>
              )}
              {bendahara && (
                <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-[1.25rem] md:rounded-[1.5rem] shadow-sm flex flex-col text-center border border-outline-variant/20 hover:shadow-xl transition-shadow min-w-0">
                  <div className="mx-auto w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px] aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0 mb-3 md:mb-4 bg-surface-container">
                    <img
                      className="w-full h-full object-cover object-top"
                      alt={bendahara.jabatan}
                      src={
                        bendahara.fotoUrl ||
                        "https://placehold.co/400x533/064e3b/ffffff?text=Foto"
                      }
                    />
                  </div>
                  <div className="mb-1 md:mb-2 flex-grow flex flex-col justify-end">
                    <h4 className="text-sm md:text-lg font-bold text-on-surface font-headline leading-tight">
                      {bendahara.nama}
                    </h4>
                    <p className="text-emerald-700 text-[9px] md:text-xs font-bold uppercase mt-1">
                      {bendahara.jabatan}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Departments (Staff Lainnya) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-8">
            {kaurList.map((kaur, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-3 sm:p-4 rounded-[1.25rem] md:rounded-[1.5rem] shadow-sm flex flex-col text-center border border-outline-variant/20 hover:shadow-xl transition-shadow min-w-0"
              >
                <div className="mx-auto w-full max-w-[145px] sm:max-w-[165px] md:max-w-[180px] aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0 mb-3 md:mb-4 bg-surface-container">
                  <img
                    className="w-full h-full object-cover object-top"
                    alt={kaur.jabatan}
                    src={
                      kaur.fotoUrl ||
                      "https://placehold.co/400x533/064e3b/ffffff?text=Foto"
                    }
                  />
                </div>
                <div className="mb-1 md:mb-2 flex-grow flex flex-col justify-end">
                  <h4 className="text-sm md:text-lg font-bold text-on-surface font-headline leading-tight">
                    {kaur.nama}
                  </h4>
                  <p className="text-emerald-700 text-[9px] md:text-xs font-bold uppercase mt-1">
                    {kaur.jabatan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
