import type { BlogContentBlock } from '@/content/blog';

function escapeHtml(value: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInlineMarkdown(value: string): string {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function renderMarkdownBlock(value: string): string {
  const lines = String(value || '').replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      html.push(
        `<ul style="padding-left: 1.4rem; margin: 0 0 1.2rem 0;">${listItems
          .map(
            (item) =>
              `<li style="margin-bottom: 0.45rem;">${renderInlineMarkdown(item)}</li>`,
          )
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
      html.push(
        `<h3 style="color: var(--text-primary); margin-top: 2rem; margin-bottom: 1rem;">${renderInlineMarkdown(trimmed.slice(4))}</h3>`,
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      html.push(
        `<h2 style="color: var(--text-primary); margin-top: 2.4rem; margin-bottom: 1rem;">${renderInlineMarkdown(trimmed.slice(3))}</h2>`,
      );
      return;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      html.push(
        `<h1 style="color: var(--text-primary); margin-top: 0; margin-bottom: 1rem;">${renderInlineMarkdown(trimmed.slice(2))}</h1>`,
      );
      return;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();
    html.push(
      `<p style="margin-bottom: 1.15rem;">${renderInlineMarkdown(trimmed)}</p>`,
    );
  });

  flushList();
  return html.join('');
}

export function markdownBlocksToHtml(content: BlogContentBlock[]): string {
  return content
    .map((block) => {
      if (block.type === 'markdown' && block.text) {
        return renderMarkdownBlock(block.text);
      }
      return `<p style="margin-bottom: 1.15rem;">${escapeHtml(block.text || '')}</p>`;
    })
    .join('');
}
