'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, MessageCircle, Sparkles, BarChart3, Bot } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${(i * 7 + 13) % 100}%`,
  y: `${(i * 11 + 5) % 100}%`,
  delay: i * 0.08,
  dur: 10 + (i % 5),
}));

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className="relative z-10 px-4 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-32 lg:px-8 lg:pt-36">
      {theme === 'dark' && particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-wa/40"
          style={{ left: p.x, top: p.y }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider sm:text-sm transition duration-300",
              theme === 'dark'
                ? "border-wa/25 bg-wa/10 text-wa"
                : "border-black/10 bg-black/5 text-black"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            AI + WhatsApp Business API
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className={cn(
              "mt-6 font-display text-4xl font-black leading-[1.08] tracking-tight transition duration-500 sm:text-5xl lg:text-[3.35rem] xl:text-6xl",
              theme === 'dark' ? "text-white" : "text-black"
            )}
          >
            Automate Your Business on{' '}
            <span className={theme === 'dark' ? "text-gradient-wa" : "underline decoration-black decoration-[3px] underline-offset-[6px]"}>
              WhatsApp with AI
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className={cn(
              "mt-6 max-w-xl text-base leading-relaxed transition duration-500 sm:text-lg",
              theme === 'dark' ? "text-slate-400" : "text-gray-600 font-medium"
            )}
          >
            Convert more leads, automate customer conversations, and grow sales 24/7 with
            AI-powered WhatsApp automation, verified templates, and dedicated launch support.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300 sm:text-base",
                theme === 'dark'
                  ? "bg-wa text-canvas shadow-[0_0_40px_-6px_rgb(37_211_102/0.65)] hover:bg-wa-dim"
                  : "bg-black text-white hover:bg-gray-900 shadow-sm"
              )}
            >
              Book free demo
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://wa.me/917483358716"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition duration-300 sm:text-base",
                theme === 'dark'
                  ? "border-white/15 bg-white/[0.04] text-white hover:border-wa/40 hover:bg-white/[0.07]"
                  : "border-black bg-white text-black hover:bg-black hover:text-white"
              )}
            >
              <MessageCircle className="h-4 w-4 text-wa" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.p
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className={cn(
              "mt-8 text-xs transition duration-300 sm:text-sm",
              theme === 'dark' ? "text-slate-500" : "text-gray-500 font-semibold"
            )}
          >
            WhatsApp Business API · Verified templates · Enterprise-grade security
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative"
        >
          {theme === 'dark' && (
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-wa/20 via-accent-emerald/10 to-accent-cyan/15 blur-2xl" />
          )}
          <div className={cn(
            "relative overflow-hidden rounded-[1.75rem] border p-5 shadow-md sm:p-6 transition duration-500",
            theme === 'dark'
              ? "border-white/[0.08] glass-panel shadow-card"
              : "border-black/[0.08] bg-white shadow-lg"
          )}>
            <div className={cn(
              "flex items-center justify-between border-b pb-4 transition duration-300",
              theme === 'dark' ? "border-white/[0.06]" : "border-black/[0.06]"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl transition duration-300",
                  theme === 'dark' ? "bg-wa/20 text-wa" : "bg-black/5 text-black"
                )}>
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <p className={cn(
                    "text-sm font-black transition duration-300",
                    theme === 'dark' ? "text-white" : "text-black"
                  )}>ThatMatters AI</p>
                  <p className={cn(
                    "text-xs transition duration-300",
                    theme === 'dark' ? "text-wa" : "text-black font-semibold"
                  )}>● Active · replies in &lt;2s</p>
                </div>
              </div>
              <BarChart3 className={cn(
                "h-5 w-5 transition duration-300",
                theme === 'dark' ? "text-slate-500" : "text-gray-400"
              )} />
            </div>
            <div className="mt-4 space-y-3">
              {[
                { side: 'user' as const, text: 'I need pricing for 3 agents and campaigns.' },
                { side: 'bot' as const, text: 'Happy to help. Here are plans + ROI benchmarks for your team.' },
                { side: 'user' as const, text: 'Send me a calendar link for tomorrow.' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.side === 'user' ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.35, duration: 0.4 }}
                  className={cn(
                    "px-4 py-3 text-sm transition duration-300",
                    m.side === 'user'
                      ? theme === 'dark'
                        ? 'ml-8 rounded-2xl rounded-br-md bg-surface text-slate-200'
                        : 'ml-8 rounded-2xl rounded-br-md bg-gray-100 text-gray-800 font-semibold'
                      : theme === 'dark'
                        ? 'mr-8 rounded-2xl rounded-bl-md bg-wa/15 text-slate-100 ring-1 ring-wa/25'
                        : 'mr-8 rounded-2xl rounded-bl-md bg-black text-white font-medium'
                  )}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { k: 'Open rate', v: '72%' },
                { k: 'Leads / wk', v: '184' },
                { k: 'CSAT', v: '4.9' },
              ].map((c) => (
                <div
                  key={c.k}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-center transition duration-300",
                    theme === 'dark'
                      ? "border-white/[0.06] bg-canvas/50"
                      : "border-black/[0.06] bg-gray-50"
                  )}
                >
                  <p className={cn(
                    "text-lg font-black transition duration-300",
                    theme === 'dark' ? "text-white" : "text-black"
                  )}>{c.v}</p>
                  <p className={cn(
                    "text-[10px] uppercase tracking-wider transition duration-300",
                    theme === 'dark' ? "text-slate-500" : "text-gray-500 font-semibold"
                  )}>{c.k}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-16 flex justify-center"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <a href="#trust" className={cn(
          "flex flex-col items-center gap-1 transition duration-300",
          theme === 'dark' ? "text-slate-500" : "text-gray-500"
        )}>
          <span className="text-xs uppercase tracking-widest font-semibold">Explore</span>
          <ChevronDown className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}
