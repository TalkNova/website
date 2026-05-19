import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Outfit } from 'next/font/google';
import { getSiteUrl } from '@/lib/site';
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
    default: 'ThatMatter — AI WhatsApp Automation for Business',
    template: '%s | ThatMatter',
  },
  description:
    'AI-powered WhatsApp Business automation, custom chatbots, verified templates, campaigns, and lead generation — with full setup and 24/7 support.',
  keywords: [
    'WhatsApp Business API',
    'WhatsApp automation',
    'AI chatbot',
    'marketing campaigns',
    'lead generation',
    'ThatMatter',
  ],
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ThatMatter',
    title: 'ThatMatter — AI WhatsApp Automation for Business',
    description:
      'Automate conversations, campaigns, and lead capture on WhatsApp with AI — built for teams that ship.',
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
