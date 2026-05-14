'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { IconLinkedIn, IconX } from '@/components/icons/BrandIcons';

type ShareBlockProps = {
  title: string;
  shareUrl: string;
};

const btn =
  'inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-wa/40 hover:text-white';

export function ShareBlock({ title, shareUrl }: ShareBlockProps) {
  const [url, setUrl] = useState(shareUrl);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <>
      <hr className="my-12 border-white/[0.08]" />
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h4 className="font-display text-sm font-semibold text-white">Share this article</h4>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={btn}
          >
            <IconX className="h-4 w-4" />
            X / Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={btn}
          >
            <IconLinkedIn className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={btn}
          >
            <MessageCircle className="h-4 w-4 text-wa" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
