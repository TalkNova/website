import type { BlogPost } from '@/content/blog';
import Image from 'next/image';
import Link from 'next/link';

import { formatPostDate } from '@/lib/format-post-date';

function extractYouTubeId(url: string): string | null {
  if (url.includes('embed/')) {
    const part = url.split('embed/')[1];
    return part?.split(/[?&]/)[0] ?? null;
  }
  if (url.includes('v=')) {
    const part = url.split('v=')[1];
    return part?.split(/[?&]/)[0] ?? null;
  }
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split(/[?&]/)[0] ?? null;
  }
  return null;
}

export function BlogPostCard({ post, index }: { post: BlogPost; index: number }) {
  const delayClass =
    index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300';

  const tagHtml =
    post.tags?.length > 0 ? (
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginTop: '0.85rem',
        }}
      >
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.6rem',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.08)',
              color: 'var(--text-secondary)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    ) : null;

  const linksHtml =
    post.links && post.links.length > 0 ? (
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {post.links.map((link) => (
          <a
            key={`${link.label}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    ) : null;

  const videosHtml =
    post.videos && post.videos.length > 0 ? (
      <div style={{ marginTop: '1rem' }}>
        {post.videos.map((url) => {
          if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const id = extractYouTubeId(url);
            if (!id) {
              return (
                <p key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Watch video
                  </a>
                </p>
              );
            }
            return (
              <iframe
                key={url}
                title="Embedded video"
                width="100%"
                height={250}
                style={{ borderRadius: '8px', marginBottom: '0.5rem' }}
                src={`https://www.youtube.com/embed/${id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            );
          }
          if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            return (
              <iframe
                key={url}
                title="Embedded video"
                src={`https://player.vimeo.com/video/${videoId}`}
                width="100%"
                height={250}
                style={{ borderRadius: '8px', marginBottom: '0.5rem' }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            );
          }
          return (
            <p key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-primary)' }}
              >
                Watch video
              </a>
            </p>
          );
        })}
      </div>
    ) : null;

  const excerpt =
    post.excerpt ||
    'Read the full article for more details.';

  const postHref = `/blog/${post.slug}`;
  const goToArticleLabel = `Read article: ${post.title}`;

  return (
    <article
      className={`glass-card blog-card animate-on-scroll fade-up ${delayClass}`}
    >
      {post.coverImage ? (
        <Link
          href={postHref}
          className="blog-card-image-link"
          aria-label={goToArticleLabel}
        >
          <div className="blog-card-image-frame">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="blog-image"
            />
          </div>
        </Link>
      ) : null}
      <div className="blog-content">
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '0.5rem',
          }}
        >
          {post.category ? (
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-primary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {post.category}
            </span>
          ) : null}
          <span className="blog-date">{formatPostDate(post.publishedAt)}</span>
          {post.readingTime ? (
            <span className="blog-date">{post.readingTime} min read</span>
          ) : null}
        </div>
        {post.coverImage ? (
          <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{post.title}</h3>
        ) : (
          <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
            <Link
              href={postHref}
              className="blog-card-title-link"
              aria-label={goToArticleLabel}
            >
              {post.title}
            </Link>
          </h3>
        )}
        <p className="text-muted" style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
          {excerpt}
        </p>
        {tagHtml}
        {videosHtml}
        {linksHtml}
        <div style={{ marginTop: '1.2rem' }}>
          <Link
            href={postHref}
            className="btn btn-outline"
            style={{ padding: '0.7rem 1rem' }}
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
