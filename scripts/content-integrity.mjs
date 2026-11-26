import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'content', 'articles')
const files = fs.readdirSync(root).filter(file => file.endsWith('.md')).sort()
const slugs = new Set()
const errors = []
let words = 0
let references = 0
for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8')
  const match = source.match(/^---\s*([\s\S]*?)\s*---/)
  const slug = file.replace(/\.md$/, '')
  if (!match) errors.push(`${file}: missing frontmatter`)
  if (slugs.has(slug)) errors.push(`${file}: duplicate slug`)
  slugs.add(slug)
  const sourceLinks = bodyLinks(source)
  if (!/##\s+(Sources|References|Further reading)/i.test(source) && sourceLinks < 3) errors.push(`${file}: no source section marker or sufficient citations`)
  if (/\[TO BE COMPLETED\]|\[INSERT|Lorem ipsum/i.test(source)) errors.push(`${file}: placeholder text detected`)
  const body = source.replace(/^---[\s\S]*?---\s*/, '')
  words += (body.match(/\b[\p{L}\p{N}][\p{L}\p{N}-]*\b/gu) || []).length
  references += sourceLinks
}
function bodyLinks(value) { return (value.match(/https?:\/\/[^)\s>]+/g) || []).length }
console.log(JSON.stringify({ files: files.length, uniqueSlugs: slugs.size, words, externalReferences: references, errors }, null, 2))
if (errors.length) process.exitCode = 1
