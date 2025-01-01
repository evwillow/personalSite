import RenderMdx from "@/src/components/Blog/RenderMdx"
import siteMetadata from "@/src/utils/siteMetaData"
import { blogs } from "@/.velite/generated"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = blogs.find((blog) => blog.slug === slug)
  if (!blog) {
    return
  }

  const publishedAt = new Date(blog.publishedAt).toISOString()

  let imageList = [siteMetadata.socialBanner]
  if (blog.image) {
    imageList =
      typeof blog.image.src === "string"
        ? [siteMetadata.siteUrl + blog.image.src]
        : blog.image
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img }
  })

  const authors = blog?.author ? [blog.author] : siteMetadata.author

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params
  const blog = blogs.find((blog) => blog.slug === slug)

  if (!blog) {
    notFound()
  }

  let imageList = [siteMetadata.socialBanner]
  if (blog.image) {
    imageList =
      typeof blog.image.src === "string"
        ? [siteMetadata.siteUrl + blog.image.src]
        : blog.image
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    description: blog.description,
    image: imageList,
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    author: [
      {
        "@type": "Person",
        name: blog?.author ? [blog.author] : siteMetadata.author,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
          <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6">
              {blog.title}
            </h1>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
          <Image
            src={blog.image.src}
            placeholder="blur"
            blurDataURL={blog.image.blurDataURL}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className="aspect-square w-full h-full object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        {/* Centered Blog Content */}
        <div className="flex items-center justify-center px-5 md:px-10">
          <div className="max-w-4xl w-full">
            <RenderMdx blog={blog} />
          </div>
        </div>
      </article>
    </>
  )
}
