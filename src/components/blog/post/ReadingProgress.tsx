'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[1001] h-0.5 origin-left bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
