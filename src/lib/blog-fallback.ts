import type { BlogCategory, BlogPageMeta, BlogPost } from '@/types/blog';
import snapshot from '@/data/blog-snapshot.json';

export type BlogSnapshot = {
  generatedAt: string | null;
  apiBaseUrl: string | null;
  meta: BlogPageMeta;
  categories: BlogCategory[];
  posts: BlogPost[];
};

const data = snapshot as BlogSnapshot;

export function hasBlogSnapshot(): boolean {
  return data.posts.length > 0;
}

export function getSnapshotMeta(): BlogPageMeta {
  return data.meta;
}

export function getSnapshotPosts(): BlogPost[] {
  return [...data.posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getSnapshotPostBySlug(slug: string): BlogPost | undefined {
  const normalized = slug.trim().toLowerCase();
  return data.posts.find((p) => p.slug.toLowerCase() === normalized);
}

export function getSnapshotSlugs(): string[] {
  return data.posts.map((p) => p.slug);
}

export function getSnapshotFeaturedPost(): BlogPost | undefined {
  return data.posts.find((p) => p.featured) ?? data.posts[0];
}

export function getSnapshotCategories(): string[] {
  if (data.categories.length) {
    return data.categories.map((c) => c.name);
  }
  return [...new Set(data.posts.map((p) => p.category).filter(Boolean))].sort();
}

export function getSnapshotPopularPosts(limit = 4): BlogPost[] {
  return getSnapshotPosts().slice(0, limit);
}

export function getSnapshotRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getSnapshotPostBySlug(slug);
  if (!current) return getSnapshotPopularPosts(limit);

  const scored = data.posts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 3;
      p.tags.forEach((t) => {
        if (current.tags.includes(t)) score += 1;
      });
      return { post: p, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime(),
    );

  return scored.slice(0, limit).map((s) => s.post);
}
