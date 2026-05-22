/**
 * Blog data: live API first, bundled snapshot when API is unavailable.
 * Refresh snapshot: npm run blog:snapshot
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
  fetchBlogPageMeta,
  getCategoryNames,
} from '@/lib/blog-api';
import {
  getSnapshotPosts,
  getSnapshotPostBySlug,
  getSnapshotSlugs,
  getSnapshotFeaturedPost,
  getSnapshotCategories,
  getSnapshotPopularPosts,
  getSnapshotRelatedPosts,
  getSnapshotMeta,
  hasBlogSnapshot,
} from '@/lib/blog-fallback';

export type { BlogPost } from '@/types/blog';

async function tryApi<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const live = await tryApi(async () => {
    const { posts } = await fetchBlogPosts({ limit: 50, sort: 'publishedAt' });
    return posts;
  });
  if (live?.length) return live;
  return hasBlogSnapshot() ? getSnapshotPosts() : [];
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const live = await tryApi(fetchFeaturedPost);
  if (live) return live;
  return hasBlogSnapshot() ? getSnapshotFeaturedPost() : undefined;
}

export async function getCategories(): Promise<string[]> {
  const live = await tryApi(async () => getCategoryNames(await fetchBlogCategories()));
  if (live?.length) return live;
  return hasBlogSnapshot() ? getSnapshotCategories() : [];
}

export async function getPopularPosts(limit = 4): Promise<BlogPost[]> {
  const live = await tryApi(() => fetchPopularPosts(limit));
  if (live?.length) return live;
  return hasBlogSnapshot() ? getSnapshotPopularPosts(limit) : [];
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const live = await tryApi(() => fetchRelatedPosts(slug, limit));
  if (live?.length) return live;
  return hasBlogSnapshot() ? getSnapshotRelatedPosts(slug, limit) : [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const live = await tryApi(() => fetchBlogPostBySlug(slug));
  if (live) return live;
  return hasBlogSnapshot() ? getSnapshotPostBySlug(slug) : undefined;
}

export async function getAllSlugs(): Promise<string[]> {
  const live = await tryApi(fetchBlogSlugs);
  if (live?.length) return live;
  return hasBlogSnapshot() ? getSnapshotSlugs() : [];
}

export async function getBlogListingMeta() {
  const live = await tryApi(fetchBlogPageMeta);
  if (live) return live;
  return getSnapshotMeta();
}
