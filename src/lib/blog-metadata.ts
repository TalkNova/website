import type { BlogPost } from '@/content/blog';

/** Resolves SEO fields from the blog post object (with safe fallbacks). */
export function getBlogPostSeo(post: BlogPost) {
  const metaTitle = post.metaTitle?.trim() || post.title;
  const metaDescription =
    post.metaDescription?.trim() || post.excerpt?.trim() || post.title;

  return {
    /** Used for <title> — site template adds "| ThatMatter" in root layout. */
    metaTitle,
    metaDescription,
    /** Open Graph / Twitter headline (display title). */
    ogTitle: post.title,
    ogDescription: metaDescription,
  };
}
