import Link from "next/link"
import { formatDate, getCaseStudies } from "@/lib/caseStudies"
import siteMetadata from "@/src/utils/siteMetaData"

const description = "Case studies by Evan Maus: systems he built, how they failed, and what changed."

export const metadata = {
  title: "Case studies",
  description,
  openGraph: {
    title: "Case studies | Evan Maus",
    description,
    url: `${siteMetadata.siteUrl}/case-studies`,
    type: "website",
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/case-studies`,
  },
}

export default function CaseStudiesPage() {
  const posts = getCaseStudies()

  return (
    <main className="container mx-auto px-5 sm:px-10 md:px-16 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-bold text-dark dark:text-light">Case studies</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
      {posts.length === 0 ? (
        <p className="mt-10 text-gray-600 dark:text-gray-400">No case studies are published yet.</p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <Link href={post.url} className="group block">
                <h2 className="text-xl md:text-2xl font-semibold text-dark dark:text-light group-hover:text-accent">
                  {post.title}
                  {post.draft && (
                    <span className="ml-3 align-middle text-xs font-medium uppercase tracking-wide rounded bg-yellow-200 text-yellow-900 px-2 py-0.5">
                      Draft
                    </span>
                  )}
                </h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{post.description}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {" · "}
                  {post.readingTime} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
