import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Outfit } from 'next/font/google';
import { getCanonicalBaseUrl } from '@/lib/site';
import { ThemeProvider } from '@/context/ThemeContext';
import { GoogleTag } from '@/components/analytics/GoogleTag';
import { CookieYes } from '@/components/consent/CookieYes';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: getCanonicalBaseUrl(),
  title: {
    default:
      'Thatmatters | WhatsApp Business API & AI Customer Communication Platform',
    template: '%s | Thatmatters',
  },
  description:
    'Thatmatters helps businesses automate WhatsApp with the official Business API, AI chatbots, verified templates, campaigns, and 24/7 lead capture — setup and support included.',
  keywords: [
    'WhatsApp Business API',
    'WhatsApp Business API India',
    'WhatsApp automation',
    'WhatsApp chatbot',
    'AI customer communication',
    'WhatsApp API pricing',
    'WhatsApp template approval',
    'Meta Business Verification',
    'lead generation WhatsApp',
    'Thatmatters',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/favicon.png' },
  verification: {
    google: 'google5a2c0500c9d9d78d',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Thatmatters',
    title:
      'Thatmatters | WhatsApp Business API & AI Customer Communication Platform',
    description:
      'Automate WhatsApp conversations, campaigns, and lead capture with AI — official API, verified templates, and full launch support.',
  },
  other: {
    'facebook-domain-verification': 'jdlatdpvllwi1m8gmf2l4q7hth2cnt',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <CookieYes />
        <GoogleTag />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
