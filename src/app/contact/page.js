"use client"
import siteMetadata from "@/src/utils/siteMetaData"
import { useState } from "react"

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(siteMetadata.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 my-12">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-light mb-6">
            Let's Connect
          </h1>
          <div className="h-1 w-20 bg-accent mb-8"></div>
          <p className="text-xl md:text-2xl text-dark/80 dark:text-light/80 leading-relaxed">
            I'm always open to discussing new opportunities, research collaborations, or innovative projects in AI, finance, and technology.
          </p>
        </section>

        {/* Contact Information Cards */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <button
            onClick={copyEmail}
            className="bg-white/50 dark:bg-gray-900/50 shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 group text-left w-full cursor-pointer backdrop-blur-sm"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors">
                {copied ? (
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark dark:text-light mb-2 flex items-center gap-2">
                  Email
                  <span className="text-xs text-dark/60 dark:text-light/60 font-normal">
                    {copied ? "(Copied!)" : "(Click to copy)"}
                  </span>
                </h3>
                <p className="text-accent font-medium">{siteMetadata.email}</p>
                <p className="text-sm text-dark/60 dark:text-light/60 mt-2">
                  Best for professional inquiries
                </p>
              </div>
            </div>
          </button>

          {/* Location Card */}
          <div className="bg-white/50 dark:bg-gray-900/50 shadow-lg rounded-2xl p-8 border-2 border-gray-100 dark:border-gray-800 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">Location</h3>
                <p className="text-dark/80 dark:text-light/80 font-medium">{siteMetadata.location}</p>
                <p className="text-sm text-dark/60 dark:text-light/60 mt-2">
                  {siteMetadata.university}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8 text-center">
            Find Me Online
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* GitHub */}
            <a
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-dark dark:bg-light rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-light dark:text-dark"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">GitHub</h3>
              <p className="text-accent font-medium">@evwillow</p>
              <p className="text-sm text-dark/60 dark:text-light/60 mt-2">
                View my code and projects
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href={siteMetadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-[#0077B5] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">LinkedIn</h3>
              <p className="text-accent font-medium">@evwillow</p>
              <p className="text-sm text-dark/60 dark:text-light/60 mt-2">
                Connect professionally
              </p>
            </a>

            {/* X (Twitter) */}
            <a
              href={siteMetadata.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-dark shadow-lg rounded-2xl p-6 border-2 border-gray-100 dark:border-accentDark/50 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-dark dark:bg-light rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-light dark:text-dark"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-2">X (Twitter)</h3>
              <p className="text-accent font-medium">@evwillow1</p>
              <p className="text-sm text-dark/60 dark:text-light/60 mt-2">
                Follow for updates
              </p>
            </a>
          </div>
        </section>

        {/* Opportunities */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark/50 dark:to-dark/80 rounded-2xl p-8 md:p-12 border-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-8">
            What I'm Looking For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Internships & Jobs</h3>
              <ul className="space-y-2 text-dark/80 dark:text-light/80">
                <li>• Quantitative Trading & Research</li>
                <li>• AI/ML Engineering</li>
                <li>• Fullstack Development</li>
                <li>• Data Science & Analytics</li>
                <li>• Fintech Opportunities</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Collaborations</h3>
              <ul className="space-y-2 text-dark/80 dark:text-light/80">
                <li>• Research Projects</li>
                <li>• Open Source Contributions</li>
                <li>• Startup Ventures</li>
                <li>• Academic Partnerships</li>
                <li>• Speaking Opportunities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-16 py-6 bg-gradient-to-r from-accent to-accent/80 text-dark rounded-xl hover:from-accent/90 hover:to-accent/70 transition-all duration-300 font-bold text-xl sm:text-2xl shadow-2xl hover:shadow-accent/50 transform hover:scale-105 border-2 border-accent/20 text-center"
            >
              View Full Resume
            </a>
            <button
              onClick={copyEmail}
              className="w-full sm:w-auto px-16 py-6 bg-dark dark:bg-light text-light dark:text-dark rounded-xl hover:bg-dark/90 dark:hover:bg-light/90 transition-colors font-bold text-xl sm:text-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              {copied ? "Email Copied!" : "Copy Email"}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

