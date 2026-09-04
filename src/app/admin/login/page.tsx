"use client";

import Link from "next/link";
import React, { useActionState } from "react";
import { loginAction } from "./actions";
import { Turnstile } from "@marsidev/react-turnstile";

export default function AdminLoginPage() {
  const initialState = { success: false, message: "" };
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary-container/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>

      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-10 shadow-2xl relative z-10 border border-outline-variant/20">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-on-primary-container">shield_person</span>
          </div>
          <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
            Portal Admin
          </h1>
          <p className="text-sm font-body text-on-surface-variant">
            Masuk untuk mengelola data dan layanan desa
          </p>
        </div>

        {state?.message && !state?.success && (
          <div className="mb-6 p-4 bg-error/10 text-error text-sm font-semibold rounded-xl text-center border border-error/20">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500">Alamat Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">mail</span>
              <input 
                type="email" 
                name="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary transition-all font-body text-on-surface" 
                placeholder="admin@desakita.id" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500 flex justify-between">
              Kata Sandi
              <span className="text-primary cursor-pointer hover:underline normal-case tracking-normal">Lupa?</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">lock</span>
              <input 
                type="password" 
                name="password"
                required
                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary transition-all font-body text-on-surface" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <div className="flex justify-center w-full py-2">
              <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center h-14"
          >
            {isPending ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              "Masuk"
            )}
          </button>
        </form>
      </div>

      <Link href="/" className="mt-8 text-stone-500 font-label text-sm hover:text-primary transition-colors flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
