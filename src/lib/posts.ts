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
