'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, TrendingUp } from 'lucide-react';
import type { BlogPost } from '@/content/blog';
import { formatPostDate } from '@/lib/format-post-date';

type BlogSidebarProps = {
  popular: BlogPost[];
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
};

export function BlogSidebar({
  popular,
  categories,
  activeCategory,
  onCategoryChange,
}: BlogSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-white/[0.08] blog-glass p-5"
      >
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-slate-400">
          <TrendingUp className="h-4 w-4 text-violet-400" />
          Popular posts
        </h3>
        <ul className="mt-4 space-y-4">
          {popular.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex gap-3">
                <motion.div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover transition group-hover:scale-110"
                  />
                </motion.div>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium text-white transition group-hover:text-violet-200">
                    {post.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{formatPostDate(post.publishedAt)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-white/[0.08] blog-glass p-5"
      >
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-400">
          Categories
        </h3>
        <ul className="mt-3 flex flex-col gap-1">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                onClick={() => onCategoryChange(activeCategory === cat ? null : cat)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeCategory === cat
                    ? 'bg-violet-500/20 font-medium text-violet-200'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-600/15 to-blue-600/10 p-5"
      >
        <h3 className="font-display text-base font-semibold text-white">Stay ahead</h3>
        <p className="mt-2 text-sm text-slate-400">
          Get WhatsApp automation playbooks and AI insights in your inbox.
        </p>
        <form
          className="mt-4 space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="blog-newsletter" className="sr-only">
            Email address
          </label>
          <input
            id="blog-newsletter"
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-xl border border-white/10 bg-canvas/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-wa/30 bg-wa/10 p-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-wa text-canvas">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-white">WhatsApp consultation</p>
            <p className="text-xs text-slate-400">Trusted by 200+ teams</p>
          </div>
        </div>
        <a
          href="https://wa.me/15551234567"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full rounded-full bg-wa py-2.5 text-center text-sm font-semibold text-canvas transition hover:bg-wa-dim"
        >
          Chat with us
        </a>
      </motion.div>
    </aside>
  );
}
