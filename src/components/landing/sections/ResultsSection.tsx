'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

const stats = [
  { label: 'Faster replies', value: 80, suffix: '%' },
  { label: 'More leads', value: 3, suffix: 'X' },
  { label: 'Always-on support', value: 24, suffix: '/7' },
  { label: 'Higher conversion', value: 42, suffix: '%' },
];

function AnimatedNumber({
  value,
  suffix,
  enabled,
  theme,
}: {
  value: number;
  suffix: string;
  enabled: boolean;
  theme: 'light' | 'dark';
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    const start = performance.now();
    const dur = 1600;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) ** 3;
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, value]);

  return (
    <span
      className={cn(
        "font-display text-4xl font-black transition duration-300 sm:text-5xl",
        theme === 'dark' ? "text-white" : "text-black"
      )}
      suppressHydrationWarning
    >
      {n}
      {suffix}
    </span>
  );
}

export function ResultsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const { theme } = useTheme();

  return (
    <section id="results" className="relative z-10 py-20 sm:py-28 transition-colors duration-500">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em] transition duration-300",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>
          Outcomes
        </p>
        <h2 className={cn(
          "mt-2 font-display text-3xl font-black transition duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          Numbers teams feel within the first quarter
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className={cn(
                "rounded-2xl border p-6 text-center backdrop-blur-sm transition duration-300",
                theme === 'dark'
                  ? "border-white/[0.07] bg-surface/35"
                  : "border-black/[0.08] bg-white shadow-sm"
              )}
            >
              <AnimatedNumber value={s.value} suffix={s.suffix} enabled={inView} theme={theme} />
              <p className={cn(
                "mt-2 text-sm transition duration-300",
                theme === 'dark' ? "text-slate-400" : "text-gray-600 font-semibold"
              )}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
