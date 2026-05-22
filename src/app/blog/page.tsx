import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { BlogHub } from '@/components/blog/BlogHub';
import {
  getAllPosts,
  getCategories,
  getFeaturedPost,
  getPopularPosts,
} from '@/lib/posts';
import { getBlogListingMeta } from '@/lib/posts';
import { getSiteUrl } from '@/lib/site';
import { blogListingJsonLd } from '@/lib/blog-jsonld';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const meta = await getBlogListingMeta();
    return {
      title: meta.metaTitle,
      description: meta.metaDescription,
      openGraph: {
        title: meta.metaTitle,
        description: meta.metaDescription,
        type: 'website',
        url: '/blog',
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.metaTitle,
        description: meta.metaDescription,
      },
      alternates: { canonical: '/blog' },
    };
  } catch {
    return {
      title: 'Blog — AI Automation & WhatsApp Growth Insights',
      description:
        'Learn AI automation, WhatsApp marketing, chatbot systems, and customer engagement strategies from the ThatMatter team.',
      alternates: { canonical: '/blog' },
    };
  }
}

export default async function BlogPage() {
  try {
    const posts = await getAllPosts();
    const [featured, categories, popular] = await Promise.all([
      getFeaturedPost().catch(() => undefined),
      getCategories().catch(() => [] as string[]),
      getPopularPosts(4).catch(() => []),
    ]);

    const siteUrl = getSiteUrl().toString().replace(/\/$/, '');
    const jsonLd = blogListingJsonLd(siteUrl, posts);

    if (posts.length === 0 && !featured) {
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
          featured={featured ?? null}
          categories={categories}
          popular={popular}
        />
      </PageShell>
    );
  } catch {
    return (
      <PageShell blobs="blog" navScrolled>
        <p className="mx-auto max-w-lg py-32 text-center text-slate-400">
          Unable to load the blog. Check that{' '}
          <code className="text-violet-300">BLOG_API_URL</code> points to your API (default{' '}
          <code className="text-violet-300">http://localhost:8001</code>) and that the server is
          running.
        </p>
      </PageShell>
    );
  }
}
