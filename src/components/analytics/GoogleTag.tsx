import { GoogleAnalytics } from '@next/third-parties/google';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-Z94XBRNPYL';

export function GoogleTag() {
  return <GoogleAnalytics gaId={GA_ID} />;
}
