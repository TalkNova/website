import { getAllPosts } from '@/lib/posts';
import { BlogPostCard } from '@/components/blog/BlogPostCard';

export function BlogPostsGrid() {
  const posts = getAllPosts();

  if (!posts.length) {
    return <p className="py-12 text-center text-slate-500">No blog posts yet. Check back soon!</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <BlogPostCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
