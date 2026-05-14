import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Flexible pricing plans for WhatsApp marketing and support.',
};

export default function PricingPage() {
  return (
    <PageShell blobs="pricing" navScrolled>
      <header className="section" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container text-center animate-on-scroll fade-up">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h1>
          <p
            className="text-secondary"
            style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}
          >
            Choose the perfect plan for your business needs. No hidden fees.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3" style={{ gap: '2rem', alignItems: 'center' }}>
            <div className="glass-card pricing-card animate-on-scroll fade-up delay-100">
              <div className="pricing-header">
                <h3>Starter</h3>
                <div className="price">
                  $29<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span>
                </div>
                <p className="text-muted">Perfect for small businesses.</p>
              </div>
              <ul className="features-list">
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> 1,000 Marketing Msgs/mo
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> 1 Support Agent
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Basic Analytics
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Standard Support
                </li>
              </ul>
              <Link href="/login" className="btn btn-outline" style={{ width: '100%' }}>
                Get Started
              </Link>
            </div>

            <div
              className="glass-card pricing-card card-popular animate-on-scroll zoom-in delay-200"
              style={{ transform: 'scale(1.05)' }}
            >
              <div className="popular-badge">MOST POPULAR</div>
              <div className="pricing-header">
                <h3>Professional</h3>
                <div className="price">
                  $99<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span>
                </div>
                <p className="text-muted">For growing teams and volume.</p>
              </div>
              <ul className="features-list">
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> 10,000 Marketing Msgs/mo
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> 5 Support Agents
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Advanced Analytics & Reports
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Priority Support
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Automated Workflows
                </li>
              </ul>
              <Link href="/login" className="btn btn-primary pulse-button" style={{ width: '100%' }}>
                Start Free Trial
              </Link>
            </div>

            <div className="glass-card pricing-card animate-on-scroll fade-up delay-300">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="price">
                  $299<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span>
                </div>
                <p className="text-muted">For large scale operations.</p>
              </div>
              <ul className="features-list">
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Unlimited Messages
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Unlimited Agents
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Custom Integrations
                </li>
                <li>
                  <i className="fa-solid fa-check" aria-hidden /> Dedicated Account Manager
                </li>
              </ul>
              <Link href="/contact" className="btn btn-outline" style={{ width: '100%' }}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
