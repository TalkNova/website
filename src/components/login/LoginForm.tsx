'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      router.push('/');
    }, 400);
  };

  return (
    <div className="login-container animate-on-scroll zoom-in">
      <div className="glass-card" style={{ padding: '3rem 2rem' }}>
        <div className="text-center mb-4">
          <Link
            href="/"
            className="logo"
            style={{
              justifyContent: 'center',
              marginBottom: '1rem',
              display: 'flex',
            }}
          >
            <Image
              src="/images/logo.png"
              alt="ThatMatter Logo"
              width={280}
              height={100}
              className="h-[100px] w-auto"
              priority
            />
          </Link>
          <h2 style={{ margin: 0 }}>Welcome Back</h2>
          <p className="text-muted">Sign in to manage your campaigns</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              placeholder="username"
              required
              disabled={pending}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              required
              disabled={pending}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={pending}
          >
            {pending ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <span className="text-muted">Don&apos;t have an account?</span>{' '}
          <Link href="/pricing" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
