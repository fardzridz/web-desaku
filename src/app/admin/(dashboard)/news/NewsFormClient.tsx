"use client";

import React, { useState, useActionState } from "react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import { BeritaItem } from "@/lib/sheets";
import { saveNewsAction } from "./actions";

interface NewsFormClientProps {
  artikel?: BeritaItem;
}

export default function NewsFormClient({ artikel }: NewsFormClientProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(() =>
    artikel?.fotoUrl?.includes("http") ? artikel.fotoUrl : null,
  );
  const saveStateInitial = { success: false, message: "" };
  const [saveState, saveAction, isSaving] = useActionState(
    saveNewsAction,
    saveStateInitial,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 space-y-8">
      <form action={saveAction} className="space-y-8">
        {artikel && <input type="hidden" name="id" value={artikel.id} />}

        <div className="space-y-2">
          <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500">
            Judul Artikel
          </label>
          <input
            name="judul"
            defaultValue={artikel?.judul}
            className="w-full bg-surface-container-low border-none rounded-xl py-4 px-5 text-lg font-headline font-semibold focus:ring-2 focus:ring-primary transition-all"
            placeholder="Masukkan judul deskriptif..."
            type="text"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500">
              Penulis / Sumber
            </label>
            <input
              name="penulis"
              defaultValue={artikel?.penulis || "Admin Desa"}
              className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary transition-all"
              placeholder="Nama Penulis..."
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500">
              Status
            </label>
            <select
              name="status"
              defaultValue={artikel?.status || "publish"}
              className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="publish">Terbitkan</option>
              <option value="draft">Draf</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500">
            Gambar Sampul
          </label>
          <div className="w-full aspect-video md:aspect-[16/5] bg-surface-container rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary transition-colors group cursor-pointer relative overflow-hidden">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity"
              />
            )}
            <span className="material-symbols-outlined text-4xl text-stone-600 group-hover:text-primary mb-2 transition-colors z-10">
              add_photo_alternate
            </span>
            <p className="text-xs text-stone-700 group-hover:text-on-surface font-semibold z-10 bg-surface-container/50 px-2 rounded">
              {imagePreview
                ? "Klik untuk mengganti gambar sampul"
                : "Klik untuk mengunggah gambar komputer"}
            </p>
            <p className="text-[10px] text-stone-800 mt-1 z-10 font-bold bg-surface-container/50 px-2 rounded">
              PNG, JPG atau WEBP (Maks. 2MB)
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              name="foto_file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              accept="image/png, image/jpeg, image/webp"
            />
            {artikel?.fotoUrl && (
              <input
                type="hidden"
                name="foto_url_existing"
                value={artikel.fotoUrl}
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500">
            Ringkasan Singkat
          </label>
          <textarea
            name="ringkasan"
            defaultValue={artikel?.ringkasan !== "-" ? artikel?.ringkasan : ""}
            rows={3}
            className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary transition-all resize-none"
            placeholder="Tuliskan 2-3 kalimat penjelasan singkat tentang isi kabar desa ini..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-label font-bold uppercase tracking-widest text-stone-500">
            Editor Konten
          </label>
          <RichTextEditor
            name="konten"
            defaultValue={artikel?.konten !== "-" ? artikel?.konten : ""}
          />
        </div>

        {saveState.message && (
          <div
            className={`p-3 text-xs font-bold rounded-xl text-center border ${saveState.success ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-error/10 text-error border-error/20"}`}
          >
            {saveState.message}
          </div>
        )}

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-outline-variant/10">
          <Link
            href="/admin/news"
            className="px-6 py-3 text-sm font-semibold text-stone-500 hover:text-on-surface transition-colors cursor-pointer"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSaving ? (
              <span className="material-symbols-outlined animate-spin text-[18px]">
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">
                publish
              </span>
            )}
            {artikel ? "Perbarui Artikel" : "Tulis & Terbitkan"}
          </button>
        </div>
      </form>
    </div>
  );
}
