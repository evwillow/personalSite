// Post-generation validator for /ask answers. Plain code, no model.
// An answer is shown only if every check passes:
//   - every citation [claim:ID] / [doc:ID] names an id in the corpus
//   - a non-refusal answer cites at least one source
//   - every number in a paragraph matches a value of a claim cited in that
//     paragraph (claims license their own numbers; documents license none)
//   - no forbidden metric (policy), no canary token, no link outside the corpus
import { extractNumbers } from "./numbers.mjs"

export const CITE_RE = /\[(claim|doc):([A-Za-z0-9_.\-]+)\]/g
export const CANARIES = ["ASK-SYSTEM-CANARY-5c1e", "CRE28-CANARY", "canary@cre28.invalid"]

const near = (a, b) => Math.abs(a - b) < 1e-9

export function validateAnswer(text, corpus, { forbiddenPatterns = [] } = {}) {
  // Claims are cited by their opaque ref (c1..); the full id is accepted too.
  const claims = new Map(corpus.claims.flatMap((c) => [[c.ref, c], [c.id, c]]))
  const docs = new Map(corpus.docs.map((d) => [d.id, d]))
  const problems = []
  const cited = []
  const unsupported = []

  for (const m of text.matchAll(CITE_RE)) {
    const [, type, id] = m
    const ok = type === "claim" ? claims.has(id) : docs.has(id)
    const realId = type === "claim" && ok ? claims.get(id).id : id
    if (!ok) problems.push(`unknown citation [${type}:${id}]`)
    else if (!cited.some((c) => c.type === type && c.id === realId)) cited.push({ type, id: realId })
  }
  if (cited.length === 0) problems.push("no citation")

  for (const para of text.split(/\n\s*\n|\n(?=\s*[-*•]\s)/)) {
    const paraClaims = [...para.matchAll(CITE_RE)].filter((m) => m[1] === "claim" && claims.has(m[2])).map((m) => claims.get(m[2]))
    const body = para.replace(CITE_RE, " ")
    for (const n of extractNumbers(body)) {
      const ok = !n.word && paraClaims.some((c) => c.allowed.some((v) => near(v, n.value)))
      if (!ok) unsupported.push(n.raw)
    }
  }
  if (unsupported.length) problems.push(`unsupported number(s): ${[...new Set(unsupported)].join(", ")}`)

  for (const p of forbiddenPatterns) if (new RegExp(p, "i").test(text)) problems.push(`forbidden pattern ${p}`)
  for (const c of CANARIES) if (text.includes(c)) problems.push("canary leaked")

  const allowedHosts = new Set(["evwillow.com", "github.com", "breakouts.trade", "incurra.ai"])
  for (const m of text.matchAll(/https?:\/\/([^/\s)\]]+)/gi)) {
    const host = m[1].toLowerCase().replace(/^www\./, "")
    if (!allowedHosts.has(host)) problems.push(`link outside corpus: ${host}`)
  }
  return { ok: problems.length === 0, problems, cited, unsupported }
}

// Refusals carry no facts, so they need no citation but must still hold no
// number, no forbidden metric and no canary.
export function validateRefusal(text, { forbiddenPatterns = [] } = {}) {
  const nums = extractNumbers(text.replace(CITE_RE, " "))
  const problems = []
  if (nums.length) problems.push(`refusal states number(s): ${nums.map((n) => n.raw).join(", ")}`)
  for (const p of forbiddenPatterns) if (new RegExp(p, "i").test(text)) problems.push(`forbidden pattern ${p}`)
  for (const c of CANARIES) if (text.includes(c)) problems.push("canary leaked")
  return { ok: problems.length === 0, problems, unsupported: nums.map((n) => n.raw) }
}
