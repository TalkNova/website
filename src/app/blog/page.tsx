import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { BlogPostsGrid } from '@/components/blog/BlogPostsGrid';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights and updates on WhatsApp marketing.',
};

export default function BlogPage() {
  return (
    <PageShell blobs="blog" navScrolled>
      <header className="px-4 pb-10 pt-28 text-center sm:px-6 lg:px-8 lg:pt-32">
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
          Latest <span className="text-gradient-wa">insights</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
          Tips, tricks, and updates to maximize your WhatsApp strategy.
        </p>
      </header>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BlogPostsGrid />
        </div>
      </section>
    </PageShell>
  );
}
