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
      <header className="px-4 pb-12 pt-28 text-center sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Our <span className="text-gradient-wa">Mission</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Bridging the gap between businesses and customers through seamless WhatsApp integration.
          </p>
        </div>
      </header>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team working"
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              How it all started
            </h2>
            <p className="mt-4 text-slate-400">
              We noticed that businesses were struggling to manage WhatsApp conversations. Marketing
              campaigns were disconnected from support tickets, leading to a fragmented customer
              experience.
            </p>
            <p className="mt-4 text-slate-400">
              ThatMatter was built to solve this exact problem. By combining powerful marketing
              automation with a robust ticketing system, we empower teams to deliver exceptional
              service right where their customers already are.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
