import { blogPosts, type BlogPost } from '@/content/blog';

function sortPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getAllPosts(): BlogPost[] {
  return sortPosts(blogPosts);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getCategories(): string[] {
  const cats = new Set(blogPosts.map((p) => p.category).filter(Boolean));
  return Array.from(cats).sort();
}

export function getPopularPosts(limit = 4): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return getPopularPosts(limit);

  const scored = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 3;
      p.tags.forEach((t) => {
        if (current.tags.includes(t)) score += 1;
      });
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime());

  return scored.slice(0, limit).map((s) => s.post);
}

function normalizeSlug(raw: string): string {
  const trimmed = raw.trim();
  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const normalized = normalizeSlug(slug);
  return blogPosts.find((p) => p.slug === normalized);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
