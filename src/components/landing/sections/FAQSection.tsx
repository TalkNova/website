'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

const faqs = [
  {
    q: 'Do you support the official WhatsApp Business API?',
    a: 'Yes. We help you provision numbers, manage templates, and stay compliant with WhatsApp policies.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Most teams launch a first use case in 2–4 weeks depending on integrations and template approvals.',
  },
  {
    q: 'Can we keep humans in the loop?',
    a: 'Absolutely. We design escalation paths, VIP routing, and audit trails for every automation.',
  },
  {
    q: 'What about data security?',
    a: 'We follow least-privilege access, encrypted transit, and can align with your SOC2 / GDPR requirements.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { theme } = useTheme();

  return (
    <section className={cn(
      "relative z-10 border-t transition-colors duration-500 py-20 sm:py-28",
      theme === 'dark' ? "border-t border-white/[0.06]" : "border-t border-black/[0.06]"
    )}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-center text-xs font-semibold uppercase tracking-[0.2em] transition duration-300",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>FAQ</p>
        <h2 className={cn(
          "mt-2 text-center font-display text-3xl font-black transition duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          Answers before you ask
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={item.q}
                className={cn(
                  "overflow-hidden rounded-2xl border transition duration-300",
                  theme === 'dark'
                    ? "border-white/[0.07] bg-canvas/50"
                    : "border-black/[0.08] bg-white shadow-sm hover:border-black"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className={cn(
                    "font-bold transition duration-300",
                    theme === 'dark' ? "text-white" : "text-black"
                  )}>{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus className={cn("h-5 w-5 shrink-0 transition duration-300", theme === 'dark' ? "text-wa" : "text-black")} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className={cn(
                        "border-t transition duration-300",
                        theme === 'dark' ? "border-white/[0.06]" : "border-black/[0.06]"
                      )}
                    >
                      <p className={cn(
                        "px-5 py-4 text-sm leading-relaxed transition duration-300",
                        theme === 'dark' ? "text-slate-400" : "text-gray-600 font-semibold"
                      )}>{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
