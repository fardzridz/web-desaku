import { getPerangkat } from "@/lib/db";
import OfficialsManager from "./OfficialsManager";

export const metadata = {
  title: "Aparatur Desa | Admin Desa",
  description: "Kelola data aparatur dan perangkat balai desa.",
};

export default async function AdminOfficialsPage() {
  const perangkatData = await getPerangkat();

  return (
    <>
      <header className="h-16 md:h-20 flex items-center justify-between px-4 md:p-6 lg:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 transition-all border-b border-outline-variant/10">
        <h1 className="text-lg md:text-2xl font-headline font-extrabold text-on-surface tracking-tight truncate">
          Aparatur Desa
        </h1>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary w-32 md:w-64 transition-all"
              placeholder="Cari aparatur..."
              type="text"
            />
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 lg:p-10 space-y-6 md:space-y-8">
        <OfficialsManager initialData={perangkatData} />
      </div>
    </>
  );
}
