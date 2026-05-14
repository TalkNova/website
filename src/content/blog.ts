export type BlogContentBlock =
  | { type: 'markdown'; text: string }
  | { type: string; text?: string };

export type BlogLink = { label: string; url: string };

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  author: { name: string; avatar: string };
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  content: BlogContentBlock[];
  videos?: string[];
  links?: BlogLink[];
};

/** Static blog content (replaces former MongoDB + API layer). */
export const blogPosts: BlogPost[] = [
  {
    title: 'How to Build a Better Workflow',
    slug: 'how-to-build-a-better-workflow',
    excerpt:
      'Practical tips for improving productivity, staying organized, and shipping work consistently.',
    author: {
      name: 'ULLASR',
      avatar: 'https://i.pravatar.cc/150?u=ullasr',
    },
    category: 'Productivity',
    tags: ['workflow', 'productivity', 'planning'],
    coverImage:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-05-12T10:00:00.000Z',
    updatedAt: '2026-05-12T10:00:00.000Z',
    readingTime: 5,
    featured: true,
    content: [
      {
        type: 'markdown',
        text: '# A Better Workflow\n\nA better workflow starts with **fewer distractions** and a **clearer process**.',
      },
      {
        type: 'markdown',
        text: '## Improve Your Process\n\n- Break large tasks into smaller steps\n- Set clear priorities\n- Keep your tools simple\n- Focus on consistency over perfection',
      },
    ],
  },
];
