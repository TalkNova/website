'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { IconLinkedIn, IconX } from '@/components/icons/BrandIcons';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';
import { APP_URL } from '@/lib/site';

const footerLinks = {
  product: [
    { href: '/#services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: APP_URL, label: 'Login' },
  ],
};

export function LandingFooter() {
  const { theme } = useTheme();

  return (
    <footer className={cn(
      "relative z-10 border-t transition-colors duration-500",
      theme === 'dark' ? "border-white/[0.06] bg-canvas-elevated/80" : "border-gray-200 bg-gray-50"
    )}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className={cn(
              "font-display text-xl font-bold transition-colors duration-500",
              theme === 'dark' ? "text-white" : "text-black"
            )}>
              ThatMatters
            </p>
            <p className={cn(
              "mt-3 max-w-xs text-sm leading-relaxed transition-colors duration-500",
              theme === 'dark' ? "text-slate-400" : "text-gray-600"
            )}>
              AI-powered WhatsApp Business automation, verified templates, and full-stack support
              for teams that want to scale conversations.
            </p>
            <a
              href="https://wa.me/917483358716"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300",
                theme === 'dark'
                  ? "border-wa/40 bg-wa/10 text-wa hover:bg-wa/20"
                  : "border-black bg-black text-white hover:bg-gray-900"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
          <div>
            <h4 className={cn(
              "font-display text-sm font-semibold uppercase tracking-wider transition-colors duration-500",
              theme === 'dark' ? "text-slate-500" : "text-gray-900"
            )}>
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "text-sm transition",
                      theme === 'dark'
                        ? "text-slate-400 hover:text-wa"
                        : "text-gray-600 hover:text-black font-semibold"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn(
              "font-display text-sm font-semibold uppercase tracking-wider transition-colors duration-500",
              theme === 'dark' ? "text-slate-500" : "text-gray-900"
            )}>
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "text-sm transition",
                      theme === 'dark'
                        ? "text-slate-400 hover:text-wa"
                        : "text-gray-600 hover:text-black font-semibold"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn(
              "font-display text-sm font-semibold uppercase tracking-wider transition-colors duration-500",
              theme === 'dark' ? "text-slate-500" : "text-gray-900"
            )}>
              Social
            </h4>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className={cn(
                  "rounded-lg border p-2.5 transition",
                  theme === 'dark'
                    ? "border-white/10 text-slate-400 hover:border-wa/40 hover:text-wa"
                    : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
                )}
                aria-label="Twitter"
              >
                <IconX className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={cn(
                  "rounded-lg border p-2.5 transition",
                  theme === 'dark'
                    ? "border-white/10 text-slate-400 hover:border-wa/40 hover:text-wa"
                    : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
                )}
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className={cn(
          "mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm transition-colors duration-500 sm:flex-row",
          theme === 'dark' ? "border-white/[0.06] text-slate-500" : "border-gray-200 text-gray-500"
        )}>
          <p suppressHydrationWarning suppressContentEditableWarning>
            &copy; {new Date().getFullYear()} ThatMatters. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className={cn(
                "transition",
                theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-gray-500 hover:text-black font-semibold"
              )}
            >
              Privacy
            </Link>
            <Link
              href="/terms-and-conditions"
              className={cn(
                "transition",
                theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-gray-500 hover:text-black font-semibold"
              )}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
