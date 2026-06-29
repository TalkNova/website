import type { Metadata } from 'next';
import { PricingPageClient } from './PricingPageClient';
import { canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Flexible pricing plans for WhatsApp marketing and support.',
  ...canonicalFor('/pricing'),
};

export default function PricingPage() {
  return <PricingPageClient />;
}
