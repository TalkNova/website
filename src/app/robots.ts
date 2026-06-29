import type { MetadataRoute } from 'next';
import { getCanonicalBaseUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const base = getCanonicalBaseUrl().origin;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
