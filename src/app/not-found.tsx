import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

export default function NotFound() {
  return (
    <PageShell blobs="blog" navScrolled>
      <section className="section" style={{ paddingTop: '180px', minHeight: '60vh' }}>
        <div className="container text-center animate-on-scroll fade-up">
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1rem' }}>404</h1>
          <p className="text-secondary mb-4" style={{ fontSize: '1.1rem' }}>
            We could not find the page you were looking for.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
