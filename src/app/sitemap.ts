import { MetadataRoute } from 'next';
import { getBerita, getIdentitas } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const identitas = await getIdentitas();
  // Gunakan URL dari sheet jika ada, kalau tidak gunakan production base URL
  const baseUrl = identitas?.websiteUrl || 'https://portal-wringinanom.web.id';

  // Ambil semua rute statis
  const staticRoutes = [
    '',
    '/profil',
    '/profil/geografis',
    '/profil/demografi',
    '/profil/potensi',
    '/profil/sejarah',
    '/profil/visi-misi',
    '/profil/pemerintahan',
    '/layanan',
    '/kabar-desa',
    '/data-warga',
    '/kontak',
    '/transparansi/apbdes',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Ambil rute dinamis (Berita)
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const berita = await getBerita();
    dynamicRoutes = berita.map((item) => {
      // Usahakan parsing tanggal "10 Oktober 2023" menjadi Date. Kalau gagal, gunakan now()
      let lastMod = new Date();
      try {
        const parsedDate = new Date(item.tanggal);
        if (!isNaN(parsedDate.getTime())) {
          lastMod = parsedDate;
        }
      } catch {
        // Abaikan dan gunakan default now()
      }

      return {
        url: `${baseUrl}/kabar-desa/${item.slug}`,
        lastModified: lastMod,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Gagal men-generate sitemap dinamis berita:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
