// Daily dollar cap for /ask. Spend is tracked per UTC day in memory and, when
// ASK_SPEND_FILE is writable, mirrored to disk so a restart keeps the count.
// Before each model call the route reserves a worst-case estimate; after the
// call the reservation is replaced by the measured cost from `usage`.
import fs from "node:fs"

// USD per million tokens. Cache writes bill at 1.25x input, cache reads at 0.1x.
export const PRICES = {
  "claude-sonnet-5": { input: 2, output: 10 },
  "claude-sonnet-5-5": { input: 2, output: 10 },
}

export function costOf(model, usage) {
  const p = PRICES[model]
  if (!p || !usage) return null
  const M = 1e6
  return (
    ((usage.input_tokens || 0) * p.input +
      (usage.cache_creation_input_tokens || 0) * p.input * 1.25 +
      (usage.cache_read_input_tokens || 0) * p.input * 0.1 +
      (usage.output_tokens || 0) * p.output) / M
  )
}

// Worst case for one attempt: the whole prompt billed as a cache write plus max output.
export function worstCase(model, promptTokens, maxOutputTokens) {
  return costOf(model, { cache_creation_input_tokens: promptTokens, output_tokens: maxOutputTokens })
}

const today = () => new Date().toISOString().slice(0, 10)

export function createBudget({ capUsd = 2, file = null, now = today } = {}) {
  let state = { day: now(), spent: 0 }
  let reserved = 0
  if (file) {
    try {
      const s = JSON.parse(fs.readFileSync(file, "utf8"))
      if (s.day === now() && Number.isFinite(s.spent)) state = s
    } catch { /* no file yet */ }
  }
  const roll = () => {
    if (state.day !== now()) { state = { day: now(), spent: 0 }; reserved = 0 }
  }
  const persist = () => {
    if (!file) return
    try { fs.writeFileSync(file, JSON.stringify(state)) } catch { /* read-only fs: memory only */ }
  }
  return {
    capUsd,
    status() {
      roll()
      return { day: state.day, spentUsd: state.spent, reservedUsd: reserved, capUsd, paused: state.spent + reserved >= capUsd }
    },
    // Returns a ticket, or null when the reservation would cross the cap.
    reserve(estimateUsd) {
      roll()
      if (state.spent + reserved + estimateUsd > capUsd) return null
      reserved += estimateUsd
      return { estimateUsd, day: state.day }
    },
    settle(ticket, actualUsd) {
      roll()
      if (ticket.day === state.day) {
        reserved = Math.max(0, reserved - ticket.estimateUsd)
        state.spent += Number.isFinite(actualUsd) ? actualUsd : ticket.estimateUsd
      }
      persist()
    },
  }
}
