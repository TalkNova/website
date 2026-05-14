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
  const delay = index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300';
  const postHref = `/blog/${post.slug}`;
  const goToArticleLabel = `Read article: ${post.title}`;
  const excerpt = post.excerpt || 'Read the full article for more details.';

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/30 shadow-sm transition hover:border-wa/30 hover:shadow-[0_0_40px_-12px_rgb(37_211_102/0.25)] ${delay}`}
    >
      {post.coverImage ? (
        <Link href={postHref} className="blog-card-image-link block" aria-label={goToArticleLabel}>
          <div className="blog-card-image-frame relative">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="blog-image object-cover"
            />
          </div>
        </Link>
      ) : null}
      <div className="p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
          {post.category ? (
            <span className="font-semibold uppercase tracking-wide text-wa">{post.category}</span>
          ) : null}
          <span className="text-wa/90">{formatPostDate(post.publishedAt)}</span>
          {post.readingTime ? (
            <span className="text-slate-500">{post.readingTime} min read</span>
          ) : null}
        </div>
        {post.coverImage ? (
          <h3 className="font-display text-lg font-semibold text-white">{post.title}</h3>
        ) : (
          <h3 className="font-display text-lg font-semibold text-white">
            <Link href={postHref} className="blog-card-title-link hover:text-wa">
              {post.title}
            </Link>
          </h3>
        )}
        <p className="mt-2 text-sm text-slate-400">{excerpt}</p>
        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {post.links?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.links.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-wa/15 px-3 py-1 text-xs font-medium text-wa ring-1 ring-wa/25 hover:bg-wa/25"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
        {post.videos?.length ? (
          <div className="mt-4 space-y-2">
            {post.videos.map((url) => {
              if (url.includes('youtube.com') || url.includes('youtu.be')) {
                const id = extractYouTubeId(url);
                if (!id) {
                  return (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-wa">
                      Watch video
                    </a>
                  );
                }
                return (
                  <iframe
                    key={url}
                    title="Video"
                    width="100%"
                    height={200}
                    className="rounded-lg border border-white/10"
                    src={`https://www.youtube.com/embed/${id}`}
                    allowFullScreen
                  />
                );
              }
              if (url.includes('vimeo.com')) {
                const vid = url.split('/').pop();
                return (
                  <iframe
                    key={url}
                    title="Video"
                    width="100%"
                    height={200}
                    className="rounded-lg border border-white/10"
                    src={`https://player.vimeo.com/video/${vid}`}
                    allowFullScreen
                  />
                );
              }
              return (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-wa">
                  Watch video
                </a>
              );
            })}
          </div>
        ) : null}
        <div className="mt-5">
          <Link
            href={postHref}
            className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-wa/40 hover:text-wa"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
