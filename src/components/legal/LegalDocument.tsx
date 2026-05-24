import Link from 'next/link';
import type { LegalDocumentContent, LegalTheme } from '@/lib/legal-content';

type LegalDocumentProps = {
  content: LegalDocumentContent;
  theme: LegalTheme;
  crossLink: { href: string; label: string };
};

export function LegalDocument({ content, theme, crossLink }: LegalDocumentProps) {
  return (
    <div className={`legal-doc legal-doc--${theme}`}>
      <header className="legal-doc-hero mx-auto max-w-[860px] border-b border-white/[0.08] px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <p className="legal-doc-type mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-sky-400">
          Legal Document
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
          {content.description}
        </p>
        <p className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-slate-500">
          Effective: {content.effectiveDate}
        </p>
      </header>

      <div className="legal-doc-layout mx-auto grid max-w-[1060px] lg:grid-cols-[220px_1fr]">
        <aside
          className="legal-doc-sidebar hidden border-r border-white/[0.08] px-6 py-10 lg:block"
          dangerouslySetInnerHTML={{ __html: content.sidebarHtml }}
        />

        <main
          className="legal-doc-content px-4 py-10 sm:px-8 lg:px-12 lg:py-12"
          dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
        />
      </div>

      <footer className="border-t border-white/[0.08] px-4 py-8 text-center text-sm text-slate-500">
        <p>
          {new Date().getFullYear()} Thatmatters Technologies Pvt. Ltd. &nbsp;|&nbsp;{' '}
          <Link
            href={crossLink.href}
            className={
              theme === 'terms'
                ? 'text-wa hover:text-wa-dim'
                : 'text-sky-400 hover:text-sky-300'
            }
          >
            {crossLink.label}
          </Link>
          &nbsp;|&nbsp;{' '}
          <Link
            href={theme === 'privacy' ? '/privacy-policy' : '/terms-and-conditions'}
            className={
              theme === 'terms'
                ? 'text-wa hover:text-wa-dim'
                : 'text-sky-400 hover:text-sky-300'
            }
          >
            {theme === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
          </Link>
        </p>
      </footer>
    </div>
  );
}
