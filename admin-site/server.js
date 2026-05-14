const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'change_me_in_env', resave: false, saveUninitialized: true }));

const MAIN_SITE_BASE = process.env.MAIN_SITE_BASE || 'http://localhost:3000';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';

async function fetchJsonSafe(url, options) {
  try {
    const response = await fetch(url, options);
    const text = await response.text().catch(() => '');
    let data = {};
    try { data = JSON.parse(text || '{}'); } catch (e) { data = {}; }
    return { ok: response.ok, status: response.status, data, text };
  } catch (error) {
    return { ok: false, status: 0, data: {}, error };
  }
}

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).end();
});

const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
const draftsPath = path.join(dataDir, 'drafts.json');
const logsDir = path.join(__dirname, 'logs');
const apiLogPath = path.join(logsDir, 'api.log');

function ensureLogsDir() {
  try {
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function writeApiLog(entry) {
  try {
    ensureLogsDir();
    const line = JSON.stringify(Object.assign({ ts: new Date().toISOString() }, entry));
    fs.appendFileSync(apiLogPath, line + '\n', 'utf8');
  } catch (e) {
    console.error('[admin] writeApiLog error', e && e.message);
  }
}

function contentToText(content) {
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (!block) return '';
        if (typeof block === 'string') return block;
        return block.text || '';
      })
      .filter(Boolean)
      .join('\n\n');
  }

  return String(content || '');
}

function generateSlugFromTitle(title) {
  if (!title) return '';
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

function normalizeBlogPost(post = {}) {
  const title = post.title || '';
  const slug = post.slug || generateSlugFromTitle(title);
  return {
    ...post,
    title,
    slug,
    excerpt: post.excerpt || '',
    author: post.author || {},
    category: post.category || '',
    tags: Array.isArray(post.tags) ? post.tags : [],
    coverImage: post.coverImage || post.image || '',
    publishedAt: post.publishedAt || '',
    updatedAt: post.updatedAt || '',
    readingTime: post.readingTime || '',
    featured: Boolean(post.featured),
    content: post.content || ''
  };
}

function loadDrafts() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(draftsPath)) return [];
    const raw = fs.readFileSync(draftsPath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function saveDrafts(drafts) {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(draftsPath, JSON.stringify(drafts, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

const ensureAdmin = (req, res, next) => {
  console.log('[admin] ensureAdmin -> session:', req.session);
  if (req.session && req.session.admin) return next();
  const wantsJson = req.xhr || (req.headers.accept && req.headers.accept.indexOf('application/json') !== -1) || (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') !== -1);
  if (wantsJson) return res.status(401).json({ ok: false, login: true });
  res.redirect('/login');
};

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.admin = true;
    return res.redirect('/dashboard');
  }
  res.send('Invalid credentials');
});

app.get('/dashboard', ensureAdmin, async (req, res) => {
  // Fetch posts from main site to display
  console.log('[admin] fetching posts from main site...', MAIN_SITE_BASE);
  const postsResponse = await fetchJsonSafe(`${MAIN_SITE_BASE}/api/blog`);
  // console.log('[admin] postsResponse ->', postsResponse);
  const posts = Array.isArray(postsResponse.data) ? postsResponse.data : [];
  const html = require('fs').readFileSync(path.join(__dirname, 'views', 'dashboard.html'), 'utf8');
  console.log('[admin] fetch posts ->',posts);
  const escapeHTML = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const latestPostTitle = posts.length ? escapeHTML(normalizeBlogPost(posts[0]).title) : 'No posts yet';
  const drafts = loadDrafts();

  const postsHtml = posts.map((post) => {
    const normalized = normalizeBlogPost(post);
    const title = escapeHTML(normalized.title);
    const excerptSource = normalized.excerpt || contentToText(normalized.content);
    const excerpt = escapeHTML(excerptSource.slice(0, 180));
    const full = escapeHTML(contentToText(normalized.content));
    const postData = JSON.stringify({
      ...normalized,
      content: normalized.content
    }).replace(/"/g, '&quot;');
    const hasImage = normalized.coverImage ? `<span class="chip chip-success">Image</span>` : '';
    const videoCount = Array.isArray(normalized.videos) ? normalized.videos.length : 0;
    const linkCount = Array.isArray(normalized.links) ? normalized.links.length : 0;

    return `
      <article class="post-card" data-id="${escapeHTML(normalized._id)}" data-post-json="${postData}" data-full="${full}">
        <div class="post-card__head">
          <div>
            <h3 class="post-title-link">${title}</h3>
            <p class="muted">${excerpt || 'No content preview available.'}</p>
          </div>
          <div style="display:flex; gap:8px; align-items:flex-start;">
            <button class="btn btn-ghost edit-btn" type="button">Edit</button>
            <button class="btn btn-ghost preview-btn" type="button">Preview</button>
            <form method="post" action="/delete">
              <input type="hidden" name="id" value="${escapeHTML(normalized._id || '')}"/>
              <button class="btn btn-danger" type="submit">Delete</button>
            </form>
          </div>
        </div>
        <div class="post-card__meta">
          ${hasImage}
          <span class="chip">${videoCount} videos</span>
          <span class="chip">${linkCount} links</span>
        </div>
      </article>
    `;
  }).join('\n');

  // show one-time flash message from session if present
  const flash = req.session.message || '';
  if (req.session) delete req.session.message;

  let final = html
    .replace('{{POST_COUNT}}', String(posts.length))
    .replace('{{LATEST_POST_TITLE}}', latestPostTitle)
    .replace(/\{\{MAIN_SITE_BASE\}\}/g, MAIN_SITE_BASE)
    .replace('<!--POSTS_PLACEHOLDER-->', postsHtml)
    .replace('<!--DRAFTS_PLACEHOLDER-->', drafts.map(d => {
      const title = escapeHTML(d.title || 'Untitled');
      const excerpt = escapeHTML(String((d.excerpt || contentToText(d.content)).slice(0, 140)));
      const full = escapeHTML(contentToText(d.content));
      const draftData = JSON.stringify({
        ...normalizeBlogPost(d),
        content: d.content || ''
      }).replace(/"/g, '&quot;');
      return `
        <article class="post-card" data-draft-id="${escapeHTML(d.id || '')}" data-post-json="${draftData}" data-full="${full}">
          <div class="post-card__head">
            <div>
              <h3 class="post-title-link">${title} <small class="muted">(Draft)</small></h3>
              <p class="muted">${excerpt || 'No content preview available.'}</p>
            </div>
            <div style="display:flex; gap:8px; align-items:flex-start;">
              <button class="btn btn-ghost edit-btn" type="button">Edit</button>
              <button class="btn btn-ghost preview-btn" type="button">Preview</button>
              <form method="post" action="/delete-draft" style="margin:0;"><input type="hidden" name="id" value="${escapeHTML(d.id || '')}"/><button class="btn btn-ghost" type="submit">Delete</button></form>
              <form method="post" action="/publish-draft" style="margin:0;"><input type="hidden" name="id" value="${escapeHTML(d.id || '')}"/><button class="btn btn-primary" type="submit">Publish</button></form>
            </div>
          </div>
          <div class="post-card__meta">
            <span class="chip">Saved ${new Date(d.updatedAt||d.createdAt).toLocaleString()}</span>
          </div>
        </article>
      `;
    }).join('\n'));
  if (flash) {
    final = final.replace('<section id="dashboard-root">', `<section id="dashboard-root"><div class="panel" style="margin:12px 0;padding:12px;background:linear-gradient(90deg,#fff9,#fff); border-radius:8px;color:#111;">${escapeHTML(flash)}</div>`);
  }
 console.log('[admin] render dashboard ->', { flash: Boolean(flash), adminApiKeySet: Boolean(ADMIN_API_KEY), adminApiKeyPlaceholder: ADMIN_API_KEY.indexOf('replace') !== -1 });
  // warn if ADMIN_API_KEY looks like a placeholder
  if ((!ADMIN_API_KEY || ADMIN_API_KEY.indexOf('replace') !== -1) && !flash) {
    final = final.replace('<section id="dashboard-root">', `<section id="dashboard-root"><div class="panel" style="margin:12px 0;padding:12px;background:#fff7ed;border-left:4px solid #f59e0b;border-radius:8px;color:#92400e;">Warning: ADMIN_API_KEY is not set or uses the placeholder value. Set the correct admin API key in admin-site/.env to enable publish/delete sync with the public site.</div>`);
  }

  res.send(final);
});

// Save a draft locally
app.post('/save-draft', ensureAdmin, (req, res) => {
  const { id, title, content, image, videos, links, 'pro-tips': proTips } = req.body;
  const drafts = loadDrafts();
  
  const videoArr = typeof videos === 'string' ? parseVideos(videos) : videos;
  const linksArr = typeof links === 'string' ? parseLinks(links) : links;
  
  if (id) {
    const idx = drafts.findIndex(d => d.id === id);
    if (idx !== -1) {
      drafts[idx] = { ...drafts[idx], title, content, image, videos: videoArr, links: linksArr, proTips, updatedAt: Date.now() };
      saveDrafts(drafts);
      return res.json({ ok: true, id: drafts[idx].id });
    }
  }
  const newDraft = { id: String(Date.now()), title, content, image, videos: videoArr, links: linksArr, proTips, createdAt: Date.now(), updatedAt: Date.now() };
  drafts.unshift(newDraft);
  saveDrafts(drafts);
  res.json({ ok: true, id: newDraft.id });
});

// Delete a draft
app.post('/delete-draft', ensureAdmin, (req, res) => {
  const id = req.body.id;
  const drafts = loadDrafts().filter(d => d.id !== id);
  saveDrafts(drafts);
  res.redirect('/dashboard');
});

// Publish a draft (create on main site then remove draft)
app.post('/publish-draft', ensureAdmin, async (req, res) => {
  const id = req.body.id;
  const drafts = loadDrafts();
  const idx = drafts.findIndex(d => d.id === id);
  if (idx === -1) return res.redirect('/dashboard');
  const draft = drafts[idx];
  
  const payload = {
    title: draft.title || '',
    content: draft.content || '',
    image: draft.image || null,
    videos: Array.isArray(draft.videos) ? draft.videos : parseVideos(draft.videos),
    links: Array.isArray(draft.links) ? draft.links : parseLinks(draft.links),
    proTips: draft.proTips || null
  };
  
  const apiRes = await fetchJsonSafe(`${MAIN_SITE_BASE}/api/admin/blog/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-api-key': ADMIN_API_KEY },
    body: JSON.stringify(payload)
  });
  console.log('[admin] publish-draft ->', { url: `${MAIN_SITE_BASE}/api/admin/blog/create`, status: apiRes.status, ok: apiRes.ok, text: apiRes.text || (apiRes.error && String(apiRes.error)) });
  writeApiLog({ action: 'publish-draft', url: `${MAIN_SITE_BASE}/api/admin/blog/create`, status: apiRes.status, ok: apiRes.ok, response: apiRes.text || null, error: apiRes.error ? String(apiRes.error) : null, draftId: draft.id });
  if (apiRes.ok) {
    drafts.splice(idx, 1);
    saveDrafts(drafts);
    return res.redirect('/dashboard');
  }

  // keep the draft and notify admin of failure (include response snippet)
  const snippet = apiRes.text ? String(apiRes.text).slice(0, 240) : (apiRes.error ? String(apiRes.error).slice(0,240) : 'No response body');
  req.session.message = `Publish failed (status: ${apiRes.status || 0}). ${snippet}`;
  res.redirect('/dashboard');
});

function parseVideos(videosStr) {
  if (!videosStr || typeof videosStr !== 'string') return [];
  return videosStr.split(/[\n,;]+/).map(url => url.trim()).filter(url => url.length > 0);
}

function parseLinks(linksStr) {
  if (!linksStr || typeof linksStr !== 'string') return [];
  try {
    const parsed = JSON.parse(linksStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

app.post('/create', ensureAdmin, async (req, res) => {
  const payload = {
    title: req.body.title || '',
    content: req.body.content || '',
    image: req.body.image || null,
    videos: parseVideos(req.body.videos),
    links: parseLinks(req.body.links),
    proTips: req.body['pro-tips'] || null
  };
  
  console.log('[admin] create payload ->', { title: payload.title, hasContent: !!payload.content, imageUrl: payload.image, videoCount: payload.videos.length, linkCount: payload.links.length });
  
  const apiRes = await fetchJsonSafe(`${MAIN_SITE_BASE}/api/admin/blog/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-api-key': ADMIN_API_KEY
    },
    body: JSON.stringify(payload)
  });

  console.log('[admin] create ->', { url: `${MAIN_SITE_BASE}/api/admin/blog/create`, status: apiRes.status, ok: apiRes.ok, text: apiRes.text || (apiRes.error && String(apiRes.error)) });
  writeApiLog({ action: 'create', url: `${MAIN_SITE_BASE}/api/admin/blog/create`, status: apiRes.status, ok: apiRes.ok, response: apiRes.text || null, error: apiRes.error ? String(apiRes.error) : null, payload: payload });

  if (apiRes.ok) return res.redirect('/dashboard');

  // if creation failed, save as draft locally so content isn't lost
  const drafts = loadDrafts();
  const newDraft = { id: String(Date.now()), title: payload.title, content: payload.content, image: payload.image, videos: payload.videos, links: payload.links, proTips: payload.proTips, createdAt: Date.now(), updatedAt: Date.now() };
  drafts.unshift(newDraft);
  saveDrafts(drafts);
  const snippetCreate = apiRes.text ? String(apiRes.text).slice(0,240) : (apiRes.error ? String(apiRes.error).slice(0,240) : 'No response body');
  req.session.message = `Publish failed (status: ${apiRes.status || 0}). Saved locally as a draft. ${snippetCreate}`;
  res.redirect('/dashboard');
});

app.post('/delete', ensureAdmin, async (req, res) => {
  const apiRes = await fetchJsonSafe(`${MAIN_SITE_BASE}/api/admin/blog/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-api-key': ADMIN_API_KEY
    },
    body: JSON.stringify({ id: req.body.id })
  });

  console.log('[admin] delete ->', { url: `${MAIN_SITE_BASE}/api/admin/blog/delete`, status: apiRes.status, ok: apiRes.ok, text: apiRes.text || (apiRes.error && String(apiRes.error)) });
  writeApiLog({ action: 'delete', url: `${MAIN_SITE_BASE}/api/admin/blog/delete`, status: apiRes.status, ok: apiRes.ok, response: apiRes.text || null, error: apiRes.error ? String(apiRes.error) : null, id: req.body.id });

  if (apiRes.ok) return res.redirect('/dashboard');

  const snippetDel = apiRes.text ? String(apiRes.text).slice(0,240) : (apiRes.error ? String(apiRes.error).slice(0,240) : 'No response body');
  req.session.message = `Delete failed (status: ${apiRes.status || 0}). ${snippetDel}`;
  res.redirect('/dashboard');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Admin probe: check connectivity to MAIN_SITE_BASE and blog endpoints
app.get('/__admin_probe', ensureAdmin, async (req, res) => {
  const endpoints = [
    `${MAIN_SITE_BASE}/`,
    `${MAIN_SITE_BASE}/api/blog`,
    `${MAIN_SITE_BASE}/api/admin/blog/create`,
    `${MAIN_SITE_BASE}/api/admin/blog/delete`
  ];
  const results = {};
  for (const ep of endpoints) {
    try {
      const r = await fetchJsonSafe(ep, { method: 'GET' });
      results[ep] = { ok: r.ok, status: r.status, text: (r.text || '').slice(0, 200) };
    } catch (e) {
      results[ep] = { ok: false, error: String(e) };
    }
  }
  res.json({ ok: true, base: MAIN_SITE_BASE, results });
});

app.listen(PORT, () => {
  console.log(`Admin site running on http://localhost:${PORT}`);
});
