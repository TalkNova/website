import type { BlogPost } from '@/content/blog';

type ArticleHtmlProps = {
  html: string;
  post: BlogPost;
};

/**
 * Renders trusted, build-time markdown HTML (same pipeline as the legacy site).
 */
export function ArticleHtml({ html, post }: ArticleHtmlProps) {
  return (
    <>
      {post.tags?.length ? (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            margin: '0 0 2rem 0',
          }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-secondary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div
        style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
