import type {
  BlogCategory,
  BlogListResult,
  BlogPageMeta,
  BlogPost,
  BlogPagination,
  NewsletterSubscribeResult,
} from '@/types/blog';
import type { LeadSubmitInput, LeadSubmitResult } from '@/types/lead';

const DEFAULT_BASE = 'http://localhost:8001';

export class BlogApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'BlogApiError';
  }
}

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  requestId?: string;
  data: T;
};

export function getBlogApiBaseUrl(): string {
  const base =
    process.env.BLOG_API_URL ??
    process.env.NEXT_PUBLIC_BLOG_API_URL ??
    DEFAULT_BASE;
  return base.replace(/\/$/, '');
}

type FetchOptions = {
  revalidate?: number | false;
  cache?: RequestCache;
};

async function blogRequest<T>(
  path: string,
  init?: RequestInit,
  options?: FetchOptions,
): Promise<T> {
  const base = getBlogApiBaseUrl();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
    next:
      options?.cache === 'no-store'
        ? undefined
        : { revalidate: options?.revalidate ?? 60 },
    cache: options?.cache,
  });

  let json: ApiEnvelope<T> | { message?: string };
  try {
    json = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new BlogApiError(res.status, res.statusText || 'Invalid JSON response');
  }

  if (!res.ok) {
    throw new BlogApiError(
      res.status,
      (json as ApiEnvelope<T>).message ?? res.statusText ?? 'Request failed',
    );
  }

  return (json as ApiEnvelope<T>).data;
}

export type ListPostsParams = {
  page?: number;
  limit?: number;
  category?: string;
  q?: string;
  featured?: boolean;
  sort?: 'publishedAt' | 'title';
};

export async function fetchBlogPosts(
  params: ListPostsParams = {},
  options?: FetchOptions,
): Promise<BlogListResult> {
  const search = new URLSearchParams();
  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.category) search.set('category', params.category);
  if (params.q) search.set('q', params.q);
  if (params.featured !== undefined) search.set('featured', String(params.featured));
  if (params.sort) search.set('sort', params.sort);

  const qs = search.toString();
  const payload = await blogRequest<{
    data: BlogPost[];
    pagination: BlogPagination;
  }>(`/blog/posts${qs ? `?${qs}` : ''}`, undefined, options);

  return {
    posts: payload.data ?? [],
    pagination: payload.pagination ?? {
      page: 1,
      limit: params.limit ?? 12,
      total: payload.data?.length ?? 0,
      totalPages: 1,
    },
  };
}

export async function fetchFeaturedPost(
  options?: FetchOptions,
): Promise<BlogPost | null> {
  try {
    return await blogRequest<BlogPost | null>('/blog/posts/featured', undefined, options);
  } catch (e) {
    // Backend may register /posts/:slug before /posts/featured — use list filter instead
    if (e instanceof BlogApiError && e.statusCode === 404) {
      const { posts } = await fetchBlogPosts({ featured: true, limit: 1 }, options);
      return posts[0] ?? null;
    }
    throw e;
  }
}

export async function fetchBlogPostBySlug(
  slug: string,
  options?: FetchOptions,
): Promise<BlogPost | null> {
  try {
    return await blogRequest<BlogPost>(
      `/blog/posts/${encodeURIComponent(slug)}`,
      undefined,
      options,
    );
  } catch (e) {
    if (e instanceof BlogApiError && e.statusCode === 404) return null;
    throw e;
  }
}

export async function fetchRelatedPosts(
  slug: string,
  limit = 3,
  options?: FetchOptions,
): Promise<BlogPost[]> {
  const payload = await blogRequest<{ data: BlogPost[] }>(
    `/blog/posts/${encodeURIComponent(slug)}/related?limit=${limit}`,
    undefined,
    options,
  );
  return payload.data ?? [];
}

export async function fetchPopularPosts(
  limit = 4,
  options?: FetchOptions,
): Promise<BlogPost[]> {
  try {
    const payload = await blogRequest<{ data: BlogPost[] }>(
      `/blog/posts/popular?limit=${limit}`,
      undefined,
      options,
    );
    return payload.data ?? [];
  } catch (e) {
    if (e instanceof BlogApiError && e.statusCode === 404) {
      const { posts } = await fetchBlogPosts({ limit, sort: 'publishedAt' }, options);
      return posts;
    }
    throw e;
  }
}

export async function fetchBlogCategories(
  options?: FetchOptions,
): Promise<BlogCategory[]> {
  const payload = await blogRequest<{ data: BlogCategory[] }>(
    '/blog/categories',
    undefined,
    options,
  );
  return payload.data ?? [];
}

export function getCategoryNames(categories: BlogCategory[]): string[] {
  return categories.map((c) => c.name);
}

export async function fetchBlogPageMeta(
  options?: FetchOptions,
): Promise<BlogPageMeta> {
  return blogRequest<BlogPageMeta>('/blog/meta', undefined, options);
}

export async function fetchBlogSlugs(options?: FetchOptions): Promise<string[]> {
  try {
    const payload = await blogRequest<{ data: string[] }>(
      '/blog/posts/slugs',
      undefined,
      options,
    );
    return payload.data ?? [];
  } catch (e) {
    if (e instanceof BlogApiError && e.statusCode === 404) {
      const { posts } = await fetchBlogPosts({ limit: 50 }, options);
      return posts.map((p) => p.slug);
    }
    throw e;
  }
}

export async function subscribeNewsletter(
  email: string,
  source = 'blog-sidebar',
): Promise<NewsletterSubscribeResult> {
  return blogRequest<NewsletterSubscribeResult>(
    '/blog/newsletter/subscribe',
    {
      method: 'POST',
      body: JSON.stringify({ email, source }),
    },
    { cache: 'no-store', revalidate: false },
  );
}

export async function submitLead(input: LeadSubmitInput): Promise<LeadSubmitResult> {
  return blogRequest<LeadSubmitResult>(
    '/auth/lead',
    {
      method: 'POST',
      body: JSON.stringify(input),
    },
    { cache: 'no-store', revalidate: false },
  );
}
