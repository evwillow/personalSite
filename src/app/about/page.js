import siteMetadata from "@/src/utils/siteMetaData"
import Image from "next/image"

export const metadata = {
  title: "About",
  description: `Learn more about ${siteMetadata.author}, a UC Berkeley student majoring in Economics & Data Science with a focus on AI, quantitative finance, and sustainable technology.`,
}

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 py-12">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-start md:gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-light mb-6">
                About Me
              </h1>
              <div className="h-1 w-20 bg-accent mb-8"></div>
              <p className="text-xl md:text-2xl text-dark/80 dark:text-light/80 leading-relaxed mb-8 md:mb-0">
                I'm <span className="font-semibold text-dark dark:text-light">Evan Maus</span>, a student at UC Berkeley majoring in Economics and Data Science with a minor in Computer Science. I'm passionate about building solutions at the intersection of AI, finance, and sustainability.
              </p>
            </div>
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Image
                src="/headshot.jpg"
                alt="Evan Maus"
                width={220}
                height={220}
                className="rounded-2xl object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16 bg-white dark:bg-dark shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-accentDark/50">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            Education
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-dark dark:text-light">
                  University of California, Berkeley
                </h3>
                <p className="text-lg text-dark/70 dark:text-light/70 mt-2">
                  B.A. Economics and Data Science
                </p>
                <p className="text-lg text-dark/70 dark:text-light/70">
                  Minor in Computer Science
                </p>
              </div>
              <div className="text-lg text-dark/60 dark:text-light/60 mt-4 md:mt-0">
                Graduating: May 2027
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-dark dark:text-light mb-3">
                Relevant Coursework
              </h4>
              <ul className="list-disc list-inside text-dark/80 dark:text-light/80 space-y-2">
                <li>Data Structures (CS61B)</li>
                <li>Econometrics</li>
                <li>Probability & Statistical Modeling</li>
                <li>Planned: AI, Game Theory, Upper-Division CS/DS</li>
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-dark dark:text-light mb-3">
                Research
              </h4>
              <p className="text-dark/80 dark:text-light/80">
                ML-based trading research focusing on returns forecasting, factor models, and portfolio optimization using market and alternative data.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-dark dark:text-light mb-3">
                Campus Involvement
              </h4>
              <ul className="list-disc list-inside text-dark/80 dark:text-light/80 space-y-2">
                <li>Berkeley Computer Science Association (CSA)</li>
                <li>Undergraduate Economics Association (UEA)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50">
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Expert</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "JavaScript", "SQL", "C++", "Next.js", "Node.js", "React", "Tailwind", "Git/GitHub"].map((skill) => {
                  const keySkills = ["Python", "JavaScript", "Next.js", "React"];
                  const isKeySkill = keySkills.includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 ${
                        isKeySkill ? "text-accent" : "text-dark dark:text-light"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50">
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Data & ML</h3>
              <div className="flex flex-wrap gap-2">
                {["Pandas", "NumPy", "Matplotlib", "Seaborn", "JUnit", "Optimization", "Machine Learning", "Data Analysis"].map((skill) => {
                  const keySkills = ["Machine Learning", "Data Analysis", "Pandas"];
                  const isKeySkill = keySkills.includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 ${
                        isKeySkill ? "text-accent" : "text-dark dark:text-light"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50">
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Working Knowledge</h3>
              <div className="flex flex-wrap gap-2">
                {["Docker", "Linux", "Scipy"].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-dark dark:text-light rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50">
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Languages</h3>
              <ul className="space-y-2 text-dark/80 dark:text-light/80">
                <li><span className="font-semibold text-dark dark:text-light">English:</span> Native proficiency</li>
                <li><span className="font-semibold text-dark dark:text-light">Spanish:</span> Near-fluent</li>
                <li><span className="font-semibold text-dark dark:text-light">Chinese:</span> Conversational</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-16 bg-white dark:bg-dark shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-accentDark/50">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            Leadership & Activities
          </h2>
          
          <div className="space-y-8">
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-2xl font-semibold text-dark dark:text-light">
                  Founder & President, Student Climate Action Team
                </h3>
                <span className="text-dark/60 dark:text-light/60 text-sm mt-2 md:mt-0">
                  Jan 2023 - Aug 2024
                </span>
              </div>
              <ul className="list-disc list-inside text-dark/80 dark:text-light/80 space-y-2">
                <li>Founded and scaled a 15-member organization with 10 active volunteers</li>
                <li>Mobilized 50-100+ participants per event</li>
                <li>Partnered with NGOs, city council, and universities to launch renewable program cutting household CO₂ emissions ~10% across 10,000 homes</li>
                <li>Built and managed team website to expand outreach</li>
                <li>Recognized by city council and invited to present projects influencing renewable energy policy</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-2xl font-semibold text-dark dark:text-light">
                  Eagle Scout
                </h3>
                <span className="text-dark/60 dark:text-light/60 text-sm mt-2 md:mt-0">
                  October 2023
                </span>
              </div>
              <p className="text-dark/80 dark:text-light/80">
                Directed 50 volunteers over 5 months to construct a 20-acre environmental education park with 2 miles of trails.
              </p>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-2xl font-semibold text-dark dark:text-light">
                  Global Scholar Diploma
                </h3>
                <span className="text-dark/60 dark:text-light/60 text-sm mt-2 md:mt-0">
                  April 2023
                </span>
              </div>
              <p className="text-dark/80 dark:text-light/80">
                Columbus Council on World Affairs capstone-based global competency program with seminars and final project in international affairs and economics.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark/50 dark:to-dark/80 rounded-2xl p-8 md:p-12 text-center border-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            My Mission
          </h2>
          <p className="text-lg md:text-xl text-dark/80 dark:text-light/80 leading-relaxed mb-8 max-w-4xl mx-auto">
            I am building a career at the intersection of AI, finance, and sustainability, leveraging data-driven methods to create scalable solutions with global impact. My interests span technology, finance, climate, entrepreneurship, and data—not as hobbies, but as domains I'm actively shaping.
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-16 py-6 bg-gradient-to-r from-accent to-accent/80 text-dark rounded-xl hover:from-accent/90 hover:to-accent/70 transition-all duration-300 font-bold text-2xl shadow-2xl hover:shadow-accent/50 transform hover:scale-105 border-2 border-accent/20"
          >
            View Full Resume
          </a>
        </section>
      </div>
    </main>
  )
}

