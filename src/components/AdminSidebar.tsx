"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { IdentitasData, SafeAkunItem } from "@/lib/db";
import { logoutAction } from "@/app/admin/login/actions";

export default function AdminSidebar({
  isOpen,
  onClose,
  identitas,
  adminAccount
}: {
  isOpen: boolean;
  onClose: () => void;
  identitas?: IdentitasData;
  adminAccount?: SafeAkunItem | null;
}) {
  const pathname = usePathname();

  const handleLogout = async () => {
    onClose();
    await logoutAction();
  };

  const menuItems = [
    { href: "/admin", icon: "dashboard", label: "Dasbor" },
    { href: "/admin/officials", icon: "badge", label: "Aparatur Desa" },
    { href: "/admin/accounts", icon: "manage_accounts", label: "Manajemen Akun" },
    { href: "/admin/news", icon: "newspaper", label: "Kabar Desa" },
    { href: "/admin/services", icon: "design_services", label: "Layanan Publik" },
    { href: "/admin/apbdes", icon: "account_balance_wallet", label: "Transparansi APBDes" },
    { href: "/admin/settings", icon: "settings", label: "Pengaturan" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`bg-stone-100 h-screen w-64 border-r border-stone-200 flex flex-col py-6 shrink-0 fixed lg:static z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
      <div className="px-6 mb-8">
        <div className="text-lg font-black text-emerald-900 tracking-tighter">{identitas?.namaDesa || "Desa Kita"}</div>
        <div className="mt-4 flex items-center gap-3">
          <img 
            alt={adminAccount?.namaLengkap || "Operator"} 
            className="w-10 h-10 rounded-full object-cover" 
            src={adminAccount?.fotoUrl || "https://placehold.co/100x100/064e3b/ffffff?text=Admin"}
          />
          <div>
            <p className="font-body text-sm font-semibold text-emerald-800 line-clamp-1" title={adminAccount?.namaLengkap}>{adminAccount?.namaLengkap || "Admin Desa"}</p>
            <p className="text-xs text-stone-500 line-clamp-1">{adminAccount?.role || "Panel Operator"}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          // Specifically match Dashboard only if it's strictly /admin or /admin/ without anything else
          const isReallyActive = item.href === '/admin' ? pathname === '/admin' : isActive;

          return (
            <Link 
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`mx-2 px-4 py-3 rounded-xl flex items-center gap-3 font-body text-sm font-medium transition-all duration-200 ${
                isReallyActive 
                  ? 'bg-emerald-800 text-white shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-200 hover:translate-x-1'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 mt-auto space-y-1">
        <Link href="#" onClick={onClose} className="text-stone-500 hover:text-emerald-800 flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-widest transition-colors">
          <span className="material-symbols-outlined text-lg">help</span>
          Bantuan
        </Link>
        <button onClick={handleLogout} className="w-full text-stone-500 hover:text-error flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-widest transition-colors">
          <span className="material-symbols-outlined text-lg">logout</span>
          Keluar
        </button>
      </div>
    </aside>
    </>
  );
}
