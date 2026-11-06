#!/usr/bin/env node
// Refresh the README snapshots used by the /ask corpus from public GitHub.
// Run by hand (`npm run ask:readmes`), never during a build, so builds stay offline.
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const manifest = JSON.parse(fs.readFileSync(path.join(root, "content/ask/readmes.json"), "utf8"))
for (const { repo } of manifest.include) {
  const name = repo.split("/")[1]
  let text = null
  for (const branch of ["main", "master"]) {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/README.md`)
    if (res.ok) { text = await res.text(); break }
  }
  if (!text) { console.error(`skip ${repo}: README not found`); continue }
  fs.writeFileSync(path.join(root, "content/ask/readmes", `${name}.md`), text)
  console.log(`ok ${repo} (${text.length} chars)`)
}
