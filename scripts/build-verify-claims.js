// Builds src/data/verify_claims.json: the accepted claims in PUB01 claims.json,
// each with the commit, command and input hashes from PUB01 public_numbers.json.
// Usage: node scripts/build-verify-claims.js <claims.json> <public_numbers.json> [out.json]
//
// Only claims marked accepted are written, and only these fields: id, the
// accepted wording, commit, date, command (without trailing notes) and input
// paths with sha256. Re-derived values, reasons and log paths stay out, so
// the public repo carries no figure beyond the accepted wording.
const fs = require("fs");
const path = require("path");

const [claimsPath, numbersPath, outArg] = process.argv.slice(2);
if (!claimsPath || !numbersPath) {
  console.error("usage: node scripts/build-verify-claims.js <claims.json> <public_numbers.json> [out.json]");
  process.exit(2);
}
const claims = JSON.parse(fs.readFileSync(claimsPath, "utf8")).claims || [];
const numbers = JSON.parse(fs.readFileSync(numbersPath, "utf8"));
const byMetric = new Map(numbers.entries.map((e) => [e.metric, e]));

// claims.json names the two test counts by the commit that produced them;
// public_numbers.json files the same runs under "_head" (HEAD was a4087032).
const ALIAS = {
  "tests.repo_collected_a4087032": "tests.repo_collected_head",
  "tests.bot_collected_a4087032": "tests.bot_collected_head",
};

const stripNote = (s) => String(s).split(/\s{2,}\(|\s+#\s|\s\(/)[0].trim();

const out = [];
const missing = [];
for (const c of claims) {
  if (c.accepted !== true) continue;
  const metric = ALIAS[c.id] || c.id;
  const e = byMetric.get(metric);
  if (!e) {
    missing.push(c.id);
    continue;
  }
  out.push({
    id: c.id,
    claim: c.text,
    ...(metric !== c.id ? { source_metric: metric } : {}),
    commit: String(e.commit).slice(0, 8),
    date: e.date,
    command: stripNote(e.command),
    inputs: (e.inputs || []).map((i) => ({ path: stripNote(i.path), sha256: i.sha256 })),
  });
}

const dest = outArg || path.join(__dirname, "..", "src", "data", "verify_claims.json");
fs.writeFileSync(
  dest,
  JSON.stringify({ source: "PUB01/claims.json + PUB01/public_numbers.json", claims: out }, null, 2) + "\n"
);
console.log(`accepted claims written ${out.length}${missing.length ? `, missing in public_numbers.json: ${missing.join(", ")}` : ""}`);
if (missing.length) process.exit(1);
