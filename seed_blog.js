require('dotenv').config({ override: false });

const mongoose = require('mongoose');

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

const blogPost = {
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
};

async function run() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not set');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        const result = await BlogPost.updateOne(
            { slug: blogPost.slug },
            { $set: blogPost },
            { upsert: true }
        );

        console.log(`Seeded blog post: ${blogPost.slug}`);
        console.log(`Matched: ${result.matchedCount || 0}, Modified: ${result.modifiedCount || 0}`);
        if (result.upsertedId) {
            console.log(`Inserted new document with id: ${result.upsertedId}`);
        }
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect().catch(() => {});
    }
}

run();