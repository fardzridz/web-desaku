import { getIdentitas } from "@/lib/db";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Kontak & Aspirasi",
};

// Custom SVG Icons
const FacebookIcon = ({
  className = "w-5 h-5",
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({
  className = "w-5 h-5",
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GlobeIcon = ({
  className = "w-5 h-5",
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const TiktokIcon = ({
  className = "w-5 h-5",
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsappIcon = ({
  className = "w-5 h-5",
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    <path d="M16.5 15.5c-1 1-3.5-1-5.5-3s-4-4.5-3-5.5.5-1 1.5-1c.5 0 1 .5 1.5 1s.5 1.5.5 2c0 .5-.5 1-1 1s2 3 3 4c.5-.5 1-1 1-1s1.5 0 2 .5c.5.5 1 1 1 1s-1 .5-1 1z"></path>
  </svg>
);

export default async function KontakPage() {
  const identitasData = await getIdentitas();

  const contactItems = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Alamat Kantor",
      description:
        identitasData.alamat ||
        "Balai Desa Wringinanom, Kec. Tongas, Kab. Probolinggo",
      color: "text-primary",
      bgClass: "bg-primary-container",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon Resmi",
      description: `+${identitasData.noWa || "6281234567890"}`,
      color: "text-secondary",
      bgClass: "bg-secondary-container",
      link: `https://wa.me/${identitasData.noWa}`,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Desa",
      description: identitasData.email || "pemdes@wringinanom.desa.id",
      color: "text-tertiary",
      bgClass: "bg-tertiary-container",
      link: `mailto:${identitasData.email}`,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Jam Operasional",
      description: "Senin - Kamis: 08.00 - 15.00 WIB\nJumat: 08.00 - 11.30 WIB\n(Sabtu & Minggu Libur)",
      color: "text-on-surface-variant",
      bgClass: "bg-surface-container-highest",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 md:mt-8 pb-20 md:pb-32">
      {/* Page Header */}
      <header className="mb-10 md:mb-16">
        <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase mb-4 font-label">
          Hubungi Kami
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold text-on-surface tracking-tighter max-w-3xl leading-tight font-headline">
          Pusat <span className="text-primary italic">Layanan</span> & Aspirasi
        </h1>
        <p className="mt-4 md:mt-6 text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
          Kami siap melayani kebutuhan informasi dan administrasi Anda. Silakan
          hubungi kami melalui saluran resmi Pemerintah Desa di bawah ini.
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Info & Socials */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/30 flex flex-col items-start gap-4 transition-transform hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bgClass} ${item.color}`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface mb-1 font-headline">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-on-surface-variant hover:text-primary transition-colors block break-all"
                    >
                      {item.description}
                    </a>
                  ) : (
                    <p className="text-sm text-on-surface-variant whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Bento */}
          <div className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold text-on-surface mb-4 font-headline">
              Kanal Sosial Media
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              Ikuti perkembangan terbaru, pengumuman, dan interaksi digital kami
              di berbagai platform resmi milik pemerintah desa.
            </p>

            <div className="flex flex-wrap gap-3">
              {identitasData.facebookUrl && (
                <a
                  href={identitasData.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-surface-container-high hover:bg-[#1877F2] hover:text-white text-on-surface border border-outline-variant/30 hover:border-[#1877F2] px-5 py-3 rounded-xl transition-all shrink-0 group"
                >
                  <FacebookIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold">Facebook</span>
                </a>
              )}
              {identitasData.instagramUrl && (
                <a
                  href={identitasData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-surface-container-high hover:bg-[#E1306C] hover:text-white text-on-surface border border-outline-variant/30 hover:border-[#E1306C] px-5 py-3 rounded-xl transition-all shrink-0 group"
                >
                  <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold">Instagram</span>
                </a>
              )}
              {identitasData.tiktokUrl && (
                <a
                  href={identitasData.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-surface-container-high hover:bg-stone-900 hover:text-white text-on-surface border border-outline-variant/30 hover:border-stone-900 px-5 py-3 rounded-xl transition-all shrink-0 group"
                >
                  <TiktokIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold">TikTok</span>
                </a>
              )}
              {identitasData.websiteUrl && (
                <a
                  href={identitasData.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/30 hover:border-primary px-5 py-3 rounded-xl transition-all shrink-0 group"
                >
                  <GlobeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold">Website</span>
                </a>
              )}
            </div>
            {/* If no social media links exist */}
            {!identitasData.facebookUrl &&
              !identitasData.instagramUrl &&
              !identitasData.tiktokUrl &&
              !identitasData.websiteUrl && (
                <div className="bg-surface-container-highest p-4 rounded-xl text-center">
                  <span className="text-sm text-on-surface border-l-2 border-primary pl-3">
                    Belum ada tautan media sosial yang ditautkan.
                  </span>
                </div>
              )}
          </div>
        </div>

        {/* Right Column: Maps & Direct Action */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Action Call / Dialog Box */}
          <div className="bg-primary-container p-8 md:p-10 rounded-[2rem] text-on-primary-container relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-primary/20 shadow-sm">
            <div className="relative z-10 flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-on-primary-container text-primary-container rounded-full flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold font-headline">
                  Punya Pertanyaan?
                </h2>
              </div>
              <p className="text-sm md:text-base opacity-90 mb-8 font-body leading-relaxed">
                Sampaikan keluhan, masukan untuk perbaikan jalan desa, layanan
                administrasi, atau sekadar menanyakan proses surat-menyurat
                secara langsung kepada aparat desa kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <a
                  href={`https://wa.me/${identitasData.noWa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#1ebd5a] hover:scale-[0.98] transition-all shadow-md flex-1"
                >
                  <WhatsappIcon className="w-5 h-5" />
                  Chat via WhatsApp
                </a>
                <a
                  href={`mailto:${identitasData.email}`}
                  className="bg-transparent border border-on-primary-container/40 text-on-primary-container py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-on-primary-container/5 transition-all hover:scale-[0.98] flex-1"
                >
                  <Mail className="w-5 h-5" />
                  Kirim Email Penuh
                </a>
              </div>
            </div>
            {/* Abstract blobs for aesthetics */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-on-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-10 right-40 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          {/* Google Maps Container */}
          <div className="bg-surface-container-low rounded-[2rem] border border-outline-variant/30 p-2 md:p-4 flex-grow flex flex-col min-h-[450px]">
            <div className="flex items-center justify-between mb-4 px-4 pt-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface font-headline leading-tight">
                  Peta Lokasi Kantor Desa
                </h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Panduan GPS langsung ke lokasi balai desa.
                </p>
              </div>
              <div className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[1.2rem]">
                  explore
                </span>
              </div>
            </div>
            <div className="w-full rounded-[1.5rem] overflow-hidden flex-grow bg-surface-container-highest relative shadow-inner">
              <iframe
                src={
                  identitasData.linkMaps?.includes("embed") 
                    ? identitasData.linkMaps 
                    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.535894107873!2d113.10343867597148!3d-7.753483592265074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7b3b70acf8983%3A0xb5bb23310bf7d316!2sKANTOR%20PEMERINTAH%20DESA%20WRINGINANOM!5e0!3m2!1sid!2sid"
                }
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Desa Wringinanom"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
