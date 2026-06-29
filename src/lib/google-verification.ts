/** Exact body required by Google Search Console HTML file verification. */
export const GOOGLE_SITE_VERIFICATION_BODY =
  'google-site-verification: google5a2c0500c9d9d78d.html';

export const GOOGLE_SITE_VERIFICATION_PATH = '/google5a2c0500c9d9d78d.html';

export function googleSiteVerificationResponse(): Response {
  return new Response(GOOGLE_SITE_VERIFICATION_BODY, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex',
    },
  });
}
