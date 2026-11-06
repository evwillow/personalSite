# /ask: the "Ask about my work" agent

A page at `/ask` that answers questions about Evan's work from an allowlisted
corpus, with inline citations, a plain-code number validator and a daily
dollar cap.

## How an answer is made

1. `lib/ask/guard.mjs` normalizes the question (NFKC, strips zero-width and
   Unicode tag characters) and refuses, with no model call, anything that looks
   like prompt injection: plain, inside an HTML comment, base64-encoded, or
   smuggled in invisible characters. These are the vectors in the CRE28
   injection fixtures; six are copied into `scripts/ask-eval/injection/`.
2. `lib/ask/prompt.mjs` builds one fixed system prompt from
   `src/data/ask/corpus.json`. The question goes in the user turn inside
   `<question>` tags, so the system prompt is cacheable.
3. The route calls Claude Sonnet 5 (`claude-sonnet-5`, override with `ASK_MODEL`).
4. `lib/ask/validate.mjs` checks the draft in plain code. It blocks the draft
   if a citation id is unknown, if an answer has no citation, if any number in
   a paragraph does not match a value of a claim cited in that paragraph, or if
   the draft names a forbidden metric, leaks a canary token or links outside
   the corpus. A blocked draft gets one retry with the validator's reasons. If
   the retry is also blocked, the visitor sees a fixed fallback that contains
   no numbers.

Numbers rule: digits, percentages, R-multiples, years and spelled-out numbers
above ten are checked. Course codes (`CS 61B`), `S&P 500` and commit hashes
are identifiers, not numbers. Small number words (one to ten) are treated as
ordinary words. Signs are compared by absolute value, because "a drawdown of
36.78%" restates "-36.78% max drawdown".

## The corpus (`npm run ask:corpus`)

- **Claims:** the accepted claims in `src/data/verify_claims.json` (built from
  PUB01 `claims.json`), minus `content/ask/policy.json` → `excludeClaimIds`.
  The +3.17R full-ledger mean is excluded, and 3.17R and CAGR are blocked
  outright. The model cites claims by opaque refs (`[claim:c3]`), so it
  cannot read facts into the words inside an id.
- **Site pages:** `content/ask/sources/*.md`, number-free summaries of the
  Experience, Projects, About, Verify, Contact and homepage copy.
- **Public READMEs:** snapshots in `content/ask/readmes/`, listed in
  `content/ask/readmes.json` (excluded repos are listed with the reason).
  Refresh them with `npm run ask:readmes`. Code blocks are dropped, lines
  naming a forbidden metric are dropped, and every number is masked as `[n]`.

`npm run test:ask` fails if `corpus.json` is stale.

## Server environment

| Variable | Default | Meaning |
|---|---|---|
| `ANTHROPIC_API_KEY` | unset | Required. Without it the page shows "not switched on yet" and never calls a model. Set it in Railway, never in the repo. |
| `ASK_DAILY_USD_CAP` | `2` | Daily model spend cap in USD (UTC day). At the cap the page shows a paused state. |
| `ASK_MODEL` | `claude-sonnet-5` | Model id. Pricing in `lib/ask/budget.mjs` covers `claude-sonnet-5` and `claude-sonnet-5-5`. |
| `ASK_RATE_PER_MINUTE` / `ASK_RATE_PER_DAY` | `5` / `30` | Per-IP limits. |
| `ASK_SPEND_FILE` | `/tmp/ask-spend.json` | Where the day's spend is mirrored so a restart keeps the count. |

Cap mechanics: before each model call the route reserves the worst case (the
whole prompt billed as a cache write, plus the maximum output, about $0.03),
and after the call it books the cost measured from `usage`. A failed call is
charged at the estimate. Limits are in memory for one instance. A redeploy
clears `/tmp`, so on redeploy day the cap can be spent twice; mount a volume
at `ASK_SPEND_FILE` if that matters.

## Analytics

The browser sends one GA4 event, `ask_question`, through the existing gtag:
`ask_category` (a keyword topic label), `ask_status`, and `q_sha256`, a sha256
of the normalized question computed on the server. The question text is never
sent to GA4 and never logged. A short question's hash can be reversed by
guessing, so treat `q_sha256` as a dedupe key, not as anonymization.

## Eval (`npm run eval:ask`)

60 questions in `scripts/ask-eval/questions.json`: 40 in scope with gold
citations and required facts, and 20 adversarial or out of scope (forbidden
and unpublished numbers, injections including the six fixtures, private
information, homework, general knowledge). Grading is plain code. The script
prints the in-scope correct-and-cited rate, the count of unsupported numbers
shown and the correct-refusal rate. It exits non-zero below 90%, above 0 or
below 95%.

With `ANTHROPIC_API_KEY` set, the eval uses the SDK adapter, the same model as
the route. Without a key, it runs `claude -p --model sonnet --output-format
json` with the same system prompt (set `ASK_EVAL_CLI_MODEL=claude-sonnet-5` to
match the route's model). Results go to `scripts/ask-eval/results/`, which is
gitignored.
