import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, MessageCircle } from 'lucide-react';
import { canonicalFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description: 'Schedule a tailored walkthrough with the Thatmatters team.',
  ...canonicalFor('/contact'),
};

export default function ContactPage() {
  return (
    <PageShell blobs="contact" navScrolled>
      <section className="min-h-[calc(100vh-8rem)] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Book a <span className="text-gradient-wa">demo</span>
            </h1>
            <p className="mt-4 text-slate-400">
              Share your details and we&apos;ll schedule a tailored walkthrough — automations,
              integrations, and launch milestones aligned to your goals.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wa/15 text-wa">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-white">Email us</p>
                  <p className="text-sm text-slate-400">support@thatmatters.in</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-cyan/15 text-accent-cyan">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-white">WhatsApp</p>
                  <p className="text-sm text-slate-400">+91 7483358716</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-surface/30 p-6 backdrop-blur sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
