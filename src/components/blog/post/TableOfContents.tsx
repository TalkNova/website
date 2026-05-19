'use client';

import { useEffect, useState } from 'react';
import type { TocHeading } from '@/lib/markdown';
import { cn } from '@/lib/cn';

type TableOfContentsProps = {
  headings: TocHeading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-white/[0.08] blog-glass p-5"
    >
      <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500">
        On this page
      </h3>
      <ul className="mt-4 space-y-1 border-l border-white/[0.08]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                'block border-l-2 py-1.5 text-sm transition -ml-px',
                h.level === 3 ? 'pl-6' : 'pl-4',
                activeId === h.id
                  ? 'border-violet-500 text-violet-200'
                  : 'border-transparent text-slate-500 hover:border-violet-500/50 hover:text-slate-300',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
