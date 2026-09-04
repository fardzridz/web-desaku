import Navbar from "@/components/Navbar";
import { getIdentitas } from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const identitasData = await getIdentitas();
  const namaDesa = identitasData.namaDesa || "Desa Wringinanom";
  const noWa = identitasData.noWa || "6281234567890";
  const emailDesa = identitasData.email || "pemdes@wringinanom-tongas.desa.id";
  const alamatDesa =
    identitasData.alamat ||
    "Balai Desa Wringinanom, Kec. Tongas, Kab. Probolinggo, Jawa Timur, Kode Pos 67252";

  return (
    <>
      <Navbar
        title={namaDesa}
        logoDesaUrl={identitasData.logoDesaUrl}
        subtitle={`Kecamatan ${identitasData.kecamatan}, ${identitasData.kabKota}`}
        socialLinks={{
          facebookUrl: identitasData.facebookUrl,
          instagramUrl: identitasData.instagramUrl,
          tiktokUrl: identitasData.tiktokUrl,
          websiteUrl: identitasData.websiteUrl,
          whatsappUrl: noWa ? `https://wa.me/${noWa}` : undefined,
        }}
      />

      <main className="flex-grow pt-18">{children}</main>

      <footer className="bg-stone-200 text-stone-600 w-full pt-16 pb-8 mt-auto border-t-[8px] border-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Kolom 1: Profil & Alamat */}
            <div className="lg:col-span-1">
              <h3 className="text-emerald-900 font-bold font-headline text-xl mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  account_balance
                </span>
                {namaDesa}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 mb-6">
                Pemerintah Desa Wringinanom berkomitmen memberikan pelayanan
                digital yang transparan, cepat, dan akuntabel.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-300 flex items-center justify-center hover:bg-primary hover:text-white transition-colors group"
                >
                  <span className="material-symbols-outlined text-sm text-stone-700 group-hover:text-white group-hover:scale-110 transition-all">
                    share
                  </span>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-300 flex items-center justify-center hover:bg-primary hover:text-white transition-colors group"
                >
                  <span className="material-symbols-outlined text-sm text-stone-700 group-hover:text-white group-hover:scale-110 transition-all">
                    public
                  </span>
                </Link>
              </div>
            </div>

            {/* Kolom 2: Kontak & Lokasi */}
            <div className="lg:col-span-1">
              <h3 className="text-emerald-900 font-bold font-headline text-lg mb-6 uppercase tracking-widest text-sm border-b border-stone-300 pb-2">
                Kontak Desa
              </h3>
              <ul className="space-y-4 text-sm text-stone-700">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">
                    location_on
                  </span>
                  <span>{alamatDesa}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    call
                  </span>
                  <span>+{noWa}</span>
                </li>
                <li className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-primary">
                    mail
                  </span>
                  <span>{emailDesa}</span>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Link Cepat */}
            <div className="lg:col-span-1">
              <h3 className="text-emerald-900 font-bold font-headline text-lg mb-6 uppercase tracking-widest text-sm border-b border-stone-300 pb-2">
                Link Cepat
              </h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[1rem]">
                      chevron_right
                    </span>{" "}
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profil"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[1rem]">
                      chevron_right
                    </span>{" "}
                    Profil Desa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profil#sotk"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[1rem]">
                      chevron_right
                    </span>{" "}
                    SOTK / Perangkat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontak"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[1rem]">
                      chevron_right
                    </span>{" "}
                    Hubungi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 4: Maps */}
            <div className="lg:col-span-1">
              <h3 className="text-emerald-900 font-bold font-headline text-lg mb-6 uppercase tracking-widest text-sm border-b border-stone-300 pb-2">
                Peta Wilayah
              </h3>
              <div className="w-full h-40 bg-stone-300 rounded-xl overflow-hidden border border-stone-300 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.535894107873!2d113.10343867597148!3d-7.753483592265074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7b3b70acf8983%3A0xb5bb23310bf7d316!2sKANTOR%20PEMERINTAH%20DESA%20WRINGINANOM!5e0!3m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Kantor Desa Wringinanom"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-inter text-stone-500">
            <p>
              © 2026 Pemerintah Desa Wringinanom. Dibuat untuk melayani warga.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Sticky Floating Button */}
      <Link
        href={`https://wa.me/${noWa}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 h-16 w-16 md:h-[72px] md:w-[72px] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:bg-[#1ebd5a] hover:-translate-y-2 hover:shadow-[0_12px_35px_rgb(0,0,0,0.25)] transition-all duration-300 flex items-center justify-center outline-none ring-4 ring-[#25D366]/30 group"
        aria-label="Hubungi kami melalui WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </Link>
    </>
  );
}
