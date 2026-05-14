'use client';

import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const problems = [
  'Slow replies lose deals',
  'Broadcasts feel spammy',
  'Agents burn out on repeat questions',
  'No visibility into funnel performance',
];

const solutions = [
  'AI replies in seconds with brand tone',
  'Segmented journeys + template governance',
  'Bots deflect tier-1, humans handle VIP',
  'Dashboards for pipeline & CSAT',
];

export function ProblemSolutionSection() {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          From chaos to <span className="text-gradient-wa">conversations that close</span>
        </h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Most teams bolt on a chat widget. We engineer revenue-grade WhatsApp automation end to
          end.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-red-300">
              <XCircle className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Problems</span>
            </div>
            <ul className="mt-6 space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/80" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-wa/25 bg-wa/[0.07] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-wa">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Our approach</span>
            </div>
            <ul className="mt-6 space-y-4">
              {solutions.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-slate-100">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wa" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
