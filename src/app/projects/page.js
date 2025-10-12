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
      title: "Quantitative Trading System",
      subtitle: "Next.js, TypeScript, Reinforcement Learning",
      description: "Engineered a breakout pattern analysis tool that processed and analyzed 100,000+ samples across multiple timeframes. Applied reinforcement learning to outperform benchmarks, delivering 40%+ simulated returns on 20 years of backtests—performance rivaling hedge-fund quant systems.",
      highlights: [
        "Processed 100,000+ market samples across multiple timeframes",
        "Applied reinforcement learning for pattern recognition",
        "Achieved 40%+ simulated returns on 20-year backtests",
        "Led peer collaboration on GitHub with code reviews and mentoring",
        "Demonstrated performance comparable to institutional systems"
      ],
      link: "https://trade.evwillow.com",
      linkText: "View Live Demo",
      tags: ["Next.js", "TypeScript", "ML", "Finance", "Trading"]
    },
    {
      title: "Quantitative Risk Analysis Model",
      subtitle: "Python, LSTM, Wharton Research Data Services",
      description: "Built an LSTM-based stock prediction model integrating Value-at-Risk (VaR) and volatility metrics on a 10,000-stock dataset. Engineered advanced indicators and stress-testing tools that produce professional-grade risk-adjusted scanners.",
      highlights: [
        "LSTM neural network for stock prediction",
        "Integrated Value-at-Risk (VaR) and volatility metrics",
        "Analyzed 10,000-stock dataset",
        "Developed stress-testing tools with WRDS data",
        "Published full pipeline and documentation on GitHub"
      ],
      link: siteMetadata.github,
      linkText: "View on GitHub",
      tags: ["Python", "LSTM", "Risk Analysis", "VaR", "Finance"]
    },
    {
      title: "Client Web Applications",
      subtitle: "Next.js, Supabase, Market APIs",
      description: "Built high-performance websites with Next.js and Supabase, integrating market APIs and advanced data visualizations. Implemented optimized database queries and scalable backend logic that tripled client traffic (200-300% growth).",
      highlights: [
        "Fullstack development with Next.js and Supabase",
        "Integrated real-time market APIs",
        "Advanced data visualizations with interactive charts",
        "Optimized database queries for performance",
        "Tripled client traffic (200-300% growth)",
        "Led projects from design to deployment"
      ],
      image: "/PollinatorPathways.gif",
      tags: ["Next.js", "Supabase", "APIs", "Fullstack", "Performance"]
    },
    {
      title: "Productivity Optimization Tool",
      subtitle: "Java, Google APIs, Automation",
      description: "Designed and deployed a Java-based tool integrating Google Sheets and Google Calendar for automated task ranking and prioritization. Increased efficiency by ~20% and was adopted by peers for workflow optimization.",
      highlights: [
        "Automated task ranking and prioritization",
        "Google Sheets and Calendar integration",
        "Increased efficiency by ~20%",
        "Adopted by peers for workflow optimization",
        "Demonstrated practical impact on productivity"
      ],
      link: siteMetadata.github,
      linkText: "View on GitHub",
      tags: ["Java", "Automation", "APIs", "Productivity"]
    }
  ]

  const academicProjects = [
    {
      title: "CS 61B Data Structures",
      description: "Engineered advanced data structures and graph algorithms in Java that outperform typical coursework, directly applicable to high-frequency trading system design and order-book management.",
      tags: ["Java", "Algorithms", "Data Structures"]
    },
    {
      title: "Self-Directed Learning",
      description: "Mastered Python, backend systems, and data structures through online courses, while self-directing into stochastic processes, numerical optimization, and quantitative finance at a professional level.",
      tags: ["Python", "Backend", "Optimization", "Finance"]
    }
  ]

  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 py-12">
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
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark/50 dark:to-dark/80 rounded-2xl p-8 md:p-12 text-center border-2 border-gray-100 dark:border-gray-800">
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

