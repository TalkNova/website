/** Thatmatters web app (sign in / dashboard). */
export const APP_URL = 'https://app.thatmatters.in/';

/** Production marketing site origin (canonical URLs, sitemap, Open Graph). */
export const SITE_ORIGIN = 'https://thatmatters.in';

export function getSiteUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      /* fall through */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.NODE_ENV === 'production') {
    return new URL(SITE_ORIGIN);
  }
  return new URL('http://localhost:3000');
}

/** Relative path for Next.js metadata alternates.canonical (resolved via metadataBase). */
export function canonicalFor(path = '/'): { alternates: { canonical: string } } {
  if (path === '/') {
    return { alternates: { canonical: '/' } };
  }
  const normalized = `/${path.replace(/^\/+|\/+$/g, '')}`;
  return { alternates: { canonical: normalized } };
}

export function absoluteCanonical(path = '/'): string {
  const base = getSiteUrl().origin;
  if (path === '/') {
    return `${base}/`;
  }
  return `${base}/${path.replace(/^\/+|\/+$/g, '')}`;
}
