import Link from "next/link"

// A card links only when its page exists; otherwise it renders as "coming soon" with no link.
const CASE_STUDIES = [
  {
    title: "Safety rails on a live trading robot",
    blurb: "The order gate, kill switch, loss rails and broker reconciliation around a real-money robot, and the defects that got past them.",
    href: null,
  },
  {
    title: "jobwatch",
    blurb: "A job-search pipeline that sweeps applicant-tracking boards, dedupes postings and tracks every application in one database.",
    href: null,
  },
  {
    title: "A pre-registration instrument",
    blurb: "A harness that locks the hypothesis, gates and analysis before a model run and refuses to run a spec edited after the lock.",
    href: null,
  },
]

const CardBody = ({ study, live }) => (
  <>
    <div className="flex items-center justify-between gap-4 mb-3">
      <h3 className="text-xl font-semibold text-dark dark:text-light">{study.title}</h3>
      {!live && (
        <span className="flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full bg-dark/10 dark:bg-light/10 text-dark/70 dark:text-light/70">
          Coming soon
        </span>
      )}
    </div>
    <p className="text-dark/80 dark:text-light/80 leading-relaxed">{study.blurb}</p>
  </>
)

const CaseStudies = () => {
  const cardClass = "block h-full bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50"

  return (
    <section className="w-full px-5 sm:px-10 md:px-24 lg:px-32 mb-16" aria-labelledby="case-studies">
      <div className="max-w-6xl mx-auto">
        <h2 id="case-studies" className="text-2xl md:text-4xl font-bold text-dark dark:text-light mb-8">
          Case studies
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <li key={study.title}>
              {study.href ? (
                <Link href={study.href} className={`${cardClass} hover:border-accent transition-colors`}>
                  <CardBody study={study} live />
                </Link>
              ) : (
                <div className={`${cardClass} opacity-90`} aria-disabled="true">
                  <CardBody study={study} live={false} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CaseStudies
