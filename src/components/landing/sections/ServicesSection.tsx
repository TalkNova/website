'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Zap,
  Users,
  Plug,
  FileCheck,
  LifeBuoy,
} from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI WhatsApp chatbot',
    desc: 'Natural dialogs, handoffs, and knowledge grounded in your business.',
  },
  {
    icon: Zap,
    title: 'Campaign automation',
    desc: 'Drip sequences, A/B tests, and compliance-aware broadcasts.',
  },
  {
    icon: Users,
    title: 'Lead generation',
    desc: 'Capture, qualify, and route leads automatically to CRM or sheets.',
  },
  {
    icon: Plug,
    title: 'API integration',
    desc: 'Connect Shopify, HubSpot, Zendesk, or custom stacks securely.',
  },
  {
    icon: FileCheck,
    title: 'Template approval',
    desc: 'Verified templates and faster Meta review cycles.',
  },
  {
    icon: LifeBuoy,
    title: 'Support automation',
    desc: 'Macros, SLAs, and human escalation when it matters.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wa">Services</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
          Premium automation modules, composed for your workflow
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/40 p-6 transition hover:border-wa/35 hover:shadow-[0_0_50px_-14px_rgb(37_211_102/0.35)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-wa/10 blur-2xl transition group-hover:bg-wa/20" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-wa/15 text-wa">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="relative mt-4 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
