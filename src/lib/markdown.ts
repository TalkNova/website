import type { BlogContentBlock } from '@/content/blog';

export type TocHeading = { id: string; text: string; level: 2 | 3 };

function escapeHtml(value: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function renderInlineMarkdown(value: string): string {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="rounded bg-white/10 px-1.5 py-0.5 text-sm text-violet-200">$1</code>');
}

function renderMarkdownBlock(value: string, headings: TocHeading[]): string {
  const lines = String(value || '').replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      html.push(
        `<ul class="my-6 list-disc space-y-2 pl-6 text-slate-300">${listItems
          .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
          .join('')}</ul>`,
      );
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      const text = trimmed.slice(4);
      const id = slugifyHeading(text);
      headings.push({ id, text, level: 3 });
      html.push(
        `<h3 id="${id}" class="scroll-mt-28 font-display text-xl font-semibold text-white mt-10 mb-4">${renderInlineMarkdown(text)}</h3>`,
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      const text = trimmed.slice(3);
      const id = slugifyHeading(text);
      headings.push({ id, text, level: 2 });
      html.push(
        `<h2 id="${id}" class="scroll-mt-28 font-display text-2xl font-bold text-white mt-12 mb-4">${renderInlineMarkdown(text)}</h2>`,
      );
      return;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      const text = trimmed.slice(2);
      html.push(
        `<h1 class="font-display text-3xl font-bold text-white mb-6">${renderInlineMarkdown(text)}</h1>`,
      );
      return;
    }

    if (trimmed.startsWith('> ')) {
      flushList();
      html.push(
        `<blockquote class="my-8 border-l-4 border-violet-500/60 bg-violet-500/10 px-6 py-4 text-lg italic text-slate-200 rounded-r-xl">${renderInlineMarkdown(trimmed.slice(2))}</blockquote>`,
      );
      return;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();
    html.push(`<p class="mb-5 leading-relaxed text-slate-300">${renderInlineMarkdown(trimmed)}</p>`);
  });

  flushList();
  return html.join('');
}

export function markdownBlocksToHtml(content: BlogContentBlock[]): string {
  const headings: TocHeading[] = [];
  const html = content
    .map((block) => {
      if (block.type === 'markdown' && block.text) {
        return renderMarkdownBlock(block.text, headings);
      }
      return `<p class="mb-5 text-slate-300">${escapeHtml(block.text || '')}</p>`;
    })
    .join('');
  return html;
}

export function extractHeadingsFromContent(content: BlogContentBlock[]): TocHeading[] {
  const headings: TocHeading[] = [];
  content.forEach((block) => {
    if (block.type === 'markdown' && block.text) {
      renderMarkdownBlock(block.text, headings);
    }
  });
  return headings;
}
