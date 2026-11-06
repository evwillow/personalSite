import siteMetadata from "@/src/utils/siteMetaData"
import accepted_claims from "@/src/data/verify_claims.json"
import verdicts from "@/src/data/verify_verdicts.json"

export const metadata = {
  title: "How I verify results",
  description: `How ${siteMetadata.author} checks the numbers published on this site: the verification ladder, the accepted numbers with commit and hash, and a log of retracted values.`,
}

const METRIC_SECTION = (metric) => metric.split(".")[0]
const sections = verdicts.sections

// A row is shown when the claim is accepted in PUB01 claims.json (the only
// claims built into verify_claims.json) and its metric section carries an
// accept tick. Nothing is accepted by default, and no figure appears here
// beyond the accepted wording.
const accepted = accepted_claims.claims.filter((c) => sections[METRIC_SECTION(c.id)]?.accept)

// One retraction row per retract tick. The claims listed are the ones that
// section marks stale, conflict or not reproducible.
const RETRACTABLE = /^(stale|conflict|not reproducible)$/
const retractions = Object.entries(sections)
  .filter(([, s]) => s.retract)
  .map(([metric, s]) => ({
    metric,
    claims: s.claims.filter((c) => RETRACTABLE.test(c.verdict)),
  }))

// Public readers get a surface name, not an internal path.
function surface(loc) {
  if (loc.startsWith("personalSite")) return "this site"
  if (loc.includes("resume") || loc.includes("Resume")) return "resume"
  if (loc.includes("LinkedIn")) return "LinkedIn draft"
  if (loc.startsWith("breakouts-trade")) return "breakouts.trade repo"
  if (loc.startsWith("breakouts-engine")) return "research engine repo"
  if (loc.startsWith("2027_Applications")) return "application notes"
  return "other"
}
function surfaces(locs) {
  return [...new Set(locs.map(surface))].join(", ")
}

const WORKED = accepted.find((c) => c.id === "trades.ledger_1998_2026")

const th = "py-2 pr-4 text-left font-semibold align-bottom"
const td = "py-2 pr-4 align-top"

export default function Verify() {
  return (
    <main className="flex flex-col items-center px-5 sm:px-10 md:px-24 lg:px-32 my-12">
      <article className="max-w-4xl w-full text-dark dark:text-light">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">How I verify results</h1>
        <p className="text-lg text-dark/80 dark:text-light/80 mb-10">
          Every number I publish about the trading research should be re-derivable from a command, an input file and a
          commit. This page shows how that works, lists the numbers that passed, and lists the ones I withdrew.
        </p>

        <section className="mb-12" aria-labelledby="ladder">
          <h2 id="ladder" className="text-2xl font-bold mb-3">1. The verification ladder</h2>
          <p className="mb-3">A number is only published after it clears four rungs, in order.</p>
          <ol className="list-decimal pl-6 space-y-1 mb-4">
            <li><strong>Claim.</strong> The exact statement, with its scope: which ledger, which years, how many trades.</li>
            <li><strong>Source command.</strong> The command that produces the value from the inputs, run at a recorded commit.</li>
            <li><strong>sha256.</strong> The hash of every input file the command read, so a changed input is detectable.</li>
            <li><strong>Independent rerun.</strong> A second run from a clean checkout, by a separate process, that must give the same value.</li>
          </ol>
          <p className="mb-3">
            The table in section 2 records rungs 1 to 3 for each number: the accepted claim, the commit and the input
            hash. Rung 4 is the reproduction recipe in section 4.
          </p>
          {WORKED && (
            <div className="border-l-4 border-accent pl-4 text-sm">
              <p className="font-semibold mb-1">Worked example: <code>{WORKED.id}</code></p>
              <p>Claim: {WORKED.claim}.</p>
              <p>Command: <code>python -m bot.scripts.make_r_baseline --trades data/research/qm_trades.parquet</code></p>
              <p className="break-all">sha256 of the ledger: <code>{WORKED.inputs[0]?.sha256}</code></p>
              <p>Commit: <code>{WORKED.commit}</code></p>
            </div>
          )}
        </section>

        <section className="mb-12" aria-labelledby="numbers">
          <h2 id="numbers" className="text-2xl font-bold mb-3">2. Accepted numbers</h2>
          <p className="mb-3">
            {accepted.length} accepted {accepted.length === 1 ? "value" : "values"}, rendered at build time from{" "}
            <code>verify_claims.json</code>. Each one is the accepted wording; its value was re-derived at the commit shown.
          </p>
          {accepted.length === 0 ? (
            <p className="italic text-dark/70 dark:text-light/70">No numbers have been accepted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed" data-testid="accepted-table">
                <colgroup>
                  <col className="w-[34%]" />
                  <col className="w-[22%]" />
                  <col className="w-[12%]" />
                  <col className="w-[32%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-dark/30 dark:border-light/30">
                    <th className={th}>Metric</th>
                    <th className={th}>Accepted claim</th>
                    <th className={th}>Commit</th>
                    <th className={th}>sha256 (first input)</th>
                  </tr>
                </thead>
                <tbody>
                  {accepted.map((e) => (
                    <tr key={e.id} data-row="accepted" className="border-b border-dark/10 dark:border-light/10">
                      <td className={`${td} break-all`}><code>{e.id}</code></td>
                      <td className={`${td} break-words`}>{e.claim}</td>
                      <td className={td}><code>{e.commit}</code></td>
                      <td className={`${td} break-all`}>
                        {e.inputs.length ? <code title={e.inputs[0].path}>{e.inputs[0].sha256.slice(0, 16)}…</code> : "no file input"}
                        {e.inputs.length > 1 && <span className="text-dark/60 dark:text-light/60"> +{e.inputs.length - 1} more inputs</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mb-12" aria-labelledby="retractions">
          <h2 id="retractions" className="text-2xl font-bold mb-3">3. Retraction log</h2>
          <p className="mb-3">
            {retractions.length} {retractions.length === 1 ? "metric" : "metrics"} retracted. Each row is a metric group I
            marked retract after re-deriving it; the claims are the earlier statements that did not hold.
          </p>
          {retractions.length === 0 ? (
            <p className="italic text-dark/70 dark:text-light/70">Nothing has been retracted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed" data-testid="retraction-table">
                <colgroup>
                  <col className="w-[22%]" />
                  <col className="w-[78%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-dark/30 dark:border-light/30">
                    <th className={th}>Metric</th>
                    <th className={th}>Retracted claim, where it appeared, why it was wrong</th>
                  </tr>
                </thead>
                <tbody>
                  {retractions.map((r) => (
                    <tr key={r.metric} data-row="retraction" className="border-b border-dark/10 dark:border-light/10">
                      <td className={td}><code>{r.metric}</code></td>
                      <td className={td}>
                        <ul className="space-y-2">
                          {r.claims.map((c, i) => (
                            <li key={i}>
                              <span className="font-semibold">{c.claim}</span>
                              <span className="text-dark/70 dark:text-light/70"> (appeared in: {surfaces(c.locations)})</span>
                              <br />
                              <span>{c.verdict}: {c.reason}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mb-12" aria-labelledby="reproduce">
          <h2 id="reproduce" className="text-2xl font-bold mb-3">4. How to reproduce</h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Check out the research engine at the commit shown in the table.</li>
            <li>Put the input file in place and confirm its sha256 matches the table. If it does not, stop: the input changed.</li>
            <li>Run the source command for the metric.</li>
            <li>Compare the output with the value in the table. They must match exactly at the stated precision.</li>
          </ol>
          <p className="mt-3">
            The raw ledger is not published, so step 2 needs access from me. The commands, commits and hashes are all in{" "}
            <code>src/data/verify_claims.json</code> in this site&apos;s repository.
          </p>
        </section>
      </article>
    </main>
  )
}
