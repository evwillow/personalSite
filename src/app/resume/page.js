"use client"

import Head from "next/head"
import siteMetadata from "@/src/utils/siteMetaData"

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume | {siteMetadata.title}</title>
        <meta name="description" content="Evan Willow Moss - Resume and professional experience" />
        <meta name="keywords" content="resume, CV, professional experience, skills, portfolio" />
        <link rel="canonical" href={`${siteMetadata.siteUrl}/resume`} />
      </Head>
      <main className="flex flex-col items-center justify-start min-h-screen bg-light dark:bg-dark">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-end justify-center mb-8">
          <h1 className="text-6xl font-bold text-dark dark:text-light mr-12">
            Resume
          </h1>
          <a
            href="/resume.pdf"
            download="Evan_Willow_Moss_Resume.pdf"
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

        <div className="w-full h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] bg-light dark:bg-dark rounded-lg overflow-hidden shadow-lg p-4 flex items-center justify-center">
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit&zoom=85"
            className="w-full h-full border-0 rounded-lg"
            title="Resume PDF"
            loading="lazy"
            style={{ 
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
              borderRadius: '8px'
            }}
            onLoad={() => {
              // Ensure PDF loads with proper zoom
              const iframe = document.querySelector('iframe[title="Resume PDF"]');
              if (iframe) {
                iframe.style.transform = 'scale(1)';
              }
            }}
          />
        </div>
      </div>
    </main>
    </>
  )
}
