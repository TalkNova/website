import Script from 'next/script';

const COOKIEYES_SCRIPT_URL =
  process.env.NEXT_PUBLIC_COOKIEYES_SCRIPT_URL ??
  'https://cdn-cookieyes.com/client_data/ecc3b4808e3729ed0b542983/script.js';

export function CookieYes() {
  return (
    <Script
      id="cookieyes"
      src={COOKIEYES_SCRIPT_URL}
      strategy="afterInteractive"
    />
  );
}
