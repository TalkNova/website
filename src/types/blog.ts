export type BlogContentBlock =
  | { type: 'markdown'; text: string }
  | { type: string; text?: string };

export type BlogLink = { label: string; url: string };

export type BlogAuthor = {
  name: string;
  avatar: string;
};

/** Summary + full article shape returned by public blog API. */
export type BlogPost = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  content?: BlogContentBlock[];
  videos?: string[];
  links?: BlogLink[];
};

export type BlogCategory = {
  name: string;
  slug: string;
  postCount: number;
};

export type BlogPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type BlogListResult = {
  posts: BlogPost[];
  pagination: BlogPagination;
};

export type BlogPageMeta = {
  metaTitle: string;
  metaDescription: string;
};

export type NewsletterSubscribeResult = {
  success: boolean;
  message: string;
};
