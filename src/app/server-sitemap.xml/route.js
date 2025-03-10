import { getServerSideSitemap } from 'next-sitemap'
import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
import siteMetadata from "@/src/utils/siteMetaData"

export async function GET() {
  try {
    // Get all blog posts from Velite
    const mdxSlugs = blogs.map((blog) => ({
      loc: `${siteMetadata.siteUrl}/${blog.slug}`,
      lastmod: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    }))

    // Get all blog posts from Contentful
    const contentfulPosts = await getBlogPosts()
    const contentfulSlugs = contentfulPosts.map((post) => ({
      loc: `${siteMetadata.siteUrl}/${post.fields.slug}`,
      lastmod: new Date(post.sys.updatedAt).toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    }))

    // Combine all URLs
    const allUrls = [...mdxSlugs, ...contentfulSlugs]

    return getServerSideSitemap(allUrls)
  } catch (error) {
    console.error('Error generating server sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
} 