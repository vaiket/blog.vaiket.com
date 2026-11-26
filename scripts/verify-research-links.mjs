import { readFileSync } from 'node:fs'

const input = process.argv[2] || 'ai-telecalling-in-india'
const sourcePath = input.endsWith('.md') ? `../${input}` : `../content/articles/${input}.md`
const source = readFileSync(new URL(sourcePath, import.meta.url), 'utf8')
const urls = [...new Set([...source.matchAll(/https?:\/\/[^\s)]+/g)].map(match => match[0].replace(/[.,;]$/, '')))]
let index = 0
const results = []
async function worker() {
  while (index < urls.length) {
    const url = urls[index++]
    try {
      let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(9000), headers: { 'user-agent': 'VaiketResearchLinkCheck/1.0' } })
      if (response.status >= 400) response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(9000), headers: { 'user-agent': 'Mozilla/5.0 VaiketResearchLinkCheck/1.0' } })
      results.push({ url, status: response.status, finalUrl: response.url })
    } catch (error) { results.push({ url, status: 'unverifiable', reason: error?.cause?.code || error?.name || 'fetch failed' }) }
  }
}
await Promise.all(Array.from({ length: 8 }, () => worker()))
const issues = results.filter(item => typeof item.status !== 'number' || item.status >= 400)
console.log(JSON.stringify({ checked: results.length, accessible: results.length - issues.length, issues }, null, 2))
