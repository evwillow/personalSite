// Anthropic Messages API adapter for /ask (server only).
// The key comes from ANTHROPIC_API_KEY in the server environment; it is never
// in the repo and never sent to the browser.
import Anthropic from "@anthropic-ai/sdk"
import { costOf } from "./budget.mjs"

export const DEFAULT_MODEL = "claude-sonnet-5"
export const MAX_OUTPUT_TOKENS = 600

export function createAnthropicAdapter({ apiKey = process.env.ANTHROPIC_API_KEY, model = process.env.ASK_MODEL || DEFAULT_MODEL, fetch } = {}) {
  const client = new Anthropic({ apiKey, maxRetries: 1, timeout: 30_000, ...(fetch ? { fetch } : {}) })
  return {
    model,
    async generate({ system, messages }) {
      const res = await client.messages.create({
        model,
        max_tokens: MAX_OUTPUT_TOKENS,
        // Sonnet 5 accepts disabled thinking; newer models reject it, so they get low effort instead.
        ...(model === "claude-sonnet-5" ? { thinking: { type: "disabled" } } : { output_config: { effort: "low" } }),
        system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
        messages,
      })
      if (res.stop_reason === "refusal") return { text: "STATUS: REFUSE\n", usage: res.usage, costUsd: costOf(model, res.usage) ?? 0 }
      const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("")
      return { text, usage: res.usage, costUsd: costOf(model, res.usage) ?? 0 }
    },
  }
}
