"use client";

import React, { useState, useActionState } from "react";
import { SafeAkunItem } from "@/lib/db";
import { saveAkunAction, deleteAkunAction } from "./actions";

export default function AccountsManager({
  initialData,
}: {
  initialData: SafeAkunItem[];
}) {
  const [editingItem, setEditingItem] = useState<SafeAkunItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Save State Action
  const saveStateInitial = { success: false, message: "" };
  const [saveState, saveAction, isSaving] = useActionState(
    saveAkunAction,
    saveStateInitial,
  );

  // Quick Client-Side Action Hack for local testing
  const [localData, setLocalData] = useState<SafeAkunItem[]>(initialData);

  const handleEditClick = (item: SafeAkunItem) => {
    setEditingItem(item);
    setImagePreview(item.fotoUrl || null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setImagePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleFormWrapperAction = (formData: FormData) => {
    // Jalankan action asli
    saveAction(formData);

    // Mock local data mutation agar UI berubah
    const isEditing = !!formData.get("idAsli");
    const newItem: SafeAkunItem = {
      email: formData.get("email") as string,
      namaLengkap: formData.get("namaLengkap") as string,
      role: formData.get("role") as string,
      fotoUrl:
        imagePreview ||
        "https://placehold.co/100x100/064e3b/ffffff?text=Admin",
    };

    if (isEditing) {
      setLocalData((prev) =>
        prev.map((p) => (p.email === editingItem?.email ? newItem : p))
      );
    } else {
      setLocalData((prev) => [...prev, newItem]);
    }

    // Auto clear mode setelah save via local logic
    setEditingItem(null);
    setImagePreview(null);
  };

  // State untuk modal konfirmasi penghapusan
  const [deleteModalTarget, setDeleteModalTarget] = useState<string | null>(
    null,
  );

  const confirmDelete = async () => {
    if (!deleteModalTarget) return;
    const emailTarget = deleteModalTarget;
    setDeleteModalTarget(null); // Tutup modal

    await deleteAkunAction(emailTarget);
    setLocalData((prev) => prev.filter((p) => p.email !== emailTarget));

    if (editingItem?.email === emailTarget) {
      setEditingItem(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
      {/* 
        Master List (Kiri) 
      */}
      <div className="xl:col-span-7 space-y-6 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-headline font-bold text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              manage_accounts
            </span>
            Daftar Admin / Operator
          </h2>
        </div>
        <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {localData.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-stone-300 mb-3">
                  folder_open
                </span>
                <p className="font-semibold text-stone-500">
                  Belum ada data akun terdaftar.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse border-spacing-0 whitespace-nowrap min-w-[500px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-stone-500 font-label border-b border-outline-variant/10 bg-surface-container/30">
                    <th className="px-6 py-4 font-semibold">Identitas & Kontak</th>
                    <th className="px-6 py-4 font-semibold text-center mt-3">
                      Hak Akses (Role)
                    </th>
                    <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {localData.map((item, index) => (
                    <tr
                      key={item.email + index}
                      className="hover:bg-surface-container-lowest transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-surface-container bg-emerald-50 relative">
                            <img
                              src={
                                item.fotoUrl ||
                                "https://placehold.co/100x100/064e3b/ffffff?text=X"
                              }
                              alt={item.namaLengkap}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">
                              {item.namaLengkap}
                            </span>
                            <span className="text-xs font-bold text-stone-500 mt-0.5 tracking-wide">
                              {item.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold uppercase tracking-widest">
                          {item.role || "Operator"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="inline-block p-2 text-stone-400 hover:text-primary transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => setDeleteModalTarget(item.email)}
                          className="p-2 text-stone-400 hover:text-error transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="px-6 py-4 flex items-center justify-between bg-surface-container">
            <span className="text-xs text-stone-500">Menampilkan {localData.length} akun</span>
          </div>
        </div>
      </div>

      {/* 
        Detail View (Formulir Kanan) - STICKY
      */}
      <div className="xl:col-span-5 space-y-6">
        <div className="sticky top-24 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/10">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingItem ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
            >
              <span className="material-symbols-outlined">
                {editingItem ? "manage_accounts" : "person_add"}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-headline font-bold text-stone-800">
                {editingItem ? "Edit Profil Admin" : "Tambah Operator Baru"}
              </h2>
              <p className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                {editingItem
                  ? "Ubah hak akses atau password"
                  : "Buat kredensial login baru"}
              </p>
            </div>
          </div>

          <form
            action={handleFormWrapperAction}
            key={editingItem?.email || "new"}
            className="space-y-5"
          >
            {/* Hidden ID Field */}
            {editingItem && (
              <input type="hidden" name="idAsli" value={editingItem.email} />
            )}

            {/* Smart Photo Upload */}
            <div className="space-y-1.5 flex flex-col items-center">
              <label className="text-xs font-bold text-stone-600 self-start">
                Foto Profil
              </label>
              <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container border-2 border-dashed border-outline-variant/30 hover:border-primary transition-colors group cursor-pointer relative flex items-center justify-center mt-2 shadow-sm">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover"
                    alt="Pratinjau"
                  />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-3xl text-stone-400 group-hover:text-primary transition-colors">
                      add_photo_alternate
                    </span>
                  </>
                )}

                <div
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <span className="material-symbols-outlined text-white">
                    upload
                  </span>
                </div>

                <input
                  type="file"
                  name="foto_file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  accept="image/png, image/jpeg, image/webp"
                />
              </div>
              <p className="text-[10px] text-stone-400 mt-2 text-center">
                Format Jpg/Png. Sentuh foto untuk mengganti.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600">
                Nama Lengkap
              </label>
              <input
                name="namaLengkap"
                defaultValue={editingItem?.namaLengkap}
                required
                className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:font-normal placeholder:text-stone-400"
                placeholder="Misal: Bapak Budi Santoso"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">
                  Sandi Login
                </label>
                <input
                  name="password"
                  type="password"
                  required={!editingItem} // Kalau buat akun baru Wajib. Kalau edit, boleh kosong.
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:font-normal"
                  placeholder={editingItem ? "(Kosongkan jika tak diubah)" : "Minimal 6 Karakter"}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-600">
                  Role (Hak Akses)
                </label>
                <select
                  name="role"
                  defaultValue={editingItem?.role || "Operator"}
                  required
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Operator">Operator</option>
                  <option value="Penulis Kabar">Penulis</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-stone-600">
                Alamat Email Utama
              </label>
              <input
                name="email"
                type="email"
                defaultValue={editingItem?.email}
                required
                className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:font-normal placeholder:text-stone-400"
                placeholder="operator@desawringin.id"
              />
            </div>

            {saveState.message && (
              <div
                className={`p-3 text-xs font-bold rounded-xl text-center border ${saveState.success ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-error/10 text-error border-error/20"}`}
              >
                {saveState.message}
              </div>
            )}

            <div className="flex items-center gap-3 pt-6 border-t border-outline-variant/10">
              {editingItem && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 py-3 text-sm font-bold text-stone-500 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                disabled={isSaving}
                className={`${editingItem ? "flex-[2]" : "w-full"} bg-primary text-white py-3 rounded-xl font-bold text-sm shadow hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer`}
              >
                {isSaving ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">
                    save
                  </span>
                )}
                {editingItem ? "Simpan Perubahan" : "Daftarkan Akun"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {deleteModalTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 whitespace-normal">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center mx-4">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-5 ring-8 ring-error/5">
              <span className="material-symbols-outlined text-3xl">
                delete_forever
              </span>
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-3">
              Cabut Hak Akses?
            </h3>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed w-full">
              Kredensial login dengan email{" "}
              <span className="font-bold text-on-surface">
                {deleteModalTarget}
              </span>{" "}
              akan dihapus dan yang bersangkutan tidak akan bisa lagi masuk ke panel admin ini.
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
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-error text-white hover:bg-error/90 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Ya, Hapus Aksesnya</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
