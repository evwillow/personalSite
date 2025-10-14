import siteMetadata from "@/src/utils/siteMetaData"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Experience",
  description: `${siteMetadata.author}'s professional experience in fullstack development, quantitative research, and sustainable technology.`,
}

export default function Experience() {
  const professionalExperiences = [
    {
      title: "Full stack developer (Freelance)",
      company: "Independent",
      location: "Remote",
      period: "January 2024 - Present",
      description: "Shipped three client projects end-to-end using Next.js with TypeScript; worked directly with stakeholders from scope to launch.",
      achievements: [
        "Shipped three client projects end-to-end using Next.js with TypeScript; worked directly with stakeholders from scope to launch",
        "Implemented authentication where needed and integrated analytics APIs to monitor usage and guide content updates",
        "Optimized for performance, accessibility, and reliability; containerized with Docker and deployed/maintained on DigitalOcean with GitHub for source control",
        "Delivered real outcomes: built and launched a paid site for an environmental nonprofit that now actively serves community visitors (example: northcentralohiopollinatorpathway.org)"
      ],
      technologies: ["Next.js", "TypeScript", "Docker", "DigitalOcean", "GitHub", "Authentication", "Analytics APIs"]
    },
    {
      title: "Intern",
      company: "necoTECH",
      location: "Delaware, OH",
      period: "May 2023 - September 2023",
      description: "Delivered a repeatable, company-wide process for consistent outreach and timely proposal prep, helping the team identify and pursue government contracts and partnerships.",
      achievements: [
        "Tracker: Centralized contract/lead management in a single Google Sheets/Excel pipeline; defined stages & ownership; added Apps Script dedupe/status nudges",
        "Strategy + mentorship: Co-developed the initial marketing playbook (social, networking, outreach templates) with founders and two mentors, including an experienced entrepreneur who coached me on startup ops, cash flow, and go-to-market",
        "Gov contracts: Built Python (pandas) scripts to surface/structure government procurement opportunities; cleaned/tagged opportunities and fed prioritized leads into the tracker",
        "Outcome: Delivered a repeatable, company-wide process for consistent outreach and timely proposal prep, helping the team identify and pursue government contracts and partnerships"
      ],
      technologies: ["Python", "Pandas", "Google Sheets", "Apps Script", "Data Analysis"]
    },
    {
      title: "Gallery Attendant",
      company: "BAMPFA, UC Berkeley",
      location: "Berkeley, CA",
      period: "August 2024 - November 2024",
      description: "Provided operational support at one of Berkeley's most prestigious art museums.",
      achievements: [
        "Entrusted with safeguarding high-value artwork and visitor safety",
        "Provided frontline operational support ensuring professional environment",
        "Ensured seamless guest experience in museum setting"
      ],
      technologies: []
    }
  ]

  const leadershipExperiences = [
    {
      title: "Founder and President",
      company: "Student Climate Action Team (SCAT)",
      location: "Delaware, OH",
      period: "January 2023 - August 2024",
      description: "Founded and led a 10-person team; organized ~30 policy-focused events (~30 attendees on average).",
      achievements: [
        "Founded and led a 10-person team; organized ~30 policy-focused events (~30 attendees on average)",
        "Partnered with Sustainable Delaware Ohio and campus groups to support outreach for a city policy projected to reach ~10,000 households (per city/NGO estimates)",
        "Built and maintained a lightweight React website to centralize resources and sign-ups",
        "Presented initiatives to City Council; work received local media coverage"
      ],
      technologies: ["React", "Web Development", "Community Organizing", "Policy Advocacy"]
    },
    {
      title: "Eagle Scout",
      company: "Schultz Elementary Environmental Project",
      location: "Delaware, OH",
      period: "October 2023",
      description: "Coordinated ~100 participants to extend woodland/trail access with signage and trail markers; managed ~$1,000 materials budget and stakeholder approvals (Board of Education, community partners).",
      achievements: [
        "Coordinated ~100 participants to extend woodland/trail access with signage and trail markers",
        "Managed ~$1,000 materials budget and stakeholder approvals (Board of Education, community partners)",
        "Demonstrated leadership, project management, and community service"
      ],
      technologies: [],
      image: "/prarieMap.jpg"
    }
  ]

  const researchExperiences = [
    {
      title: "Quantitative Research",
      company: "UC Berkeley - Independent Study",
      location: "Berkeley, CA",
      period: "September 2024 - Present",
      description: "Conducting ML-based trading research focusing on returns forecasting, factor models, and portfolio optimization.",
      achievements: [
        "Developing returns forecasting models using machine learning on market and alternative data",
        "Implementing factor models for systematic trading strategies",
        "Optimizing portfolio construction with risk-adjusted return metrics",
        "Processing and analyzing large-scale financial datasets",
        "Applying academic research to practical trading applications"
      ],
      technologies: ["Python", "Machine Learning", "Pandas", "NumPy", "Financial Modeling"]
    }
  ]

  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 py-12">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-light mb-6">
            Experience
          </h1>
          <div className="h-1 w-20 bg-accent mb-8"></div>
          <p className="text-xl md:text-2xl text-dark/80 dark:text-light/80 leading-relaxed">
            Comprehensive experience spanning professional development, quantitative research, and leadership initiatives with measurable impact across technology, finance, and sustainability sectors.
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
                                isKeyTech ? "text-accent" : "text-dark dark:text-light"
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

        {/* Research Experience */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
            Research Experience
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30"></div>
            <div className="space-y-12">
              {researchExperiences.map((experience, index) => (
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
                      Key Focus Areas
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
                                isKeyTech ? "text-accent" : "text-dark dark:text-light"
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
                                    isKeyTech ? "text-accent" : "text-dark dark:text-light"
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
        <section className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark/50 dark:to-dark/80 rounded-2xl p-8 md:p-12 border-2 border-gray-100 dark:border-gray-800">
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
        <section className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark/50 dark:to-dark/80 rounded-2xl p-8 md:p-12 text-center border-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl text-dark/80 dark:text-light/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            I'm actively seeking opportunities in quantitative finance, AI/ML research, and fullstack development. I bring proven experience delivering measurable results across technical projects, from optimizing systems to building production applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/resume.pdf"
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

