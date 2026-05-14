import type { ReactNode } from 'react';
import { Blobs } from '@/components/layout/Blobs';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

type BlobVariant = 'home' | 'about' | 'pricing' | 'blog' | 'post' | 'contact';

type PageShellProps = {
  children: ReactNode;
  blobs: BlobVariant;
  navScrolled?: boolean;
};

export function PageShell({ children, blobs, navScrolled }: PageShellProps) {
  return (
    <>
      <Blobs variant={blobs} />
      <Navbar scrolledInitially={navScrolled} />
      {children}
      <Footer />
    </>
  );
}
