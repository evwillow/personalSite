import siteMetadata from "@/src/utils/siteMetaData"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Projects | Evan Maus",
  description: `Explore ${siteMetadata.author}'s portfolio of quantitative trading systems, machine learning and AI infrastructure work, and fullstack applications, including the breakouts.trade study tool and the LLM Energy Benchmark.`,
  keywords: "Evan Maus projects, Breakout Study Tool, breakouts.trade, LLM Energy Benchmark, trading systems, machine learning projects, Next.js projects, Python projects, Berkeley student projects",
}

export default function Projects() {
  const sections = [
    {
      heading: "Current Work",
      projects: [
        {
          title: "Incurra",
          subtitle: "Python, Polars, DuckDB, Parquet, Anthropic API",
          description:
            "An AI product for commercial-auto claims reconciliation. It reads adjuster notes on open claims and flags the ones where a documented fact is not reflected in the carried reserve. It is a reconciliation tool rather than a prediction machine.",
          link: "https://incurra.com",
          linkText: "View Live Site",
          privateRepo: true,
          tags: ["Python", "Polars", "DuckDB", "Parquet", "Anthropic API", "Insurance"],
        },
      ],
    },
    {
      heading: "Quantitative Trading & Research",
      projects: [
        {
          title: "Breakouts Engine",
          subtitle: "Python, pandas, IBKR API, Supabase",
          description:
            "The quantitative engine behind breakouts.trade: a channel-breakout strategy implemented as a single source of truth shared by research and execution, a nightly scanner pipeline over a local market-data lake, and a live Interactive Brokers trading robot that imports the same strategy code through a parity bridge.",
          highlights: [
            "Implemented the strategy as a shared source of truth so backtests and the live bot cannot drift apart",
            "Built a nightly scanner pipeline over a regenerable local market-data lake, serving chart data from object storage",
            "Wrote parity, lookahead, survivorship, and point-in-time test guards to keep research reproducible",
          ],
          privateRepo: true,
          tags: ["Python", "pandas", "Trading", "Backtesting", "IBKR", "Research"],
        },
        {
          title: "Market Open Momentum",
          subtitle: "Python, pandas, Jupyter",
          description:
            "A deterministic, rule-based strategy that trades early-morning momentum divergence between leveraged ETFs. It opens equal-dollar positions in UPRO and SPXU at the market open, closes the losing side once a spread threshold resolves within a five-minute evaluation window, and exits the winner on a configurable schedule.",
          highlights: [
            "Fully rule-based execution with no model fitting, so results are reproducible run to run",
            "Backtest engine with realistic slippage and pattern-day-trading limit tracking",
            "Configurable exit modes for same-day close versus overnight hold",
          ],
          link: "https://github.com/evwillow/marketOpenMomentum",
          linkText: "View on GitHub",
          tags: ["Python", "pandas", "Trading", "Backtesting", "ETFs"],
        },
        {
          title: "Volume Contraction & Breakout Returns (EC143)",
          subtitle: "Econometrics coursework project",
          description:
            "Quantile-regression study testing whether pre-breakout volume contraction predicts upper-tail returns on Qullamaggie-style momentum setups. UC Berkeley EC143 final project.",
          link: "https://github.com/evwillow/econ143-project",
          linkText: "View on GitHub",
          tags: ["Econometrics", "Quantile Regression", "Python", "Market Microstructure", "Research"],
        },
      ],
    },
    {
      heading: "Machine Learning & AI Infrastructure",
      projects: [
        {
          title: "LLM Energy Benchmark",
          subtitle: "Python, CodeCarbon, pandas, Jupyter",
          description:
            "A measurement pipeline for the energy cost of LLM API usage. It ingests and cleans large conversation datasets, replays the extracted prompts against several hosted models, and records power draw with CodeCarbon while engineering 30+ linguistic features per prompt.",
          highlights: [
            "Measurement scope: the CodeCarbon tracker runs on the local client during each remote API call, so it captures client-side power draw across the request window, not provider-side inference energy, which these APIs do not expose",
            "Result was null: across 20,709 measured API calls spanning three models, no prompt characteristic predicted client-side energy, with the strongest correlation at r = 0.027 (prompt length in characters)",
            "Request duration dominated the measurement (r = 0.44), which is the expected behavior for a client-side tracker and explains the absent prompt-feature signal",
            "The negative result runs against the project's original hypothesis and is reported as such",
          ],
          link: "https://github.com/evwillow/llm-energy-benchmark",
          linkText: "View on GitHub",
          tags: ["Python", "CodeCarbon", "NLP", "Machine Learning", "Research", "Data Analysis"],
        },
      ],
    },
    {
      heading: "Fullstack Applications",
      projects: [
        {
          title: "breakouts.trade Study Tool",
          subtitle: "Next.js, TypeScript, React, Python, PostgreSQL",
          description:
            "Built a Duolingo-style platform to learn a breakout stock-trading strategy with real charts and simulations. Shipped a production product with 458 signups across six continents through iteration with Reddit and X.com communities.",
          highlights: [
            "Built a Duolingo-style platform to learn a breakout stock-trading strategy with real charts and simulations",
            "Shipped a production product with 458 signups across six continents through iteration with Reddit and X.com communities",
            "Engineered interactive React/Next.js charting and drill flows",
            "Developed Python pipelines to ingest and normalize large-scale market data",
            "Designed analytics to track accuracy, performance metrics, and study behavior",
            "Implemented secure auth, rate-limited APIs, and CI/CD",
          ],
          link: "https://breakouts.trade",
          linkText: "View Live Site",
          privateRepo: true,
          tags: ["Next.js", "TypeScript", "React", "Python", "PostgreSQL", "CI/CD", "Trading", "Full-Stack"],
        },
        {
          title: "Pollinator Pathways",
          subtitle: "React, React Router, Tailwind CSS",
          description:
            "A React application built for a regional environmental organization, with keyword search and filtering to help visitors discover member groups by location and type, an interactive image gallery, and a responsive Tailwind layout.",
          highlights: [
            "Keyword search plus location and type filters for browsing member groups",
            "Interactive, rearrangeable image gallery",
            "Responsive layout built with Tailwind CSS",
          ],
          link: "https://github.com/evwillow/pollinatorPathwaysWebsite",
          linkText: "View on GitHub",
          tags: ["React", "React Router", "Tailwind CSS", "JavaScript", "Front-End"],
        },
        {
          title: "evwillow.com",
          subtitle: "Next.js, React, Tailwind CSS, Contentful",
          description:
            "This site: a Next.js App Router portfolio and blog. Posts are authored either as local MDX or in Contentful, rendered through a shared pipeline, with JSON-LD structured data and a generated sitemap for search engines.",
          highlights: [
            "Next.js App Router with server-rendered metadata per route",
            "Dual content sources: local MDX alongside Contentful-hosted posts",
            "JSON-LD structured data and generated sitemaps for SEO",
          ],
          link: "https://github.com/evwillow/personalSite",
          linkText: "View on GitHub",
          tags: ["Next.js", "React", "Tailwind CSS", "Contentful", "MDX", "SEO"],
        },
      ],
    },
  ]

  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 my-12">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-light mb-6">
            Projects
          </h1>
          <div className="h-1 w-20 bg-accent mb-8"></div>
          <p className="text-xl md:text-2xl text-dark/80 dark:text-light/80 leading-relaxed">
            A portfolio of quantitative trading systems, machine learning models, and fullstack applications that demonstrate professional-grade engineering and measurable impact.
          </p>
        </section>

        {sections.map((section) => (
          <section key={section.heading} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
              {section.heading}
            </h2>

            <div className="space-y-8">
              {section.projects.map((project, index) => (
                <article
                  key={index}
                  className="bg-white dark:bg-dark shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-accentDark/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-2xl md:text-3xl font-bold text-dark dark:text-light">
                              {project.title}
                            </h3>
                            {project.privateRepo && (
                              <span className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide bg-gray-100 dark:bg-gray-800 text-dark/70 dark:text-light/70 border border-gray-200 dark:border-gray-700">
                                Private repository
                              </span>
                            )}
                          </div>
                          <p className="text-dark/70 dark:text-light/70 font-medium mb-4">{project.subtitle}</p>
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-accent text-dark rounded-lg hover:bg-accent/90 transition-colors font-medium mt-4 lg:mt-0 whitespace-nowrap"
                          >
                            {project.linkText}
                          </a>
                        )}
                      </div>

                      <p className="text-lg text-dark/80 dark:text-light/80 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {project.highlights && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-dark dark:text-light mb-3">
                            Key Highlights
                          </h4>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-dark/60 dark:text-light/60 mr-2 mt-1">▸</span>
                                <span className="text-dark/80 dark:text-light/80">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => {
                          const keyTags = ["ML", "Finance", "Python", "LSTM", "Next.js", "Supabase", "Trading"];
                          const isKeyTag = keyTags.includes(tag);
                          return (
                            <span
                              key={tag}
                              className={`px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 ${
                                isKeyTag ? "text-accent" : "text-dark dark:text-light"
                              }`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {project.image && (
                      <div className="flex-shrink-0 mt-6 lg:mt-0 lg:w-[550px] h-[380px] overflow-hidden rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-800">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={550}
                          height={380}
                          className="w-full h-full object-cover"
                          unoptimized
                          style={{ objectFit: 'cover', objectPosition: 'center 70%', imageRendering: 'auto' }}
                        />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <section className="bg-white dark:bg-dark rounded-2xl p-8 md:p-12 text-center border-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            Let's Build Something
          </h2>
          <p className="text-lg md:text-xl text-dark/80 dark:text-light/80 mb-8 leading-relaxed max-w-3xl mx-auto">
            Open to projects, research collaborations, and innovative work in AI, finance, and technology. If you're building something that matters, I want to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-accent text-dark rounded-lg hover:bg-accent/90 transition-colors font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Get in Touch
            </Link>
            <a
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-dark dark:bg-light text-light dark:text-dark rounded-lg hover:bg-dark/90 dark:hover:bg-light/90 transition-colors font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              View GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

