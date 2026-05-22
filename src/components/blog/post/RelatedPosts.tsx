import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/content/blog';
import { formatPostDate } from '@/lib/format-post-date';

type RelatedPostsProps = {
  posts: BlogPost[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 border-t border-white/[0.08] pt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-display text-2xl font-bold text-white">
        Related articles
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-2xl border border-white/[0.08] blog-glass transition hover:border-violet-500/30"
          >
            <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10]">
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="p-4">
              {post.category ? (
                <span className="text-[10px] font-bold uppercase tracking-wide text-violet-400">
                  {post.category}
                </span>
              ) : null}
              <h3 className="mt-1 font-display text-base font-semibold text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-violet-200">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-xs text-slate-500">{formatPostDate(post.publishedAt)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
