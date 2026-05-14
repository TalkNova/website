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
      <header className="section" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container text-center animate-on-scroll fade-up">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Latest <span className="text-gradient">Insights</span>
          </h1>
          <p
            className="text-secondary"
            style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}
          >
            Tips, tricks, and updates to maximize your WhatsApp strategy.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <BlogPostsGrid />
        </div>
      </section>
    </PageShell>
  );
}
