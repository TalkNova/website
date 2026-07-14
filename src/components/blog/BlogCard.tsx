'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import { BLOG_COVER_ASPECT_CLASS } from '@/types/blog';
import { formatPostDate } from '@/lib/format-post-date';

type BlogCardProps = {
  post: BlogPost;
  index: number;
};

export function BlogCard({ post, index }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] blog-glass transition-shadow duration-300 hover:border-violet-500/30 hover:shadow-[0_0_48px_-12px_rgb(139_92_246/0.35)]"
    >
      <Link href={href} className={`relative block ${BLOG_COVER_ASPECT_CLASS} overflow-hidden`}>
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent opacity-60" />
        {post.category ? (
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-canvas/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-300 backdrop-blur-sm">
            {post.category}
          </span>
        ) : null}
      </Link>

      <motion.div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-white">
          <Link href={href} className="transition hover:text-violet-200">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-400">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-500">
          <span>{formatPostDate(post.publishedAt)}</span>
          {post.readingTime ? (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}
