/**
 * Verifies every blog post has metaTitle + metaDescription from content/blog.ts.
 * Run: node scripts/validate-blog-seo.mjs
 */
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Dynamic import compiled posts via tsx alternative: parse slugs from source
const source = readFileSync(join(root, 'src/content/blog.ts'), 'utf8');
const slugMatches = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const metaTitleMatches = [...source.matchAll(/metaTitle:\s*\n?\s*'([^']+)'/g)].map((m) => m[1]);
const metaDescBlocks = [...source.matchAll(/metaDescription:\s*\n\s*'([^']+(?:\\'[^']*)*)'/gs)];

console.log('Blog SEO validation (source scan)');
console.log('─'.repeat(50));
console.log(`Posts (by slug):     ${slugMatches.length}`);
console.log(`metaTitle fields:    ${metaTitleMatches.length}`);
console.log(`metaDescription:     ${metaDescBlocks.length}`);

const ok = slugMatches.length === metaTitleMatches.length && slugMatches.length === metaDescBlocks.length;

if (!ok) {
  console.error('\nMismatch: every post needs metaTitle and metaDescription in blog.ts');
  process.exit(1);
}

slugMatches.forEach((slug, i) => {
  console.log(`\n✓ /blog/${slug}`);
  console.log(`  title:       ${metaTitleMatches[i]}`);
  console.log(`  description: ${metaDescBlocks[i].slice(0, 72)}…`);
});

console.log('\n' + '─'.repeat(50));
console.log('All posts have metaTitle + metaDescription in code.');
