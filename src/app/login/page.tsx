import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LoginForm } from '@/components/login/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your ThatMatter account.',
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas px-4 mesh-gradient">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <Link
        href="/"
        className="absolute left-4 top-4 z-10 flex items-center gap-2 text-sm text-slate-300 transition hover:text-wa sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
      <div className="relative z-10 flex w-full justify-center py-12">
        <LoginForm />
      </div>
    </div>
  );
}
