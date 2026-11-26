import 'server-only'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { toString } from 'mdast-util-to-string'

export const RESEARCH_SLUG = 'ai-telecalling-in-india'
export const RANCHI_SLUG = 'top-it-companies-ai-startups-technology-institutes-ranchi'
export const INDIA_SLUG = 'india-business-communication-platforms'

const DEFAULT_RESEARCH_IMAGE = '/luminous-ai-wave-mesh.png'

export function getResearchSlugs() {
  return readdirSync(path.join(process.cwd(), 'content', 'articles')).filter(file => file.endsWith('.md')).map(file => file.slice(0, -3))
}

export type ResearchHeading = { id: string; text: string; depth: number }

export function getResearchArticle(slug = RESEARCH_SLUG) {
  const source = readFileSync(path.join(process.cwd(), 'content', 'articles', `${slug}.md`), 'utf8')
  const { data, content } = matter(source)
  const tree = unified().use(remarkParse).use(remarkGfm).parse(content)
  const slugger = new GithubSlugger()
  const headings: ResearchHeading[] = []
  let inReferences = false
  let referenceCount = 0
  for (const node of tree.children) {
    if (node.type === 'heading') {
      const text = toString(node)
      const id = slugger.slug(text)
      if (node.depth > 1) headings.push({ id, text, depth: node.depth })
      if (node.depth === 2 && /reference|source directory|further reading/i.test(text)) inReferences = true
    }
    if (inReferences && node.type === 'list') referenceCount += node.children.length
  }
  const words = content.trim().split(/\s+/).length
  return {
    title: String(data.title), slug: String(data.slug), author: String(data.author),
    featuredImage: String(data.image || DEFAULT_RESEARCH_IMAGE),
    category: String(data.category || 'Research & Engineering'), tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    description: String(data.description), seoTitle: String(data.seoTitle || (slug === RANCHI_SLUG ? 'Top IT Companies & AI Startups in Ranchi | Vaiket' : slug === INDIA_SLUG ? 'India Business Communication Ecosystem | Vaiket' : data.title)),
    seoDescription: String(data.seoDescription || data.description), status: String(data.status),
    researchCutoff: data.researchCutoff instanceof Date ? data.researchCutoff.toISOString().slice(0, 10) : String(data.researchCutoff), content, headings, words, referenceCount,
    publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    readingMinutes: Math.ceil(words / 200),
  }
}

export function remarkResearchAnchors() {
  const slugger = new GithubSlugger()
  let inReferences = false
  return (tree: any) => {
    for (const node of tree.children) {
      if (node.type === 'heading') {
        const title = toString(node)
        node.data ??= {}
        node.data.hProperties ??= {}
        node.data.hProperties.id = slugger.slug(title)
        if (node.depth === 2 && /reference|source directory|further reading/i.test(title)) inReferences = true
      }
      if (inReferences && node.type === 'list' && node.ordered) {
        let number = node.start || 1
        for (const item of node.children) {
          item.data ??= {}
          item.data.hProperties ??= {}
          item.data.hProperties.id = `reference-${number++}`
        }
      }
    }
  }
}
