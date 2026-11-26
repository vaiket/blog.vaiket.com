import { NextResponse } from 'next/server'
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getResearchSlugs } from '../../../../lib/research-article'
import { isEditorialAdmin } from '../../../../lib/editorial-auth'
import { getEditorialQueue } from '../../../../lib/editorial-queue'

const articleRoot = () => path.join(process.cwd(), 'content', 'articles')
const historyRoot = () => path.join(process.cwd(), 'content', 'editorial-history')
const inventoryFile = () => path.join(process.cwd(), 'content', 'content-inventory.json')
const validSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
const mutationWindow = new Map<string, { count: number; resetAt: number }>()

function mutationAllowed(request: Request) {
  if (request.headers.get('x-editorial-request') !== 'same-origin') return 'csrf' as const
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const now = Date.now()
  const current = mutationWindow.get(key)
  if (!current || current.resetAt < now) { mutationWindow.set(key, { count: 1, resetAt: now + 60_000 }); return true }
  if (current.count >= 20) return 'rate' as const
  current.count += 1
  return true
}

export async function GET() {
  if (!(await isEditorialAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  const queue = getEditorialQueue()
  const articles = getResearchSlugs().map(slug => {
    const source = readFileSync(path.join(articleRoot(), `${slug}.md`), 'utf8')
    const parsed = matter(source)
    const review = queue.find(item => item.slug === slug)
    return { slug, title: String(parsed.data.title || slug), status: String(parsed.data.status || 'draft'), researchCutoff: String(parsed.data.researchCutoff || ''), reviewStatus: String(parsed.data.reviewStatus || 'editorial review pending'), content: parsed.content, review }
  }).filter(article => article.status === 'draft').sort((a, b) => a.title.localeCompare(b.title))
  return NextResponse.json({ articles })
}

export async function POST(request: Request) {
  const protection = mutationAllowed(request)
  if (protection !== true) return NextResponse.json({ error: protection === 'csrf' ? 'Invalid editorial request.' : 'Too many editorial mutations. Try again later.' }, { status: protection === 'csrf' ? 403 : 429 })
  if (!(await isEditorialAdmin())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  let body: { slug?: string; title?: string; content?: string; status?: string; reviewStatus?: string; action?: string } = {}
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const slug = String(body.slug || '')
  if (!validSlug(slug)) return NextResponse.json({ error: 'Invalid article slug.' }, { status: 400 })
  const file = path.join(articleRoot(), `${slug}.md`)
  if (!existsSync(file)) return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
  const source = readFileSync(file, 'utf8')
  const parsed = matter(source)
  const nextData: Record<string, any> = { ...parsed.data, ...(body.title ? { title: body.title } : {}), ...(body.status ? { status: body.status } : {}), ...(body.reviewStatus ? { reviewStatus: body.reviewStatus } : {}), updatedAt: new Date().toISOString().slice(0, 10) }
  if (body.action === 'publish') {
    if (nextData.reviewStatus !== 'editorial approved') return NextResponse.json({ error: 'Set reviewStatus to editorial approved before publishing.' }, { status: 409 })
    nextData.status = 'published'
    nextData.publishedAt = nextData.publishedAt || new Date().toISOString().slice(0, 10)
  }
  if (body.action === 'archive') nextData.status = 'archived'
  const nextSource = matter.stringify(body.content ?? parsed.content, nextData)
  mkdirSync(path.join(historyRoot(), slug), { recursive: true })
  const version = `${new Date().toISOString().replace(/[:.]/g, '-')}.md`
  writeFileSync(path.join(historyRoot(), slug, version), source, 'utf8')
  writeFileSync(file, nextSource, 'utf8')
  const inventoryRecords = JSON.parse(readFileSync(inventoryFile(), 'utf8')) as Array<Record<string, any>>
  const inventoryIndex = inventoryRecords.findIndex(record => record.slug === slug)
  if (inventoryIndex >= 0) {
    const inventoryRecord = inventoryRecords[inventoryIndex]
    inventoryRecord.reviewStatus = nextData.reviewStatus || inventoryRecord.reviewStatus
    if (body.action === 'publish') {
      inventoryRecord.contentStatus = 'complete'
      inventoryRecord.publicationStatus = 'published'
    }
    if (body.action === 'archive') inventoryRecord.publicationStatus = 'archived'
    writeFileSync(inventoryFile(), `${JSON.stringify(inventoryRecords, null, 2)}\n`, 'utf8')
  }
  appendFileSync(path.join(historyRoot(), 'audit.log'), `${new Date().toISOString()} action=${body.action || 'save'} slug=${slug} status=${nextData.status}\n`, 'utf8')
  return NextResponse.json({ ok: true, slug, status: nextData.status, reviewStatus: nextData.reviewStatus })
}
