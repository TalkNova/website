import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { ArticleHtml } from '@/components/blog/ArticleHtml';
import { ShareBlock } from '@/components/blog/ShareBlock';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { markdownBlocksToHtml } from '@/lib/markdown';
import { getSiteUrl } from '@/lib/site';
import { formatPostDate } from '@/lib/format-post-date';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Not found' };
  }

  const canonical = new URL(`/blog/${post.slug}`, getSiteUrl());

  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: { canonical: canonical.toString() },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: canonical.toString(),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = markdownBlocksToHtml(post.content);
  const shareUrl = new URL(`/blog/${post.slug}`, getSiteUrl()).toString();

  return (
    <PageShell blobs="post" navScrolled>
      <header className="px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-wa transition hover:text-wa-dim"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            {post.category ? (
              <span className="font-bold uppercase tracking-wide text-wa">{post.category}</span>
            ) : null}
            <span>
              {formatPostDate(post.publishedAt)}
              {post.readingTime ? ` • ${post.readingTime} min read` : ''}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">{post.excerpt}</p>
          {post.author ? (
            <div className="mt-6 flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface-muted">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name || 'Author'}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : (
                  <span className="font-bold text-white">
                    {(post.author.name || '?').slice(0, 1)}
                  </span>
                )}
              </div>
              <p className="font-medium text-white">{post.author.name}</p>
            </div>
          ) : null}
          {post.coverImage ? (
            <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/[0.08] shadow-card">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={675}
                className="max-h-[480px] w-full object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
      </header>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ArticleHtml html={html} post={post} />
          <ShareBlock title={post.title} shareUrl={shareUrl} />
        </div>
      </section>
    </PageShell>
  );
}
