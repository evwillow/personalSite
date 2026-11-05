import { getServerSideSitemap } from 'next-sitemap'
import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
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
