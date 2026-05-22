'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import type { BlogPost } from '@/content/blog';
import type { TocHeading } from '@/lib/markdown';
import { formatPostDate } from '@/lib/format-post-date';
import { ReadingProgress } from '@/components/blog/post/ReadingProgress';
import { TableOfContents } from '@/components/blog/post/TableOfContents';
import { PostCTA } from '@/components/blog/post/PostCTA';
import { ArticleHtml } from '@/components/blog/ArticleHtml';
import { ShareBlock } from '@/components/blog/ShareBlock';
import { RelatedPosts } from '@/components/blog/post/RelatedPosts';
import { BlogAmbient } from '@/components/blog/BlogAmbient';

type BlogPostLayoutProps = {
  post: BlogPost;
  html: string;
  headings: TocHeading[];
  related: BlogPost[];
  shareUrl: string;
};

export function BlogPostLayout({ post, html, headings, related, shareUrl }: BlogPostLayoutProps) {
  return (
    <article className="relative min-h-screen">
      <BlogAmbient />
      <ReadingProgress />

      <header className="relative px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <motion.div className="flex flex-wrap items-center gap-3 text-sm">
              {post.category ? (
                <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-300">
                  {post.category}
                </span>
              ) : null}
              <span className="text-slate-500">{formatPostDate(post.publishedAt)}</span>
              {post.readingTime ? (
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} min read
                </span>
              ) : null}
            </motion.div>

            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{post.excerpt}</p>

            {post.author ? (
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-violet-500/30">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author.name}</p>
                  <p className="text-sm text-slate-500">ThatMatter Team</p>
                </div>
              </div>
            ) : null}
          </motion.div>

          {post.coverImage ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="relative mt-10 aspect-[21/9] max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] shadow-card"
            >
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1024px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent" />
            </motion.div>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="min-w-0 max-w-3xl lg:max-w-none"
          >
            {headings.length > 0 ? (
              <div className="mb-8 lg:hidden">
                <TableOfContents headings={headings} />
              </div>
            ) : null}
            <ArticleHtml html={html} post={post} />
            <PostCTA />
            <ShareBlock title={post.title} shareUrl={shareUrl} />
            <RelatedPosts posts={related} />
          </motion.div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>

      </div>
    </article>
  );
}
