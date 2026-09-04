"use client";

import React, { useState, useActionState } from "react";
import { ApbdesItem } from "@/lib/db";
import { saveApbdesAction, deleteApbdesAction } from "./actions";

export default function ApbdesManager({ initialData }: { initialData: ApbdesItem[] }) {
  const [editingItem, setEditingItem] = useState<ApbdesItem | null>(null);
  
  const saveStateInitial = { success: false, message: "" };
  const [saveState, saveAction, isSaving] = useActionState(saveApbdesAction, saveStateInitial);

  const [localData, setLocalData] = useState<ApbdesItem[]>(initialData);

  const formatInput = (value: string | number) => {
    if (value === 0 || value === "0") return "0";
    if (value === undefined || value === null || value === "") return "";
    
    // Jika value aslinya adalah number JS (contoh: 1234.5), ubah dulu titiknya jadi koma
    const valStr = typeof value === "number" ? value.toString().replace(".", ",") : value.toString();
    
    const str = valStr.replace(/[^0-9,]/g, ""); 
    const parts = str.split(",");
    let intPart = parts[0];
    if (intPart.startsWith("0") && intPart.length > 1) {
       intPart = intPart.replace(/^0+/, "");
       if (!intPart) intPart = "0";
    }
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (parts.length > 1) {
       return intPart + "," + parts[1].substring(0, 2);
    }
    return intPart;
  };

  const formatWithDecimals = (value: string | number) => {
    const str = formatInput(value);
    if (!str) return str;
    if (!str.includes(",")) return str + ",00";
    if (str.endsWith(",")) return str + "00";
    const parts = str.split(",");
    if (parts[1].length === 1) return str + "0";
    return str;
  };

  const defaultFormState = {
    pend_dana_desa: "", pend_add: "", pend_bantuan_kab: "", pend_bagi_hasil: "", pend_pades: "", pend_lain_lain: "",
    bel_pembangunan: "", bel_pemerintahan: "", bel_pembinaan: "", bel_bencana: "", bel_pemberdayaan: "",
    pembiayaan_penerimaan: "", pembiayaan_pengeluaran: "",
  };

  const [formState, setFormState] = useState(defaultFormState);

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: formatInput(value) }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: formatWithDecimals(value) }));
  };

  const parseNum = (val: string | number | null | undefined): number => {
    if (!val) return 0;
    const parsed = parseFloat(val.toString().replace(/\./g, "").replace(/,/g, "."));
    return isNaN(parsed) ? 0 : parsed;
  };

  // Kalkulasi Otomatis (Real Time)
  const totalPendapatan = parseNum(formState.pend_dana_desa) + parseNum(formState.pend_add) + parseNum(formState.pend_bantuan_kab) + parseNum(formState.pend_bagi_hasil) + parseNum(formState.pend_pades) + parseNum(formState.pend_lain_lain);
  const totalBelanja = parseNum(formState.bel_pembangunan) + parseNum(formState.bel_pemerintahan) + parseNum(formState.bel_pembinaan) + parseNum(formState.bel_bencana) + parseNum(formState.bel_pemberdayaan);
  const surplusDefisit = totalPendapatan - totalBelanja;
  const pembiayaanNetto = parseNum(formState.pembiayaan_penerimaan) - parseNum(formState.pembiayaan_pengeluaran);
  const silpa = surplusDefisit + pembiayaanNetto;

  const handleEditClick = (item: ApbdesItem) => {
    setEditingItem(item);
    setFormState({
      pend_dana_desa: formatWithDecimals(item.pend_dana_desa),
      pend_add: formatWithDecimals(item.pend_add),
      pend_bantuan_kab: formatWithDecimals(item.pend_bantuan_kab),
      pend_bagi_hasil: formatWithDecimals(item.pend_bagi_hasil),
      pend_pades: formatWithDecimals(item.pend_pades),
      pend_lain_lain: formatWithDecimals(item.pend_lain_lain),
      bel_pembangunan: formatWithDecimals(item.bel_pembangunan),
      bel_pemerintahan: formatWithDecimals(item.bel_pemerintahan),
      bel_pembinaan: formatWithDecimals(item.bel_pembinaan),
      bel_bencana: formatWithDecimals(item.bel_bencana),
      bel_pemberdayaan: formatWithDecimals(item.bel_pemberdayaan),
      pembiayaan_penerimaan: formatWithDecimals(item.pembiayaan_penerimaan),
      pembiayaan_pengeluaran: formatWithDecimals(item.pembiayaan_pengeluaran),
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormState(defaultFormState);
  };

  const handleFormWrapperAction = (formData: FormData) => {
    saveAction(formData);

    const isEditing = !!formData.get("tahunAnggaranAsli");
    const newItem = {
      tahun_anggaran: formData.get("tahun_anggaran") as string,
      total_pendapatan: totalPendapatan,
      total_belanja: totalBelanja,
      silpa: silpa,
      pend_dana_desa: parseNum(formState.pend_dana_desa),
      pend_add: parseNum(formState.pend_add),
      pend_bantuan_kab: parseNum(formState.pend_bantuan_kab),
      pend_bagi_hasil: parseNum(formState.pend_bagi_hasil),
      pend_pades: parseNum(formState.pend_pades),
      pend_lain_lain: parseNum(formState.pend_lain_lain),
      bel_pembangunan: parseNum(formState.bel_pembangunan),
      bel_pemerintahan: parseNum(formState.bel_pemerintahan),
      bel_pembinaan: parseNum(formState.bel_pembinaan),
      bel_bencana: parseNum(formState.bel_bencana),
      bel_pemberdayaan: parseNum(formState.bel_pemberdayaan),
      pembiayaan_penerimaan: parseNum(formState.pembiayaan_penerimaan),
      pembiayaan_pengeluaran: parseNum(formState.pembiayaan_pengeluaran),
      pembiayaan_netto: pembiayaanNetto,
      file_pdf: formData.get("file_pdf") as string,
      tanggal_disahkan: formData.get("tanggal_disahkan") as string,
      nama_pengesah: formData.get("nama_pengesah") as string,
    } as ApbdesItem;

    if (isEditing) {
      setLocalData(prev => prev.map(p => p.tahun_anggaran === editingItem?.tahun_anggaran ? newItem : p));
    } else {
      setLocalData(prev => [newItem, ...prev]);
    }
    setEditingItem(null);
    setFormState(defaultFormState);
  };

  const [deleteModalTarget, setDeleteModalTarget] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!deleteModalTarget) return;
    const key = deleteModalTarget;
    setDeleteModalTarget(null); 
    
    await deleteApbdesAction(key);
    setLocalData(prev => prev.filter(p => p.tahun_anggaran !== key));
    
    if (editingItem?.tahun_anggaran === key) {
      setEditingItem(null);
    }
  };

  function formatRp(number: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10">
      
      {/* 
        Master List (Kiri) : Lebih sempit karena detail formnya besar
      */}
      <div className="xl:col-span-5 space-y-6 min-w-0">
        <h2 className="text-xl font-headline font-bold text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">history</span> Riwayat Laporan
        </h2>
        <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {localData.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-stone-300 mb-3">folder_open</span>
                <p className="font-semibold text-stone-500">Belum ada Laporan APBDes.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse border-spacing-0 whitespace-nowrap min-w-[400px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-stone-500 font-label border-b border-outline-variant/10 bg-surface-container/30">
                    <th className="px-6 py-4 font-semibold">Tahun</th>
                    <th className="px-6 py-4 font-semibold">SiLPA</th>
                    <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {localData.map((item, index) => (
                    <tr key={item.tahun_anggaran + index} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-sm text-on-surface">TAhun {item.tahun_anggaran}</span>
                        <div className="text-[10px] text-stone-500 font-bold mt-1 uppercase">Pdpt: {formatRp(item.total_pendapatan)}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                        {formatRp(item.silpa)}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEditClick(item)}
                          className="inline-block p-2 text-stone-400 hover:text-primary transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => setDeleteModalTarget(item.tahun_anggaran)}
                          className="p-2 text-stone-400 hover:text-error transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* 
        Detail View (Kanan) : Form Input sangat panjang
      */}
      <div className="xl:col-span-7 space-y-6">
        <div className="sticky top-24 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 relative overflow-y-auto max-h-[calc(100vh-120px)] [scrollbar-width:thin]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/10">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${editingItem ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
              <span className="material-symbols-outlined">{editingItem ? "edit_document" : "add_circle"}</span>
            </div>
            <div>
              <h2 className="text-lg font-headline font-bold text-stone-800">
                {editingItem ? `Edit APBDes ${editingItem.tahun_anggaran}` : "Input Laporan APBDes Baru"}
              </h2>
              <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                Sistem menghitung total otomatis.
              </p>
            </div>
          </div>

          <form action={handleFormWrapperAction} key={editingItem?.tahun_anggaran || "new"} className="space-y-8">
            {editingItem && <input type="hidden" name="tahunAnggaranAsli" value={editingItem.tahun_anggaran} />}

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">Tahun Anggaran</label>
                <input 
                  type="text"
                  name="tahun_anggaran"
                  defaultValue={editingItem?.tahun_anggaran || new Date().getFullYear().toString()}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-black focus:ring-2 focus:ring-primary outline-none transition-all placeholder:font-normal placeholder:text-stone-400" 
                />
              </div>
              <div className="space-y-1.5 ">
                <label className="text-xs font-bold text-stone-600">Disahkan Oleh</label>
                <input 
                  type="text"
                  name="nama_pengesah"
                  defaultValue={editingItem?.nama_pengesah || "Kepala Desa"}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:font-normal placeholder:text-stone-400" 
                />
              </div>
            </div>

            {/* Pendapatan Section */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
              <h3 className="text-sm font-bold text-emerald-800 mb-4 border-b border-emerald-200/50 pb-2 flex items-center justify-between">
                <div>1. Pendapatan Desa</div>
                <div className="text-lg font-black tracking-tighter">{formatRp(totalPendapatan)}</div>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "pend_dana_desa", label: "Dana Desa" },
                  { id: "pend_add", label: "Alokasi Dana Desa (ADD)" },
                  { id: "pend_bantuan_kab", label: "Bantuan Kabupaten" },
                  { id: "pend_bagi_hasil", label: "Bagi Hasil Pajak & Retribusi" },
                  { id: "pend_pades", label: "PADes" },
                  { id: "pend_lain_lain", label: "Pendapatan Lain" },
                ].map((f) => (
                  <div key={f.id} className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-600 truncate">{f.label}</label>
                    <input 
                      type="text"
                      name={f.id}
                      value={formState[f.id as keyof typeof formState]}
                      onChange={handleStringChange}
                      onBlur={handleBlur}
                      className="w-full bg-white border border-outline-variant/20 rounded-xl py-2 px-3 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Belanja Section */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100/50">
              <h3 className="text-sm font-bold text-rose-800 mb-4 border-b border-rose-200/50 pb-2 flex items-center justify-between">
                <div>2. Belanja Desa</div>
                <div className="text-lg font-black tracking-tighter">{formatRp(totalBelanja)}</div>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "bel_pembangunan", label: "Pembangunan Desa" },
                  { id: "bel_pemerintahan", label: "Pemerintahan Desa" },
                  { id: "bel_pembinaan", label: "Pembinaan" },
                  { id: "bel_bencana", label: "Bencana & Mendesak" },
                  { id: "bel_pemberdayaan", label: "Pemberdayaan" },
                ].map((f) => (
                  <div key={f.id} className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-600 truncate">{f.label}</label>
                    <input 
                      type="text"
                      name={f.id}
                      value={formState[f.id as keyof typeof formState]}
                      onChange={handleStringChange}
                      className="w-full bg-white border border-outline-variant/20 rounded-xl py-2 px-3 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                ))}
              </div>
               
            </div>

            {/* Surplus/Defisit Kalkulasi Otomatis */}
            <div className="p-5 rounded-2xl bg-orange-600 text-white shadow-md border border-orange-500/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
               <div>
                  <h3 className="text-sm font-black text-orange-100 uppercase tracking-wider mb-0.5">Surplus / (Defisit)</h3>
                  <p className="text-[10px] text-orange-200 font-semibold mb-0 tracking-wide">Total Pendapatan dikurangi Total Belanja</p>
               </div>
               <div className="text-2xl font-black tracking-tighter text-white">
                  {formatRp(surplusDefisit)}
               </div>
            </div>

            {/* Pembiayaan Section */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50">
              <h3 className="text-sm font-bold text-blue-800 mb-4 border-b border-blue-200/50 pb-2 flex items-center justify-between">
                <div>3. Pembiayaan Desa</div>
                <div className="text-base font-black tracking-tighter">Netto: {formatRp(pembiayaanNetto)}</div>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600">Penerimaan</label>
                  <input 
                    type="text"
                    name="pembiayaan_penerimaan"
                    value={formState.pembiayaan_penerimaan}
                    onChange={handleStringChange}
                    onBlur={handleBlur}
                    className="w-full bg-white border border-outline-variant/20 rounded-xl py-2 px-3 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600">Pengeluaran</label>
                  <input 
                    type="text"
                    name="pembiayaan_pengeluaran"
                    value={formState.pembiayaan_pengeluaran}
                    onChange={handleStringChange}
                    onBlur={handleBlur}
                    className="w-full bg-white border border-outline-variant/20 rounded-xl py-2 px-3 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* SiLPA Kalkulasi Otomatis Akhir */}
            <div className="p-6 rounded-3xl bg-blue-600 text-white shadow-lg border border-blue-500/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h3 className="text-lg font-black text-blue-100 uppercase tracking-wider mb-1">Sisa Lebih Anggaran (SiLPA)</h3>
                  <p className="text-xs text-blue-200 font-semibold mb-0 tracking-wide">Surplus/Defisit dltambah Pembiayaan Netto</p>
               </div>
               <div className="text-3xl font-black tracking-tighter text-white">
                  {formatRp(silpa)}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-1.5 mb-2">
                 <label className="text-xs font-bold text-stone-600">Tgl. Pengesahan Laporan</label>
                 <input 
                   name="tanggal_disahkan"
                   defaultValue={editingItem?.tanggal_disahkan || ""}
                   required
                   className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all" 
                   placeholder="Contoh: 31/12/2025"
                 />
               </div>
               <div className="space-y-1.5 mb-2">
                 <label className="text-xs font-bold text-stone-600">Link URL Dokumen / PDF (Opsional)</label>
                 <input 
                   name="file_pdf"
                   defaultValue={editingItem?.file_pdf || "#"}
                   className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all" 
                   placeholder="Link Google Drive PDF..."
                 />
               </div>
            </div>

            {saveState.message && (
              <div className={`p-3 text-xs font-bold rounded-xl text-center border ${saveState.success ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-error/10 text-error border-error/20"}`}>
                {saveState.message}
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
              {editingItem && (
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="flex-1 py-3 text-sm font-bold text-stone-500 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
              )}
              <button 
                type="submit" 
                disabled={isSaving}
                className={`${editingItem ? "flex-[2]" : "w-full"} bg-primary text-white py-3 rounded-xl font-bold text-sm shadow hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2`}
              >
                {isSaving ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">save</span>
                )}
                {editingItem ? "Simpan Perbaikan APBDes" : "Simpan Laporan Baru"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {deleteModalTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 whitespace-normal">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center mx-4">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-5 ring-8 ring-error/5">
               <span className="material-symbols-outlined text-3xl">delete_forever</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-3">Hapus APBDes {deleteModalTarget}?</h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed w-full">
              Laporan akan dihapus secara permanen dari daftar Google Sheets Anda dan Website Desa.
            </p>
            <div className="flex w-full items-center justify-center gap-3 pt-2">
              <button 
                onClick={() => setDeleteModalTarget(null)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-stone-600 hover:bg-surface-container transition-colors cursor-pointer"
              >
                 Batal
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-error text-white hover:bg-error/90 shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                 Hapus Laporan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
