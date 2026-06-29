import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';
import { canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  ...canonicalFor('/'),
};

export default function HomePage() {
  return <LandingPage />;
}
