---
id: site.breakouts_engine
title: Breakouts Engine and the execution robot (Projects and Experience pages)
url: /projects
---
The Breakouts Engine is the quantitative research engine behind breakouts.trade. It implements a channel-breakout strategy as a single source of truth that research and execution share, so backtests and the live bot import the same strategy code through a parity bridge. A nightly scanner pipeline runs over a regenerable local market-data lake and serves chart data from object storage. The research code carries parity, look-ahead, survivorship and point-in-time test guards meant to keep results reproducible.

Evan also built an execution robot for an Interactive Brokers account that has traded real money. The engineering he points to is the safety work around it: systemd units, a kill switch, an order gate and loss rails, broker-versus-journal reconciliation on a fixed short interval, and a heartbeat that names the running commit. This page makes no claim about the robot's live trading performance.

The engine produced a survivorship-free backtest ledger and a holdout period that was run once. Its published figures are the accepted claims on the /verify page; every one of them is a backtest or test-count figure, not a live trading result. The repository is private.
