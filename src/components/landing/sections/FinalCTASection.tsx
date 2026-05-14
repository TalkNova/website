'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-wa/25 bg-gradient-to-br from-wa/15 via-canvas to-accent-cyan/10 px-6 py-16 text-center sm:px-12 sm:py-20">
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-60"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgb(37 211 102 / 0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgb(34 211 238 / 0.12), transparent 45%)',
              backgroundSize: '200% 200%',
            }}
          />
          <Sparkles className="mx-auto h-8 w-8 text-wa" />
          <h2 className="relative mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to scale your business with WhatsApp AI?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slate-300">
            Book a tailored walkthrough. We will map automations, integrations, and launch milestones
            to your KPIs.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-wa px-8 py-3.5 text-sm font-semibold text-canvas shadow-[0_0_48px_-8px_rgb(37_211_102/0.7)] transition hover:bg-wa-dim sm:text-base"
            >
              Schedule demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-wa/40 sm:text-base"
            >
              Start automation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
