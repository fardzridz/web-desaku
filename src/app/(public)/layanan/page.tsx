import { getLayanan, getIdentitas } from "@/lib/db";
import Link from "next/link";

export const metadata = {
  title: "Layanan Publik",
};

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LayananPage(props: PageProps) {
  const [layananData, identitasData] = await Promise.all([
    getLayanan(),
    getIdentitas()
  ]);
  
  // Resolve searchParams safety for Next.js 14/15
  const params = props.searchParams ? await Promise.resolve(props.searchParams) : {};
  const currentCategory = typeof params.kategori === 'string' ? params.kategori : "Semua Layanan";

  const filteredData = currentCategory === "Semua Layanan" 
    ? layananData 
    : layananData.filter(item => item.kategori.trim().toLowerCase() === currentCategory.trim().toLowerCase());

  // Helper function to map basic strings to icons since sheets don't have icon columns
  const getIconForLayanan = (nama: string) => {
    const l = nama.toLowerCase();
    if (l.includes('keluarga') || l.includes('kk')) return 'badge';
    if (l.includes('domisili') || l.includes('lokasi') || l.includes('pindah')) return 'location_on';
    if (l.includes('lahir') || l.includes('akta')) return 'child_care';
    if (l.includes('usaha') || l.includes('surat izin')) return 'storefront';
    if (l.includes('nikah') || l.includes('kua')) return 'favorite';
    if (l.includes('meninggal') || l.includes('kematian')) return 'sentiment_very_dissatisfied';
    return 'description';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 md:mt-8 pb-20 md:pb-32">
      {/* Hero Header */}
      <header className="mb-12 md:mb-24 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-fixed-variant text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 font-label">
            Public Services Directory
          </div>
          <h1 className="text-4xl md:text-7xl font-headline font-extrabold text-primary tracking-tight leading-none mb-4 md:mb-6">
            Layanan <br/><span className="text-on-surface">Administrasi.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Panduan lengkap persyaratan dan alur pengajuan dokumen kependudukan untuk warga desa. Kami mempermudah birokrasi demi kenyamanan bersama.
          </p>
        </div>
        <div className="hidden md:flex shrink-0 w-48 h-48 items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-outline-variant animate-[spin_10s_linear_infinite]"></div>
          <span className="material-symbols-outlined text-7xl text-outline relative z-10">verified_user</span>
        </div>
      </header>

      {/* Service Navigator (Horizontal Chips) */}
      <section className="mb-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-4 pb-4">
        <Link href="/layanan" className={`${currentCategory === 'Semua Layanan' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'} px-6 py-3 rounded-full whitespace-nowrap text-sm font-semibold flex items-center gap-2 transition-colors`}>
          <span className="material-symbols-outlined text-lg">description</span>
          Semua Layanan
        </Link>
        <Link href="/layanan?kategori=Kependudukan" className={`${currentCategory === 'Kependudukan' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'} px-6 py-3 rounded-full whitespace-nowrap text-sm font-semibold flex items-center gap-2 transition-colors`}>
          <span className="material-symbols-outlined text-lg">group</span>
          Kependudukan
        </Link>
        <Link href="/layanan?kategori=Izin Usaha" className={`${currentCategory === 'Izin Usaha' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'} px-6 py-3 rounded-full whitespace-nowrap text-sm font-semibold flex items-center gap-2 transition-colors`}>
          <span className="material-symbols-outlined text-lg">business</span>
          Izin Usaha
        </Link>
        <Link href="/layanan?kategori=Kesehatan" className={`${currentCategory === 'Kesehatan' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'} px-6 py-3 rounded-full whitespace-nowrap text-sm font-semibold flex items-center gap-2 transition-colors`}>
          <span className="material-symbols-outlined text-lg">medical_services</span>
          Kesehatan
        </Link>
      </section>

      {/* Bento Layout for Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Main Content Area (Accordion-style Lists) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              // Parse requirements delimited by newlines or commas
              const rawSyarat = typeof item.syarat === 'string' ? item.syarat : "";
              const syaratList = rawSyarat.split(/\n|,|-/).map(s => s.trim()).filter(s => s.length > 0);
              const icon = getIconForLayanan(item.namaLayanan);

              return (
                <div key={index} className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
                  <div className="p-5 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm border border-outline-variant/20">
                          <span className="material-symbols-outlined text-3xl">{icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-headline font-bold leading-tight">{item.namaLayanan}</h3>
                          {/* We don't have subtitle in sheets, so fallback to empty or omit */}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-surface-container-highest rounded text-[10px] font-bold text-on-surface-variant shrink-0 w-fit">EST: {item.durasi.toUpperCase()}</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-surface-container-lowest rounded-xl p-5 md:p-6 shadow-[0px_10px_20px_rgba(25,28,27,0.03)] border border-outline-variant/10">
                        <h4 className="text-[10px] md:text-xs font-bold text-tertiary uppercase tracking-widest mb-4 font-label">Persyaratan Dokumen</h4>
                        <ul className="space-y-3">
                          {syaratList.length > 0 ? syaratList.map((req, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                              <span className="text-sm">{req}</span>
                            </li>
                          )) : (
                            <li className="flex items-start gap-3">
                              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                              <span className="text-sm">Silakan hubungi pihak desa untuk info persyaratan.</span>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                         <div className="text-sm font-bold text-emerald-800">
                           {item.biaya.toUpperCase() === 'GRATIS' ? 'GRATIS' : `Biaya: ${item.biaya}`}
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : layananData.length > 0 ? (
            <div className="bg-surface-container-low rounded-xl p-8 text-center border border-dashed border-outline-variant">
               <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
               <p className="text-on-surface-variant font-body">Tidak ada data layanan untuk kategori <span className="font-bold">&quot;{currentCategory}&quot;</span>.</p>
            </div>
          ) : (
            // Fallback content if empty
            <>
              {/* Service Card 1: Kartu Keluarga */}
              <div className="bg-surface-container-low rounded-xl overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-3xl">badge</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-headline font-bold">Kartu Keluarga (KK)</h3>
                        <p className="text-sm text-on-surface-variant">Pembuatan Baru / Perubahan Data</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-surface-container-highest rounded text-[10px] font-bold text-on-surface-variant shrink-0">EST: 3 HARI KERJA</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(25,28,27,0.06)]">
                      <h4 className="text-xs font-bold text-tertiary uppercase tracking-widest mb-4 font-label">Persyaratan Dokumen</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          <span className="text-sm">Surat Pengantar dari RT/RW setempat.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          <span className="text-sm">Fotokopi Buku Nikah / Akta Perkawinan.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          <span className="text-sm">Surat Keterangan Pindah (bagi warga pendatang).</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          <span className="text-sm">Kartu Keluarga lama (jika perubahan data).</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Card 2: Surat Domisili */}
              <div className="bg-surface-container-low rounded-xl overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-3xl">location_on</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-headline font-bold">Surat Keterangan Domisili</h3>
                        <p className="text-sm text-on-surface-variant">Legalitas tempat tinggal sementara/tetap</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-surface-container-highest rounded text-[10px] font-bold text-on-surface-variant shrink-0">EST: 1 HARI KERJA</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_20px_40px_rgba(25,28,27,0.06)]">
                      <h4 className="text-xs font-bold text-tertiary uppercase tracking-widest mb-4 font-label">Persyaratan Dokumen</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          <span className="text-sm">Fotokopi KTP Pemohon yang masih berlaku.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          <span className="text-sm">Surat Pengantar RT/RW (Wajib).</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                          <span className="text-sm">Pas foto ukuran 3x4 (2 lembar).</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Card 3: Akta Kelahiran */}
              <div className="bg-surface-container-low rounded-xl p-8 flex flex-col md:flex-row md:items-center justify-between border-l-4 border-primary gap-4">
                <div className="flex items-center gap-6">
                  <span className="material-symbols-outlined text-4xl text-primary-container shrink-0">child_care</span>
                  <div>
                    <h3 className="text-lg font-headline font-bold">Akta Kelahiran</h3>
                    <p className="text-sm text-on-surface-variant">Pendaftaran anggota keluarga baru</p>
                  </div>
                </div>
                <button className="text-primary font-bold text-sm flex items-center gap-2">
                  Lihat Detail <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Info Panels */}
        <aside className="lg:col-span-4 space-y-6 md:space-y-8 sticky top-28 h-fit self-start mt-4 lg:mt-0">
          {/* Information Ledger */}
          <div className="bg-primary text-on-primary p-6 md:p-8 rounded-[2rem] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-headline font-bold mb-3 md:mb-4">Pusat Informasi</h3>
              <p className="text-primary-fixed text-sm leading-relaxed mb-6 font-body">
                  Untuk konsultasi persyaratan dokumen atau penjadwalan pengurusan berkas, silakan hubungi tim administrasi desa kami selama jam kerja.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">support_agent</span>
                  <span className="text-xs font-semibold font-body">
                    Helpdesk: {identitasData.noWa ? `+${identitasData.noWa}` : "Belum Tersedia"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">mail</span>
                  <span className="text-xs font-semibold font-body">
                    {identitasData.email || "Belum Tersedia"}
                  </span>
                </div>
              </div>
              <img 
                className="w-full h-32 object-cover rounded-xl" 
                alt="Digital Portal" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWPHZcj1p2Lwn1BgPyZsdjVcXgLyVmn_6kgAEijJBhVVSYqhNQM2nriNioawB9RAwFXVtol8BjLPao7TbsMpwB9QZlag3LZ3MXUBEr5rTsnPB63k7JNtY2Ddejxn9sUSSWt-AsGEp7bHPAWTFwMx4_l9zyfUkMfuMjgpqpk7chLDcBoL7yRXPfyGtHYmkBUue7ykBpZFN3y93aUvgaAlraMl8XGtkff1uXJNWQbc5SZ8vvHVwsGd2horSiOk-yKYBqeOY1hOXAa8M"
              />
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-surface-container p-6 md:p-8 rounded-[1.5rem]">
            <h4 className="text-[10px] md:text-xs font-bold text-tertiary uppercase tracking-widest mb-5 md:mb-6 font-label">Jam Operasional Kantor</h4>
            <div className="space-y-4 font-body">
              <div className="flex justify-between border-b border-outline-variant pb-2">
                <span className="text-sm font-medium">Senin - Kamis</span>
                <span className="text-sm font-bold text-primary">08:00 - 15:00</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant pb-2">
                <span className="text-sm font-medium">Jumat</span>
                <span className="text-sm font-bold text-primary">08:00 - 11:30</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="text-sm font-medium">Sabtu - Minggu</span>
                <span className="text-sm font-bold">Libur</span>
              </div>
            </div>
            <div className="mt-8 bg-surface-container-lowest p-4 rounded-lg flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary">info</span>
              <p className="text-[10px] leading-tight text-on-surface-variant font-body">
                Istirahat pada pukul 12:00 - 13:00 WIB (kecuali hari Jumat).
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* FAB - Already in layout.tsx using a different style, optionally add a secondary here or let layout handle it. Since Layout has WhatsApp FAB, I'll let Layout handle it. */}
    </div>
  );
}
