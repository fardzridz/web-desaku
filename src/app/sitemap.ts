import { MetadataRoute } from 'next';
import { getBerita, getIdentitas } from '@/lib/db';
import { parseTanggalIndo } from '@/lib/entity';

const SITE_BUILD_DATE = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const identitas = await getIdentitas();
  const baseUrl = identitas?.websiteUrl || 'https://portal-wringinanom.web.id';

  // Rute statis. lastmod = tanggal build (stabil selama satu build,
  // bukan `new Date()` per-entri acak), prioritas berlapis untuk pillar.
  const routePriority: Record<string, number> = {
    '': 1,
    '/profil': 0.9,
    '/profil/sejarah': 0.7,
    '/profil/geografis': 0.8,
    '/profil/demografi': 0.7,
    '/profil/potensi': 0.8,
    '/profil/visi-misi': 0.6,
    '/profil/pemerintahan': 0.8,
    '/layanan': 0.9,
    '/kabar-desa': 0.9,
    '/data-warga': 0.6,
    '/kontak': 0.7,
    '/transparansi/apbdes': 0.8,
  };

  const staticRoutes = Object.keys(routePriority).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: SITE_BUILD_DATE,
    changeFrequency: (route === '/kabar-desa' ? 'daily' : 'monthly') as
      | 'daily'
      | 'monthly',
    priority: routePriority[route],
  }));

  // Rute dinamis (Berita) — lastmod dari tanggal terbit sebenarnya.
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const berita = await getBerita();
    dynamicRoutes = berita.map((item) => ({
      url: `${baseUrl}/kabar-desa/${item.slug}`,
      lastModified: parseTanggalIndo(item.tanggal) || SITE_BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Gagal men-generate sitemap dinamis berita:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
