import type { MetadataRoute } from 'next';
import { getCanonicalBaseUrl } from '@/lib/site';
import { getAllSlugs } from '@/lib/posts';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/pricing',
  '/privacy-policy',
  '/terms-and-conditions',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getCanonicalBaseUrl().origin;
  const slugs = await getAllSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' || path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
