import type { BlogPost } from '@/types/blog';
import { getBlogPostSeo } from '@/lib/blog-metadata';

export function blogListingJsonLd(siteUrl: string, posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ThatMatter AI & WhatsApp Insights',
    description:
      'AI automation, WhatsApp marketing, chatbot systems, and customer engagement strategies.',
    url: `${siteUrl}/blog`,
    blogPost: posts.slice(0, 10).map((post) => {
      const seo = getBlogPostSeo(post);
      return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: seo.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: { '@type': 'Person', name: post.author.name },
        url: `${siteUrl}/blog/${post.slug}`,
        image: post.coverImage,
      };
    }),
  };
}

export function blogPostJsonLd(siteUrl: string, post: BlogPost) {
  const seo = getBlogPostSeo(post);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: seo.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      image: post.author.avatar,
    },
    image: post.coverImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ThatMatter',
    },
    keywords: post.tags.join(', '),
  };
}
