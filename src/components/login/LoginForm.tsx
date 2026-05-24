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

  const input =
    'w-full rounded-xl border border-white/10 bg-canvas/60 px-4 py-3 text-white outline-none transition focus:border-wa/50 disabled:opacity-50';

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-surface/40 p-8 shadow-card backdrop-blur-xl">
      <div className="text-center">
        <Link href="/" className="inline-flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Thatmatters"
            width={200}
            height={72}
            className="h-12 w-auto"
            priority
          />
        </Link>
        <h2 className="mt-4 font-display text-2xl font-bold text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-slate-400">Sign in to manage your campaigns</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="username" className="mb-1 block text-sm text-slate-400">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={input}
            placeholder="username"
            required
            disabled={pending}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-slate-400">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={input}
            placeholder="••••••••"
            required
            disabled={pending}
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-wa py-3 font-semibold text-canvas transition hover:bg-wa-dim disabled:opacity-60"
          disabled={pending}
        >
          {pending ? 'Signing in…' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link href="/pricing" className="font-semibold text-wa hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
