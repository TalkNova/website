export type BlogContentBlock =
  | { type: 'markdown'; text: string }
  | { type: string; text?: string };

export type BlogLink = { label: string; url: string };

export type BlogPost = {
  /** Visible article headline (H1, cards). */
  title: string;
  slug: string;
  /** SEO <title> segment (layout adds "| ThatMatter"). */
  metaTitle: string;
  /** SEO meta description (~150–160 chars recommended). */
  metaDescription: string;
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
    title: 'How AI WhatsApp Chatbots Convert 3× More Leads',
    slug: 'ai-whatsapp-chatbots-convert-more-leads',
    metaTitle: 'AI WhatsApp Chatbots: Convert 3× More Leads',
    metaDescription:
      'Learn how AI WhatsApp chatbots qualify leads, book meetings, and nurture prospects 24/7. Practical tips for WhatsApp Business API automation.',
    excerpt:
      'Discover how AI-powered WhatsApp bots qualify leads, book meetings, and nurture prospects 24/7 without adding headcount.',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarahchen' },
    category: 'AI Automation',
    tags: ['chatbots', 'lead generation', 'whatsapp'],
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-05-15T10:00:00.000Z',
    updatedAt: '2026-05-15T10:00:00.000Z',
    readingTime: 8,
    featured: true,
    content: [
      {
        type: 'markdown',
        text: '# The new standard for WhatsApp lead gen\n\nBusinesses using **AI WhatsApp chatbots** are seeing 3× more qualified conversations—and faster time-to-close.',
      },
      {
        type: 'markdown',
        text: '## Why WhatsApp beats email for conversion\n\n- 98% open rates on WhatsApp messages\n- Real-time two-way conversations\n- Rich media and template support\n- Native trust on a channel customers already use',
      },
      {
        type: 'markdown',
        text: '## How AI qualification works\n\nYour bot asks the right questions, scores intent, and routes hot leads to sales instantly. No more stale form fills sitting in a CRM.\n\n> "We cut response time from 4 hours to under 30 seconds—and bookings jumped 40% in the first month."',
      },
      {
        type: 'markdown',
        text: '## Getting started\n\nStart with one high-intent flow: demo requests, pricing questions, or appointment booking. Train on your FAQs, connect your CRM, and iterate weekly.',
      },
    ],
  },
  {
    title: 'WhatsApp Marketing Campaigns That Actually Scale',
    slug: 'whatsapp-marketing-campaigns-that-scale',
    metaTitle: 'WhatsApp Marketing Campaigns That Scale',
    metaDescription:
      'Template strategy, audience segmentation, and automation for WhatsApp Business API. Run campaigns that convert without hurting deliverability.',
    excerpt:
      'Template strategy, audience segmentation, and automation patterns used by high-growth teams on WhatsApp Business API.',
    author: { name: 'Marcus Webb', avatar: 'https://i.pravatar.cc/150?u=marcuswebb' },
    category: 'WhatsApp Marketing',
    tags: ['campaigns', 'templates', 'growth'],
    coverImage:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-05-10T09:00:00.000Z',
    updatedAt: '2026-05-10T09:00:00.000Z',
    readingTime: 6,
    featured: false,
    content: [
      {
        type: 'markdown',
        text: '# Campaigns that respect the channel\n\nWhatsApp is not email. The best campaigns feel **personal, timely, and permission-based**.',
      },
      {
        type: 'markdown',
        text: '## Verified templates that get approved\n\n- Keep copy concise and value-first\n- Use clear opt-in language\n- Avoid promotional overload\n- Localize for your primary markets',
      },
      {
        type: 'markdown',
        text: '## Segmentation that drives ROI\n\nSegment by lifecycle stage, product interest, and engagement score. Trigger follow-ups based on replies—not arbitrary timers.',
      },
    ],
  },
  {
    title: '24/7 Customer Support with AI on WhatsApp',
    slug: 'ai-customer-support-whatsapp',
    metaTitle: '24/7 AI Customer Support on WhatsApp',
    metaDescription:
      'Automate tier-1 support on WhatsApp with AI: FAQs, order status, and smart human handoff. Reduce tickets and improve CSAT with the Business API.',
    excerpt:
      'Reduce ticket volume, resolve FAQs instantly, and escalate complex cases to humans—with full conversation context.',
    author: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?u=priyanair' },
    category: 'Customer Support',
    tags: ['support', 'automation', 'cx'],
    coverImage:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-05-05T14:00:00.000Z',
    updatedAt: '2026-05-05T14:00:00.000Z',
    readingTime: 7,
    featured: false,
    content: [
      {
        type: 'markdown',
        text: '# Support without the wait\n\nAI agents handle tier-1 questions while your team focuses on high-value conversations.',
      },
      {
        type: 'markdown',
        text: '## What to automate first\n\n- Order status and tracking\n- Account and billing FAQs\n- Appointment rescheduling\n- Product recommendations',
      },
      {
        type: 'markdown',
        text: '## Human handoff done right\n\nWhen sentiment drops or complexity rises, route to an agent with full chat history—no repeating information.',
      },
    ],
  },
  {
    title: 'Verified WhatsApp Templates: Approval Guide 2026',
    slug: 'verified-whatsapp-templates-guide',
    metaTitle: 'WhatsApp Template Approval Guide 2026',
    metaDescription:
      'Get WhatsApp marketing and utility templates approved faster. Checklist for Meta review, common rejections, and compliant template copy.',
    excerpt:
      'A practical checklist for getting marketing and utility templates approved faster on the WhatsApp Business Platform.',
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarahchen2' },
    category: 'WhatsApp Marketing',
    tags: ['templates', 'compliance', 'api'],
    coverImage:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-28T11:00:00.000Z',
    updatedAt: '2026-04-28T11:00:00.000Z',
    readingTime: 5,
    featured: false,
    content: [
      {
        type: 'markdown',
        text: '# Templates are your growth lever\n\nWithout approved templates, outbound marketing on WhatsApp does not scale.',
      },
      {
        type: 'markdown',
        text: '## Common rejection reasons\n\n- Misleading or vague CTAs\n- Missing opt-out clarity\n- URL shorteners or suspicious links\n- Category mismatch (marketing vs utility)',
      },
    ],
  },
  {
    title: 'Real Estate Lead Automation on WhatsApp',
    slug: 'real-estate-lead-automation-whatsapp',
    metaTitle: 'Real Estate Lead Automation on WhatsApp',
    metaDescription:
      'Capture property inquiries, schedule viewings, and nurture buyers with WhatsApp AI automation built for real estate teams and brokerages.',
    excerpt:
      'How brokerages capture property inquiries, schedule viewings, and nurture buyers with AI—without losing the personal touch.',
    author: { name: 'Marcus Webb', avatar: 'https://i.pravatar.cc/150?u=marcuswebb2' },
    category: 'Industry Playbooks',
    tags: ['real estate', 'leads', 'automation'],
    coverImage:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-20T08:00:00.000Z',
    updatedAt: '2026-04-20T08:00:00.000Z',
    readingTime: 6,
    featured: false,
    content: [
      {
        type: 'markdown',
        text: '# Speed wins listings\n\nBuyers message multiple agents. The first **qualified, helpful** response usually wins.',
      },
      {
        type: 'markdown',
        text: '## Flows that work\n\n- Instant property detail replies\n- Viewing scheduler with calendar sync\n- Budget and location qualification\n- Follow-up sequences for cold leads',
      },
    ],
  },
  {
    title: 'How to Build a Better Workflow',
    slug: 'how-to-build-a-better-workflow',
    metaTitle: 'Build a Better WhatsApp Automation Workflow',
    metaDescription:
      'Ship WhatsApp automation projects faster with a clear workflow: priorities, sprints, and simple tooling. Productivity tips for ops and growth teams.',
    excerpt:
      'Practical tips for improving productivity, staying organized, and shipping WhatsApp automation projects consistently.',
    author: { name: 'ULLASR', avatar: 'https://i.pravatar.cc/150?u=ullasr' },
    category: 'Productivity',
    tags: ['workflow', 'productivity', 'planning'],
    coverImage:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-04-12T10:00:00.000Z',
    updatedAt: '2026-04-12T10:00:00.000Z',
    readingTime: 5,
    featured: false,
    content: [
      {
        type: 'markdown',
        text: '# A Better Workflow\n\nA better workflow starts with **fewer distractions** and a **clearer process** for launching automation.',
      },
      {
        type: 'markdown',
        text: '## Improve Your Process\n\n- Break large tasks into smaller steps\n- Set clear priorities for each sprint\n- Keep your tooling stack simple\n- Focus on consistency over perfection',
      },
    ],
  },
];
