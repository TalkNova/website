import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the ThatMatter team.',
};

export default function ContactPage() {
  return (
    <PageShell blobs="contact" navScrolled>
      <section className="section" style={{ paddingTop: '150px', minHeight: 'calc(100vh - 300px)' }}>
        <div className="container">
          <div className="split-grid">
            <div className="animate-on-scroll fade-right">
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-secondary mb-4">
                Have a question about our pricing, features, or anything else? Our team is ready to
                answer all your questions.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      fontSize: '1.2rem',
                    }}
                  >
                    <i className="fa-solid fa-envelope" aria-hidden />
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>Email Us</h4>
                    <span className="text-muted">support@thatmatter.com</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-secondary)',
                      fontSize: '1.2rem',
                    }}
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden />
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>WhatsApp Us</h4>
                    <span className="text-muted">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card animate-on-scroll fade-left delay-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
