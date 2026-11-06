"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

const EXAMPLES = [
  "What did Evan build for breakouts.trade?",
  "How does he verify the numbers he publishes?",
  "What did the LLM energy benchmark find?",
  "How many trades are in the backtest ledger?",
]
const CITE_RE = /\[(claim|doc):([A-Za-z0-9_.\-]+)\]/g

// GA4 gets a topic label, the outcome and a sha256 of the question. Never the text.
const track = (data) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "ask_question", { ask_category: data.category || "unknown", ask_status: data.status, q_sha256: data.qhash || "" })
  }
}

function AnswerText({ text, citations }) {
  const index = new Map(citations.flatMap((c) => [[`${c.type}:${c.id}`, c], ...(c.ref ? [[`${c.type}:${c.ref}`, c]] : [])]))
  return text.split(/\n\s*\n/).map((para, i) => {
    const parts = []
    let last = 0
    for (const m of para.matchAll(CITE_RE)) {
      parts.push(para.slice(last, m.index))
      const c = index.get(`${m[1]}:${m[2]}`)
      if (c) parts.push(<sup key={m.index}><a href={`#src-${c.n}`} className="text-accentText dark:text-accent">[{c.n}]</a></sup>)
      last = m.index + m[0].length
    }
    parts.push(para.slice(last))
    return <p key={i} className="mb-3 leading-relaxed">{parts}</p>
  })
}

export default function AskClient() {
  const [question, setQuestion] = useState("")
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    fetch("/api/ask").then((r) => r.json()).then((d) => setPaused(Boolean(d.paused))).catch(() => {})
  }, [])

  async function ask(q) {
    const text = (q ?? question).trim()
    if (!text || busy) return
    setBusy(true)
    setResult(null)
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: text }) })
      const data = await res.json()
      setResult(data)
      if (data.status === "paused") setPaused(true)
      track(data)
    } catch {
      setResult({ status: "error", answer: "Something went wrong. Please try again later.", citations: [] })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section aria-label="Ask a question">
      {paused && (
        <p role="status" className="mb-4 p-3 rounded-lg bg-dark/5 dark:bg-light/10 text-sm">
          Ask is paused right now (it has reached today&apos;s spending cap, or it is not switched on yet). The{" "}
          <Link href="/projects" className="underline">Projects</Link> and <Link href="/experience" className="underline">Experience</Link> pages
          have the same information.
        </p>
      )}
      <form onSubmit={(e) => { e.preventDefault(); ask() }} className="mb-4">
        <label htmlFor="ask-q" className="block font-semibold mb-2">Your question</label>
        <textarea
          id="ask-q"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={500}
          rows={3}
          disabled={paused}
          className="w-full rounded-lg border-2 border-dark/20 dark:border-light/20 bg-transparent p-3"
          placeholder="What did Evan build, how does he check his numbers, what is he working on?"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-dark/60 dark:text-light/60">{question.length}/500</span>
          <button type="submit" disabled={busy || paused || !question.trim()} className="px-5 py-2 rounded-lg bg-dark text-light dark:bg-light dark:text-dark font-semibold disabled:opacity-50">
            {busy ? "Checking…" : "Ask"}
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2 mb-8">
        {EXAMPLES.map((q) => (
          <button key={q} type="button" disabled={busy || paused} onClick={() => { setQuestion(q); ask(q) }} className="text-sm px-3 py-1 rounded-full border border-dark/20 dark:border-light/20 hover:border-accent disabled:opacity-50">
            {q}
          </button>
        ))}
      </div>
      {result && (
        <div aria-live="polite" className="border-l-4 border-accent pl-4">
          <AnswerText text={result.answer || ""} citations={result.citations || []} />
          {result.citations?.length > 0 && (
            <ol className="text-sm text-dark/70 dark:text-light/70 list-decimal pl-5 space-y-1">
              {result.citations.map((c) => (
                <li key={c.n} id={`src-${c.n}`}>
                  {c.url?.startsWith("http") ? (
                    <a href={c.url} className="underline hover:text-accent" target="_blank" rel="noopener noreferrer">{c.title}</a>
                  ) : (
                    <Link href={c.url || "/"} className="underline hover:text-accent">
                      {c.type === "claim" ? `Accepted claim: ${c.title}` : c.title}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </section>
  )
}
