import type { ReactNode } from 'react';
import { Blobs } from '@/components/layout/Blobs';
import { Footer } from '@/components/layout/Footer';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

type BlobVariant = 'home' | 'about' | 'pricing' | 'blog' | 'post' | 'contact';

type PageShellProps = {
  children: ReactNode;
  blobs: BlobVariant;
  navScrolled?: boolean;
};

export function PageShell({ children, blobs, navScrolled }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-canvas text-slate-100">
      <Blobs variant={blobs} />
      <LandingNavbar scrolledInitially={navScrolled} />
      {children}
      <Footer />
    </div>
  );
}
