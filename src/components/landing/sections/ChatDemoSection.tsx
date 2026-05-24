'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

type Line = { id: string; role: 'user' | 'bot'; text: string };

const conversation: Line[] = [
  { id: 'a', role: 'user', text: 'Can you qualify leads before routing to sales?' },
  { id: 'b', role: 'bot', text: 'Absolutely — I score intent, budget, and timeline in real time.' },
  { id: 'c', role: 'user', text: 'Send the weekly digest to our Slack too.' },
  { id: 'd', role: 'bot', text: 'Done. Digest + WhatsApp summary will hit #growth every Monday 9am.' },
];

export function ChatDemoSection() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const loop = async () => {
      while (!cancelled) {
        setLines([]);
        for (let step = 0; step < conversation.length && !cancelled; step++) {
          const line = conversation[step];
          if (line.role === 'bot') {
            setTyping(true);
            await sleep(900);
            if (cancelled) return;
            setTyping(false);
          } else {
            await sleep(400);
          }
          if (cancelled) return;
          setLines((prev) => [...prev, line]);
          await sleep(1400);
        }
        await sleep(2200);
      }
    };

    void loop();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="demo"
      className={cn(
        "relative z-10 border-y transition-colors duration-500 py-20 sm:py-28",
        theme === 'dark'
          ? "border-white/[0.06] bg-canvas-elevated/35"
          : "border-black/[0.06] bg-gray-50"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em] transition duration-300",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>
          Live preview
        </p>
        <h2 className={cn(
          "mt-2 font-display text-3xl font-black transition duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          Your AI agent on WhatsApp — always on brand
        </h2>
        <div className="mx-auto mt-12 max-w-lg">
          <div className={cn(
            "overflow-hidden rounded-[1.5rem] border shadow-md transition duration-500",
            theme === 'dark'
              ? "border-white/[0.08] bg-canvas/90 shadow-card"
              : "border-black/[0.08] bg-white shadow-lg"
          )}>
            <div className={cn(
              "flex items-center gap-3 border-b px-4 py-3 transition duration-300",
              theme === 'dark'
                ? "border-white/[0.06] bg-surface/80"
                : "border-black/[0.06] bg-gray-100/50"
            )}>
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition duration-300",
                theme === 'dark' ? "bg-wa text-canvas" : "bg-black text-white"
              )}>
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className={cn(
                  "text-sm font-black transition duration-300",
                  theme === 'dark' ? "text-white" : "text-black"
                )}>
                  ThatMatters Assistant
                </p>
                <p className={cn(
                  "text-xs transition duration-300",
                  theme === 'dark' ? "text-wa" : "text-black font-semibold"
                )}>
                  typing… live demo
                </p>
              </div>
            </div>
            <div className="flex h-[340px] flex-col gap-3 overflow-y-auto p-4">
              <AnimatePresence initial={false}>
                {lines.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "px-3 py-2.5 text-sm transition duration-300",
                      m.role === 'user'
                        ? theme === 'dark'
                          ? 'ml-10 rounded-2xl rounded-br-md bg-surface-muted/80 text-slate-100'
                          : 'ml-10 rounded-2xl rounded-br-md bg-gray-100 text-gray-800 font-semibold'
                        : theme === 'dark'
                          ? 'mr-10 rounded-2xl rounded-bl-md bg-wa/15 text-slate-50 ring-1 ring-wa/25'
                          : 'mr-10 rounded-2xl rounded-bl-md bg-black text-white font-medium'
                    )}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "mr-10 flex gap-1 self-end px-4 py-3 rounded-2xl rounded-bl-md transition duration-300",
                    theme === 'dark' ? "bg-wa/20" : "bg-black/5"
                  )}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className={cn(
                        "h-2 w-2 rounded-full transition duration-300",
                        theme === 'dark' ? "bg-wa" : "bg-black"
                      )}
                      animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
