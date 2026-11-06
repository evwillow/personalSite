import Link from "next/link"
import Hero from "@/src/components/Home/Hero"
import CaseStudies from "@/src/components/Home/CaseStudies"
import { HERO_LINES } from "@/src/components/Home/heroCopy"
import siteMetadata from "@/src/utils/siteMetaData"
import WebSiteSchema from "@/src/components/SEO/WebSiteSchema"
import Script from "next/script"

export const metadata = {
  title: siteMetadata.title,
  description: HERO_LINES[0],
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

// Person JSON-LD is emitted site-wide by SEO/PersonSchema in layout.js, so it is not repeated here.
export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteMetadata.siteUrl,
    name: siteMetadata.title,
    description: siteMetadata.description,
    author: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      sameAs: [
        siteMetadata.linkedin,
        siteMetadata.twitter
      ]
    },
    publisher: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      }
    },
    inLanguage: siteMetadata.language,
    copyrightYear: new Date().getFullYear()
  }

  return (
    <main className="flex flex-col items-center">
      <Script id="schema-website" type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </Script>
      <WebSiteSchema />
      <Hero />
      <CaseStudies />
      <section className="w-full px-5 sm:px-10 md:px-24 lg:px-32 mb-16">
        <p className="max-w-6xl mx-auto text-lg text-dark/80 dark:text-light/80">
          New post:{" "}
          <Link href="/posts/fde-field-guide" className="font-semibold underline hover:text-accent">What FDE interviews test</Link>.
          Older writing, including the 2025 productivity posts, now lives on the{" "}
          <Link href="/blog" className="font-semibold underline hover:text-accent">blog</Link>.
        </p>
      </section>
    </main>
  )
}
