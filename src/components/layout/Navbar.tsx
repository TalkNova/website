'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type NavbarProps = {
  /** When true, navbar starts in compact “scrolled” styling (inner pages). */
  scrolledInitially?: boolean;
};

export function Navbar({ scrolledInitially = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(scrolledInitially);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (scrolledInitially) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrolledInitially]);

  const navClass = `navbar${scrolled || scrolledInitially ? ' scrolled' : ''}`;

  return (
    <nav className={navClass}>
      <div className="container nav-container">
        <Link href="/" className="logo">
          <Image
            src="/images/logo.png"
            alt="ThatMatter Logo"
            width={280}
            height={100}
            priority
            className="h-[100px] w-auto"
          />
        </Link>
        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={`fa-solid ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
        <div
          id="primary-navigation"
          className={`nav-links${menuOpen ? ' active' : ''}`}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link
            href="/login"
            className="btn btn-primary btn-sm"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
