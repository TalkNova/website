'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Wrench, Brain, Rocket } from 'lucide-react';

const steps = [
  { n: '01', title: 'Consultation', desc: 'Goals, channels, compliance, and success metrics.', icon: MessageSquare },
  { n: '02', title: 'Setup', desc: 'Numbers, WABA, webhooks, and CRM integrations.', icon: Wrench },
  { n: '03', title: 'AI training', desc: 'Policies, tone, FAQs, and escalation paths.', icon: Brain },
  { n: '04', title: 'Launch & support', desc: 'Monitoring, tuning, and proactive maintenance.', icon: Rocket },
];

export function HowItWorksSection() {
  return (
    <section id="how" className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wa">How it works</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          Ship in weeks, not quarters
        </h2>
        <div className="relative mt-14 grid gap-10 md:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-wa/0 via-wa/50 to-wa/0 md:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-wa/30 bg-canvas text-wa shadow-[0_0_30px_-8px_rgb(37_211_102/0.5)]">
                <s.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-bold text-wa">{s.n}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
