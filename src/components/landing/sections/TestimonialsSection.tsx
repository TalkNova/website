'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

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
  const { theme } = useTheme();
  const prev = () => setI((x) => (x - 1 + slides.length) % slides.length);
  const next = () => setI((x) => (x + 1) % slides.length);

  return (
    <section className="relative z-10 py-20 sm:py-28 transition-colors duration-500">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-center text-xs font-semibold uppercase tracking-[0.2em] transition duration-300",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>
          Testimonials
        </p>
        <h2 className={cn(
          "mt-2 text-center font-display text-3xl font-black transition duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          Loved by teams who ship
        </h2>
        <div className={cn(
          "relative mt-12 overflow-hidden rounded-3xl border p-8 sm:p-12 transition duration-500",
          theme === 'dark'
            ? "border-white/[0.08] bg-surface/30"
            : "border-black/[0.08] bg-white shadow-lg"
        )}>
          <Quote className={cn(
            "absolute right-8 top-8 h-10 w-10 transition duration-300",
            theme === 'dark' ? "text-wa/20" : "text-black/10"
          )} />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <p className={cn(
                "font-display text-xl font-medium leading-relaxed transition duration-300 sm:text-2xl",
                theme === 'dark' ? "text-slate-100" : "text-black"
              )}>
                “{slides[i].quote}”
              </p>
              <div className="mt-8">
                <p className={cn(
                  "font-bold transition duration-300",
                  theme === 'dark' ? "text-white" : "text-black"
                )}>{slides[i].name}</p>
                <p className={cn(
                  "text-sm transition duration-300",
                  theme === 'dark' ? "text-slate-400" : "text-gray-600 font-medium"
                )}>{slides[i].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              className={cn(
                "rounded-full border p-2 transition duration-300",
                theme === 'dark'
                  ? "border-white/10 text-slate-300 hover:border-wa/40 hover:text-wa"
                  : "border-black/10 text-black hover:border-black"
              )}
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
                  className={cn(
                    "h-2 rounded-full transition duration-300",
                    idx === i
                      ? theme === 'dark' ? 'w-8 bg-wa' : 'w-8 bg-black'
                      : theme === 'dark' ? 'w-2 bg-white/20 hover:bg-white/35' : 'w-2 bg-black/20 hover:bg-black/35'
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className={cn(
                "rounded-full border p-2 transition duration-300",
                theme === 'dark'
                  ? "border-white/10 text-slate-300 hover:border-wa/40 hover:text-wa"
                  : "border-black/10 text-black hover:border-black"
              )}
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
