'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const slides = [
  {
    quote:
      'We replaced three tools with ThatMatter. CSAT is up and our team finally sleeps at night.',
    name: 'Priya N.',
    role: 'COO, Series B SaaS',
  },
  {
    quote: 'Launch was white-glove. Templates approved fast and the AI tone matches our brand.',
    name: 'Marcus L.',
    role: 'Head of Growth, Fintech',
  },
  {
    quote: 'WhatsApp became our #1 revenue channel within six weeks. The automation is surgical.',
    name: 'Elena R.',
    role: 'VP Sales, Ecommerce',
  },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const prev = () => setI((x) => (x - 1 + slides.length) % slides.length);
  const next = () => setI((x) => (x + 1) % slides.length);

  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-wa">
          Testimonials
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-bold text-white sm:text-4xl">
          Loved by teams who ship
        </h2>
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/30 p-8 sm:p-12">
          <Quote className="absolute right-8 top-8 h-10 w-10 text-wa/20" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display text-xl font-medium leading-relaxed text-slate-100 sm:text-2xl">
                “{slides[i].quote}”
              </p>
              <div className="mt-8">
                <p className="font-semibold text-white">{slides[i].name}</p>
                <p className="text-sm text-slate-400">{slides[i].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-wa/40 hover:text-wa"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition ${
                    idx === i ? 'w-8 bg-wa' : 'w-2 bg-white/20 hover:bg-white/35'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-wa/40 hover:text-wa"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
