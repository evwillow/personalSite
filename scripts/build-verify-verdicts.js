// Turns Evan's accept/retract ticks in PUB01 conflicts.md into src/data/verify_verdicts.json.
// Usage: node scripts/build-verify-verdicts.js path/to/conflicts.md [out.json]
// Only the ticked boxes are read; nothing is inferred when a box is empty.
const fs = require("fs");
const path = require("path");

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/build-verify-verdicts.js <conflicts.md>");
  process.exit(2);
}
const lines = fs.readFileSync(src, "utf8").split(/\r?\n/);
const SECTIONS = ["trades", "R", "CAGR", "Sharpe", "drawdown", "win_rate", "tests", "postings", "boards"];
const out = {};
let cur = null;
for (const line of lines) {
  const h = line.match(/^## (\S+)\s*$/);
  if (h) {
    cur = SECTIONS.includes(h[1]) ? h[1] : null;
    if (cur) out[cur] = { accept: false, retract: false, note: "", claims: [] };
    continue;
  }
  if (!cur) continue;
  const box = line.match(/^- \[([ xX])\] (accept|retract)\b/);
  if (box) {
    out[cur][box[2]] = box[1] !== " ";
    continue;
  }
  // claim row: | claim | locations | derived | recommended | verdict |
  if (line.startsWith("|") && !line.startsWith("| claim") && !line.startsWith("|---")) {
    const cells = line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim());
    if (cells.length < 5) continue;
    const v = cells[4].match(/^\*\*([^*]+)\*\*\s*(?:—\s*)?(.*)$/);
    out[cur].claims.push({
      claim: cells[0],
      locations: [...cells[1].matchAll(/`([^`]+)`/g)].map((m) => m[1]),
      derived: cells[2],
      canonical: cells[3],
      verdict: v ? v[1] : cells[4],
      reason: v ? v[2] : "",
    });
  }
}
const s = Object.values(out);
const parsedRows = s.reduce((a, x) => a + x.claims.length, 0);
// The page shows claim rows only in the retraction log, so only retracted
// sections keep theirs. The repo is public: rows for sections that are not
// retracted would publish figures the site does not show.
for (const x of s) if (!x.retract) x.claims = [];
const dest = process.argv[3] || path.join(__dirname, "..", "src", "data", "verify_verdicts.json");
fs.writeFileSync(dest, JSON.stringify({ source: "PUB01/conflicts.md", sections: out }, null, 2) + "\n");
console.log(`sections ${s.length}, accept ticks ${s.filter((x) => x.accept).length}, retract ticks ${s.filter((x) => x.retract).length}, claim rows parsed ${parsedRows}, written ${s.reduce((a, x) => a + x.claims.length, 0)}`);
