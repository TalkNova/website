'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
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
        'fixed inset-x-0 top-0 z-[1000] border-b backdrop-blur-xl transition-all duration-300',
        scrolled
          ? theme === 'dark'
            ? 'border-white/[0.08] bg-canvas/90 text-white'
            : 'border-black/[0.06] bg-white/90 text-black shadow-sm'
          : theme === 'dark'
            ? 'border-transparent bg-canvas/40 text-white'
            : 'border-transparent bg-white/40 text-black',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="ThatMatter"
            width={140}
            height={48}
            className={cn("h-9 w-auto sm:h-10 transition-all duration-500", theme === 'light' && "invert")}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition",
                theme === 'dark'
                  ? "text-slate-300 hover:text-wa"
                  : "text-gray-600 hover:text-black font-semibold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* Small theme toggle button next to action items */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full border transition-all duration-300 mr-2",
              theme === 'dark'
                ? "text-slate-300 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                : "text-gray-600 border-black/10 bg-black/5 hover:bg-black/10 hover:text-black"
            )}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/login"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              theme === 'dark'
                ? "text-slate-300 hover:text-white"
                : "text-gray-600 hover:text-black font-semibold"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
              theme === 'dark'
                ? "bg-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.6)] hover:bg-wa-dim"
                : "bg-black text-white hover:bg-gray-900 shadow-sm"
            )}
          >
            Book demo
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "rounded-lg p-2 md:hidden transition",
            theme === 'dark' ? "text-slate-200" : "text-gray-800"
          )}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          'md:hidden transition-all duration-300',
          theme === 'dark' ? 'border-t border-white/[0.06] bg-canvas/95' : 'border-t border-black/[0.06] bg-white/95',
          open ? 'max-h-[70vh] opacity-100' : 'max-h-0 overflow-hidden opacity-0',
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          <button
            onClick={() => {
              toggleTheme();
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold mb-2 border transition",
              theme === 'dark'
                ? "text-slate-200 border-white/10 bg-white/5"
                : "text-gray-800 border-black/10 bg-black/5"
            )}
          >
            <span>Switch Mode</span>
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-3 text-sm font-semibold transition",
                theme === 'dark' ? "text-slate-200 hover:bg-white/5" : "text-gray-800 hover:bg-black/5"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "mt-2 rounded-full py-3 text-center font-bold transition",
              theme === 'dark'
                ? "bg-wa text-canvas"
                : "bg-black text-white hover:bg-gray-900"
            )}
            onClick={() => setOpen(false)}
          >
            Book demo
          </Link>
        </div>
      </div>
    </header>
  );
}
