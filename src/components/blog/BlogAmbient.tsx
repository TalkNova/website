'use client';

import { motion } from 'framer-motion';

const orbs = [
  { className: 'left-[-10%] top-[8%] h-72 w-72 bg-violet-600/25', delay: 0 },
  { className: 'right-[-5%] top-[20%] h-96 w-96 bg-blue-600/20', delay: 0.4 },
  { className: 'left-[30%] bottom-[10%] h-80 w-80 bg-cyan-500/15', delay: 0.8 },
];

export function BlogAmbient() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 blog-mesh"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />
      {orbs.map((orb) => (
        <motion.div
          key={orb.className}
          className={`absolute rounded-full blur-[100px] ${orb.className}`}
          animate={{ y: [0, -24, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  );
}
