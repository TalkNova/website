import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { IconLinkedIn, IconX } from '@/components/icons/BrandIcons';

const footerLinks = {
  product: [
    { href: '/#services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/login', label: 'Login' },
  ],
};

export function LandingFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-canvas-elevated/80">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-xl font-bold text-white">ThatMatter</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              AI-powered WhatsApp Business automation, verified templates, and full-stack support
              for teams that want to scale conversations.
            </p>
            <a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-wa/40 bg-wa/10 px-4 py-2 text-sm font-medium text-wa transition hover:bg-wa/20"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500">
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-wa">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-wa">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500">
              Social
            </h4>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:border-wa/40 hover:text-wa"
                aria-label="Twitter"
              >
                <IconX className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:border-wa/40 hover:text-wa"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ThatMatter. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-300">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
