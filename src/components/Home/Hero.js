import Link from "next/link"
import { HERO_LINES } from "./heroCopy"

export const RESUME_PDF = "/Evan_Maus_Resume.pdf"

const Hero = () => {
  const [headline, evidence] = HERO_LINES

  return (
    <section className="w-full px-5 sm:px-10 md:px-24 lg:px-32 mt-12 md:mt-20 mb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-dark dark:text-light leading-tight mb-6">
          {headline}
        </h1>
        <div className="h-1 w-20 bg-accent mb-6"></div>
        <p className="text-lg md:text-2xl text-dark/80 dark:text-light/80 leading-relaxed mb-8">
          {evidence}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-dark text-light dark:bg-light dark:text-dark px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Resume (PDF)
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <Link
            href="/experience"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold border-2 border-dark/20 dark:border-light/30 text-dark dark:text-light hover:border-accent transition-colors"
          >
            Experience
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
