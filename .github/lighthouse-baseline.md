# Lighthouse baseline (mobile, simulated throttling, 1 run)

Measured locally on 2026-10-04 against `next start -p 3001` of this branch (Lighthouse 12, Chromium 1243, form factor mobile). Scores are 0-100. They vary run to run, so treat them as a rough reference. The CI job is warn-only; its thresholds are in `lighthouserc.json`.

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| / | 63 | 100 | 100 | 92 |
| /about | 80 | 96 | 100 | 92 |
| /projects | 55 | 95 | 100 | 92 |

Replace these with the numbers from the first GitHub run's Lighthouse artifact once it exists.
