'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Wrench, Brain, Rocket } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

const steps = [
  { n: '01', title: 'Consultation', desc: 'Goals, channels, compliance, and success metrics.', icon: MessageSquare },
  { n: '02', title: 'Setup', desc: 'Numbers, WABA, webhooks, and CRM integrations.', icon: Wrench },
  { n: '03', title: 'AI training', desc: 'Policies, tone, FAQs, and escalation paths.', icon: Brain },
  { n: '04', title: 'Launch & support', desc: 'Monitoring, tuning, and proactive maintenance.', icon: Rocket },
];

export function HowItWorksSection() {
  const { theme } = useTheme();

  return (
    <section id="how" className="relative z-10 py-20 sm:py-28 transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em] transition duration-300",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>
          How it works
        </p>
        <h2 className={cn(
          "mt-2 font-display text-3xl font-black transition duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          Ship in weeks, not quarters
        </h2>
        <div className="relative mt-14 grid gap-10 md:grid-cols-4">
          <div className={cn(
            "pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 md:block transition duration-300",
            theme === 'dark'
              ? "bg-gradient-to-r from-wa/0 via-wa/50 to-wa/0"
              : "bg-gradient-to-r from-black/0 via-black/20 to-black/0"
          )} />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl border transition duration-300",
                theme === 'dark'
                  ? "border-wa/30 bg-canvas text-wa shadow-[0_0_30px_-8px_rgb(37_211_102/0.5)]"
                  : "border-black bg-white text-black shadow-sm"
              )}>
                <s.icon className="h-6 w-6" />
              </div>
              <p className={cn(
                "mt-4 text-xs font-bold transition duration-300",
                theme === 'dark' ? "text-wa" : "text-black"
              )}>
                {s.n}
              </p>
              <h3 className={cn(
                "mt-1 font-display text-lg font-black transition duration-300",
                theme === 'dark' ? "text-white" : "text-black"
              )}>
                {s.title}
              </h3>
              <p className={cn(
                "mt-2 text-sm transition duration-300",
                theme === 'dark' ? "text-slate-400" : "text-gray-600 font-medium"
              )}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
