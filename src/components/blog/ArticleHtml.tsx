import type { BlogPost } from '@/content/blog';

type ArticleHtmlProps = {
  html: string;
  post: BlogPost;
};

export function ArticleHtml({ html, post }: ArticleHtmlProps) {
  return (
    <>
      {post.tags?.length ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div
        className="max-w-none text-base leading-relaxed text-slate-300 [&_h1]:font-display [&_h1]:text-white [&_h2]:font-display [&_h2]:text-white [&_h3]:font-display [&_h3]:text-white [&_li]:text-slate-300 [&_p]:text-slate-300"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
