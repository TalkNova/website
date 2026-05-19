'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

const variants = [
  {
    icon: Sparkles,
    title: 'Book Free WhatsApp AI Consultation',
    desc: 'Map your use cases, templates, and automation stack with our team.',
    cta: 'Schedule demo',
    href: '/contact',
    gradient: 'from-violet-600/20 to-blue-600/20',
    glow: 'rgb(139 92 246 / 0.4)',
  },
  {
    icon: MessageCircle,
    title: 'Get AI Chatbot Setup',
    desc: 'Launch a qualified lead bot on WhatsApp in weeks—not months.',
    cta: 'Start automation',
    href: '/contact',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    glow: 'rgb(59 130 246 / 0.4)',
  },
  {
    icon: MessageCircle,
    title: 'Scale Customer Support Using AI',
    desc: 'Resolve FAQs instantly and hand off to humans with full context.',
    cta: 'Chat on WhatsApp',
    href: 'https://wa.me/15551234567',
    gradient: 'from-emerald-600/20 to-cyan-600/20',
    glow: 'rgb(37 211 102 / 0.35)',
  },
] as const;

type BlogCTAProps = {
  index: number;
};

export function BlogCTA({ index }: BlogCTAProps) {
  const v = variants[index % variants.length];
  const Icon = v.icon;
  const isExternal = v.href.startsWith('http');

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${v.gradient} p-6 sm:p-8`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
        style={{ background: v.glow }}
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-violet-300">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold text-white">{v.title}</h3>
            <p className="mt-1 max-w-lg text-sm text-slate-400">{v.desc}</p>
          </div>
        </div>
        {isExternal ? (
          <a
            href={v.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-wa px-6 py-2.5 text-sm font-semibold text-canvas shadow-[0_0_28px_-6px_rgb(37_211_102/0.6)] transition hover:bg-wa-dim sm:w-auto lg:shrink-0"
          >
            {v.cta}
          </a>
        ) : (
          <Link
            href={v.href}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_-6px_rgb(139_92_246/0.5)] transition hover:shadow-[0_0_36px_-4px_rgb(139_92_246/0.7)] sm:w-auto lg:shrink-0"
          >
            {v.cta}
          </Link>
        )}
      </div>
    </motion.aside>
  );
}
