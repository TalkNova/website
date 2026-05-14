'use client';

import { motion } from 'framer-motion';
import { Building2, Stethoscope, UtensilsCrossed, GraduationCap, ShoppingBag, Store } from 'lucide-react';

const industries = [
  { icon: Building2, title: 'Real estate', desc: 'Tour booking & nurture flows' },
  { icon: Stethoscope, title: 'Clinics', desc: 'Reminders, intake, and FAQs' },
  { icon: UtensilsCrossed, title: 'Restaurants', desc: 'Reservations & promos' },
  { icon: GraduationCap, title: 'Education', desc: 'Admissions assistant' },
  { icon: ShoppingBag, title: 'Ecommerce', desc: 'Cart recovery & support' },
  { icon: Store, title: 'Local businesses', desc: 'Lead capture & reviews' },
];

export function IndustriesSection() {
  return (
    <section className="relative z-10 border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wa">Industries</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
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
              className="rounded-2xl border border-white/[0.07] bg-canvas/60 p-6 transition hover:border-wa/30"
            >
              <Icon className="h-8 w-8 text-wa" />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
