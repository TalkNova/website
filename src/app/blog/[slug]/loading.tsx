import { PageShell } from '@/components/layout/PageShell';

export default function BlogPostLoading() {
  return (
    <PageShell blobs="post" navScrolled>
      <header className="section" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container">
          <div
            className="shimmer-wrapper glass-card"
            style={{ height: '14px', width: '140px', marginBottom: '1rem', borderRadius: '8px' }}
          />
          <div
            className="shimmer-wrapper glass-card"
            style={{ height: '28px', width: '70%', marginBottom: '1rem', borderRadius: '8px' }}
          />
          <div
            className="shimmer-wrapper glass-card"
            style={{ height: '18px', width: '90%', marginBottom: '0.5rem', borderRadius: '8px' }}
          />
          <div
            className="shimmer-wrapper glass-card"
            style={{ height: '320px', width: '100%', marginTop: '2rem', borderRadius: '20px' }}
          />
        </div>
      </header>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="shimmer-wrapper glass-card" style={{ height: '120px', borderRadius: '12px' }} />
        </div>
      </section>
    </PageShell>
  );
}
