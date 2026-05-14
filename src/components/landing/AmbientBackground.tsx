'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function AmbientBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 28 });
  const sy = useSpring(my, { stiffness: 80, damping: 28 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${sx}px ${sy}px, rgb(37 211 102 / 0.12), transparent 55%)`;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 mesh-gradient opacity-90" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-wa/20 blur-[120px]" />
      <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent-cyan/15 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-emerald/10 blur-[100px]" />
    </div>
  );
}
