// The /ask pipeline, shared by the API route and the eval.
//   screen input -> model (adapter) -> validate -> one guided retry -> fallback
// The model adapter is injected: the route passes the Anthropic SDK adapter,
// the eval can pass the `claude -p` adapter. Same system prompt either way.
import { screen, categorize, questionHash } from "./guard.mjs"
import { buildUserTurn, retryNote } from "./prompt.mjs"
import { validateAnswer, validateRefusal } from "./validate.mjs"

export const REFUSAL_TEXT =
  "I can only answer questions about Evan's published work: his projects, research, experience, education and how to reach him."
export const BLOCKED_TEXT =
  "I couldn't answer that from the published sources without stating a figure they don't support. The accepted numbers are on the /verify page."

export function parseOutput(text) {
  const t = String(text || "").trim()
  const m = t.match(/^STATUS:\s*(ANSWER|REFUSE)\s*\n?/i)
  return m ? { status: m[1].toUpperCase(), body: t.slice(m[0].length).trim() } : { status: "ANSWER", body: t }
}

export function resolveCitations(cited, corpus) {
  const byId = new Map([...corpus.claims.map((c) => [`claim:${c.id}`, { title: c.text, url: c.url, ref: c.ref }]), ...corpus.docs.map((d) => [`doc:${d.id}`, { title: d.title, url: d.url }])])
  return cited.map((c, i) => ({ n: i + 1, type: c.type, id: c.id, ...byId.get(`${c.type}:${c.id}`) }))
}

export async function answerQuestion(rawQuestion, { corpus, policy = {}, system, generate, maxAttempts = 2 }) {
  const screened = screen(rawQuestion)
  const base = { category: categorize(screened.text, screened), qhash: questionHash(rawQuestion), drafts: [], costUsd: 0 }
  if (screened.blocked) return { ...base, status: "refuse", answer: REFUSAL_TEXT, citations: [], guard: screened.reasons }

  const messages = [{ role: "user", content: buildUserTurn(screened.text) }]
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const r = await generate({ system, messages })
    base.costUsd += r.costUsd || 0
    const { status, body } = parseOutput(r.text)
    if (status === "REFUSE") {
      const v = validateRefusal(body, { forbiddenPatterns: policy.forbiddenPatterns || [] })
      base.drafts.push({ status, ok: v.ok, problems: v.problems, unsupported: v.unsupported })
      const clean = body.replace(/\s*\[(?:claim|doc):[^\]]*\]/g, "").trim()
      return { ...base, status: "refuse", answer: v.ok && clean ? clean : REFUSAL_TEXT, citations: [] }
    }
    const v = validateAnswer(body, corpus, { forbiddenPatterns: policy.forbiddenPatterns || [] })
    base.drafts.push({ status, ok: v.ok, problems: v.problems, unsupported: v.unsupported })
    if (v.ok) return { ...base, status: "answer", answer: body, citations: resolveCitations(v.cited, corpus) }
    messages.push({ role: "assistant", content: r.text }, { role: "user", content: retryNote(v.problems) })
  }
  return { ...base, status: "blocked", answer: BLOCKED_TEXT, citations: [] }
}
