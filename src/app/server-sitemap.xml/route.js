import { getServerSideSitemap } from 'next-sitemap'
import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
import { getPublishedCaseStudies } from "@/lib/caseStudies"
import { getPublishedPosts } from "@/lib/posts"
import siteMetadata from "@/src/utils/siteMetaData"

export const dynamic = 'force-dynamic'

const toEntry = (slug, updated) => ({
  loc: `${siteMetadata.siteUrl}/${slug}`,
  lastmod: new Date(updated).toISOString(),
  changefreq: 'monthly',
  priority: 0.6,
})

export async function GET() {
  // Published MDX posts first; they never need the network.
  const entries = blogs
    .filter((blog) => blog.isPublished !== false && blog.slug)
    .map((blog) => toEntry(blog.slug, blog.updatedAt || blog.publishedAt))

  // Published case studies only (drafts are never listed)
  for (const post of getPublishedCaseStudies()) {
    entries.push({
      loc: `${siteMetadata.siteUrl}${post.url}`,
      lastmod: new Date(post.updatedAt || post.publishedAt).toISOString(),
      changefreq: 'monthly',
      priority: 0.9,
    })
  }

  // Published posts only (drafts are never listed)
  for (const post of getPublishedPosts()) {
    entries.push({
      loc: `${siteMetadata.siteUrl}${post.url}`,
      lastmod: new Date(post.updatedAt || post.publishedAt).toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    })
  }

  // Contentful posts are optional: without credentials, or if the API fails,
  // the sitemap still answers 200 with the posts we do have.
  try {
    const posts = await getBlogPosts()
    for (const post of posts) {
      if (post.fields?.slug) entries.push(toEntry(post.fields.slug, post.sys.updatedAt))
    }
  } catch (error) {
    console.error('server-sitemap: Contentful unavailable, listing MDX posts only', error)
  }

  return getServerSideSitemap(entries)
}
