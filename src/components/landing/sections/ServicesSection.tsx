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
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

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
  const { theme } = useTheme();

  return (
    <section
      id="services"
      className={cn(
        "relative z-10 border-t py-20 sm:py-28 transition-colors duration-500",
        theme === 'dark' ? "border-white/[0.06]" : "border-black/[0.06]"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>
          Services
        </p>
        <h2 className={cn(
          "mt-2 max-w-2xl font-display text-3xl font-black transition-colors duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
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
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-6 transition duration-300",
                theme === 'dark'
                  ? "border-white/[0.07] bg-surface/40 hover:border-wa/35 hover:shadow-[0_0_50px_-14px_rgb(37_211_102/0.35)]"
                  : "border-black/[0.08] bg-white hover:border-black hover:shadow-md"
              )}
            >
              {theme === 'dark' && (
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-wa/10 blur-2xl transition group-hover:bg-wa/20" />
              )}
              <div className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-xl transition duration-300",
                theme === 'dark' ? "bg-wa/15 text-wa" : "bg-black/5 text-black"
              )}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className={cn(
                "relative mt-4 font-display text-lg font-black transition duration-300",
                theme === 'dark' ? "text-white" : "text-black"
              )}>
                {title}
              </h3>
              <p className={cn(
                "relative mt-2 text-sm leading-relaxed transition duration-300",
                theme === 'dark' ? "text-slate-400" : "text-gray-600 font-medium"
              )}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
