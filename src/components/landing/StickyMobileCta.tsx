'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function StickyMobileCta() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 18 }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] bg-canvas/95 p-3 backdrop-blur-xl sm:hidden"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href="/contact"
          className="flex-1 rounded-full bg-wa py-3 text-center text-sm font-semibold text-canvas shadow-glow-wa"
        >
          Book demo
        </Link>
        <a
          href="https://wa.me/15551234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-white/15 py-3 text-center text-sm font-semibold text-white"
        >
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
