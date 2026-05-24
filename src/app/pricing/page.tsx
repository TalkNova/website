import type { Metadata } from 'next';
import { PricingPageClient } from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Flexible pricing plans for WhatsApp marketing and support.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
