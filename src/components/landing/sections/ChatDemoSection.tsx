'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

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
    <section id="demo" className="relative z-10 border-y border-white/[0.06] bg-canvas-elevated/35 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wa">Live preview</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
          Your AI agent on WhatsApp — always on brand
        </h2>
        <div className="mx-auto mt-12 max-w-lg">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-canvas/90 shadow-card">
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-surface/80 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-wa text-canvas">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Thatmatters Assistant</p>
                <p className="text-xs text-wa">typing… live demo</p>
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
                    className={
                      m.role === 'user'
                        ? 'ml-10 rounded-2xl rounded-br-md bg-surface-muted/80 px-3 py-2.5 text-sm text-slate-100'
                        : 'mr-10 rounded-2xl rounded-bl-md bg-wa/15 px-3 py-2.5 text-sm text-slate-50 ring-1 ring-wa/25'
                    }
                  >
                    {m.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mr-10 flex gap-1 self-end rounded-2xl rounded-bl-md bg-wa/20 px-4 py-3"
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-2 w-2 rounded-full bg-wa"
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
