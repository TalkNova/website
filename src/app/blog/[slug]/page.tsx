import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
      <header className="section" style={{ paddingTop: '150px', paddingBottom: '50px' }}>
        <div className="container animate-on-scroll fade-up">
          <Link
            href="/blog"
            style={{
              color: 'var(--accent-primary)',
              fontWeight: 600,
              marginBottom: '1rem',
              display: 'inline-block',
              textDecoration: 'none',
              transition: 'var(--transition-smooth)',
            }}
          >
            <i className="fa-solid fa-arrow-left" aria-hidden /> Back to Blog
          </Link>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-outfit), Outfit, sans-serif',
            }}
          >
            {post.category ? (
              <span
                style={{
                  color: 'var(--accent-primary)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {post.category}
              </span>
            ) : null}
            <span>
              {formatPostDate(post.publishedAt)}
              {post.readingTime ? ` • ${post.readingTime} min read` : ''}
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              maxWidth: '720px',
              color: 'var(--text-secondary)',
              fontSize: '1.08rem',
              lineHeight: 1.7,
              marginBottom: '1.75rem',
            }}
          >
            {post.excerpt}
          </p>
          {post.author ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name || 'Author'}
                    fill
                    sizes="50px"
                    className="object-cover"
                  />
                ) : (
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                    {(post.author.name || '?').slice(0, 1)}
                  </span>
                )}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{post.author.name}</h4>
              </div>
            </div>
          ) : null}
          {post.coverImage ? (
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '2.5rem',
                boxShadow: 'var(--glass-shadow)',
                position: 'relative',
                maxHeight: '500px',
              }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={675}
                style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }}
                priority
              />
            </div>
          ) : null}
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-on-scroll fade-up delay-100">
            <ArticleHtml html={html} post={post} />
            <ShareBlock title={post.title} shareUrl={shareUrl} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
