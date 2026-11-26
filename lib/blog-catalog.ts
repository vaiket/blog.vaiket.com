import { articles, type Article } from './articles'
import { getResearchArticle, getResearchSlugs } from './research-article'

export type CatalogPost = {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  readingTime: string
  image: string
}

function researchCards(): CatalogPost[] {
  return getResearchSlugs().flatMap(slug => {
    const article = getResearchArticle(slug)
    if (article.status !== 'published' || !article.publishedAt) return []
    return [{ slug: article.slug, title: article.title, description: article.description, category: article.category, tags: article.tags, date: article.publishedAt, readingTime: `${article.readingMinutes} min read`, image: '/luminous-ai-wave-mesh.png' }]
  })
}

function articleCards(): CatalogPost[] {
  return articles.filter(article => article.status === 'published').map((article: Article) => ({ slug: article.slug, title: article.title, description: article.description, category: article.category, tags: article.tags, date: article.publishedAt, readingTime: article.readingTime, image: article.featuredImage }))
}

let catalogCache: CatalogPost[] | undefined

export function getCatalogPosts() {
  if (!catalogCache) catalogCache = [...articleCards(), ...researchCards()]
  return catalogCache
}

export const categoryDefinitions: Record<string, { title: string; description: string }> = {
  ai: { title: 'Artificial Intelligence', description: 'Research and practical guidance on AI, agentic systems and responsible business use.' },
  whatsapp: { title: 'WhatsApp Business API', description: 'Guides and research on WhatsApp Business API, customer engagement and business workflows.' },
  'ai-telecalling': { title: 'AI Telecalling', description: 'Technical research on voice AI, telecalling, SIP connectivity and responsible business automation.' },
  rcs: { title: 'RCS Business Messaging', description: 'Research and practical guidance on RCS, rich messaging, channel reach and provider evaluation.' },
  'agentic-ai': { title: 'Agentic AI', description: 'Research on AI systems that understand goals, coordinate tools and operate business workflows.' },
  automation: { title: 'Business Automation', description: 'Practical automation ideas for teams, customer operations and growing businesses.' },
  commerce: { title: 'Generative Commerce', description: 'Research on AI-assisted product discovery, conversational commerce and business growth.' },
  cloud: { title: 'Cloud and Infrastructure', description: 'Cloud, developer and infrastructure research for AI-native business systems.' },
  research: { title: 'Research and Engineering', description: 'Long-form Vaiket research, technical explanations and source-led technology analysis.' },
  msme: { title: 'MSME Digital Transformation', description: 'Business communication and automation guidance for Indian MSMEs.' },
  developers: { title: 'Developer Technologies', description: 'Developer APIs, integrations and engineering guidance from Vaiket research.' },
}

// Keep the old wording addressable while one canonical public category owns the
// merged AI and Artificial Intelligence topic set.
export const categoryAliases: Record<string, string> = { 'artificial-intelligence': 'ai' }
export function canonicalCategorySlug(slug: string) { return categoryAliases[slug] || slug }

function matchesCategory(post: CatalogPost, slug: string) {
  const text = `${post.category} ${post.tags.join(' ')} ${post.title}`.toLowerCase()
  const terms: Record<string, string[]> = { ai: ['ai', 'artificial intelligence'], whatsapp: ['whatsapp'], 'ai-telecalling': ['telecalling', 'voice', 'calling'], rcs: ['rcs'], 'agentic-ai': ['agentic'], automation: ['automation'], commerce: ['commerce'], cloud: ['cloud', 'infrastructure'], research: ['research', 'engineering'], msme: ['msme', 'business'], developers: ['developer', 'api'] }
  return (terms[slug] || [slug]).some(term => text.includes(term))
}

export function getCategoryPosts(slug: string) { return getCatalogPosts().filter(post => matchesCategory(post, canonicalCategorySlug(slug))) }
