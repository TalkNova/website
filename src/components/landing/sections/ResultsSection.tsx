'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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
}: {
  value: number;
  suffix: string;
  enabled: boolean;
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
    <span className="font-display text-4xl font-bold text-white sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export function ResultsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section id="results" className="relative z-10 py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wa">Outcomes</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          Numbers teams feel within the first quarter
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.07] bg-surface/35 p-6 text-center backdrop-blur-sm"
            >
              <AnimatedNumber value={s.value} suffix={s.suffix} enabled={inView} />
              <p className="mt-2 text-sm text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
