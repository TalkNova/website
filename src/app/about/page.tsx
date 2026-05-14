import type { Metadata } from 'next';
import Image from 'next/image';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission to revolutionize WhatsApp communication.',
};

export default function AboutPage() {
  return (
    <PageShell blobs="about" navScrolled>
      <header className="section" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container text-center animate-on-scroll fade-up">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Our <span className="text-gradient">Mission</span>
          </h1>
          <p
            className="text-secondary"
            style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}
          >
            Bridging the gap between businesses and customers through seamless WhatsApp integration.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="split-grid" style={{ alignItems: 'center' }}>
            <div className="animate-on-scroll fade-right">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team working"
                width={800}
                height={600}
                sizes="(max-width: 992px) 100vw, 50vw"
                style={{ borderRadius: '20px', boxShadow: 'var(--glass-shadow)' }}
              />
            </div>
            <div className="animate-on-scroll fade-left">
              <h2 className="mb-2">How It All Started</h2>
              <p className="text-secondary mb-2">
                We noticed that businesses were struggling to manage WhatsApp conversations.
                Marketing campaigns were disconnected from support tickets, leading to a fragmented
                customer experience.
              </p>
              <p className="text-secondary">
                ThatMatter was built to solve this exact problem. By combining powerful marketing
                automation with a robust ticketing system, we empower teams to deliver exceptional
                service right where their customers already are.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
