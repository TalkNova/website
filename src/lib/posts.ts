/**
 * Blog data access — backed by public Blog API (see docs/BLOG_API.md).
 * Re-exports API helpers for pages and legacy imports.
 */
import type { BlogPost } from '@/types/blog';
import {
  fetchBlogPosts,
  fetchFeaturedPost,
  fetchPopularPosts,
  fetchRelatedPosts,
  fetchBlogPostBySlug,
  fetchBlogSlugs,
  fetchBlogCategories,
  getCategoryNames,
} from '@/lib/blog-api';

export type { BlogPost } from '@/types/blog';

export async function getAllPosts(): Promise<BlogPost[]> {
  const { posts } = await fetchBlogPosts({ limit: 50, sort: 'publishedAt' });
  return posts;
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const post = await fetchFeaturedPost();
  return post ?? undefined;
}

export async function getCategories(): Promise<string[]> {
  const cats = await fetchBlogCategories();
  return getCategoryNames(cats);
}

export async function getPopularPosts(limit = 4): Promise<BlogPost[]> {
  return fetchPopularPosts(limit);
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  return fetchRelatedPosts(slug, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await fetchBlogPostBySlug(slug);
  return post ?? undefined;
}

export async function getAllSlugs(): Promise<string[]> {
  return fetchBlogSlugs();
}
