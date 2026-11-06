#!/usr/bin/env node
// Build src/data/ask/corpus.json, the only material the /ask agent may answer from:
//   claims  - accepted claims from src/data/verify_claims.json (built from PUB01
//             claims.json), minus content/ask/policy.json exclusions
//   docs    - content/ask/sources/*.md (site pages) and content/ask/readmes/*.md
//             (public README snapshots), with every number masked as [n]
// Offline and deterministic: `npm run ask:corpus`; `--check` fails if stale.
import fs from "node:fs"
import path from "node:path"
import { allowedValues, maskNumbers } from "../lib/ask/numbers.mjs"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const rd = (p) => fs.readFileSync(path.join(root, p), "utf8")
const policy = JSON.parse(rd("content/ask/policy.json"))
const forbidden = policy.forbiddenPatterns.map((p) => new RegExp(p, "i"))

const KIND = (id) => (id.startsWith("tests.") ? "test_count" : "backtest")

const verify = JSON.parse(rd("src/data/verify_claims.json"))
const excluded = []
const claims = []
for (const c of verify.claims) {
  const why = policy.excludeClaimIds.includes(c.id)
    ? "policy.excludeClaimIds"
    : forbidden.find((re) => re.test(c.claim))
      ? "policy.forbiddenPatterns"
      : null
  if (why) { excluded.push({ id: c.id, why }); continue }
  claims.push({
    id: c.id,
    // Opaque handle the model cites ([claim:c1]); the descriptive id stays out of
    // the prompt so the model cannot read facts into words inside an id.
    ref: `c${claims.length + 1}`,
    text: c.claim,
    kind: KIND(c.id),
    commit: c.commit,
    allowed: [...allowedValues(c.claim)].sort((a, b) => a - b),
    caveat: KIND(c.id) === "backtest" ? policy.backtestCaveat : `Test count collected at engine commit ${c.commit}.`,
    url: "/verify",
  })
}

function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error("missing frontmatter")
  const meta = Object.fromEntries(m[1].split("\n").map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()]))
  return { meta, body: m[2].trim() }
}

const docs = []
const srcDir = "content/ask/sources"
for (const f of fs.readdirSync(path.join(root, srcDir)).filter((f) => f.endsWith(".md")).sort()) {
  const { meta, body } = frontmatter(rd(`${srcDir}/${f}`))
  docs.push({ id: meta.id, title: meta.title, url: meta.url, kind: "site", text: maskNumbers(body) })
}

// README snapshots: keep whole sections up to readmeMaxChars, drop code blocks
// (setup commands are not about Evan's work), mask numbers.
const manifest = JSON.parse(rd("content/ask/readmes.json"))
for (const { repo, title } of manifest.include) {
  const name = repo.split("/")[1]
  let text = rd(`content/ask/readmes/${name}.md`).replace(/\r/g, "").replace(/```[\s\S]*?```/g, "").replace(/\n{3,}/g, "\n\n")
  // Lines naming a forbidden metric (e.g. CAGR) are dropped, not masked.
  const before = text.split("\n").length
  text = text.split("\n").filter((l) => !forbidden.some((re) => re.test(l))).join("\n")
  const droppedLines = before - text.split("\n").length
  let excerpt = false
  if (text.length > policy.readmeMaxChars) {
    const cut = text.lastIndexOf("\n#", policy.readmeMaxChars)
    text = text.slice(0, cut > 1000 ? cut : policy.readmeMaxChars)
    excerpt = true
  }
  docs.push({
    id: `readme.${name}`,
    title: title + (excerpt ? " (excerpt)" : ""),
    url: `https://github.com/${repo}`,
    kind: "readme",
    droppedLines,
    text: maskNumbers(text.trim()),
  })
}

const ids = [...claims.map((c) => c.id), ...docs.map((d) => d.id)]
if (new Set(ids).size !== ids.length) throw new Error("duplicate corpus id")
for (const d of docs) for (const re of forbidden) if (re.test(d.text)) throw new Error(`forbidden pattern ${re} in ${d.id}`)

const out = JSON.stringify({ source: "scripts/build-ask-corpus.mjs", claims, excluded, docs }, null, 2) + "\n"
const outPath = path.join(root, "src/data/ask/corpus.json")
if (process.argv.includes("--check")) {
  const cur = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : ""
  if (cur !== out) { console.error("src/data/ask/corpus.json is stale: run npm run ask:corpus"); process.exit(1) }
  console.log("corpus up to date")
} else {
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, out)
  console.log(`wrote ${claims.length} claims (${excluded.length} excluded), ${docs.length} docs, ${out.length} bytes`)
}
