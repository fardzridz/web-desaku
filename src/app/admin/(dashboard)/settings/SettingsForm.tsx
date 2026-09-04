"use client";

import React, { useState } from "react";
import { type IdentitasData } from "@/lib/db";
import { webpifyInput } from "@/lib/webp";
import { saveIdentitasAction } from "./actions";

// Custom SVG Icons
const FacebookIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const TiktokIcon = ({ className = "w-5 h-5", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function SettingsForm({ initialData }: { initialData: IdentitasData }) {
  const [isPending, setIsPending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [previewFoto, setPreviewFoto] = useState<string>(initialData.logoDesaUrl || "");

  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const converted = await webpifyInput(e.currentTarget);
      setPreviewFoto(URL.createObjectURL(converted || file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await saveIdentitasAction({ success: false, message: "" }, formData);
    
    if (result.success) {
      setSuccessMsg(result.message);
    } else {
      setErrorMsg(result.message);
    }
    
    setIsPending(false);
  };

  return (
    <div className="bg-surface-container-low p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-headline font-bold text-on-surface mb-6 border-b border-outline-variant pb-4">
        Profil & Kontak Desa
      </h2>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 rounded-xl flex items-center gap-3">
          <span className="material-symbols-outlined shrink-0">check_circle</span>
          <p className="text-sm font-medium">{successMsg}</p>
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-100 text-rose-800 rounded-xl flex items-center gap-3">
          <span className="material-symbols-outlined shrink-0">error</span>
          <p className="text-sm font-medium">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-stone-200 border-4 border-white shadow-md relative mb-4">
              {previewFoto ? (
                <img src={previewFoto} alt="Logo Desa" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
                  <span className="material-symbols-outlined text-4xl">image</span>
                  <span className="text-[10px] uppercase font-bold mt-1 tracking-widest">Logo</span>
                </div>
              )}
            </div>
            <label className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">upload</span>
              Ganti Logo
              <input type="file" name="logoDesaUrl" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFotoChange} />
            </label>
            <p className="text-xs text-stone-500 mt-2 text-center">Format disarankan: PNG Transparan atau JPG. Maks 5MB.</p>
          </div>

          <div className="w-full md:w-2/3 space-y-5">
            <div>
              <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">Nama Desa</label>
              <input name="namaDesa" defaultValue={initialData.namaDesa} required className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">Kepala Desa (Sambutan Singkat)</label>
              <textarea name="sambutanKades" defaultValue={initialData.sambutanKades} rows={3} className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-none"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">Kecamatan</label>
                <input name="kecamatan" defaultValue={initialData.kecamatan} className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">Kabupaten/Kota</label>
                <input name="kabKota" defaultValue={initialData.kabKota} className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant pt-6">
          <h3 className="text-md font-bold mb-4 flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined flex-shrink-0 text-emerald-600">contact_mail</span>
            Kontak & Alamat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">Nomor WhatsApp</label>
              <input name="noWa" defaultValue={initialData.noWa} className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="62812xxx" />
            </div>
            <div>
              <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">Email Desa</label>
              <input name="email" type="email" defaultValue={initialData.email} className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">Alamat Lengkap</label>
              <textarea name="alamat" defaultValue={initialData.alamat} rows={2} className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-none"></textarea>
            </div>
            <div className="md:col-span-2 text-xs text-stone-500 italic mt-2">
              * Tips link Maps: Buka Google Maps - Cari lokasi desa - Klik &apos;Bagikan/Share&apos; - &apos;Sematkan Peta/Embed&apos; - Salin URL di dalam tag src=&quot;...&quot; (Misal: https://www.google.com/maps/embed?pb=...)
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase font-label font-bold text-stone-500 mb-1">URL Google Maps (Embed src)</label>
              <textarea name="linkMaps" defaultValue={initialData.linkMaps} rows={2} className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-none"></textarea>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant pt-6">
          <h3 className="text-md font-bold mb-4 flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined flex-shrink-0 text-emerald-600">language</span>
            Sosial Media & Tautan
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <GlobeIcon className="w-6 h-6 text-stone-400 shrink-0" strokeWidth={1.5} />
              <input name="websiteUrl" defaultValue={initialData.websiteUrl} placeholder="Tautan Website Resmi (opsional)" className="flex-1 p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div className="flex gap-4 items-center">
              <FacebookIcon className="w-6 h-6 text-stone-400 shrink-0" strokeWidth={1.5} />
              <input name="facebookUrl" defaultValue={initialData.facebookUrl} placeholder="Tautan Facebook Desa (opsional)" className="flex-1 p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div className="flex gap-4 items-center">
              <InstagramIcon className="w-6 h-6 text-stone-400 shrink-0" strokeWidth={1.5} />
              <input name="instagramUrl" defaultValue={initialData.instagramUrl} placeholder="Tautan Instagram Desa (opsional)" className="flex-1 p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div className="flex gap-4 items-center">
              <TiktokIcon className="w-6 h-6 text-stone-400 shrink-0" strokeWidth={1.5} />
              <input name="tiktokUrl" defaultValue={initialData.tiktokUrl} placeholder="Tautan Tiktok Desa (opsional)" className="flex-1 p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-outline-variant flex justify-end">
          <button 
            type="submit" 
            disabled={isPending}
            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <span className="material-symbols-outlined animate-spin align-middle w-5 h-5" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20"}}>sync</span>
                Menyimpan...
              </>
            ) : (
               <>
                 <span className="material-symbols-outlined align-middle w-5 h-5">save</span>
                 Simpan Perubahan
               </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
