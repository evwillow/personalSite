import React from "react"
import Link from "next/link"
import Image from "next/image"

const BlogLayoutTwo = ({ blog, zIndexClass = "blog-above-hex" }) => {
  return (
    <Link href={blog.url} className="block w-full h-full">
      <div className="group hex-card relative w-full h-full aspect-[4/3] rounded-xl cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl" />
        <Image
          src={blog.image.src}
          placeholder="blur"
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          fill
          className="object-cover object-center rounded-xl group-hover:scale-105 transition-all ease duration-300 overflow-hidden"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute bottom-0 p-4 w-full ${zIndexClass}`}>
          <h2 className="font-semibold text-sm sm:text-base md:text-lg text-light">
            <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_4px] dark:from-accentDark/50 dark:to-accentDark/50 group-hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default BlogLayoutTwo