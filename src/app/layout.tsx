import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Outfit } from 'next/font/google';
import { getSiteUrl } from '@/lib/site';
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
  metadataBase: getSiteUrl(),
  title: {
    default: 'Thatmatters — AI WhatsApp Automation for Business',
    template: '%s | Thatmatters',
  },
  description:
    'AI-powered WhatsApp Business automation, custom chatbots, verified templates, campaigns, and lead generation — with full setup and 24/7 support.',
  keywords: [
    'WhatsApp Business API',
    'WhatsApp automation',
    'AI chatbot',
    'marketing campaigns',
    'lead generation',
    'Thatmatters',
  ],
  icons: { icon: '/favicon.png' },
  verification: {
    google: 'google5a2c0500c9d9d78d',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Thatmatters',
    title: 'Thatmatters — AI WhatsApp Automation for Business',
    description:
      'Automate conversations, campaigns, and lead capture on WhatsApp with AI — built for teams that ship.',
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
