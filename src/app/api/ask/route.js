// POST /api/ask  {question} -> {status, answer, citations, category, qhash}
// GET  /api/ask             -> {paused}
// status is one of: answer | refuse | blocked | paused | rate_limited | error
import corpus from "@/src/data/ask/corpus.json"
import policy from "@/content/ask/policy.json"
import { answerQuestion } from "@/lib/ask/core.mjs"
import { buildSystemPrompt } from "@/lib/ask/prompt.mjs"
import { createBudget, worstCase } from "@/lib/ask/budget.mjs"
import { createRateLimiter, clientIp } from "@/lib/ask/ratelimit.mjs"
import { createAnthropicAdapter, MAX_OUTPUT_TOKENS } from "@/lib/ask/anthropic.mjs"
import { MAX_QUESTION_CHARS } from "@/lib/ask/guard.mjs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SYSTEM = buildSystemPrompt(corpus)
// Rough token estimate for the reservation: ~3.5 characters per token plus the question.
const PROMPT_TOKENS = Math.ceil(SYSTEM.length / 3.5) + 400

const cap = Number(process.env.ASK_DAILY_USD_CAP)
const budget = createBudget({
  capUsd: Number.isFinite(cap) && cap >= 0 ? cap : 2,
  file: process.env.ASK_SPEND_FILE || "/tmp/ask-spend.json",
})
const limiter = createRateLimiter({
  perMinute: Number(process.env.ASK_RATE_PER_MINUTE) || 5,
  perDay: Number(process.env.ASK_RATE_PER_DAY) || 30,
})
let adapter = null

class Paused extends Error {}

const PAUSED = {
  status: "paused",
  answer: "Ask is paused for today: it has reached its daily spending cap. It resets at midnight UTC. The Projects and Experience pages have the same information.",
  citations: [],
}

const UNCONFIGURED = {
  status: "paused",
  answer: "Ask is not switched on yet. The Projects and Experience pages have the same information.",
  citations: [],
}

const json = (body, init) => Response.json(body, { headers: { "Cache-Control": "no-store" }, ...init })

export async function GET() {
  return json({ paused: !process.env.ANTHROPIC_API_KEY || budget.status().paused })
}

export async function POST(request) {
  let question = ""
  try {
    const body = await request.json()
    question = typeof body?.question === "string" ? body.question : ""
  } catch {
    return json({ status: "error", answer: "Bad request." }, { status: 400 })
  }
  if (question.length > MAX_QUESTION_CHARS * 4) return json({ status: "error", answer: "Question too long." }, { status: 413 })

  const rl = limiter.check(clientIp(request.headers))
  if (!rl.ok) {
    return json(
      { status: "rate_limited", answer: "Too many questions from this connection. Please try again later.", citations: [] },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec), "Cache-Control": "no-store" } },
    )
  }
  if (!process.env.ANTHROPIC_API_KEY) return json(UNCONFIGURED)
  if (budget.status().paused) return json(PAUSED)

  adapter ||= createAnthropicAdapter()
  const generate = async (req) => {
    const ticket = budget.reserve(worstCase(adapter.model, PROMPT_TOKENS, MAX_OUTPUT_TOKENS))
    if (!ticket) throw new Paused()
    let r
    try {
      r = await adapter.generate(req)
    } catch (e) {
      budget.settle(ticket, null) // charge the estimate: a failed call may still have billed
      throw e
    }
    budget.settle(ticket, r.costUsd)
    return r
  }

  try {
    const out = await answerQuestion(question, { corpus, policy, system: SYSTEM, generate })
    // Never echo the question; drafts and cost stay server-side.
    return json({ status: out.status, answer: out.answer, citations: out.citations, category: out.category, qhash: out.qhash })
  } catch (e) {
    if (e instanceof Paused) return json(PAUSED)
    console.error("ask: model call failed", e?.status || e?.name)
    return json({ status: "error", answer: "Something went wrong. Please try again later.", citations: [] }, { status: 502 })
  }
}

