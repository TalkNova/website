/**
 * Extracts legal page content from root HTML files into src/content/legal/*.json
 * Source: privacy-policy.html, terms-and-conditions.html (repo root)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function extract(file) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const heroMatch = html.match(/<div class="doc-hero">([\s\S]*?)<\/div>\s*<div class="doc-layout">/);
  const sidebarMatch = html.match(/<aside class="sidebar">([\s\S]*?)<\/aside>/);
  const mainMatch = html.match(/<main class="content">([\s\S]*?)<\/main>/);
  const title = heroMatch?.[1].match(/<h1>([\s\S]*?)<\/h1>/)?.[1] ?? '';
  const description = heroMatch?.[1].match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? '';
  const effectiveDate = html.match(/Effective: ([^<]+)/)?.[1]?.trim() ?? '';
  return {
    title,
    description,
    effectiveDate,
    sidebarHtml: sidebarMatch?.[1] ?? '',
    bodyHtml: mainMatch?.[1] ?? '',
  };
}

const outDir = path.join(root, 'src/content/legal');
fs.mkdirSync(outDir, { recursive: true });

for (const [name, file] of [
  ['privacy-policy', 'privacy-policy.html'],
  ['terms-and-conditions', 'terms-and-conditions.html'],
]) {
  const data = extract(file);
  fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(data));
  console.log(`Wrote ${name}.json`);
}
