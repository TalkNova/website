import { getAllPosts } from '@/lib/posts';
import { BlogPostCard } from '@/components/blog/BlogPostCard';

export function BlogPostsGrid() {
  const posts = getAllPosts();

  if (!posts.length) {
    return (
      <p style={{ textAlign: 'center', color: '#ccc' }}>
        No blog posts yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-3">
      {posts.map((post, i) => (
        <BlogPostCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
