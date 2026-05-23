"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

export default function Navbar({
  title = "Desa Kita",
  logoDesaUrl,
  subtitle,
  socialLinks,
}: {
  title?: string;
  logoDesaUrl?: string;
  subtitle?: string;
  socialLinks?: {
    facebookUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    websiteUrl?: string;
    whatsappUrl?: string;
  };
}) {
  const pathname = usePathname();
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    {
      label: "Profil Desa",
      dropdown: [
        { href: "/profil/tentang", label: "Tentang Desa / Profil Umum" },
        { href: "/profil/sejarah", label: "Sejarah Desa" },
        { href: "/profil/visi-misi", label: "Visi & Misi" },
        { href: "/profil/pemerintahan", label: "Pemerintahan Desa" },
        { href: "/profil/geografis", label: "Geografis Desa" },
        { href: "/profil/demografi", label: "Demografi / Penduduk" },
        { href: "/profil/potensi", label: "Potensi Desa" },
      ],
    },
    {
      label: "Transparansi",
      dropdown: [
        { href: "/transparansi/apbdes", label: "APBDes & Realisasi Anggaran" },
      ],
    },
    { href: "/kabar-desa", label: "Kabar Desa" },
    { href: "/layanan", label: "Layanan" },
    { href: "/kontak", label: "Kontak" },
  ];

  const getLinkClass = (path: string) => {
    const isActive =
      path === "/" ? pathname === "/" : pathname?.startsWith(path);
    if (isActive) {
      return "text-emerald-800 border-b-2 border-emerald-800 pb-1 font-bold";
    }
    return "text-stone-600 hover:text-emerald-700 transition-colors";
  };

  const isProfilActive = pathname?.startsWith("/profil");

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-6 lg:px-8 py-2 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          {logoDesaUrl && (
            <img
              src={logoDesaUrl}
              alt={`Logo ${title}`}
              className="w-14 h-14 object-contain"
            />
          )}
          <div className="flex flex-col justify-center overflow-hidden">
            <span className="text-xl font-bold text-emerald-900 tracking-tighter leading-none truncate">
              {title}
            </span>
            {subtitle && (
              <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest mt-1 opacity-80 leading-none">
                {subtitle}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 font-headline text-sm font-semibold tracking-tight">
          {navLinks.map((link, idx) =>
            link.dropdown ? (
              <div
                key={idx}
                className="relative group h-full flex items-center py-2"
                onMouseEnter={() => setOpenDropdownIdx(idx)}
                onMouseLeave={() => setOpenDropdownIdx(null)}
              >
                <button
                  className={`flex items-center gap-1 ${link.label === "Profil Desa" && isProfilActive ? "text-emerald-800 border-b-2 border-emerald-800 pb-1 font-bold" : "text-stone-600 hover:text-emerald-700 pb-1 transition-colors"}`}
                >
                  {link.label}
                  <span
                    className={`material-symbols-outlined text-[1rem] transition-transform ${openDropdownIdx === idx ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>
                {/* Desktop Dropdown */}
                <div
                  className={`absolute top-[100%] left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden transition-all duration-200 origin-top-left ${openDropdownIdx === idx ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
                >
                  <div className="py-2">
                    {link.dropdown.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className={`block px-5 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${pathname === sublink.href ? "bg-emerald-50 text-emerald-700 font-bold" : "text-stone-600"}`}
                        onClick={() => setOpenDropdownIdx(null)}
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={getLinkClass(link.href!)}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {socialLinks && (
            <div className="flex items-center gap-4">
              {socialLinks.whatsappUrl && (
                <Link
                  href={socialLinks.whatsappUrl}
                  target="_blank"
                  className="text-stone-500 hover:text-emerald-600 transition-colors"
                >
                  <WhatsappIcon className="w-5 h-5" />
                </Link>
              )}
              {socialLinks.facebookUrl && (
                <Link
                  href={socialLinks.facebookUrl}
                  target="_blank"
                  className="text-stone-500 hover:text-emerald-600 transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                </Link>
              )}
              {socialLinks.instagramUrl && (
                <Link
                  href={socialLinks.instagramUrl}
                  target="_blank"
                  className="text-stone-500 hover:text-emerald-600 transition-colors"
                >
                  <InstagramIcon className="w-5 h-5" />
                </Link>
              )}
              {socialLinks.tiktokUrl && (
                <Link
                  href={socialLinks.tiktokUrl}
                  target="_blank"
                  className="text-stone-500 hover:text-emerald-600 transition-colors"
                >
                  <TiktokIcon className="w-5 h-5" />
                </Link>
              )}
              {socialLinks.websiteUrl && (
                <Link
                  href={socialLinks.websiteUrl}
                  target="_blank"
                  className="text-stone-500 hover:text-emerald-600 transition-colors"
                >
                  <GlobeIcon className="w-5 h-5" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden shrink-0 text-stone-800 hover:bg-stone-200/50 p-2 rounded-full transition-colors cursor-pointer focus:outline-none"
        >
          <span className="material-symbols-outlined text-2xl flex items-center justify-center">
            {isMobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden ${isMobileOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-stone-50 border-t border-stone-200 px-6 py-6 shadow-2xl overflow-y-auto max-h-[85vh]`}
      >
        <div className="flex flex-col space-y-5 font-headline text-sm font-semibold">
          {navLinks.map((link, idx) =>
            link.dropdown ? (
              <div key={idx} className="flex flex-col space-y-3">
                <div
                  className={`flex items-center justify-between text-base border-b border-stone-200 pb-2 ${isProfilActive ? "text-emerald-800 font-bold" : "text-stone-800"}`}
                >
                  {link.label}
                </div>
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-stone-200">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={
                        pathname === sublink.href
                          ? "text-emerald-700 font-bold text-sm"
                          : "text-stone-600 hover:text-emerald-700 text-sm"
                      }
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setIsMobileOpen(false)}
                className={
                  getLinkClass(link.href!) + " inline-block w-max text-base"
                }
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="pt-4 mt-2 border-t border-stone-200 flex flex-col gap-4">
            {socialLinks && (
              <div className="flex justify-center gap-6 pb-2">
                {socialLinks.whatsappUrl && (
                  <Link
                    href={socialLinks.whatsappUrl}
                    target="_blank"
                    className="text-stone-500 hover:text-emerald-600"
                  >
                    <WhatsappIcon className="w-6 h-6" />
                  </Link>
                )}
                {socialLinks.facebookUrl && (
                  <Link
                    href={socialLinks.facebookUrl}
                    target="_blank"
                    className="text-stone-500 hover:text-emerald-600"
                  >
                    <FacebookIcon className="w-6 h-6" />
                  </Link>
                )}
                {socialLinks.instagramUrl && (
                  <Link
                    href={socialLinks.instagramUrl}
                    target="_blank"
                    className="text-stone-500 hover:text-emerald-600"
                  >
                    <InstagramIcon className="w-6 h-6" />
                  </Link>
                )}
                {socialLinks.tiktokUrl && (
                  <Link
                    href={socialLinks.tiktokUrl}
                    target="_blank"
                    className="text-stone-500 hover:text-emerald-600"
                  >
                    <TiktokIcon className="w-6 h-6" />
                  </Link>
                )}
                {socialLinks.websiteUrl && (
                  <Link
                    href={socialLinks.websiteUrl}
                    target="_blank"
                    className="text-stone-500 hover:text-emerald-600"
                  >
                    <GlobeIcon className="w-6 h-6" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
