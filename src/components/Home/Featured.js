import React from "react"
import BlogLayoutOne from "../Blog/BlogLayoutOne"
import BlogLayoutTwo from "../Blog/BlogLayoutTwo"

const Featured = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-600">No blog posts available.</p>
  }

  // Sort posts by publishedAt date and get the oldest 5
  const sortedPosts = [...posts]
    .sort((a, b) => {
      const dateA = new Date(a.fields.publishedAt || a.sys.firstPublishedAt)
      const dateB = new Date(b.fields.publishedAt || b.sys.firstPublishedAt)
      return dateA - dateB
    })
    .slice(0, 5)

  // Transform Contentful posts to match the blog format expected by BlogLayout components
  const transformedPosts = sortedPosts.map(post => ({
    title: post.fields.title,
    description: post.fields.description || '',
    publishedAt: post.fields.publishedAt || post.sys.firstPublishedAt,
    url: `/${post.fields.slug}`,
    image: post.fields.image?.fields?.file?.url ? {
      src: `https:${post.fields.image.fields.file.url}`,
      blurDataURL: `https:${post.fields.image.fields.file.url}`,
      width: post.fields.image.fields.file.details.image.width,
      height: post.fields.image.fields.file.details.image.height
    } : null
  }))

  return (
    <section className="w-full mt-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-[1fr_1fr] 
          lg:grid-cols-[2fr_1fr_1fr] 
          auto-rows-auto 
          gap-4 
          md:gap-6 
          max-w-7xl 
          mx-auto"
      >
        {transformedPosts[1] && (
          <article
            className="row-span-2 col-span-1 lg:col-span-1 sm:col-span-2"
          >
            <BlogLayoutOne blog={transformedPosts[1]} />
          </article>
        )}
        {transformedPosts.slice(2, 6).map((blog, index) => (
          <article
            key={index}
            className="col-span-1 row-span-1"
          >
            <BlogLayoutTwo blog={blog} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default Featured