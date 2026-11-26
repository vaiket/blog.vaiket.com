export type Article = {
  id: string
  slug: string
  title: string
  description: string
  featuredImage: string
  imageAlt: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  updatedAt?: string
  readingTime: string
  status: 'draft' | 'published' | 'archived'
  seoTitle: string
  seoDescription: string
}

export const articles: Article[] = [
  {
    id: 'agentic-ai-rise', slug: 'the-rise-of-agentic-ai',
    title: 'The Rise of Agentic AI: From Tools to Autonomous Business Systems',
    description: 'How AI agents are moving beyond simple automation to run complex business workflows, drive growth, and create real impact.',
    featuredImage: '/luminous-ai-wave-mesh.png', imageAlt: 'Luminous blue AI wave mesh',
    category: 'AI', tags: ['AI', 'Agentic AI'], author: 'Vaiket Team',
    publishedAt: 'Nov 20, 2026', updatedAt: 'Nov 20, 2026', readingTime: '8 min read', status: 'published',
    seoTitle: 'The Rise of Agentic AI | Vaiket Blog', seoDescription: 'How AI agents are moving beyond simple automation to run complex business workflows, drive growth, and create real impact.',
  },
  {
    id: 'whatsapp-workflows', slug: 'build-powerful-business-workflows-on-whatsapp',
    title: 'Build Powerful Business Workflows on WhatsApp', description: 'A practical guide to automation, notifications, lead generation, and AI-powered support on WhatsApp.',
    featuredImage: '/futuristic-neon-whatsapp-glass-interface.png', imageAlt: 'Futuristic neon WhatsApp interface', category: 'WhatsApp', tags: ['WhatsApp', 'Automation'], author: 'Vaiket Team', publishedAt: 'Nov 18, 2026', readingTime: '6 min read', status: 'published', seoTitle: 'Build Powerful Business Workflows on WhatsApp | Vaiket Blog', seoDescription: 'A practical guide to automation, notifications, lead generation, and AI-powered support on WhatsApp.',
  },
  {
    id: 'generative-commerce', slug: 'generative-commerce-next-evolution', title: 'Generative Commerce: The Next Evolution of Online Business', description: 'How AI is changing product discovery, customer experience, and the entire commerce journey.', featuredImage: '/neon-ai-commerce-landscape.png', imageAlt: 'Neon AI commerce landscape', category: 'Commerce', tags: ['Commerce', 'Generative Commerce'], author: 'Vaiket Team', publishedAt: 'Nov 15, 2026', readingTime: '7 min read', status: 'published', seoTitle: 'Generative Commerce: The Next Evolution | Vaiket Blog', seoDescription: 'How AI is changing product discovery, customer experience, and the entire commerce journey.',
  },
  {
    id: 'vaiket-cloud', slug: 'inside-vaiket-cloud', title: 'Inside Vaiket Cloud: A Unified Platform for AI-Native Businesses', description: 'A closer look at how Vaiket Cloud brings AI, automation, and business tools together.', featuredImage: '/vaiket-cloud-infrastructure-blue.png', imageAlt: 'Vaiket cloud infrastructure in blue', category: 'Cloud', tags: ['Cloud', 'Infrastructure'], author: 'Vaiket Team', publishedAt: 'Nov 12, 2026', readingTime: '5 min read', status: 'published', seoTitle: 'Inside Vaiket Cloud | Vaiket Blog', seoDescription: 'A closer look at how Vaiket Cloud brings AI, automation, and business tools together.',
  },
  {
    id: 'ai-voice-calling', slug: 'ai-voice-calling-automate-customer-calls', title: 'AI Voice Calling: Automate Customer Calls at Scale', description: 'Set up human-like AI calling for sales, support, and follow-ups with real business use cases.', featuredImage: '/neon-ai-commerce-landscape.png', imageAlt: 'Neon AI landscape', category: 'RCS & Voice', tags: ['RCS & Voice', 'AI Calling'], author: 'Vaiket Team', publishedAt: 'Nov 10, 2026', readingTime: '6 min read', status: 'published', seoTitle: 'AI Voice Calling: Automate Customer Calls | Vaiket Blog', seoDescription: 'Set up human-like AI calling for sales, support, and follow-ups with real business use cases.',
  },
  {
    id: 'product-updates', slug: 'latest-vaiket-product-updates', title: 'What’s New in Vaiket: Latest Product Updates', description: 'New features, improvements, and integrations to help you grow faster.', featuredImage: '/vaiket-cloud-infrastructure-blue.png', imageAlt: 'Vaiket cloud platform', category: 'Product', tags: ['Product', 'Platform'], author: 'Vaiket Team', publishedAt: 'Nov 8, 2026', readingTime: '4 min read', status: 'published', seoTitle: 'Latest Vaiket Product Updates | Vaiket Blog', seoDescription: 'New features, improvements, and integrations to help you grow faster.',
  },
  {
    id: 'whatsapp-business-api-future', slug: 'whatsapp-business-api-future-of-business-communication', title: 'WhatsApp Business API: Beyond Messaging, Towards Intelligent Business Operations', description: 'How businesses can transform everyday customer conversations into sales, automated workflows, and intelligent business experiences.', featuredImage: '/futuristic-neon-whatsapp-glass-interface.png', imageAlt: 'Futuristic neon WhatsApp business interface', category: 'WhatsApp & Business Automation', tags: ['WhatsApp API', 'Agentic AI', 'Automation', 'Conversational Commerce'], author: 'Vaiket Team', publishedAt: 'Nov 25, 2026', readingTime: '7 min read', status: 'published', seoTitle: 'WhatsApp Business API: The Future of Intelligent Business Communication | Vaiket', seoDescription: 'Discover how WhatsApp Business API, Agentic AI and automation can transform customer support, sales, commerce and business operations with Vaiket.',
  },
]

export function getPublishedArticle(slug: string) {
  return articles.find(article => article.slug === slug && article.status === 'published')
}
