import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

export default function BlogPostNotFound() {
  return (
    <PageShell blobs="blog" navScrolled>
      <section className="section" style={{ paddingTop: '180px', minHeight: '50vh' }}>
        <div className="container text-center animate-on-scroll fade-up">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>
            Post not found
          </h1>
          <p className="text-secondary mb-4">
            This article does not exist or may have been removed.
          </p>
          <Link href="/blog" className="btn btn-primary">
            View all posts
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
