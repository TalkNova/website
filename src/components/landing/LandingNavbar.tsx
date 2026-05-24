'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

const nav = [
  { href: '/#services', label: 'Services' },
  { href: '/#how', label: 'How it works' },
  { href: '/#demo', label: 'Demo' },
  { href: '/#results', label: 'Results' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
];

type LandingNavbarProps = {
  /** When true (inner marketing pages), nav stays in the solid “scrolled” style like the old PageShell bar. */
  scrolledInitially?: boolean;
};

export function LandingNavbar({ scrolledInitially = false }: LandingNavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(scrolledInitially);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (scrolledInitially) {
      setScrolled(true);
    } else {
      setScrolled(y > 24);
    }
  });

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[1000] border-b backdrop-blur-xl transition-colors duration-300',
        scrolled
          ? 'border-white/[0.08] bg-canvas/90'
          : 'border-transparent bg-canvas/40',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="Thatmatters"
            width={140}
            height={48}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-wa"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-wa px-5 py-2.5 text-sm font-semibold text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.6)] transition hover:bg-wa-dim"
          >
            Book demo
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-200 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          'border-t border-white/[0.06] md:hidden',
          open ? 'max-h-[70vh] opacity-100' : 'max-h-0 overflow-hidden opacity-0',
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-slate-200"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-wa py-3 text-center font-semibold text-canvas"
            onClick={() => setOpen(false)}
          >
            Book demo
          </Link>
        </div>
      </div>
    </header>
  );
}
