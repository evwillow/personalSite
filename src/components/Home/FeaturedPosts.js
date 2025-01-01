import { sortBlogs } from "@/src/utils"
import React from "react"
import BlogLayoutOne from "../Blog/BlogLayoutOne"
import BlogLayoutTwo from "../Blog/BlogLayoutTwo"

const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs)

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
        {sortedBlogs[1] && (
          <article
            className="row-span-2 col-span-1 lg:col-span-1 sm:col-span-2"
          >
            <BlogLayoutOne blog={sortedBlogs[1]} />
          </article>
        )}
        {sortedBlogs.slice(2, 6).map((blog, index) => (
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

export default FeaturedPosts
