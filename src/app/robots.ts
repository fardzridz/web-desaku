import { MetadataRoute } from 'next';
import { getIdentitas } from '@/lib/db';

/**
 * Robots dengan kebijakan GEO/AEO terbuka:
 * AI crawler (GPTBot, ClaudeBot, PerplexityBot, dst) DIIZINKAN mengambil konten
 * agar Desa Wringinanom (Tongas, Probolinggo) bisa jadi rujukan jawaban AI.
 * Catatan: Cloudflare "Managed robots.txt" harus dimatikan di dashboard CF
 * (Security Center → Bots → Managed robots.txt) agar file ini efektif.
 */
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
  'Bytespider',
  'cohere-ai',
  'YouBot',
  'Diffbot',
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const identitas = await getIdentitas();
  const baseUrl = identitas?.websiteUrl || 'https://portal-wringinanom.web.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/admin/'],
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
