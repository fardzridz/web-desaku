import { Metadata } from "next";
import { getApbdes } from "@/lib/db";
import ApbdesClientView from "@/components/ApbdesClientView";

export const metadata: Metadata = {
  title: "Transparansi APBDes Wringinanom - Wringinanom",
  description:
    "Laporan Realisasi Anggaran Pendapatan dan Belanja Desa (APBDes) Wringinanom yang transparan dan akuntabel.",
};

export default async function ApbdesPage() {
  const fetchedData = await getApbdes();

    if (!fetchedData || fetchedData.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-32 pb-32 text-center">
          <span className="material-symbols-outlined text-7xl text-stone-300 mb-6 block">
            folder_off
          </span>
          <h1 className="text-3xl font-extrabold text-stone-400 font-headline">
            Laporan Belum Tersedia.
          </h1>
          <p className="mt-4 text-stone-500">
            Pemerintah Desa belum mengunggah dokumen APBDes.
          </p>
        </div>
      );
    }

    const sortedData = [...fetchedData].sort(
      (a, b) => Number(b.tahun_anggaran) - Number(a.tahun_anggaran),
    );

  const availableYears = sortedData.map((d) => d.tahun_anggaran);

  return <ApbdesClientView initialData={sortedData} availableYears={availableYears} />;
}
