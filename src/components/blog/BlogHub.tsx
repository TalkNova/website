'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlogPost } from '@/types/blog';
import { BlogAmbient } from '@/components/blog/BlogAmbient';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogFeatured } from '@/components/blog/BlogFeatured';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogCTA } from '@/components/blog/BlogCTA';
import { BlogSidebar } from '@/components/blog/BlogSidebar';

type BlogHubProps = {
  posts: BlogPost[];
  featured: BlogPost | null;
  categories: string[];
  popular: BlogPost[];
};

export function BlogHub({ posts: initialPosts, featured, categories, popular }: BlogHubProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const fetchFiltered = useCallback(async (q: string, category: string | null) => {
    const trimmed = q.trim();
    if (!trimmed && !category) {
      setPosts(initialPosts);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '50', sort: 'publishedAt' });
      if (trimmed) params.set('q', trimmed);
      if (category) params.set('category', category);

      const res = await fetch(`/api/blog/posts?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = (await res.json()) as { posts: BlogPost[] };
      setPosts(data.posts ?? []);
    } catch {
      setPosts(
        initialPosts.filter((p) => {
          if (category && p.category !== category) return false;
          if (!trimmed) return true;
          const lower = trimmed.toLowerCase();
          return (
            p.title.toLowerCase().includes(lower) ||
            p.excerpt.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower) ||
            p.tags.some((t) => t.toLowerCase().includes(lower))
          );
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [initialPosts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchFiltered(query, activeCategory);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, activeCategory, fetchFiltered]);

  const filtered = useMemo(() => {
    const featuredSlug = featured?.slug;
    return posts.filter((p) => {
      if (featuredSlug && p.slug === featuredSlug && !query && !activeCategory) return false;
      return true;
    });
  }, [posts, featured?.slug, query, activeCategory]);

  const showFeatured = Boolean(featured) && !query && !activeCategory;

  return (
    <motion.div className="relative min-h-screen">
      <BlogAmbient />
      <BlogHero
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
          <div className="min-w-0 space-y-12">
            {showFeatured && featured ? (
              <section aria-labelledby="featured-heading">
                <h2 id="featured-heading" className="sr-only">
                  Featured article
                </h2>
                <BlogFeatured post={featured} />
              </section>
            ) : null}

            <section aria-labelledby="articles-heading">
              <motion.div className="mb-6 flex items-end justify-between gap-4">
                <h2
                  id="articles-heading"
                  className="font-display text-2xl font-bold text-white sm:text-3xl"
                >
                  {query || activeCategory ? 'Results' : 'Latest articles'}
                </h2>
                <p className="text-sm text-slate-500">
                  {loading ? 'Searching…' : `${filtered.length} article${filtered.length === 1 ? '' : 's'}`}
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {filtered.length === 0 && !loading ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-white/[0.08] blog-glass py-16 text-center text-slate-400"
                  >
                    No articles match your search. Try another keyword or category.
                  </motion.p>
                ) : (
                  <motion.div
                    key={`${query}-${activeCategory}-${loading}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    <motion.div
                      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                      role="list"
                    >
                      {filtered.map((post, i) => {
                        const items = [
                          <BlogCard key={post.slug} post={post} index={i} />,
                        ];
                        if ((i + 1) % 3 === 0 && i < filtered.length - 1) {
                          items.push(
                            <div key={`cta-${i}`} className="col-span-full">
                              <BlogCTA index={Math.floor(i / 3)} />
                            </div>,
                          );
                        }
                        return items;
                      })}
                    </motion.div>
                    {filtered.length >= 3 ? (
                      <BlogCTA index={Math.floor(filtered.length / 3)} />
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>

          <BlogSidebar
            popular={popular}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>
    </motion.div>
  );
}
