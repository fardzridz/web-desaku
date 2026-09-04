import { MetadataRoute } from 'next';
import { getIdentitas } from '@/lib/db';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const identitas = await getIdentitas();
  const baseUrl = identitas?.websiteUrl || 'https://portal-wringinanom.web.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
