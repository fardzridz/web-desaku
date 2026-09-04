import { getIdentitas } from "@/lib/db";
import SettingsForm from "./SettingsForm";

export const metadata = {
  title: "Pengaturan Profil Desa | Admin Desa",
  description: "Kelola data profil, alamat, dan kontak desa.",
};

export default async function AdminSettingsPage() {
  const identitasData = await getIdentitas();

  return (
    <>
      <header className="h-20 flex items-center justify-between px-4 md:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 transition-all border-b border-outline-variant/10">
        <h1 className="text-xl md:text-2xl font-headline font-extrabold text-on-surface tracking-tight">
          Pengaturan Identitas
        </h1>
      </header>

      <div className="p-4 md:p-10 space-y-8 md:space-y-12 max-w-4xl mx-auto">
        <SettingsForm initialData={identitasData} />
      </div>
    </>
  );
}
