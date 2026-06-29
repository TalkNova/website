/** Thatmatters web app (sign in / dashboard). */
export const APP_URL = 'https://app.thatmatters.in/';

/** Production marketing site origin (canonical URLs, sitemap, Open Graph). */
export const SITE_ORIGIN = 'https://thatmatters.in';

function isLocalDev(): boolean {
  return (
    process.env.NODE_ENV === 'development' &&
    !process.env.VERCEL &&
    !process.env.VERCEL_ENV
  );
}

/**
 * Base URL for SEO: canonical links, metadataBase, sitemap, robots.
 * Never uses VERCEL_URL — preview deployment hostnames must not appear in canonicals.
 */
export function getCanonicalBaseUrl(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      /* fall through */
    }
  }

  if (isLocalDev()) {
    return new URL('http://localhost:3000');
  }

  return new URL(SITE_ORIGIN);
}

/** @deprecated Use getCanonicalBaseUrl for metadata; kept for non-SEO share/runtime use. */
export function getSiteUrl(): URL {
  return getCanonicalBaseUrl();
}

/** Absolute canonical URL for a path on the marketing domain. */
export function absoluteCanonical(path = '/'): string {
  const base = getCanonicalBaseUrl().origin;
  if (path === '/' || path === '') {
    return `${base}/`;
  }
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return `${base}/${normalized}`;
}

/** Next.js metadata alternates.canonical — always an absolute production URL. */
export function canonicalFor(path = '/'): { alternates: { canonical: string } } {
  return { alternates: { canonical: absoluteCanonical(path) } };
}
