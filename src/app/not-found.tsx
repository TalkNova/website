import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

export default function NotFound() {
  return (
    <PageShell blobs="blog" navScrolled>
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 pb-24 pt-32 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-6xl font-bold text-white">404</h1>
        <p className="mt-4 max-w-md text-lg text-slate-400">
          We could not find the page you were looking for.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-wa px-8 py-3 font-semibold text-canvas transition hover:bg-wa-dim"
        >
          Back to home
        </Link>
      </section>
    </PageShell>
  );
}
