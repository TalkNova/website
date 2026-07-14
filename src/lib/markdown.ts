import type { BlogContentBlock } from '@/types/blog';
import {
  isFlowFenceLanguage,
  looksLikeEscalationFlow,
  parseFlowDiagramData,
  renderAutomationFlowDiagram,
} from '@/lib/blog-flow-diagram';

export type TocHeading = { id: string; text: string; level: 2 | 3 };

const HR_PATTERN = /^(-{3,}|\*{3,}|_{3,})$/;
const FENCE_OPEN = /^```([\w.#+-]*)\s*$/;
const FENCE_CLOSE = /^```\s*$/;

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

/** Normalizes API/CMS markdown (escaped newlines, odd spacing). */
export function normalizeMarkdownText(value: string): string {
  return String(value || '')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

const CODE_SLOT = '\uE000C';
const LINK_SLOT = '\uE000L';

function renderLinkHtml(label: string, href: string): string {
  const inner = renderInlineMarkdown(label, { links: false });
  const safeHref = escapeHtml(href.trim());
  const isExternal = /^https?:\/\//i.test(href.trim());
  const extra = isExternal
    ? ' target="_blank" rel="noopener noreferrer"'
    : '';
  return `<a href="${safeHref}" class="font-semibold text-violet-400 underline underline-offset-2 hover:text-violet-300"${extra}>${inner}</a>`;
}

function renderBoldAndItalic(text: string): string {
  let out = text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold text-white">$1</strong>',
  );
  out = out.replace(
    /(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g,
    '<em class="italic text-slate-200">$1</em>',
  );
  return out;
}

/** Inline markdown: links (incl. **[text](url)**), bold, italic, code. */
function renderInlineMarkdown(
  value: string,
  options: { links?: boolean } = {},
): string {
  const allowLinks = options.links !== false;
  let text = escapeHtml(value);
  const codeSlots: string[] = [];
  const linkSlots: string[] = [];

  text = text.replace(/`([^`]+)`/g, (_, code: string) => {
    const id = codeSlots.length;
    codeSlots.push(
      `<code class="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-violet-200">${code}</code>`,
    );
    return `${CODE_SLOT}${id}${CODE_SLOT}`;
  });

  if (allowLinks) {
    text = text.replace(
      /\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g,
      (_, label: string, href: string) => {
        const id = linkSlots.length;
        linkSlots.push(
          `<strong class="font-semibold text-white">${renderLinkHtml(label, href)}</strong>`,
        );
        return `${LINK_SLOT}${id}${LINK_SLOT}`;
      },
    );

    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => {
      const id = linkSlots.length;
      linkSlots.push(renderLinkHtml(label, href));
      return `${LINK_SLOT}${id}${LINK_SLOT}`;
    });
  }

  text = renderBoldAndItalic(text);

  text = text.replace(
    new RegExp(`${CODE_SLOT}(\\d+)${CODE_SLOT}`, 'g'),
    (_, id: string) => codeSlots[Number(id)] ?? '',
  );
  text = text.replace(
    new RegExp(`${LINK_SLOT}(\\d+)${LINK_SLOT}`, 'g'),
    (_, id: string) => linkSlots[Number(id)] ?? '',
  );

  return text;
}

function isMarkdownTextBlock(block: BlogContentBlock): boolean {
  if (!block.text?.trim()) return false;
  const type = (block.type || 'markdown').toLowerCase();
  return type !== 'html' && type !== 'image' && type !== 'video';
}

function parseTableRow(line: string): string[] | null {
  const trimmed = line.trim();
  if (!trimmed.includes('|')) return null;

  let parts = trimmed.split('|').map((cell) => cell.trim());
  if (parts[0] === '') parts = parts.slice(1);
  if (parts[parts.length - 1] === '') parts = parts.slice(0, -1);
  if (parts.length < 2) return null;

  return parts;
}

function isTableSeparatorRow(cells: string[]): boolean {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function renderCodeBlock(code: string, language: string): string {
  if (isFlowFenceLanguage(language) || looksLikeEscalationFlow(code)) {
    return renderAutomationFlowDiagram(parseFlowDiagramData(code));
  }

  const lang = escapeHtml(language || 'text');
  return `<div class="blog-code-block my-8 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-[#0d1117]"><pre class="m-0 max-w-full p-4 font-mono text-[0.875rem] leading-relaxed"><code class="block whitespace-pre-wrap break-all text-slate-300 sm:whitespace-pre language-${lang}">${escapeHtml(code)}</code></pre></div>`;
}

function renderTable(rows: string[][], headerRowCount: number): string {
  const safeHeaderCount = Math.min(Math.max(headerRowCount, 0), rows.length);
  const headRows = rows.slice(0, safeHeaderCount);
  const bodyRows = rows.slice(safeHeaderCount);

  const renderRow = (cells: string[], tag: 'th' | 'td') => {
    const cellClass =
      tag === 'th'
        ? 'border-b border-white/10 px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-400'
        : 'border-b border-white/[0.06] px-4 py-3 text-slate-300';
    return `<tr>${cells.map((cell) => `<${tag} class="${cellClass}">${renderInlineMarkdown(cell)}</${tag}>`).join('')}</tr>`;
  };

  const thead =
    headRows.length > 0
      ? `<thead class="bg-white/[0.04]">${headRows.map((r) => renderRow(r, 'th')).join('')}</thead>`
      : '';
  const tbody =
    bodyRows.length > 0
      ? `<tbody>${bodyRows.map((r) => renderRow(r, 'td')).join('')}</tbody>`
      : '';

  return `<div class="blog-table-wrap my-8 max-w-full overflow-x-auto rounded-xl border border-white/10"><table class="w-full border-collapse text-sm">${thead}${tbody}</table></div>`;
}

function collectMarkdownFromBlocks(content: BlogContentBlock[]): string {
  return content
    .filter(isMarkdownTextBlock)
    .map((block) => normalizeMarkdownText(block.text!))
    .join('\n\n');
}

function renderMarkdownBlock(value: string, headings: TocHeading[]): string {
  const lines = normalizeMarkdownText(value).split('\n');
  const html: string[] = [];
  let listItems: string[] = [];
  let orderedItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      html.push(
        `<ul class="my-6 list-disc space-y-2 pl-6 text-slate-300">${listItems
          .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
          .join('')}</ul>`,
      );
      listItems = [];
    }
    if (orderedItems.length) {
      html.push(
        `<ol class="my-6 list-decimal space-y-2 pl-6 text-slate-300">${orderedItems
          .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
          .join('')}</ol>`,
      );
      orderedItems = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();

    // Fenced code block ```lang ... ```
    const fenceOpen = trimmed.match(FENCE_OPEN);
    if (fenceOpen) {
      flushList();
      const language = fenceOpen[1] || 'text';
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !FENCE_CLOSE.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      html.push(renderCodeBlock(codeLines.join('\n'), language));
      continue;
    }

    // GFM table (| col | col |)
    const firstRow = parseTableRow(trimmed);
    if (firstRow && trimmed.includes('|')) {
      flushList();
      const tableRows: string[][] = [];
      let headerRowCount = 0;
      let sawSeparator = false;

      while (i < lines.length) {
        const rowTrimmed = lines[i].trim();
        if (!rowTrimmed) break;

        const cells = parseTableRow(rowTrimmed);
        if (!cells) break;

        if (isTableSeparatorRow(cells)) {
          headerRowCount = tableRows.length;
          sawSeparator = true;
          i++;
          continue;
        }

        tableRows.push(cells);
        i++;
      }

      if (!sawSeparator && tableRows.length > 1) {
        headerRowCount = 1;
      }

      if (tableRows.length > 0) {
        html.push(renderTable(tableRows, headerRowCount));
      }
      continue;
    }

    if (!trimmed) {
      flushList();
      i++;
      continue;
    }

    if (HR_PATTERN.test(trimmed)) {
      flushList();
      html.push('<hr class="my-10 border-0 border-t border-white/10" />');
      i++;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      const text = trimmed.slice(4);
      const id = slugifyHeading(text);
      headings.push({ id, text, level: 3 });
      html.push(
        `<h3 id="${id}" class="scroll-mt-28 font-display text-xl font-semibold text-white mt-10 mb-4">${renderInlineMarkdown(text)}</h3>`,
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      const text = trimmed.slice(3);
      const id = slugifyHeading(text);
      headings.push({ id, text, level: 2 });
      html.push(
        `<h2 id="${id}" class="scroll-mt-28 font-display text-2xl font-bold text-white mt-12 mb-4">${renderInlineMarkdown(text)}</h2>`,
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      flushList();
      const text = trimmed.slice(2);
      html.push(
        `<h1 class="font-display text-3xl font-bold text-white mb-6">${renderInlineMarkdown(text)}</h1>`,
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('> ')) {
      flushList();
      html.push(
        `<blockquote class="my-8 border-l-4 border-violet-500/60 bg-violet-500/10 px-6 py-4 text-lg italic text-slate-200 rounded-r-xl">${renderInlineMarkdown(trimmed.slice(2))}</blockquote>`,
      );
      i++;
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      orderedItems.push(orderedMatch[1]);
      i++;
      continue;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      i++;
      continue;
    }

    flushList();
    html.push(
      `<p class="mb-5 leading-relaxed text-slate-300">${renderInlineMarkdown(trimmed)}</p>`,
    );
    i++;
  }

  flushList();
  return html.join('');
}

export function markdownBlocksToHtml(content: BlogContentBlock[]): string {
  if (!content?.length) return '';

  const headings: TocHeading[] = [];
  const combined = collectMarkdownFromBlocks(content);

  if (combined) {
    return renderMarkdownBlock(combined, headings);
  }

  return '';
}

export function extractHeadingsFromContent(content: BlogContentBlock[]): TocHeading[] {
  const headings: TocHeading[] = [];
  const combined = collectMarkdownFromBlocks(content);
  if (combined) {
    renderMarkdownBlock(combined, headings);
  }
  return headings;
}
