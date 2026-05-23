'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Cpu,
  Megaphone,
  BadgeCheck,
  Headphones,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

const items = [
  { icon: ShieldCheck, title: 'WhatsApp Business API', desc: 'Official, scalable messaging' },
  { icon: Cpu, title: 'AI automation', desc: 'LLM workflows & guardrails' },
  { icon: Megaphone, title: 'Campaign strategy', desc: 'Journeys that convert' },
  { icon: BadgeCheck, title: 'Verified templates', desc: 'Faster approvals' },
  { icon: Headphones, title: '24/7 support', desc: 'Launch + maintenance' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function TrustSection() {
  const { theme } = useTheme();

  return (
    <section
      id="trust"
      className={cn(
        "relative z-10 border-y transition-colors duration-500 py-20 sm:py-24",
        theme === 'dark'
          ? "border-white/[0.06] bg-canvas-elevated/40"
          : "border-black/[0.06] bg-gray-50"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-center font-display text-xs font-semibold uppercase tracking-[0.2em] transition duration-300",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>
          Built for operators
        </p>
        <h2 className={cn(
          "mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-black transition duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          Everything you expect from a serious WhatsApp stack
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={cn(
                "group rounded-2xl border p-5 shadow-sm transition duration-300",
                theme === 'dark'
                  ? "border-white/[0.06] bg-canvas/60 hover:border-wa/30 hover:shadow-[0_0_40px_-12px_rgb(37_211_102/0.25)]"
                  : "border-black/[0.08] bg-white hover:border-black hover:shadow-md"
              )}
            >
              <div className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition duration-300",
                theme === 'dark' ? "bg-wa/15 text-wa group-hover:bg-wa/25" : "bg-black/5 text-black"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className={cn(
                "mt-4 font-display text-sm font-black transition duration-300",
                theme === 'dark' ? "text-white" : "text-black"
              )}>
                {title}
              </h3>
              <p className={cn(
                "mt-1 text-xs leading-relaxed transition duration-300",
                theme === 'dark' ? "text-slate-400" : "text-gray-600 font-medium"
              )}>
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
