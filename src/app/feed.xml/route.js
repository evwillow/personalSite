import { getPublishedCaseStudies } from "@/lib/caseStudies"
import { getPublishedPosts } from "@/lib/posts"
import { getBlogPosts } from "@/lib/contentful"
import siteMetadata from "@/src/utils/siteMetaData"

// Built once at build time. Drafts are never listed (getPublishedCaseStudies
// and getPublishedPosts filter them in every environment).
export const dynamic = "force-static"

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

export async function GET() {
  const site = siteMetadata.siteUrl
  const caseStudies = getPublishedCaseStudies().map((post) => ({
    title: post.title,
    url: `${site}${post.url}`,
    description: post.description,
    date: new Date(post.publishedAt),
    categories: ["Case study", ...post.tags],
  }))

  const posts = getPublishedPosts().map((post) => ({
    title: post.title,
    url: `${site}${post.url}`,
    description: post.description,
    date: new Date(post.publishedAt),
    categories: ["Post", ...post.tags],
  }))

  const contentful = (await getBlogPosts())
    .filter((post) => post?.fields?.slug)
    .map((post) => ({
      title: post.fields.title,
      url: `${site}/${post.fields.slug}`,
      description: post.fields.description || post.fields.title,
      date: new Date(post.sys?.createdAt || Date.now()),
      categories: post.fields.tags || [],
    }))

  const items = [...caseStudies, ...posts, ...contentful].sort((a, b) => b.date - a.date)
  const lastBuild = items.length ? items[0].date : new Date()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(siteMetadata.title)}</title>
<link>${site}</link>
<description>${esc("Case studies and posts by " + siteMetadata.author)}</description>
<language>${esc(siteMetadata.language)}</language>
<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
<atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `<item>
<title>${esc(item.title)}</title>
<link>${esc(item.url)}</link>
<guid isPermaLink="true">${esc(item.url)}</guid>
<pubDate>${item.date.toUTCString()}</pubDate>
<description>${esc(item.description)}</description>
${item.categories.map((c) => `<category>${esc(c)}</category>`).join("\n")}
</item>`
  )
  .join("\n")}
</channel>
</rss>
`

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
