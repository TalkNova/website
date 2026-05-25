'use client';

import { PageShell } from '@/components/layout/PageShell';
import { PricingSection } from '@/components/pricing/PricingSection';
import { useTheme } from '@/context/ThemeContext';

export function PricingPageClient() {
  const { theme } = useTheme();

  return (
    <PageShell blobs="pricing" navScrolled>
      <header className="px-4 pb-6 pt-28 text-center sm:px-6 lg:px-8 lg:pt-32 transition-colors duration-500">
        <h1 className={`font-display text-4xl font-black sm:text-5xl transition-colors duration-500 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Simple, <span className={theme === 'dark' ? 'text-gradient-wa' : 'underline decoration-black decoration-[3px] underline-offset-[6px]'}>transparent</span> pricing
        </h1>
        <p className={`mx-auto mt-4 max-w-xl text-base font-semibold transition-colors duration-500 ${
          theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
        }`}>
          Choose the perfect plan for your business needs. No hidden fees.
        </p>
      </header>

      <PricingSection />
    </PageShell>
  );
}
