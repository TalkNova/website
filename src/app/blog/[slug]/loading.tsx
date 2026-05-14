import { PageShell } from '@/components/layout/PageShell';

export default function BlogPostLoading() {
  return (
    <PageShell blobs="post" navScrolled>
      <header className="px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 h-3 w-36 animate-pulse rounded-full bg-white/10" />
          <div className="mb-4 h-10 max-w-xl animate-pulse rounded-xl bg-white/10 sm:w-[80%]" />
          <div className="mb-2 h-4 w-full animate-pulse rounded-lg bg-white/10" />
          <div className="mb-8 h-4 w-3/4 animate-pulse rounded-lg bg-white/10" />
          <div className="aspect-[21/9] w-full animate-pulse rounded-2xl bg-white/10" />
        </div>
      </header>
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-28 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-40 animate-pulse rounded-2xl bg-white/10" />
        </div>
      </section>
    </PageShell>
  );
}
