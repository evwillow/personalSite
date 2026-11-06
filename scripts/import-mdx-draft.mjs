#!/usr/bin/env node
// Import an external .mdx/.md draft into content/case-studies/<slug>.mdx.
// Usage: node scripts/import-mdx-draft.mjs <source.mdx> <slug> [--publish]
// Without --publish the post is written with draft: true.
// - Frontmatter is normalised to the caseStudies schema in velite.config.js
//   (title, slug, description, publishedAt, draft, tags).
// - A leading "# Title" heading is dropped (the page renders the title).
// - Outside code, "<", "{" and "}" are escaped so plain prose such as
//   "p < 0.01" does not parse as JSX.
import fs from 'node:fs'
import path from 'node:path'

const [src, slug, flag] = process.argv.slice(2)
if (!src || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('usage: import-mdx-draft.mjs <source.mdx> <kebab-slug> [--publish]')
  process.exit(2)
}
const raw = fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n')
const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
const fm = {}
if (m) {
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!kv) continue
    let v = kv[2].trim()
    if (/^".*"$/.test(v)) v = JSON.parse(v)
    else if (/^'.*'$/.test(v)) v = v.slice(1, -1).replace(/''/g, "'")
    fm[kv[1]] = v
  }
}
let body = m ? raw.slice(m[0].length) : raw

// drop the first H1 (only if it comes before any other content)
body = body.replace(/^\s*# [^\n]*\n+/, '')

// escape JSX-significant characters outside fenced and inline code
const out = []
let fence = null
for (const line of body.split('\n')) {
  const f = line.match(/^\s*(```+|~~~+)/)
  if (fence) {
    out.push(line)
    if (f && f[1][0] === fence[0] && f[1].length >= fence.length) fence = null
    continue
  }
  if (f) { fence = f[1]; out.push(line); continue }
  out.push(
    line
      .split(/(`+[^`]*`+)/)
      .map((part, i) => (i % 2 ? part : part
        .replace(/</g, '&lt;')
        .replace(/\{/g, '&#123;')
        .replace(/\}/g, '&#125;')))
      .join('')
  )
}
body = out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'

const title = fm.title || slug
const description = fm.description || fm.summary || title
const date = String(fm.date || fm.status_as_of || fm.publishedAt || fs.statSync(src).mtime.toISOString()).slice(0, 10)
const draft = flag !== '--publish'
const front = [
  '---',
  `title: ${JSON.stringify(title)}`,
  `slug: ${slug}`,
  `description: ${JSON.stringify(description)}`,
  `publishedAt: ${date}`,
  `draft: ${draft}`,
  'tags: []',
  '---',
  '', '',
].join('\n')

const dest = path.join('content', 'case-studies', `${slug}.mdx`)
fs.mkdirSync(path.dirname(dest), { recursive: true })
fs.writeFileSync(dest, front + body)
console.log(`${dest} draft=${draft} date=${date} title=${JSON.stringify(title)}`)
