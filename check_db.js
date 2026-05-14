require('dotenv').config();
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    excerpt: String,
    author: {
        name: String,
        avatar: String
    },
    category: String,
    tags: [String],
    coverImage: String,
    publishedAt: Date,
    updatedAt: Date,
    readingTime: Number,
    featured: Boolean,
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

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const doc = await BlogPost.findOne().sort({ date: -1 });
        if (doc) {
            const obj = doc.toObject();
            console.log("Keys:", Object.keys(obj));
            console.log("Full JSON:", JSON.stringify(obj, null, 2));
        } else {
            console.log("No BlogPost found.");
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
