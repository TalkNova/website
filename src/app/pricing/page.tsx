import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Flexible pricing plans for WhatsApp marketing and support.',
};

type Plan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  popular?: boolean;
  cta: { href: string; label: string; primary: boolean };
};

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$29',
    desc: 'Perfect for small businesses.',
    features: [
      '1,000 marketing msgs/mo',
      '1 support agent',
      'Basic analytics',
      'Standard support',
    ],
    cta: { href: '/login', label: 'Get started', primary: false },
  },
  {
    name: 'Professional',
    price: '$99',
    desc: 'For growing teams and volume.',
    popular: true,
    features: [
      '10,000 marketing msgs/mo',
      '5 support agents',
      'Advanced analytics',
      'Priority support',
      'Automated workflows',
    ],
    cta: { href: '/login', label: 'Start free trial', primary: true },
  },
  {
    name: 'Enterprise',
    price: '$299',
    desc: 'For large scale operations.',
    features: [
      'Unlimited messages',
      'Unlimited agents',
      'Custom integrations',
      'Dedicated account manager',
    ],
    cta: { href: '/contact', label: 'Contact sales', primary: false },
  },
];

export default function PricingPage() {
  return (
    <PageShell blobs="pricing" navScrolled>
      <header className="px-4 pb-10 pt-28 text-center sm:px-6 lg:px-8 lg:pt-32">
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
          Simple, <span className="text-gradient-wa">transparent</span> pricing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
          Choose the perfect plan for your business needs. No hidden fees.
        </p>
      </header>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                plan.popular
                  ? 'border-wa/40 bg-wa/[0.08] shadow-[0_0_50px_-12px_rgb(37_211_102/0.35)]'
                  : 'border-white/[0.08] bg-surface/30'
              }`}
            >
              {plan.popular ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-wa to-accent-emerald px-3 py-0.5 text-xs font-bold text-canvas">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-2 text-4xl font-bold text-white">
                {plan.price}
                <span className="text-base font-normal text-slate-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-slate-300">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-wa">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta.href}
                className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition ${
                  plan.cta.primary
                    ? 'bg-wa text-canvas hover:bg-wa-dim'
                    : 'border border-white/15 text-white hover:border-wa/40'
                }`}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
