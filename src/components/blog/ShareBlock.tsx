'use client';

import { useEffect, useState } from 'react';

type ShareBlockProps = {
  title: string;
  shareUrl: string;
};

export function ShareBlock({ title, shareUrl }: ShareBlockProps) {
  const [url, setUrl] = useState(shareUrl);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <>
      <hr
        style={{
          border: 0,
          borderTop: '1px solid var(--glass-border)',
          margin: '3rem 0',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Share this article</h4>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem', borderRadius: '10px' }}
          >
            <i className="fa-brands fa-twitter" aria-hidden /> Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem', borderRadius: '10px' }}
          >
            <i className="fa-brands fa-linkedin" aria-hidden /> LinkedIn
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem', borderRadius: '10px' }}
          >
            <i className="fa-brands fa-whatsapp" aria-hidden /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
