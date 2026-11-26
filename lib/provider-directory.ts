import 'server-only'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { toString } from 'mdast-util-to-string'

export type ProviderLink = { label: string; url: string }
export type ProviderRecord = {
  name: string
  segment: string
  sources: ProviderLink[]
  linkedinUrl?: string
  evaluation: string
  reviewDate: string
  verificationStatus: string
}

function linksIn(node: any, links: ProviderLink[] = []) {
  if (!node) return links
  if (node.type === 'link' && node.url) links.push({ label: toString(node), url: String(node.url) })
  for (const child of node.children || []) linksIn(child, links)
  return links
}

export function getProviderDirectory() {
  const source = readFileSync(path.join(process.cwd(), 'content', 'provider-directory-india.md'), 'utf8')
  const tree: any = unified().use(remarkParse).use(remarkGfm).parse(source)
  const table = tree.children.find((node: any) => node.type === 'table')
  const providers: ProviderRecord[] = (table?.children || []).slice(1).map((row: any) => {
    const cells = row.children || []
    const sourceLinks = linksIn(cells[2])
    const linkedinUrl = linksIn(cells[3]).find(link => /linkedin\.com/i.test(link.url))?.url
    return {
      name: toString(cells[0]),
      segment: toString(cells[1]),
      sources: sourceLinks,
      linkedinUrl,
      evaluation: toString(cells[4]),
      reviewDate: '2026-11-25',
      verificationStatus: 'Public sources listed; editorial verification pending',
    }
  })
  const methodology = source.split(/^## Research coverage and methodology$/m)[1]?.split(/^## Expanding toward 1,000 researched organizations$/m)[0]?.trim() || ''
  return { snapshotDate: '2026-11-25', providers, methodology }
}
