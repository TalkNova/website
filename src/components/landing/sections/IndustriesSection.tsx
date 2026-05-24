'use client';

import { motion } from 'framer-motion';
import { Building2, Stethoscope, UtensilsCrossed, GraduationCap, ShoppingBag, Store } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/cn';

const industries = [
  { icon: Building2, title: 'Real estate', desc: 'Tour booking & nurture flows' },
  { icon: Stethoscope, title: 'Clinics', desc: 'Reminders, intake, and FAQs' },
  { icon: UtensilsCrossed, title: 'Restaurants', desc: 'Reservations & promos' },
  { icon: GraduationCap, title: 'Education', desc: 'Admissions assistant' },
  { icon: ShoppingBag, title: 'Ecommerce', desc: 'Cart recovery & support' },
  { icon: Store, title: 'Local businesses', desc: 'Lead capture & reviews' },
];

export function IndustriesSection() {
  const { theme } = useTheme();

  return (
    <section className={cn(
      "relative z-10 border-t transition-colors duration-500 py-20 sm:py-28",
      theme === 'dark' ? "border-white/[0.06]" : "border-black/[0.06]"
    )}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em] transition duration-300",
          theme === 'dark' ? "text-wa" : "text-black"
        )}>
          Industries
        </p>
        <h2 className={cn(
          "mt-2 font-display text-3xl font-black transition duration-500 sm:text-4xl",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          Playbooks tuned for your vertical
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "rounded-2xl border p-6 transition duration-300",
                theme === 'dark'
                  ? "border-white/[0.07] bg-canvas/60 hover:border-wa/30"
                  : "border-black/[0.08] bg-white hover:border-black hover:shadow-sm"
              )}
            >
              <Icon className={cn("h-8 w-8 transition duration-300", theme === 'dark' ? "text-wa" : "text-black")} />
              <h3 className={cn(
                "mt-4 font-display text-lg font-black transition duration-300",
                theme === 'dark' ? "text-white" : "text-black"
              )}>
                {title}
              </h3>
              <p className={cn(
                "mt-1 text-sm transition duration-300",
                theme === 'dark' ? "text-slate-400" : "text-gray-600 font-medium"
              )}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
