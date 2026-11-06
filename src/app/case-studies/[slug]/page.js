import { notFound } from "next/navigation"
import RenderMdx from "@/src/components/Blog/RenderMdx"
import siteMetadata from "@/src/utils/siteMetaData"
import { formatDate, getCaseStudies, getCaseStudy } from "@/lib/caseStudies"

// Only slugs known at build time exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return getCaseStudies().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getCaseStudy(slug)
  if (!post) return {}
  const url = `${siteMetadata.siteUrl}${post.url}`
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author, url: siteMetadata.siteUrl }],
    keywords: post.tags.length ? post.tags : undefined,
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      modifiedTime: new Date(post.updatedAt || post.publishedAt).toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@evwillow1",
    },
    alternates: { canonical: url },
  }
}

function jsonLd(post) {
  const url = `${siteMetadata.siteUrl}${post.url}`
  const personId = `${siteMetadata.siteUrl}/#person`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        sameAs: [siteMetadata.github, siteMetadata.linkedin, siteMetadata.twitter],
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: `${url}/opengraph-image`,
        datePublished: new Date(post.publishedAt).toISOString(),
        dateModified: new Date(post.updatedAt || post.publishedAt).toISOString(),
        author: { "@id": personId },
        publisher: { "@id": personId },
        wordCount: post.wordCount,
        timeRequired: `PT${post.readingTime}M`,
        keywords: post.tags.join(", ") || undefined,
        inLanguage: siteMetadata.language,
        isAccessibleForFree: true,
      },
    ],
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const post = getCaseStudy(slug)
  if (!post) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(post)).replace(/</g, "\\u003c") }}
      />
      <article className="container mx-auto px-5 sm:px-10 md:px-16 py-12 max-w-4xl">
        {post.draft && (
          <p className="mb-6 rounded border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 text-yellow-900 dark:text-yellow-100">
            Draft: visible in development only. Production builds, the sitemap and RSS leave it out.
          </p>
        )}
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold !leading-tight text-dark dark:text-light">{post.title}</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{post.description}</p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {post.author}
            {" · "}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {" · "}
            {post.readingTime} min read
          </p>
        </header>
        <RenderMdx blog={post} />
      </article>
    </>
  )
}
