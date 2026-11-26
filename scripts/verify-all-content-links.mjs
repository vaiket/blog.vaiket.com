import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'content', 'articles')
const urls = new Set()
for (const file of readdirSync(root).filter(name => name.endsWith('.md'))) {
  const source = readFileSync(path.join(root, file), 'utf8')
  for (const match of source.matchAll(/https?:\/\/[^\s)\]>]+/g)) urls.add(match[0].replace(/[.,;'"`\\]+$/, ''))
}
const list = [...urls]
let index = 0
const results = []
async function worker() {
  while (index < list.length) {
    const url = list[index++]
    try {
      let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(9000), headers: { 'user-agent': 'VaiketResearchLinkCheck/1.0' } })
      if (response.status >= 400 || response.status === 405) response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(9000), headers: { 'user-agent': 'Mozilla/5.0 VaiketResearchLinkCheck/1.0' } })
      results.push({ url, status: response.status, finalUrl: response.url })
    } catch (error) {
      results.push({ url, status: 'unverifiable', reason: error?.cause?.code || error?.name || 'fetch failed' })
    }
  }
}
await Promise.all(Array.from({ length: 10 }, () => worker()))
const issues = results.filter(item => typeof item.status !== 'number' || item.status >= 400)
console.log(JSON.stringify({ checked: results.length, accessible: results.length - issues.length, issues }, null, 2))
