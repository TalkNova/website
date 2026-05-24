'use client';

import type { ReactNode } from 'react';
import { Blobs } from '@/components/layout/Blobs';
import { Footer } from '@/components/layout/Footer';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { useTheme } from '@/context/ThemeContext';

type BlobVariant = 'home' | 'about' | 'pricing' | 'blog' | 'post' | 'contact';

type PageShellProps = {
  children: ReactNode;
  blobs: BlobVariant;
  navScrolled?: boolean;
};

export function PageShell({ children, blobs, navScrolled }: PageShellProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-x-clip transition-colors duration-500 ${
      theme === 'dark' ? 'bg-canvas text-slate-100' : 'bg-white text-gray-900'
    }`}>
      {theme === 'dark' && <Blobs variant={blobs} />}
      <LandingNavbar scrolledInitially={navScrolled} />
      {children}
      <Footer />
    </div>
  );
}
