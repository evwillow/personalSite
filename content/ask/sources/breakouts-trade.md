---
id: site.breakouts_trade
title: breakouts.trade, the study tool (Experience and Projects pages)
url: /experience
---
Evan founded breakouts.trade and is its sole engineer and the only contributor to its repositories. It is a browser drill app that teaches a breakout stock-trading strategy on real charts, plus a daily scanner that runs on the same strategy code. It shipped to real users who sign up, activate and run practice drills.

Engineering work on the app:
- Reviewed every API route handler and the middleware, found a credentials path that accepted a password as proof of Google identity (a pre-auth account-takeover flaw), then fixed it and re-verified the fix.
- Hand-wrote idempotent SQL migrations and row-level-security policies with no ORM.
- Gated every pull request on type-check, lint, tests and build.
- Replaced a stock-metadata cold path that fanned out storage reads and timed out on cold starts with one precomputed artifact, and added a test that proves the fan-out is gone.

Stack: Next.js, TypeScript, React, Python, PostgreSQL, Supabase, GitHub Actions. The repository is private; the live site is breakouts.trade.
