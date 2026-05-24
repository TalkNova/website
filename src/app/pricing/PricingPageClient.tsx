'use client';

import { Sun, Moon } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PricingSection } from '@/components/pricing/PricingSection';
import { useTheme } from '@/context/ThemeContext';

export function PricingPageClient() {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageShell blobs="pricing" navScrolled>
      <header className="px-4 pb-6 pt-28 text-center sm:px-6 lg:px-8 lg:pt-32 transition-colors duration-500">
        {/* Small, aesthetic toggle button centered at the very top */}
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleTheme}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                : 'bg-black text-white border-black hover:bg-gray-900'
            }`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-white" />
                Dark Mode
              </>
            )}
          </button>
        </div>

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
