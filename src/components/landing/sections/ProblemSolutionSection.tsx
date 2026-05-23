'use client';

import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

const problems = [
  'Slow replies lose deals',
  'Broadcasts feel spammy',
  'Agents burn out on repeat questions',
  'No visibility into funnel performance',
];

const solutions = [
  'AI replies in seconds with brand tone',
  'Segmented journeys + template governance',
  'Bots deflect tier-1, humans handle VIP',
  'Dashboards for pipeline & CSAT',
];

export function ProblemSolutionSection() {
  const { theme } = useTheme();

  return (
    <section className="relative z-10 py-20 sm:py-28 transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className={cn(
          "font-display text-3xl font-black transition-colors duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          From chaos to{' '}
          <span className={theme === 'dark' ? "text-gradient-wa" : "underline decoration-black decoration-[3px] underline-offset-[6px]"}>
            conversations that close
          </span>
        </h2>
        <p className={cn(
          "mt-3 max-w-2xl transition duration-500",
          theme === 'dark' ? "text-slate-400" : "text-gray-600 font-medium"
        )}>
          Most teams bolt on a chat widget. We engineer revenue-grade WhatsApp automation end to
          end.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Problems Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              "rounded-3xl border p-6 sm:p-8 transition duration-300",
              theme === 'dark'
                ? "border-red-500/20 bg-red-500/[0.06]"
                : "border-red-200 bg-red-50/50"
            )}
          >
            <div className={cn(
              "flex items-center gap-2 transition duration-300",
              theme === 'dark' ? "text-red-300" : "text-red-700"
            )}>
              <XCircle className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Problems</span>
            </div>
            <ul className="mt-6 space-y-4">
              {problems.map((p) => (
                <li
                  key={p}
                  className={cn(
                    "flex gap-3 text-sm transition duration-300",
                    theme === 'dark' ? "text-slate-300" : "text-gray-700 font-semibold"
                  )}
                >
                  <span className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    theme === 'dark' ? "bg-red-400/80" : "bg-red-600"
                  )} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions / Our Approach Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              "rounded-3xl border p-6 sm:p-8 transition duration-300",
              theme === 'dark'
                ? "border-wa/25 bg-wa/[0.07]"
                : "border-transparent bg-black"
            )}
          >
            <div className={cn(
              "flex items-center gap-2 transition duration-300",
              theme === 'dark' ? "text-wa" : "text-white"
            )}>
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Our approach</span>
            </div>
            <ul className="mt-6 space-y-4">
              {solutions.map((p) => (
                <li
                  key={p}
                  className={cn(
                    "flex gap-3 text-sm transition duration-300",
                    theme === 'dark' ? "text-slate-100" : "text-gray-200 font-medium"
                  )}
                >
                  <span className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    theme === 'dark' ? "bg-wa" : "bg-white"
                  )} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
