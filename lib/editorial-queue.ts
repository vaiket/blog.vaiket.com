import 'server-only'
import { existsSync, readFileSync } from 'node:fs'
import matter from 'gray-matter'
import inventory from '../content/content-inventory.json'
import { getResearchArticle } from './research-article'

type InventoryRecord = {
  id: string
  title: string
  slug: string
  primaryKeyword?: string
  searchIntent?: string
  category?: string
  researchSources?: number
  contentStatus?: string
  reviewStatus?: string
  publicationStatus?: string
}

export type EditorialQueueEntry = {
  slug: string
  title: string
  primaryKeyword: string
  searchIntent: string
  category: string
  wordCount: number
  researchSources: number
  sourceUrls: string[]
  productEvidence: string[]
  unresolvedClaims: string[]
  legalConcerns: string[]
  internalDraftLinks: string[]
  classification: 'ready for editorial approval' | 'corrections required' | 'additional research required' | 'legal or product verification required'
  publicationReadiness: string
}

function urls(content: string) {
  return Array.from(new Set(Array.from(content.matchAll(/https?:\/\/[^\s)\]>]+/g)).map(match => match[0].replace(/[.,;]+$/, ''))))
}

function classify(record: InventoryRecord, content: string, sourceUrls: string[], internalDraftLinks: string[]): EditorialQueueEntry['classification'] {
  if (/TODO|TBD|FIXME|PLACEHOLDER/i.test(content)) return 'corrections required'
  if (sourceUrls.length < 2 || internalDraftLinks.length > 2) return 'additional research required'
  if (/best-|alternatives|pricing|cost|vs-|providers|telecalling|voice-agents|cpaas|sip-trunk/i.test(record.slug)) return 'legal or product verification required'
  if (/consent|compliance|retention|recording|telecom|privacy|data protection/i.test(content)) return 'legal or product verification required'
  return 'ready for editorial approval'
}

export function getEditorialQueue() {
  // The freeze keeps every private draft reviewable without opening the queue
  // to published/static records or planned topics that have no source file.
  const records = (inventory as InventoryRecord[]).filter(record => record.publicationStatus === 'draft' && existsSync(`${process.cwd()}/content/articles/${record.slug}.md`))
  const knownDrafts = new Set((inventory as InventoryRecord[]).filter(record => record.publicationStatus !== 'published').map(record => record.slug))
  return records.map(record => {
    const source = readFileSync(`${process.cwd()}/content/articles/${record.slug}.md`, 'utf8')
    const parsed = matter(source)
    const content = parsed.content
    const sourceUrls = urls(content)
    const productEvidence = sourceUrls.filter(url => /vaiket\.com|app\.vaiket\.com|docs\.vaiket\.com|developers\.vaiket\.com/i.test(url))
    const internalDraftLinks = Array.from(new Set(Array.from(content.matchAll(/\]\(\/posts\/([^\)]+)\)/g)).map(match => match[1]).filter(slug => knownDrafts.has(slug))))
    const unresolvedClaims: string[] = []
    if (/pricing|cost|plans|rate card/i.test(content)) unresolvedClaims.push('Current pricing, taxes, message rates and plan limits need a dated owner-approved check.')
    if (/provider|providers|alternatives|best-|vs-/i.test(record.slug)) unresolvedClaims.push('Competitor/provider capabilities are public-source descriptions, not a live benchmark or endorsement.')
    if (/Vaiket|vaiket/i.test(content)) unresolvedClaims.push('Vaiket capability, availability and product wording need current product-owner confirmation.')
    const legalConcerns: string[] = []
    if (/consent|compliance|retention|recording|telecom|privacy|data protection/i.test(content)) legalConcerns.push('Compliance, consent, retention or telecom language requires legal/editorial review for the target use case.')
    if (/best-|alternatives|pricing|cost|providers|vs-/i.test(record.slug)) legalConcerns.push('Commercial comparison and “best” language requires conflict-of-interest and substantiation review.')
    const classification = classify(record, content, sourceUrls, internalDraftLinks)
    return {
      slug: record.slug,
      title: record.title,
      primaryKeyword: record.primaryKeyword || '',
      searchIntent: record.searchIntent || '',
      category: record.category || '',
      wordCount: content.trim().split(/\s+/).filter(Boolean).length,
      researchSources: record.researchSources || sourceUrls.length,
      sourceUrls,
      productEvidence,
      unresolvedClaims,
      legalConcerns,
      internalDraftLinks,
      classification,
      publicationReadiness: classification === 'ready for editorial approval' ? 'Ready for owner review; not approved.' : 'Blocked until the listed verification or correction is complete.',
    } satisfies EditorialQueueEntry
  })
}
