import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { LiveChatMock } from '@/components/home/LiveChatMock';

export default function HomePage() {
  return (
    <PageShell blobs="home">
      <header
        className="section hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '100px',
        }}
      >
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-on-scroll fade-right">
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>
                Transform Your <span className="text-gradient">WhatsApp</span> Strategy
              </h1>
              <p className="text-secondary" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                Send targeted marketing campaigns and resolve customer issues instantly, all from
                one powerful platform.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/pricing" className="btn btn-primary pulse-button">
                  Get Started
                </Link>
                <Link href="/about" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-image animate-on-scroll fade-left delay-200">
              <LiveChatMock />
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center animate-on-scroll fade-up mb-5">
            <h2>
              Everything You Need in <span className="text-gradient">One App</span>
            </h2>
            <p className="text-secondary">Streamline your communication and boost sales.</p>
          </div>

          <div className="grid grid-3">
            <div className="glass-card animate-on-scroll fade-up delay-100">
              <i
                className="fa-solid fa-bullhorn"
                style={{
                  fontSize: '2.5rem',
                  color: 'var(--accent-primary)',
                  marginBottom: '1.5rem',
                }}
                aria-hidden
              />
              <h3>Bulk Marketing</h3>
              <p className="text-muted">
                Send personalized WhatsApp messages to thousands of customers in just one click.
              </p>
            </div>
            <div className="glass-card animate-on-scroll fade-up delay-200">
              <i
                className="fa-solid fa-headset"
                style={{
                  fontSize: '2.5rem',
                  color: 'var(--accent-secondary)',
                  marginBottom: '1.5rem',
                }}
                aria-hidden
              />
              <h3>Ticketing System</h3>
              <p className="text-muted">
                Automatically organize and resolve customer queries with our smart inbox routing.
              </p>
            </div>
            <div className="glass-card animate-on-scroll fade-up delay-300">
              <i
                className="fa-solid fa-chart-line"
                style={{ fontSize: '2.5rem', color: '#f59e0b', marginBottom: '1.5rem' }}
                aria-hidden
              />
              <h3>Rich Analytics</h3>
              <p className="text-muted">
                Track open rates, replies, and resolution times with detailed dashboard insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
