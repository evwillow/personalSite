---
id: site.verify
title: How I verify results (/verify page)
url: /verify
---
Every number Evan publishes about the trading research is meant to be re-derivable from a command, an input file and a commit. A number is published only after it clears four rungs in order. First, the claim, stated with its scope (which ledger, which years, how many trades). Second, the source command that produces the value, run at a recorded commit. Third, the sha256 hash of every input file the command read, so a changed input is detectable. Fourth, an independent rerun from a clean checkout by a separate process that must give the same value.

The /verify page lists the accepted numbers with commit and input hash, and keeps a retraction log of earlier values he withdrew after re-deriving them. The raw ledger is not published, so reproducing a value needs access from Evan; the commands, commits and hashes are in the site repository.
