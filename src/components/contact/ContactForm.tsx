'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

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
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          placeholder="John Doe"
          required
          disabled={status === 'submitting'}
          autoComplete="name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="john@example.com"
          required
          disabled={status === 'submitting'}
          autoComplete="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          rows={5}
          placeholder="How can we help you?"
          required
          disabled={status === 'submitting'}
        />
      </div>
      {status === 'success' ? (
        <p className="text-accent" style={{ marginBottom: '1rem' }}>
          Thanks — your message has been recorded. We will get back to you soon.
        </p>
      ) : null}
      {status === 'error' ? (
        <p style={{ color: '#f87171', marginBottom: '1rem' }}>
          Something went wrong. Please try again.
        </p>
      ) : null}
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
