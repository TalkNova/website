require('dotenv').config({ override: false });

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

const slugify = (value) =>
    String(value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

const normalizeAuthor = (author) => {
    if (!author) return null;
    if (typeof author === 'string') return { name: author, avatar: '' };
    return {
        name: author.name || '',
        avatar: author.avatar || ''
    };
};

const normalizeTags = (tags) => {
    if (Array.isArray(tags)) return tags.filter(Boolean).map(tag => String(tag));
    if (typeof tags === 'string') {
        return tags
            .split(/[,\n]+/)
            .map(tag => tag.trim())
            .filter(Boolean);
    }
    return [];
};

const normalizeContent = (content) => {
    if (Array.isArray(content)) return content;
    if (typeof content === 'string' && content.trim()) {
        return [{ type: 'markdown', text: content }];
    }
    return [];
};

const normalizeBlogPost = (doc) => {
    const post = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
    const coverImage = post.coverImage || post.image || '';
    const publishedAt = post.publishedAt || post.date || null;
    const updatedAt = post.updatedAt || publishedAt;
    const slug = post.slug || slugify(post.title);

    return {
        ...post,
        slug,
        coverImage,
        image: post.image || coverImage,
        excerpt: post.excerpt || '',
        author: normalizeAuthor(post.author),
        category: post.category || '',
        tags: normalizeTags(post.tags),
        publishedAt,
        updatedAt,
        readingTime: post.readingTime || 0,
        featured: Boolean(post.featured),
        content: normalizeContent(post.content)
    };
};

const buildBlogPostData = (body) => {
    const publishedAt = body.publishedAt || body.date || new Date();
    const updatedAt = body.updatedAt || publishedAt;
    const coverImage = body.coverImage || body.image || '';

    return {
        title: body.title,
        slug: body.slug || slugify(body.title),
        excerpt: body.excerpt || '',
        author: normalizeAuthor(body.author),
        category: body.category || '',
        tags: normalizeTags(body.tags),
        coverImage,
        image: coverImage,
        publishedAt: new Date(publishedAt),
        updatedAt: new Date(updatedAt),
        readingTime: Number(body.readingTime) || 0,
        featured: Boolean(body.featured),
        content: normalizeContent(body.content),
        videos: Array.isArray(body.videos) ? body.videos : [],
        links: Array.isArray(body.links) ? body.links : []
    };
};

const defaultBlogPosts = [
    {
        title: 'How to Build a Better Workflow',
        slug: 'how-to-build-a-better-workflow',
        excerpt: 'Practical tips for improving productivity, staying organized, and shipping work consistently.',
        author: {
            name: 'ULLASR',
            avatar: '/images/authors/ullasr.jpg'
        },
        category: 'Productivity',
        tags: ['workflow', 'productivity', 'planning'],
        coverImage: '/images/blog/workflow-cover.jpg',
        publishedAt: new Date('2026-05-12T10:00:00.000Z'),
        updatedAt: new Date('2026-05-12T10:00:00.000Z'),
        readingTime: 5,
        featured: true,
        content: [
            {
                type: 'markdown',
                text: '# A Better Workflow\n\nA better workflow starts with **fewer distractions** and a **clearer process**.'
            },
            {
                type: 'markdown',
                text: '## Improve Your Process\n\n- Break large tasks into smaller steps\n- Set clear priorities\n- Keep your tools simple\n- Focus on consistency over perfection'
            }
        ]
    }
];

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// BlogPost Schema
const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, index: true },
    excerpt: String,
    author: {
        name: String,
        avatar: String
    },
    category: String,
    tags: [String],
    coverImage: String,
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    readingTime: Number,
    featured: { type: Boolean, default: false },
    content: mongoose.Schema.Types.Mixed,
    image: String,
    videos: [String],
    links: [
        {
            label: String,
            url: String
        }
    ],
    date: { type: Date, default: Date.now },
});
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'change_me_in_env', resave: false, saveUninitialized: true }));
const serveHtml = (req, res, fileName) => {
    res.sendFile(path.join(__dirname, 'views', fileName));
};

app.get('/', (req, res) => serveHtml(req, res, 'index.html'));
app.get('/about', (req, res) => serveHtml(req, res, 'about.html'));
app.get('/pricing', (req, res) => serveHtml(req, res, 'pricing.html'));
app.get('/blog', (req, res) => serveHtml(req, res, 'blog.html'));
// API: Get all blog posts (for dynamic blog page)
app.get('/api/blog', async (req, res) => {
    const posts = await BlogPost.find().sort({ featured: -1, publishedAt: -1, date: -1 });
    if (!posts.length) {
        return res.json(defaultBlogPosts);
    }

    res.json(posts.map(normalizeBlogPost));
});

app.get('/api/blog/:slug', async (req, res) => {
    const posts = await BlogPost.find();
    const post = posts.find(item => (item.slug || slugify(item.title)) === req.params.slug);

    if (!post) {
        const fallbackPost = defaultBlogPosts.find(item => item.slug === req.params.slug);
        if (!fallbackPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        return res.json(fallbackPost);
    }

    res.json(normalizeBlogPost(post));
});
app.get('/blog-post', (req, res) => serveHtml(req, res, 'blog-post.html'));
app.get('/contact', (req, res) => serveHtml(req, res, 'contact.html'));
app.get('/login', (req, res) => serveHtml(req, res, 'login.html'));

// Public (non-admin) login endpoint — keep separate from admin
app.post('/user/login', (req, res) => {
    res.redirect('/');
});

// Admin API key middleware (for external admin site)
function requireAdminApi(req, res, next) {
    const key = req.get('x-admin-api-key') || req.query.api_key;
    if (key && process.env.ADMIN_API_KEY && key === process.env.ADMIN_API_KEY) return next();
    return res.status(401).json({ error: 'Unauthorized' });
}

// Admin dashboard removed from main site for security. Admin UI should run in a separate admin-site folder.

// Admin API endpoints (used by the separate admin site)
app.post('/api/admin/blog/create', requireAdminApi, async (req, res) => {
    const postData = buildBlogPostData(req.body);
    const created = await BlogPost.create(postData);
    res.json({ success: true, post: normalizeBlogPost(created) });
});

// Delete blog post (admin API)
app.post('/api/admin/blog/delete', requireAdminApi, async (req, res) => {
    await BlogPost.findByIdAndDelete(req.body.id);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
