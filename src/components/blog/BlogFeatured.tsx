'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import { formatPostDate } from '@/lib/format-post-date';

type BlogFeaturedProps = {
  post: BlogPost;
};

export function BlogFeatured({ post }: BlogFeaturedProps) {
  const href = `/blog/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] blog-glass shadow-card lg:grid lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-500/20 via-blue-500/10 to-cyan-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <Link href={href} className="relative block min-h-[240px] overflow-hidden lg:min-h-[380px]">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent lg:bg-gradient-to-r"
          initial={false}
        />
        <span className="absolute left-4 top-4 rounded-full bg-violet-600/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          Featured
        </span>
      </Link>

      <motion.div className="relative flex flex-col justify-center p-8 lg:p-10">
        {post.category ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            {post.category}
          </span>
        ) : null}
        <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
          <Link href={href} className="transition hover:text-violet-200">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-slate-400 leading-relaxed">{post.excerpt}</p>
        <motion.div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="font-medium text-slate-300">{post.author.name}</span>
          <span>{formatPostDate(post.publishedAt)}</span>
          {post.readingTime ? (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          ) : null}
        </motion.div>
        <Link
          href={href}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_32px_-6px_rgb(139_92_246/0.7)] transition hover:shadow-[0_0_40px_-4px_rgb(139_92_246/0.9)]"
        >
          Read article
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </motion.article>
  );
}
