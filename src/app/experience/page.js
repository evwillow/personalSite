import siteMetadata from "@/src/utils/siteMetaData"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Experience | Evan Maus",
  description: `${siteMetadata.author}'s professional experience as a founder and full-stack engineer: breakouts.trade and its trading robot, LLM energy research, and two nonprofit sites.`,
  keywords: "Evan Maus experience, full stack developer, founder, quantitative research, Next.js developer, Berkeley student experience",
}

export default function Experience() {
  const professionalExperiences = [
    {
      title: "Founder & Engineer",
      company: "breakouts.trade",
      location: "Berkeley, CA",
      period: "Feb 2025 – Present",
      description: "Founder and sole engineer of breakouts.trade, a stock-breakout practice app and automated trading system, as the repositories' only contributor.",
      achievements: [
        "Built a browser drill app for breakout patterns and a daily scanner on the same strategy code: 458 signups, ~240 activated users, over 7,500 practice drills by other users",
        "Wrote 23 SQL migrations with no ORM, ran type-check, lint, tests and build on every pull request, and fixed and re-verified a pre-auth account-takeover flaw from a static review of 67 route handlers",
        "Shipped an LLM trade breakdown in June 2026, later cut to one premium-gated sentence per setup, at temperature 0, with schema-validated JSON and a deterministic server fallback on four failure modes",
        "Shipped an Interactive Brokers robot that traded real money from June to October 2026 under systemd, with a kill switch and five-minute broker reconciliation, and shut it off when a minute replay exposed a backtest lookahead",
        "Found server-to-server cron jobs failing silently for three days, made the failure loud, wrote a stopgap, and traced the 403s to Cloudflare Bot Fight Mode"
      ],
      technologies: ["Next.js", "TypeScript", "React", "Python", "PostgreSQL", "Supabase", "GitHub Actions", "systemd"]
    },
    {
      title: "AI Infrastructure Researcher",
      company: "LLM Energy Benchmark",
      location: "Berkeley, CA",
      period: "Aug 2025 – Oct 2025",
      description: "Initiated and built a measurement pipeline for the energy cost of LLM API usage, ingesting and cleaning large conversation datasets, replaying the extracted prompts against several hosted models, and recording power draw with CodeCarbon while engineering 30+ linguistic features per prompt.",
      achievements: [
        "Measurement scope: the CodeCarbon tracker runs on the local client during each remote API call, so it captures client-side power draw across the request window, not provider-side inference energy, which these APIs do not expose",
        "Result was null: across 20,709 measured API calls spanning three models, no prompt characteristic predicted client-side energy, with the strongest correlation at r = 0.027 (prompt length in characters)",
        "Request duration dominated the measurement (r = 0.44), which is the expected behavior for a client-side tracker and explains the absent prompt-feature signal",
        "The negative result runs against the project's original hypothesis and is reported as such"
      ],
      technologies: ["Python", "CodeCarbon", "NLP", "Machine Learning", "Data Analysis", "Research"]
    },
    {
      title: "Full-Stack Developer",
      company: "North Central Ohio Pollinator Pathway & Sustainable Delaware Ohio",
      location: "Columbus, OH",
      period: "Dec 2023 – Jul 2024",
      description: "Built websites for two environmental nonprofits as the sole developer.",
      achievements: [
        "Built both sites alone and made the technical calls with owners who were not technical",
        "Handed both sites off in May 2024, supported the owners through July, and both have run on their own since"
      ],
      technologies: []
    },
    {
      title: "Data & Product Intern",
      company: "necoTECH",
      location: "Columbus, OH",
      period: "May 2023 – Sep 2023",
      description: "Worked as a Data & Product Intern focused on identifying and solving real business problems through scripting, internal tools, and process improvement.",
      achievements: [
        "Automated lead tracking in Python and cleaned proposal data, consolidating CRM, proposal and marketing workflows across three teams",
        "Surveyed several hundred US federal contracts and funding applications with pandas"
      ],
      technologies: ["Python", "Pandas", "Data Analysis", "Process Automation", "CRM"]
    },
  ]

  const leadershipExperiences = [
    {
      title: "President",
      company: "Student Climate Action Team",
      location: "Delaware, OH",
      period: "Oct 2022 – Sep 2023",
      description: "Founded a student-run environmental group and grew it to 20 members.",
      achievements: [
        "Founded the organization and grew it to 20 members",
        "Eagle Scout: led 100 volunteers on a community trail expansion (Oct 2023)"
      ],
      technologies: ["Community Organizing", "Leadership"]
    }
  ]

  const researchExperiences = []

  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 my-12">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-light mb-6">
            Experience
          </h1>
          <div className="h-1 w-20 bg-accent mb-8"></div>
          <p className="text-xl md:text-2xl text-dark/80 dark:text-light/80 leading-relaxed">
            Full-stack engineering experience building fast, reliable applications with TypeScript, Next.js, Python, and PostgreSQL. Software with 458 signups and a trading robot that traded real money from June to October 2026, built end to end as the only contributor.
          </p>
        </section>

        {/* Professional Experience */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
            Professional Experience
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30"></div>
            <div className="space-y-12">
              {professionalExperiences.map((experience, index) => (
                <article
                  key={index}
                  className="relative bg-white dark:bg-dark shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-accentDark/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 md:ml-20"
                >
                  <div className="hidden md:block absolute -left-[52px] top-8 w-4 h-4 bg-accent rounded-full border-4 border-light dark:border-dark"></div>

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-dark dark:text-light mb-2">
                        {experience.title}
                      </h3>
                      <h4 className="text-xl text-dark/80 dark:text-light/80 font-semibold mb-1">
                        {experience.company}
                      </h4>
                      <p className="text-dark/60 dark:text-light/60">
                        {experience.location}
                      </p>
                    </div>
                    <div className="text-dark/70 dark:text-light/70 font-medium mt-4 lg:mt-0 lg:text-right">
                      {experience.period}
                    </div>
                  </div>

                  <p className="text-lg text-dark/80 dark:text-light/80 mb-6 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-dark dark:text-light mb-3">
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-dark/60 dark:text-light/60 mr-2 mt-1 flex-shrink-0">▸</span>
                          <span className="text-dark/80 dark:text-light/80">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {experience.technologies.length > 0 && (
                    <div>
                      <h5 className="text-lg font-semibold text-dark dark:text-light mb-3">
                        Technologies Used
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => {
                          const keyTechs = ["Next.js", "React", "Python", "Pandas", "JavaScript", "TypeScript"];
                          const isKeyTech = keyTechs.includes(tech);
                          return (
                            <span
                              key={tech}
                              className={`px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 ${
                                isKeyTech ? "text-accentText dark:text-accent" : "text-dark dark:text-light"
                              }`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>


        {/* Leadership Experience */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
            Leadership & Community Impact
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30"></div>
            <div className="space-y-12">
              {leadershipExperiences.map((experience, index) => (
                <article
                  key={index}
                  className="relative bg-white dark:bg-dark shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-accentDark/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 md:ml-20"
                >
                  <div className="hidden md:block absolute -left-[52px] top-8 w-4 h-4 bg-accent rounded-full border-4 border-light dark:border-dark"></div>

                  <div className="flex flex-col lg:flex-row lg:gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-dark dark:text-light mb-2">
                            {experience.title}
                          </h3>
                          <h4 className="text-xl text-dark/80 dark:text-light/80 font-semibold mb-1">
                            {experience.company}
                          </h4>
                          <p className="text-dark/60 dark:text-light/60">
                            {experience.location}
                          </p>
                        </div>
                        <div className="text-dark/70 dark:text-light/70 font-medium mt-4 lg:mt-0 lg:text-right">
                          {experience.period}
                        </div>
                      </div>

                      <p className="text-lg text-dark/80 dark:text-light/80 mb-6 leading-relaxed">
                        {experience.description}
                      </p>

                      <div className="mb-6">
                        <h5 className="text-lg font-semibold text-dark dark:text-light mb-3">
                          Key Achievements
                        </h5>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-dark/60 dark:text-light/60 mr-2 mt-1 flex-shrink-0">▸</span>
                              <span className="text-dark/80 dark:text-light/80">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {experience.technologies.length > 0 && (
                        <div>
                          <h5 className="text-lg font-semibold text-dark dark:text-light mb-3">
                            Skills Applied
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => {
                              const keyTechs = ["Next.js", "React", "Python", "Pandas", "JavaScript", "TypeScript"];
                              const isKeyTech = keyTechs.includes(tech);
                              return (
                                <span
                                  key={tech}
                                  className={`px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 ${
                                    isKeyTech ? "text-accentText dark:text-accent" : "text-dark dark:text-light"
                                  }`}
                                >
                                  {tech}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {experience.image && (
                      <div className="flex-shrink-0 mt-6 lg:mt-0">
                        <Image
                          src={experience.image}
                          alt={`${experience.title} - ${experience.company}`}
                          width={280}
                          height={210}
                          className="rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-800"
                        />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Overview */}
        <section className="mt-16 bg-white dark:bg-dark rounded-2xl p-8 md:p-12 border-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Development</h3>
              <ul className="space-y-2 text-dark/80 dark:text-light/80">
                <li>• Fullstack Web Development</li>
                <li>• Backend Architecture</li>
                <li>• API Integration</li>
                <li>• Database Optimization</li>
                <li>• Performance Engineering</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Data & ML</h3>
              <ul className="space-y-2 text-dark/80 dark:text-light/80">
                <li>• Machine Learning</li>
                <li>• Data Analysis</li>
                <li>• Statistical Modeling</li>
                <li>• Risk Analysis</li>
                <li>• Quantitative Research</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Business</h3>
              <ul className="space-y-2 text-dark/80 dark:text-light/80">
                <li>• Process Automation</li>
                <li>• Strategic Analysis</li>
                <li>• Client Management</li>
                <li>• Product Lifecycle</li>
                <li>• Data-Driven Decisions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-white dark:bg-dark rounded-2xl p-8 md:p-12 text-center border-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg md:text-xl text-dark/80 dark:text-light/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            I&apos;m actively seeking opportunities in full-stack engineering, AI/ML research, and production software development. I have built and run a product end to end, from the web app to the trading robot behind it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/Evan_Maus_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-16 py-6 bg-gradient-to-r from-accent to-accent/80 text-dark rounded-xl hover:from-accent/90 hover:to-accent/70 transition-all duration-300 font-bold text-xl sm:text-2xl shadow-2xl hover:shadow-accent/50 transform hover:scale-105 border-2 border-accent/20 text-center"
            >
              View Full Resume
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-16 py-6 bg-dark dark:bg-light text-light dark:text-dark rounded-xl hover:bg-dark/90 dark:hover:bg-light/90 transition-colors font-bold text-xl sm:text-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

