/**
 * Verifies canonical base URL never uses VERCEL_URL deployment hostnames.
 * Run: node scripts/verify-canonical.mjs
 */
import assert from 'node:assert/strict';

const SITE_ORIGIN = 'https://thatmatters.in';

function isLocalDev(env) {
  return (
    env.NODE_ENV === 'development' &&
    !env.VERCEL &&
    !env.VERCEL_ENV
  );
}

function getCanonicalBaseUrl(env) {
  const fromEnv = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      /* fall through */
    }
  }
  if (isLocalDev(env)) {
    return new URL('http://localhost:3000');
  }
  return new URL(SITE_ORIGIN);
}

function absoluteCanonical(env, path = '/') {
  const base = getCanonicalBaseUrl(env).origin;
  if (path === '/' || path === '') {
    return `${base}/`;
  }
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return `${base}/${normalized}`;
}

const vercelPreview = {
  NODE_ENV: 'production',
  VERCEL: '1',
  VERCEL_ENV: 'preview',
  VERCEL_URL: 'website-n7dgjzv9z-thatmatter.vercel.app',
};

const vercelProduction = {
  NODE_ENV: 'production',
  VERCEL: '1',
  VERCEL_ENV: 'production',
  VERCEL_URL: 'website-n7dgjzv9z-thatmatter.vercel.app',
};

const localDev = {
  NODE_ENV: 'development',
};

assert.equal(
  getCanonicalBaseUrl(vercelPreview).href,
  'https://thatmatters.in/',
  'preview deploy must not use VERCEL_URL',
);

assert.equal(
  getCanonicalBaseUrl(vercelProduction).href,
  'https://thatmatters.in/',
  'production deploy must use marketing domain',
);

assert.equal(
  absoluteCanonical(vercelPreview, '/'),
  'https://thatmatters.in/',
  'home canonical',
);

assert.equal(
  absoluteCanonical(vercelPreview, '/pricing'),
  'https://thatmatters.in/pricing',
  'pricing canonical',
);

assert.equal(
  getCanonicalBaseUrl(localDev).href,
  'http://localhost:3000/',
  'local dev uses localhost',
);

assert.equal(
  getCanonicalBaseUrl({
    ...vercelProduction,
    NEXT_PUBLIC_SITE_URL: 'https://thatmatters.in',
  }).href,
  'https://thatmatters.in/',
  'explicit env override',
);

console.log('✓ All canonical URL checks passed');
console.log('  Preview deploy canonical:', absoluteCanonical(vercelPreview, '/about'));
console.log('  Production canonical:    ', absoluteCanonical(vercelProduction, '/'));
