import React from "react";
import { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Sejarah Desa - Desa Wringinanom",
  description:
    "Menelusuri jejak asal-usul dan sejarah kepemimpinan Desa Wringinanom dari masa ke masa.",
  alternates: { canonical: "/profil/sejarah" },
};

export default function SejarahDesaPage() {
  const kadesHistory = [
    {
      no: 1,
      nama: "Bapak Soerjo",
      masa: "1945 - 1960",
      periode: "Masa Kemerdekaan & Konsolidasi Desa",
    },
    {
      no: 2,
      nama: "Bapak H. Abdullah",
      masa: "1960 - 1975",
      periode: "Pembangunan Saluran Irigasi Pertama",
    },
    {
      no: 3,
      nama: "Bapak Suparman",
      masa: "1975 - 1990",
      periode: "Perluasan Sektor Pertanian",
    },
    {
      no: 4,
      nama: "Bapak H. M. Yasin",
      masa: "1990 - 2005",
      periode: "Modernisasi Pedesaan",
    },
    {
      no: 5,
      nama: "Bapak Ahmad Fauzi",
      masa: "2005 - 2018",
      periode: "Penguatan Ekonomi BUMDes",
    },
    {
      no: 6,
      nama: "Bapak Saiful Rizal Habibi",
      masa: "2018 - Sekarang",
      periode: "Era Digitalisasi & Desa Mandiri",
      aktif: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-16 pb-20 md:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Beranda", url: "/" }, { name: "Profil", url: "/profil" }, { name: "Sejarah Desa" }]} />
      {/* Page Header */}
      <header className="mb-12 md:mb-20 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 font-label">
          Jejak Masa Lalu
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tighter leading-tight font-headline mb-4 md:mb-6">
          Sejarah <span className="text-on-surface">Wringinanom.</span>
        </h1>
        <p className="text-sm md:text-lg text-on-surface-variant leading-relaxed">
          Menapak tilas perjalanan panjang terbentuknya entitas masyarakat,
          hingga mencatat lembaran para pemimpin yang telah mendedikasikan
          dharma baktinya demi kemajuan desa.
        </p>
      </header>

      <div className="space-y-12 md:space-y-24">
        {/* Section 1: Asal-Usul */}
        <section>
          <div className="flex items-center gap-4 mb-6 md:mb-12">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              auto_stories
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Babad Asal-Usul Desa
            </h2>
          </div>

          <div className=" gap-8 md:gap-12 items-start">
            <div className="bg-surface-container-low p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-outline-variant/30 leading-relaxed text-on-surface-variant md:text-lg space-y-6">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:font-headline">
                Desa Wringinanom memiliki sebuah legenda yang hingga kini masih
                dipercaya dan diceritakan secara turun-temurun oleh masyarakat
                setempat. Menurut cerita para orang tua terdahulu, pada zaman
                dulu di daerah yang sekarang bernama Desa Wringinanom terdapat
                sebuah pohon beringin yang sangat besar, rindang, dan angker.
                Pohon beringin ini dipercaya dijaga oleh makhluk halus yang suka
                mengganggu orang-orang di sekitarnya.
              </p>
              <p>
                Karena sering mengganggu warga, masyarakat merasa khawatir dan
                tidak aman. Oleh karena itu, mereka meminta bantuan kepada Eyang
                Simah untuk menebang pohon beringin tersebut. Penebangan pohon
                beringin oleh Eyang Simah dilakukan dengan cara yang sangat unik
                dan tidak biasa. Beliau tidak menggunakan kapak atau gergaji
                seperti orang kebanyakan. Setiap malam Jumat, Eyang Simah hanya
                memotong sedikit demi sedikit bagian pohon tersebut. Proses ini
                hanya bisa dilakukan oleh Eyang Simah, karena orang biasa tidak
                akan mampu melakukannya.
              </p>
              <p>
                Akhirnya, pohon beringin yang masih sangat muda itu tumbang.
                Saat ditebang, pohon tersebut mengeluarkan cairan seperti darah,
                mirip darah manusia (disebut darah Marusia). Setelah pohon
                tumbang, daerah sekitar pohon beringin muda tersebut kemudian
                dinamakan Desa Wringin (Beringin) Anom (Muda), yang sekarang
                dikenal sebagai Desa Wringinanom.
              </p>
              <p>
                Asal-usul nama Desa Wringinanom berawal dari sebuah pohon
                beringin muda yang tumbuh di wilayah Sumur Santo pada masa lalu.
                Pohon beringin ini konon sangat rindang dan dianggap angker oleh
                masyarakat sekitar.
              </p>
              <p>
                Menurut cerita yang beredar, pohon beringin tersebut dijaga atau
                dihuni oleh makhluk halus yang kerap mengganggu penduduk yang
                berada di sekitarnya. Karena rasa khawatir akan terus diganggu,
                masyarakat akhirnya meminta Eyang Simah untuk menebang pohon
                tersebut.
                Proses penebangan dilakukan secara perlahan setiap malam Jumat.
                Eyang Simah memotong pohon beringin itu sedikit demi sedikit
                tanpa menggunakan alat-alat biasa. Hanya beliaulah yang mampu
                melakukan cara tersebut.
              </p>
              <p>
                Ketika pohon beringin muda itu akhirnya tumbang, ia mengeluarkan
                cairan kemerahan yang mirip dengan darah manusia. Peristiwa ini
                semakin memperkuat kepercayaan masyarakat terhadap kekuatan
                pohon tersebut.
                Sejak saat itu, daerah di sekitar pohon beringin muda yang telah
                ditebang tersebut diberi nama Desa Wringin Anom (Beringin Muda),
                yang kelak menjadi Desa Wringinanom seperti yang kita kenal
                sekarang.
              </p>
            </div>

            {/* Collage Gallery */}
            {/* <div className="grid grid-cols-2 gap-4 h-full relative">
              <div className="bg-stone-800 rounded-[2rem] overflow-hidden aspect-[4/5] transform translate-y-8 shadow-xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1541819129598-63fbf9186638?auto=format&fit=crop&q=80&w=600&grayscale=true"
                  alt="Sejarah Wringinanom"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 sepia-[.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white font-bold tracking-widest text-xs font-label">
                    BERKAS LAMA
                  </span>
                </div>
              </div>
              <div className="bg-stone-800 rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1550993510-18cd7abf23a3?auto=format&fit=crop&q=80&w=600&grayscale=true"
                  alt="Petani Sejarah"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 sepia-[.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white font-bold tracking-widest text-xs font-label">
                    BABAD TANI
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* Section 2: Sejarah Kepemimpinan */}
        {/* <section>
          <div className="flex items-center gap-4 mb-8 md:mb-16">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">
              account_balance
            </span>
            <div className="mb-0">
              <h2 className="text-2xl md:text-3xl font-bold font-headline">
                Estafet Kepemimpinan
              </h2>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-0">
            <div className="absolute left-[24px] sm:left-1/2 top-4 bottom-0 w-1 bg-outline-variant/30 transform sm:-translate-x-1/2"></div>

            <div className="space-y-8 md:space-y-12">
              {kadesHistory.map((kades, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col sm:flex-row sm:items-center w-full ${isLeft ? "sm:justify-start" : "sm:justify-end"}`}
                  >
                    <div
                      className={`absolute left-[8px] sm:left-1/2 w-8 h-8 rounded-full transform sm:-translate-x-1/2 z-10 flex items-center justify-center border-4 border-surface shadow-sm font-bold font-label text-xs ${kades.aktif ? "bg-primary text-white border-primary-container" : "bg-surface-container-highest text-on-surface"}`}
                    >
                      {kades.aktif ? (
                        <span className="material-symbols-outlined text-[1rem]">
                          star
                        </span>
                      ) : (
                        kades.no
                      )}
                    </div>

                    <div
                      className={`w-full sm:w-1/2 pl-16 sm:pl-0 pt-2 sm:pt-0`}
                    >
                      <div
                        className={`
                        bg-surface-container-low p-6 rounded-3xl border transition-all hover:shadow-lg
                        ${isLeft ? "sm:mr-12 sm:text-right" : "sm:ml-12 text-left"}
                        ${kades.aktif ? "border-primary shadow-md bg-primary/5" : "border-outline-variant/30"}
                      `}
                      >
                        <div
                          className={`flex flex-col ${isLeft ? "sm:items-end" : "items-start"} mb-3`}
                        >
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 ${kades.aktif ? "bg-primary text-white" : "bg-surface-container-highest text-on-surface-variant"}`}
                          >
                            Periode {kades.masa}
                          </span>
                          <h3
                            className={`text-xl md:text-2xl font-bold font-headline ${kades.aktif ? "text-primary" : "text-on-surface"}`}
                          >
                            {kades.nama}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                          <span className="opacity-70">Sumbangsih Utama:</span>
                          <br />
                          {kades.periode}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative h-20 w-full mt-8">
              <div className="absolute left-[24px] sm:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-outline-variant/30 to-transparent transform sm:-translate-x-1/2"></div>
              <div className="absolute left-[16px] sm:left-1/2 bottom-0 w-5 h-5 rounded-full border-4 border-surface bg-outline-variant/30 transform sm:-translate-x-1/2"></div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}
