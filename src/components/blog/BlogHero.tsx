'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

type BlogHeroProps = {
  query: string;
  onQueryChange: (q: string) => void;
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function BlogHero({
  query,
  onQueryChange,
  categories,
  activeCategory,
  onCategoryChange,
}: BlogHeroProps) {
  return (
    <header className="relative px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8 lg:pt-32">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial="hidden"
        animate="show"
      >
        <motion.p
          custom={0}
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400"
        >
          Knowledge hub
        </motion.p>
        <motion.h1
          custom={1}
          variants={fadeUp}
          className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          AI Automation &{' '}
          <span className="text-gradient-blog">WhatsApp Growth</span> Insights
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400"
        >
          Learn AI automation, WhatsApp marketing, chatbot systems, and customer engagement
          strategies from operators building on the Business API.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} className="relative mx-auto mt-10 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search articles, topics, tags…"
            aria-label="Search blog articles"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-4 text-white placeholder:text-slate-500 backdrop-blur-xl transition focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === null
                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_24px_-4px_rgb(139_92_246/0.6)]'
                : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-violet-500/40 hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_24px_-4px_rgb(139_92_246/0.6)]'
                  : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:border-violet-500/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </header>
  );
}
