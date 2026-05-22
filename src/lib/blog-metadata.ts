import type { BlogPost } from '@/types/blog';

/** Resolves SEO fields from the blog post object (with safe fallbacks). */
export function getBlogPostSeo(post: BlogPost) {
  const metaTitle = post.metaTitle?.trim() || post.title;
  const metaDescription =
    post.metaDescription?.trim() || post.excerpt?.trim() || post.title;

  return {
    metaTitle,
    metaDescription,
    ogTitle: post.title,
    ogDescription: metaDescription,
  };
}
