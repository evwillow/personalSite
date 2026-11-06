#!/usr/bin/env node
// Check that no draft case-study slug leaks into production output.
// Usage: node scripts/check-drafts.mjs [baseUrl]
// Reads draft slugs from content/case-studies/*.mdx frontmatter, then checks:
//  - public/sitemap*.xml written by next-sitemap
//  - <base>/server-sitemap.xml and <base>/feed.xml on a running `next start`
//  - <base>/case-studies/<slug> answers 404
//  - .velite/generated/caseStudies.json and .next/server hold no draft slug
// Exits 1 on any leak.
import fs from 'node:fs'
import path from 'node:path'

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '')
const dir = 'content/case-studies'
const drafts = []
const published = []
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))) {
  const fm = (fs.readFileSync(path.join(dir, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || ''
  const slug = (fm.match(/^slug:\s*(\S+)/m) || [])[1] || f.replace(/\.mdx$/, '')
  if (/^draft:\s*true\s*$/m.test(fm)) drafts.push(slug)
  else published.push(slug)
}

function walk(d, out = []) {
  if (!fs.existsSync(d)) return out
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const sources = {}
for (const f of fs.readdirSync('public').filter(f => /^sitemap.*\.xml$/.test(f))) {
  sources['public/' + f] = fs.readFileSync(path.join('public', f), 'utf8')
}
for (const p of ['/server-sitemap.xml', '/feed.xml']) {
  const res = await fetch(base + p)
  sources[p + ` (${res.status})`] = await res.text()
}
sources['.velite/generated/caseStudies.json'] = fs.readFileSync('.velite/generated/caseStudies.json', 'utf8')
const serverFiles = walk('.next/server').filter(f => /\.(html|rsc|json|body|meta|js)$/.test(f))

let leaks = 0
const rows = []
for (const slug of drafts) {
  const needle = `/case-studies/${slug}`
  const hits = Object.entries(sources).filter(([, txt]) => txt.includes(needle) || txt.includes(`"slug":"${slug}"`)).map(([k]) => k)
  const serverHits = serverFiles.filter(f => f.includes(slug) || fs.readFileSync(f, 'utf8').includes(needle))
  const res = await fetch(base + needle, { redirect: 'manual' })
  const bad = hits.length + serverHits.length + (res.status === 404 ? 0 : 1)
  leaks += bad
  rows.push(`| ${slug} | ${res.status} | ${hits.length ? hits.join(', ') : 'none'} | ${serverHits.length} | ${bad ? 'LEAK' : 'hidden'} |`)
}
console.log(`draft slugs: ${drafts.length} (${drafts.join(', ')}); published: ${published.length}`)
console.log('checked: ' + Object.keys(sources).join(', ') + `, ${serverFiles.length} files under .next/server`)
console.log('\n| draft slug | GET status | found in sitemap/RSS/velite | .next/server files | result |\n|---|---|---|---|---|\n' + rows.join('\n'))
console.log(`\n${drafts.length - rows.filter(r => r.includes('LEAK')).length}/${drafts.length} drafts hidden`)
process.exit(leaks ? 1 : 0)
