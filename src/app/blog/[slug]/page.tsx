import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { BlogPostLayout } from '@/components/blog/post/BlogPostLayout';
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { markdownBlocksToHtml, extractHeadingsFromContent } from '@/lib/markdown';
import { getSiteUrl } from '@/lib/site';
import { blogPostJsonLd } from '@/lib/blog-jsonld';
import { getBlogPostSeo } from '@/lib/blog-metadata';

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
  const seo = getBlogPostSeo(post);

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: post.tags,
    alternates: { canonical: canonical.toString() },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: canonical.toString(),
      images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = markdownBlocksToHtml(post.content);
  const headings = extractHeadingsFromContent(post.content);
  const related = getRelatedPosts(slug, 3);
  const shareUrl = new URL(`/blog/${post.slug}`, getSiteUrl()).toString();
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  const jsonLd = blogPostJsonLd(siteUrl, post);

  return (
    <PageShell blobs="post" navScrolled>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostLayout
        post={post}
        html={html}
        headings={headings}
        related={related}
        shareUrl={shareUrl}
      />
    </PageShell>
  );
}
