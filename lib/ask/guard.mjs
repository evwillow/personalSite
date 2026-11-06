// Input-side defenses for /ask, run before any model call.
//   normalize()  NFKC, strip zero-width and Unicode tag characters, collapse space
//   screen()     flags prompt-injection patterns, including ones hidden in HTML
//                comments, base64 blobs, zero-width or tag-character smuggling
//                (the vectors in the CRE28 injection fixtures)
//   categorize() a coarse topic label for analytics; never the text itself
import { createHash } from "node:crypto"

export const MAX_QUESTION_CHARS = 500

const INVISIBLE = /[​-‏‪-‮⁠-⁤﻿]|[\u{E0000}-\u{E007F}]/gu

export function normalize(q) {
  return String(q || "").normalize("NFKC").replace(INVISIBLE, "").replace(/\s+/g, " ").trim()
}

export function questionHash(q) {
  return createHash("sha256").update(normalize(q).toLowerCase()).digest("hex")
}

const INJECTION = [
  /\bignore (?:all |any |the )?(?:previous|prior|above|earlier|preceding)\b/i,
  /\bdisregard (?:all |any |the |your )?(?:previous|prior|above|instructions|rules|system)\b/i,
  /\bforget (?:all |your |the )?(?:previous |prior )?(?:instructions|rules)\b/i,
  /\b(?:system|developer|hidden|initial) (?:prompt|message|instructions?)\b/i,
  /\byou are now\b/i,
  /\b(?:maintenance|developer|debug|god|admin|jailbreak) mode\b/i,
  /\bDAN\b/,
  /\bdo anything now\b/i,
  /\b(?:pretend (?:to be|you are|you're)|role-?play as|act as (?:if you|an? (?:ai|assistant|chatbot|unrestricted|different|evil)))/i,
  /\bnew (?:instructions|rules|persona)\b/i,
  /\b(?:reveal|print|repeat|show|output|dump) (?:me )?(?:your|the) (?:instructions|prompt|rules|configuration|context)\b/i,
  /\b(?:send|compose|forward|draft) (?:an |a )?e-?mail\b/i,
  /\b(?:read|cat|open|save|write) (?:the )?(?:file|contents)\b|~\/\.|\/tmp\/|\/etc\//i,
  /\bcanary\b/i,
  /<\/?(?:system|instructions?|claims|documents?|question)>/i,
  /\[(?:claim|doc):/i,
]

function hiddenLayers(raw) {
  const layers = []
  for (const m of raw.matchAll(/<!--([\s\S]*?)-->/g)) layers.push(m[1])
  for (const m of raw.matchAll(/[A-Za-z0-9+/]{24,}={0,2}/g)) {
    try {
      const dec = Buffer.from(m[0], "base64").toString("utf8")
      if (/^[\x20-\x7e\s]+$/.test(dec)) layers.push(dec)
    } catch { /* not base64 */ }
  }
  const tags = [...raw].filter((ch) => ch.codePointAt(0) >= 0xe0000 && ch.codePointAt(0) <= 0xe007f)
  if (tags.length) layers.push(tags.map((ch) => String.fromCodePoint(ch.codePointAt(0) - 0xe0000)).join(""))
  return layers
}

export function screen(raw) {
  const reasons = []
  const text = normalize(raw)
  if (!text) reasons.push("empty")
  if (String(raw || "").length > MAX_QUESTION_CHARS * 4 || text.length > MAX_QUESTION_CHARS) reasons.push("too_long")
  if (new RegExp(INVISIBLE.source, "u").test(String(raw || ""))) reasons.push("invisible_characters")
  for (const layer of [text, ...hiddenLayers(String(raw || ""))]) {
    const hit = INJECTION.find((re) => re.test(layer))
    if (hit) { reasons.push(layer === text ? "injection_pattern" : "hidden_injection"); break }
  }
  return { text, blocked: reasons.length > 0, reasons }
}

const CATEGORIES = [
  ["trading_research", /\b(?:backtest|trades?|trading|sharpe|drawdown|win rate|holdout|ledger|r-?multiple|robot|bot|breakout|engine|strategy|momentum|upro|spxu|ibkr|interactive brokers|verify|verification)\b/i],
  ["llm_research", /\b(?:energy|codecarbon|llm|benchmark|incurra|claims reconciliation|ai product)\b/i],
  ["web_apps", /\b(?:breakouts\.trade|app|website|site|next\.?js|react|supabase|sql|migration|security|nonprofit|pollinator|frontend|full-?stack)\b/i],
  ["education", /\b(?:berkeley|course|class|degree|major|graduat|study|studies|econ|data science|cs ?\d)\w*/i],
  ["experience", /\b(?:experience|intern|job|role|work|worked|fde|forward deployed|skills?|languages?|leadership|eagle scout)\b/i],
  ["contact", /\b(?:contact|email|reach|linkedin|github|hire)\b/i],
]

export function categorize(text, screened) {
  if (screened?.blocked) return "injection"
  for (const [name, re] of CATEGORIES) if (re.test(text)) return name
  return "other"
}
