import type { BlogPost } from '@/types/blog';

type ArticleHtmlProps = {
  html: string;
  post: BlogPost;
};

export function ArticleHtml({ html, post }: ArticleHtmlProps) {
  return (
    <div className="blog-article min-w-0 max-w-full overflow-x-clip">
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
        className="max-w-none break-words text-[1.0625rem] leading-[1.75] text-slate-300 [overflow-wrap:anywhere] [&_a]:text-violet-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-violet-300 [&_blockquote]:my-8 [&_code]:text-violet-200 [&_h1]:break-words [&_h2]:scroll-mt-28 [&_h2]:break-words [&_h3]:scroll-mt-28 [&_h3]:break-words [&_img]:max-w-full [&_p]:break-words [&_pre]:m-0 [&_strong]:text-white [&_.blog-code-block]:max-w-full [&_.blog-code-block_code]:whitespace-pre-wrap [&_.blog-code-block_code]:break-all sm:[&_.blog-code-block_code]:whitespace-pre [&_.blog-code-block_pre]:max-w-full [&_.blog-table-wrap]:max-w-full [&_.blog-table-wrap_table]:w-full"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
