"use client";

import AdminSidebar from "@/components/AdminSidebar";
import React, { useState, useEffect, useCallback, useRef } from "react";
import type { IdentitasData, SafeAkunItem } from "@/lib/db";
import { logoutAction } from "@/app/admin/login/actions";

const IDLE_TIMEOUT_MS = 15 * 60 * 1000;

export default function AdminLayoutWrapper({ 
  children,
  identitas,
  adminAccount
}: { 
  children: React.ReactNode;
  identitas?: IdentitasData;
  adminAccount?: SafeAkunItem | null;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // --- Idle Auto-Logout Logic (15 Menit) ---
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      // Keamanan: Jika diam 15 Menit, otomatis keluarkan (logout) ke halaman semula
      logoutAction();
    }, IDLE_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    
    // Setel ulang timer saat ada interaksi sekecil apapun (geser mouse, ketik, sentuh HP)
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Nyalakan mulai login
    resetTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer]);
  // ------------------------------------------

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        identitas={identitas}
        adminAccount={adminAccount}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header / Top Bar */}
        <header className="h-16 lg:h-0 lg:overflow-hidden flex items-center justify-between px-4 bg-surface border-b border-surface-variant/50 shrink-0">
          <div className="font-bold text-emerald-900 tracking-tighter">{identitas?.namaDesa || "Desa Kita"} Admin</div>
          <button 
            onClick={toggleSidebar}
            className="p-2 -mr-2 text-stone-600 hover:bg-stone-200 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
