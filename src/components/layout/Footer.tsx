'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`border-t py-14 transition-colors duration-500 relative z-10 ${
      theme === 'dark'
        ? 'border-white/[0.06] bg-canvas-elevated/90'
        : 'border-gray-200 bg-gray-50'
    }`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Thatmatters"
                width={200}
                height={72}
                className={`h-12 w-auto transition-all duration-500 ${theme === 'light' ? 'invert' : ''}`}
              />
            </Link>
            <p className={`mt-3 max-w-xs text-sm transition-colors duration-500 ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}>
              WhatsApp marketing and AI-powered customer support for modern businesses.
            </p>
          </div>
          <div>
            <h4 className={`font-display text-sm font-semibold transition-colors duration-500 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Product</h4>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/pricing" className={`text-sm transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-wa' : 'text-gray-600 hover:text-black font-semibold'
              }`}>
                Pricing
              </Link>
              <Link href="/about" className={`text-sm transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-wa' : 'text-gray-600 hover:text-black font-semibold'
              }`}>
                Features
              </Link>
            </div>
          </div>
          <div>
            <h4 className={`font-display text-sm font-semibold transition-colors duration-500 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Company</h4>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/about" className={`text-sm transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-wa' : 'text-gray-600 hover:text-black font-semibold'
              }`}>
                About
              </Link>
              <Link href="/blog" className={`text-sm transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-wa' : 'text-gray-600 hover:text-black font-semibold'
              }`}>
                Blog
              </Link>
              <Link href="/contact" className={`text-sm transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-wa' : 'text-gray-600 hover:text-black font-semibold'
              }`}>
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h4 className={`font-display text-sm font-semibold transition-colors duration-500 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Legal</h4>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/privacy-policy" className={`text-sm transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-wa' : 'text-gray-600 hover:text-black font-semibold'
              }`}>
                Privacy
              </Link>
              <Link href="/terms-and-conditions" className={`text-sm transition ${
                theme === 'dark' ? 'text-slate-400 hover:text-wa' : 'text-gray-600 hover:text-black font-semibold'
              }`}>
                Terms
              </Link>
            </div>
          </div>
        </div>
        <div className={`mt-10 border-t pt-8 text-center text-sm transition-colors duration-500 ${
          theme === 'dark' ? 'border-white/[0.06] text-slate-500' : 'border-gray-200 text-gray-500'
        }`}>
          <p>&copy; {new Date().getFullYear()} ThatMatters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
