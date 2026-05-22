import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { BlogHub } from '@/components/blog/BlogHub';
import {
  getAllPosts,
  getCategories,
  getFeaturedPost,
  getPopularPosts,
} from '@/lib/posts';
import { getSiteUrl } from '@/lib/site';
import { blogListingJsonLd } from '@/lib/blog-jsonld';

export const metadata: Metadata = {
  title: 'Blog — AI Automation & WhatsApp Growth Insights',
  description:
    'Learn AI automation, WhatsApp marketing, chatbot systems, and customer engagement strategies from the ThatMatter team.',
  openGraph: {
    title: 'AI Automation & WhatsApp Growth Insights',
    description:
      'Premium insights on WhatsApp Business API, AI chatbots, campaigns, and support automation.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation & WhatsApp Growth Insights',
    description:
      'Learn AI automation, WhatsApp marketing, and chatbot strategies.',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const categories = getCategories();
  const popular = getPopularPosts(4);
  const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
  const jsonLd = blogListingJsonLd(siteUrl, posts);

  if (!featured) {
    return (
      <PageShell blobs="blog" navScrolled>
        <p className="py-32 text-center text-slate-500">No blog posts yet.</p>
      </PageShell>
    );
  }

  return (
    <PageShell blobs="blog" navScrolled>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHub
        posts={posts}
        featured={featured}
        categories={categories}
        popular={popular}
      />
    </PageShell>
  );
}
