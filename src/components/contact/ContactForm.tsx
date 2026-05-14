'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const field =
  'w-full rounded-xl border border-white/10 bg-canvas/50 px-4 py-3 text-white outline-none transition focus:border-wa/50 disabled:opacity-50';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    const form = e.currentTarget;
    window.setTimeout(() => {
      form.reset();
      setStatus('success');
      window.setTimeout(() => setStatus('idle'), 4000);
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-slate-400">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={field}
          placeholder="John Doe"
          required
          disabled={status === 'submitting'}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-slate-400">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={field}
          placeholder="john@example.com"
          required
          disabled={status === 'submitting'}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-slate-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className={`${field} min-h-[120px] resize-y`}
          rows={5}
          placeholder="How can we help you?"
          required
          disabled={status === 'submitting'}
        />
      </div>
      {status === 'success' ? (
        <p className="text-sm text-wa">Thanks — we&apos;ll get back to you soon.</p>
      ) : null}
      {status === 'error' ? <p className="text-sm text-red-400">Something went wrong. Try again.</p> : null}
      <button
        type="submit"
        className="w-full rounded-full bg-wa py-3 font-semibold text-canvas transition hover:bg-wa-dim disabled:opacity-60"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
