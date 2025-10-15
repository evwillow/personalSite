import siteMetadata from "@/src/utils/siteMetaData"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Projects",
  description: `Explore ${siteMetadata.author}'s portfolio of quantitative trading systems, ML models, and fullstack applications.`,
}

export default function Projects() {
  const projects = [
    {
      title: "Breakout Study Tool",
      subtitle: "Next.js, TypeScript, yfinance, Supabase",
      description: "Built a web app for studying breakout patterns across ~10,000 tickers using yfinance + pandas, with a Next.js/TypeScript front end. Scans multiple timeframes (intraday 1/5/15 min & 1h, plus daily/weekly), adds chart overlays, notes, and simple up/down classifications.",
      highlights: [
        "Scans multiple timeframes (intraday 1/5/15 min & 1h, plus daily/weekly)",
        "Processes ~10,000 tickers using yfinance + pandas",
        "Deployed on DigitalOcean with Supabase Auth (admin/user) and storage via Google Drive/Supabase",
        "Used daily by me and my dad for pattern practice",
        "Built with Next.js/TypeScript front end"
      ],
      link: "https://trade.evwillow.com",
      linkText: "View Live Demo",
      tags: ["Next.js", "TypeScript", "yfinance", "pandas", "Supabase", "DigitalOcean"]
    },
    {
      title: "Live Intraday Scanner",
      subtitle: "Thinkorswim + JavaScript",
      description: "Wrote a JS pipeline that feeds custom scans into Thinkorswim watchlists for real-time candidates; notably surfaced CLSK ahead of a breakout for discretionary review.",
      highlights: [
        "JavaScript pipeline for real-time market scanning",
        "Custom scans into Thinkorswim watchlists",
        "Notably surfaced CLSK ahead of a breakout for discretionary review",
        "Real-time candidate identification"
      ],
      link: siteMetadata.github,
      linkText: "View on GitHub",
      tags: ["JavaScript", "Thinkorswim", "Trading", "Real-time"]
    },
    {
      title: "Job-Opportunity Scraper",
      subtitle: "Python, LinkedIn, Greenhouse, Indeed",
      description: "Aggregates roles from LinkedIn, Greenhouse, and Indeed into CSV for targeted applications; handles 'thousands' of U.S. postings with filters/keywords to speed search and triage.",
      highlights: [
        "Aggregates roles from LinkedIn, Greenhouse, and Indeed into CSV",
        "Handles 'thousands' of U.S. postings with filters/keywords",
        "Speeds search and triage for targeted applications",
        "Automated job opportunity discovery"
      ],
      link: siteMetadata.github,
      linkText: "View on GitHub",
      tags: ["Python", "Web Scraping", "LinkedIn", "Greenhouse", "Indeed"]
    },
    {
      title: "Cat-vs-Dog Classifier",
      subtitle: "TensorFlow, Local GPU",
      description: "Collaboratively trained a CNN on a local GPU to classify images with solid accuracy; managed compute usage (batch sizing/runtime) to run reliably on limited VRAM—giving hands-on experience with GPU workflow basics.",
      highlights: [
        "Collaboratively trained a CNN on a local GPU",
        "Classified images with solid accuracy",
        "Managed compute usage (batch sizing/runtime) to run reliably on limited VRAM",
        "Hands-on experience with GPU workflow basics"
      ],
      link: siteMetadata.github,
      linkText: "View on GitHub",
      tags: ["TensorFlow", "CNN", "GPU", "Machine Learning", "Computer Vision"]
    }
  ]

  const academicProjects = [
    {
      title: "CS 61B Data Structures",
      description: "Implemented ArrayDeque and LinkedListDeque (circular sentinel), BSTMap, and project features (iterators, equals, toString, resizing). Wrote JUnit tests and analyzed runtime; explored how maps/queues can model basic order-book mechanics.",
      tags: ["Java", "Algorithms", "Data Structures", "JUnit"]
    },
    {
      title: "Self-Directed AI/ML Coursework",
      description: "Completed practical courses covering tensors & autograd, nn.Module, DataLoaders, training/evaluation loops, overfitting control (regularization/early stopping), and basic model types (MLP/CNN); used NumPy/Pandas for preprocessing and small applied exercises.",
      tags: ["PyTorch", "TensorFlow", "NumPy", "Pandas", "Machine Learning"]
    },
    {
      title: "Supplemental Online Study",
      description: "Python & backend fundamentals, plus quantitative topics (stochastic processes, numerical optimization, introductory quantitative finance) with small practice projects.",
      tags: ["Python", "Backend", "Optimization", "Finance", "Stochastic Processes"]
    }
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

        {/* Independent Projects */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
            Independent Projects
          </h2>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <article
                key={index}
                className="bg-white dark:bg-dark shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-accentDark/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-dark dark:text-light mb-2">
                          {project.title}
                        </h3>
                        <p className="text-dark/70 dark:text-light/70 font-medium mb-4">{project.subtitle}</p>
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-accent text-dark rounded-lg hover:bg-accent/90 transition-colors font-medium mt-4 lg:mt-0"
                        >
                          {project.linkText}
                        </a>
                      )}
                    </div>

                    <p className="text-lg text-dark/80 dark:text-light/80 mb-6 leading-relaxed">
                      {project.description}
                    </p>

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

        {/* Academic Projects */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
            Academic Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50"
              >
                <h3 className="text-xl font-bold text-dark dark:text-light mb-3">
                  {project.title}
                </h3>
                <p className="text-dark/80 dark:text-light/80 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => {
                    const keyTags = ["Java", "Python"];
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
            ))}
          </div>
        </section>

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

