---
id: site.market_open_momentum
title: Market Open Momentum (Projects page)
url: /projects
---
A deterministic, rule-based strategy that trades early-morning momentum divergence between leveraged ETFs. It opens equal-dollar positions in UPRO and SPXU at the market open, closes the losing side once a spread threshold resolves within a short evaluation window, and exits the winner on a configurable schedule (same-day close or overnight hold). There is no model fitting, so results are reproducible run to run. The backtest engine models slippage and tracks pattern-day-trading limits. Code: github.com/evwillow/marketOpenMomentum.
