#!/usr/bin/env node
// Check that every legacy URL still answers 200 or 301/308 on a running server.
// Usage: node scripts/check-urls.mjs [baseUrl] [urlList]
// Defaults: http://localhost:3001 and scripts/fixtures/legacy-urls.txt.
// Prints a markdown table and exits 1 if any URL fails.
import fs from 'node:fs'

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '')
const list = process.argv[3] || 'scripts/fixtures/legacy-urls.txt'
const paths = fs.readFileSync(list, 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))

let ok = 0
const rows = []
for (const p of paths) {
  let status, location = ''
  try {
    const res = await fetch(base + p, { redirect: 'manual' })
    status = res.status
    location = res.headers.get('location') || ''
  } catch (e) {
    status = 'ERR ' + e.message
  }
  const pass = status === 200 || status === 301 || status === 308
  if (pass) ok++
  rows.push(`| ${p} | ${status} | ${location} | ${pass ? 'ok' : 'FAIL'} |`)
}
console.log('| path | status | location | result |\n|---|---|---|---|\n' + rows.join('\n'))
console.log(`\n${ok}/${paths.length} old URLs return 200 or 301/308`)
process.exit(ok === paths.length ? 0 : 1)
