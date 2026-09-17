import siteMetadata from "@/src/utils/siteMetaData"
import Image from "next/image"

export const metadata = {
  title: "About | Evan Maus",
  description: `Learn more about ${siteMetadata.author}, a UC Berkeley student pursuing a dual Bachelor of Arts in Economics and Data Science. Full-stack developer, quantitative researcher, and entrepreneur building at the intersection of AI, finance, and sustainability.`,
  keywords: "Evan Maus, UC Berkeley student, Economics Data Science, full stack developer, Berkeley student, Berkeley Economics, Berkeley Data Science",
}

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 my-12">
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
                I'm <span className="font-semibold text-dark dark:text-light">Evan Maus</span>, a student at UC Berkeley pursuing a dual Bachelor of Arts in Data Science & Economics, graduating December 2026. I'm a full-stack engineer building fast, reliable applications with TypeScript, Next.js, Python, and PostgreSQL. I founded breakouts.trade, shipped it to 458 signups, and run the trading robot behind it on a real-money account.
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
                  Dual B.A. Data Science & Economics
                </p>
              </div>
              <div className="text-lg text-dark/60 dark:text-light/60 mt-4 md:mt-0">
                Graduating: December 2026
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-dark dark:text-light mb-3">
                Relevant Coursework
              </h4>
              <ul className="list-disc list-inside text-dark/80 dark:text-light/80 space-y-2">
                <li>Data Structures (CS 61B)</li>
                <li>Structure and Interpretation of Computer Programs (CS 61A)</li>
                <li>Artificial Intelligence (CS 188)</li>
                <li>Principles &amp; Techniques of Data Science (Data C100)</li>
                <li>Probability for Data Science (Data C140)</li>
                <li>Linear Algebra (Math 56)</li>
                <li>Econometrics (Econ 140)</li>
                <li>Econometrics: Advanced Methods (Econ 143)</li>
                <li>Behavioral Finance (UGBA 136F)</li>
                <li>Microeconomics (Econ 100A) and Macroeconomics (Econ 100B)</li>
                <li>In progress, Fall 2026: Data, Inference and Decisions (Data C102); Data Mining and Analytics (Data 144); Time Series (Stat 153); Asset Pricing and Portfolio Choice (Econ 139); Macroeconomic Policy (Econ 134)</li>
              </ul>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-dark dark:text-light mb-3">
                Coursework Projects & Self-Study
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold text-dark dark:text-light">
                    Build Your Own World (CS 61B, Java)
                  </h5>
                  <p className="text-dark/80 dark:text-light/80">
                    A three-person course project: I wrote the procedural world generator, the main menu, the state management and the save-and-replay feature, with JUnit tests. Course labs covered balanced binary search trees, union-find (percolation with the backwash fix), hashing, heaps and graph search.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-dark dark:text-light">
                    Artificial Intelligence projects (CS 188, Python and PyTorch)
                  </h5>
                  <p className="text-dark/80 dark:text-light/80">
                    Five course projects on a provided skeleton: graph search, adversarial search with alpha-beta pruning, value iteration and Q-learning, Bayes-net and hidden-Markov inference with particle filtering, and PyTorch models including a recurrent language classifier and a hand-written causal self-attention block.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-dark dark:text-light">
                    Pre-registered quantile-regression study (Econ 143)
                  </h5>
                  <p className="text-dark/80 dark:text-light/80">
                    Locked the hypothesis in a timestamped commit before the estimator ran, then reported the null as it came, with a bootstrap interval and a shuffled-label placebo. Code and write-up at github.com/evwillow/econ143-project.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-dark dark:text-light">
                    Self-Directed AI/ML Coursework
                  </h5>
                  <p className="text-dark/80 dark:text-light/80">
                    Completed practical courses covering tensors &amp; autograd, nn.Module, DataLoaders, training/evaluation loops, overfitting control (regularization/early stopping), and basic model types (MLP/CNN); used NumPy/Pandas for preprocessing and small applied exercises.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-dark dark:text-light">
                    Supplemental Online Study
                  </h5>
                  <p className="text-dark/80 dark:text-light/80">
                    Python &amp; backend fundamentals, plus quantitative topics (stochastic processes, numerical optimization, introductory quantitative finance) with small practice projects.
                  </p>
                </div>
              </div>
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
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "Java", "C", "JavaScript", "SQL", "HTML/CSS"].map((skill) => {
                  const keySkills = ["Python", "JavaScript", "Java"];
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
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Node.js", "Tailwind CSS", "FastAPI", "pandas", "NumPy", "TensorFlow", "PyTorch", "Recharts", "JUnit"].map((skill) => {
                  const keySkills = ["React", "Next.js", "pandas", "NumPy", "TensorFlow", "PyTorch"];
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
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {["Linux", "systemd", "Git & GitHub", "GitHub Actions", "SSH", "DigitalOcean", "Supabase", "PostgreSQL", "DuckDB", "Parquet"].map((skill) => (
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
                <li><span className="font-semibold text-dark dark:text-light">English:</span> Native</li>
                <li><span className="font-semibold text-dark dark:text-light">Spanish:</span> Advanced (near-fluent) — speaking, reading, writing</li>
                <li><span className="font-semibold text-dark dark:text-light">Chinese:</span> Conversational; actively studying for professional use</li>
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
                  President, Student Climate Action Team
                </h3>
                <span className="text-dark/60 dark:text-light/60 text-sm mt-2 md:mt-0">
                  Oct 2022 - Sep 2023
                </span>
              </div>
              <ul className="list-disc list-inside text-dark/80 dark:text-light/80 space-y-2">
                <li>Led a student-run environmental group, coordinating strategy, events, and community partnerships</li>
                <li>Started the organization and grew it to 20 active members through outreach and leadership</li>
                <li>Built the website from scratch to centralize events, announcements, and volunteer sign-ups</li>
                <li>Eagle Scout: led 100 volunteers on a community trail expansion project</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-white dark:bg-dark rounded-2xl p-8 md:p-12 text-center border-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-6">
            My Mission
          </h2>
          <p className="text-lg md:text-xl text-dark/80 dark:text-light/80 leading-relaxed mb-8 max-w-4xl mx-auto">
            I am building a career at the intersection of AI, finance, and sustainability, leveraging data-driven methods to create scalable solutions with global impact. My interests span full-stack engineering, data pipelines, applied ML (PyTorch/TensorFlow), market-data tools, climate software, and product-led entrepreneurship.
          </p>
          <a
            href="/Evan_Maus_Resume.pdf"
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

