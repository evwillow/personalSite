import siteMetadata from "@/src/utils/siteMetaData"

export const metadata = {
  title: `Resume | ${siteMetadata.title}`,
  description: "Evan Willow Maus - Resume and professional experience",
  keywords: "resume, CV, professional experience, skills, portfolio",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/resume`
  }
}

export default function ResumePage() {
  return (
      <main className="min-h-screen bg-light dark:bg-dark">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-end justify-center mb-8">
            <h1 className="text-6xl font-bold text-dark dark:text-light mr-12">
              Resume
            </h1>
            <a
              href="/resume.pdf"
              download="resume.pdf"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium shadow-md hover:shadow-lg text-sm"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download
            </a>
          </div>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>

          {/* PDF Container */}
          <div className="w-full max-w-4xl mx-auto h-[85vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden relative">
            <iframe
              src="/resume.pdf"
              className="w-full h-full border-0"
              title="Resume PDF"
              loading="eager"
              allow="fullscreen"
            />
            
            {/* Fallback for browsers that don't support PDF embedding */}
            <div className="absolute bottom-4 right-4 z-20">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in new tab
              </a>
            </div>
          </div>


        </div>
    </main>
  )
}
