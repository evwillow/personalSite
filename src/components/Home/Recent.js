import React from "react"
import BlogLayoutThree from "../Blog/BlogLayoutThree"

const RecentPosts = ({ posts }) => {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.fields.publishedAt || a.sys.firstPublishedAt)
    const dateB = new Date(b.fields.publishedAt || b.sys.firstPublishedAt)
    return dateB - dateA
  })

  // Skip the 5 oldest posts
  const recentPosts = sortedPosts.slice(0, -5)

  if (recentPosts.length === 0) {
    return null
  }

  // Helper function to ensure absolute URLs
  const getAbsoluteImageUrl = (url) => {
    if (!url) return '/default-image.jpg'
    if (url.startsWith('//')) return `https:${url}`
    if (url.startsWith('/')) return `https:/${url}`
    if (!url.startsWith('http')) return `https://${url}`
    return url
  }

  // Transform Contentful posts to exactly match the blog format expected by BlogLayoutThree
  const transformedPosts = recentPosts.map(post => {
    const imageUrl = post.fields.image?.fields?.file?.url
    const absoluteImageUrl = getAbsoluteImageUrl(imageUrl)

    return {
      title: post.fields.title,
      url: `/${post.fields.slug}`,
      publishedAt: post.fields.publishedAt || post.sys.firstPublishedAt,
      image: {
        src: absoluteImageUrl,
        blurDataURL: absoluteImageUrl,
        width: post.fields.image?.fields?.file?.details?.image?.width || 800,
        height: post.fields.image?.fields?.file?.details?.image?.height || 600,
      }
    }
  })

  return (
    <section className="w-full mb-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
          Recent
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-16">
        {transformedPosts.map((blog, index) => {
          return (
            <article key={index} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={blog} />
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default RecentPosts