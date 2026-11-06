// Plain-code number extraction for the /ask validator. No model is involved.
//
// A "number" is any run of digits that is not glued to a letter on its left
// (so "FF3", "m3" and the commit "a4087032" are identifiers, not numbers).
// Thousands separators, a decimal part, a leading sign and a trailing %, R or x
// are folded into one token. Values are compared as absolute values, because an
// answer may say "a drawdown of 36.78%" for the claim "-36.78% max drawdown".

// Names that contain digits but are not quantities. They are removed before
// extraction, so "CS 61B" or "S&P 500" is never read as a number.
export const IDENTIFIER_PATTERNS = [
  /\b(?:CS|Data|DATA|Econ|ECON|EC|Math|Stat|STAT|UGBA)\s?C?\d{1,3}[A-Z]{0,2}\b/g,
  /\bS&P\s?500\b/g,
  /\bFF3\+UMD\b/g,
]

// Spelled-out quantities above ten are numbers too ("sixty-six thousand").
const NUMBER_WORDS =
  /\b(?:eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundreds?|thousands?|millions?|billions?|dozens?)\b/gi

const NUM_RE = /(?<![A-Za-z0-9_.])([+\-−–]?)(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?(?:\s?(%|R\b|x\b|×))?/g

export function stripIdentifiers(text) {
  let out = text
  for (const re of IDENTIFIER_PATTERNS) out = out.replace(re, " ")
  return out
}

// Returns [{raw, value}] with value = absolute numeric value (Number).
export function extractNumbers(text) {
  const clean = stripIdentifiers(String(text || ""))
  const found = []
  for (const m of clean.matchAll(NUM_RE)) {
    const raw = m[0].trim()
    const value = Math.abs(Number((m[2] + (m[3] || "")).replace(/,/g, "")))
    if (Number.isFinite(value)) found.push({ raw, value })
  }
  for (const m of clean.matchAll(NUMBER_WORDS)) found.push({ raw: m[0], value: NaN, word: true })
  return found
}

// The set of absolute values a claim text licenses, e.g. "66,753 trades,
// 1998-2026" -> {66753, 1998, 2026}. A range "1998-2026" yields both ends.
export function allowedValues(claimText) {
  const vals = new Set()
  const t = String(claimText || "").replace(/(\d)-(\d)/g, "$1 $2")
  for (const n of extractNumbers(t)) if (!n.word) vals.add(n.value)
  return vals
}

// Mask numbers in a non-claim source document so the model never sees a
// figure it would not be allowed to repeat. Identifiers are kept.
export function maskNumbers(text) {
  const keep = []
  let t = String(text || "")
  for (const re of IDENTIFIER_PATTERNS) {
    t = t.replace(re, (m) => {
      keep.push(m)
      return `KEEPIDENT${keep.length - 1}Q`
    })
  }
  t = t.replace(NUM_RE, (m) => (/\d/.test(m) ? "[n]" : m))
  return t.replace(/KEEPIDENT(\d+)Q/g, (_, i) => keep[Number(i)])
}
