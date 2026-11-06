---
id: site.llm_energy
title: LLM Energy Benchmark (Projects and Experience pages)
url: /projects
---
Evan initiated and built a measurement pipeline for the energy cost of LLM API usage. It ingests and cleans large conversation datasets, replays the extracted prompts against several hosted models, records power draw with CodeCarbon, and engineers many linguistic features per prompt.

Measurement scope: the CodeCarbon tracker runs on the local client during each remote API call, so it captures client-side power draw across the request window, not provider-side inference energy, which these APIs do not expose.

The result was null: no prompt characteristic predicted client-side energy. Request duration dominated the measurement, which is the expected behavior for a client-side tracker and explains the missing prompt-feature signal. The negative result runs against the project's original hypothesis, and he reports it as such. Code: github.com/evwillow/llm-energy-benchmark.
