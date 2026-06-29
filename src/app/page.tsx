import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';
import { canonicalFor, getCanonicalBaseUrl } from '@/lib/site';

const title =
  'Thatmatters | WhatsApp Business API & AI Customer Communication Platform';
const description =
  'Automate WhatsApp sales and support with the official Business API, AI chatbots, verified templates, and campaigns. Thatmatters handles setup, integration, and 24/7 support.';

export const metadata: Metadata = {
  title,
  description,
  ...canonicalFor('/'),
  openGraph: {
    title,
    description,
    url: getCanonicalBaseUrl().origin,
    type: 'website',
  },
};

export default function HomePage() {
  const siteUrl = getCanonicalBaseUrl().origin;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Thatmatters',
        url: siteUrl,
        logo: `${siteUrl}/images/logo.png`,
        description,
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Thatmatters',
        description,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: title,
        description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-IN',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <LandingPage />
    </>
  );
}
