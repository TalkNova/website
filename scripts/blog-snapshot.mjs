/**
 * Fetches all published posts from the Blog API and writes src/data/blog-snapshot.json.
 * Run before deploy when the API is up: npm run blog:snapshot
 *
 * Requires BLOG_API_URL (default http://localhost:8001).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const base = (process.env.BLOG_API_URL || 'http://localhost:8001').replace(/\/$/, '');

async function apiGet(path) {
  const res = await fetch(`${base}${path}`, { headers: { Accept: 'application/json' } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || res.statusText);
  return json.data;
}

async function main() {
  console.log(`Snapshot from ${base} ...`);

  const list = await apiGet('/blog/posts?limit=50&sort=publishedAt');
  const summaries = list.data ?? [];

  const posts = [];
  for (const item of summaries) {
    try {
      const full = await apiGet(`/blog/posts/${encodeURIComponent(item.slug)}`);
      posts.push(full);
      console.log(`  ✓ ${item.slug}`);
    } catch (e) {
      console.warn(`  ✗ ${item.slug}: ${e.message}`);
      posts.push(item);
    }
  }

  let categories = [];
  try {
    const catPayload = await apiGet('/blog/categories');
    categories = catPayload.data ?? [];
  } catch {
    categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      postCount: posts.filter((p) => p.category === name).length,
    }));
  }

  let meta = {
    metaTitle: 'Blog — AI Automation & WhatsApp Growth Insights',
    metaDescription:
      'Learn AI automation, WhatsApp marketing, chatbot systems, and customer engagement strategies from the Thatmatters team.',
  };
  try {
    meta = await apiGet('/blog/meta');
  } catch {
    /* use defaults */
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    apiBaseUrl: base,
    meta,
    categories,
    posts,
  };

  const outDir = path.join(root, 'src/data');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'blog-snapshot.json'), JSON.stringify(snapshot, null, 2));
  console.log(`Wrote ${posts.length} posts to src/data/blog-snapshot.json`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
