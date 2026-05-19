import { PageShell } from '@/components/layout/PageShell';

export default function BlogPostLoading() {
  return (
    <PageShell blobs="post" navScrolled>
      <div className="relative min-h-screen blog-mesh">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="mb-8 h-4 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="max-w-3xl space-y-4">
            <div className="h-6 w-24 animate-pulse rounded-full bg-violet-500/20" />
            <div className="h-12 w-full max-w-2xl animate-pulse rounded-xl bg-white/10" />
            <div className="h-5 max-w-xl animate-pulse rounded-lg bg-white/10 sm:w-3/4" />
            <div className="mt-8 flex gap-4">
              <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-white/10" />
              <div className="h-14 w-40 animate-pulse rounded-lg bg-white/10" />
            </div>
          </div>
          <div className="mt-10 aspect-[21/9] max-w-5xl animate-pulse rounded-3xl bg-white/10" />
          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="space-y-4">
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="h-32 animate-pulse rounded-2xl bg-white/10" />
            </div>
            <div className="hidden h-64 animate-pulse rounded-2xl bg-white/10 lg:block" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
