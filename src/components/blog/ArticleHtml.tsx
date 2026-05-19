import type { BlogPost } from '@/content/blog';

type ArticleHtmlProps = {
  html: string;
  post: BlogPost;
};

export function ArticleHtml({ html, post }: ArticleHtmlProps) {
  return (
    <div className="blog-article">
      {post.tags?.length ? (
        <div className="mb-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
      <div
        className="max-w-none text-[1.0625rem] leading-[1.75] text-slate-300 [&_a]:text-violet-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-violet-300 [&_blockquote]:my-8 [&_code]:text-violet-200 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 [&_strong]:text-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
