import RenderMdx from "@/src/components/Blog/RenderMdx"
import siteMetadata from "@/src/utils/siteMetaData"
import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const mdxSlugs = blogs.map((blog) => ({ slug: blog.slug }))
  const contentfulPosts = await getBlogPosts()
  const contentfulSlugs = contentfulPosts.map((post) => ({ slug: post.fields.slug }))
  return [...mdxSlugs, ...contentfulSlugs]
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const mdxBlog = blogs.find((blog) => blog.slug === slug)
  if (mdxBlog) {
    const publishedAt = new Date(mdxBlog.publishedAt).toISOString()
    let imageList = [siteMetadata.socialBanner]
    if (mdxBlog.image) {
      imageList = typeof mdxBlog.image.src === "string"
        ? [siteMetadata.siteUrl + mdxBlog.image.src]
        : mdxBlog.image
    }
    const ogImages = imageList.map((img) => ({
      url: img.includes("http") ? img : siteMetadata.siteUrl + img
    }))
    const authors = mdxBlog?.author ? [mdxBlog.author] : siteMetadata.author
    return {
      title: mdxBlog.title,
      description: mdxBlog.description,
      openGraph: {
        title: mdxBlog.title,
        description: mdxBlog.description,
        url: siteMetadata.siteUrl + mdxBlog.slug,
        siteName: siteMetadata.title,
        locale: "en_US",
        type: "article",
        publishedTime: publishedAt,
        images: ogImages,
        authors: authors.length > 0 ? authors : [siteMetadata.author],
      },
    }
  }

  const contentfulPosts = await getBlogPosts()
  const contentfulBlog = contentfulPosts.find((post) => post.fields.slug === slug)
  if (contentfulBlog) {
    return {
      title: contentfulBlog.fields.title,
      description: contentfulBlog.fields.description || contentfulBlog.fields.title,
      openGraph: {
        title: contentfulBlog.fields.title,
        description: contentfulBlog.fields.description || contentfulBlog.fields.title,
        url: siteMetadata.siteUrl + contentfulBlog.fields.slug,
        siteName: siteMetadata.title,
        locale: "en_US",
        type: "article",
      },
    }
  }
  return null
}

export default async function BlogPage({ params }) {
  const { slug } = params
  const mdxBlog = blogs.find((blog) => blog.slug === slug)
  
  if (mdxBlog) {
    let imageList = [siteMetadata.socialBanner]
    if (mdxBlog.image) {
      imageList = typeof mdxBlog.image.src === "string"
        ? [siteMetadata.siteUrl + mdxBlog.image.src]
        : mdxBlog.image
    }
    
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: mdxBlog.title,
      description: mdxBlog.description,
      image: imageList,
      datePublished: new Date(mdxBlog.publishedAt).toISOString(),
      dateModified: new Date(mdxBlog.updatedAt || mdxBlog.publishedAt).toISOString(),
      author: [{
        "@type": "Person",
        name: mdxBlog?.author ? [mdxBlog.author] : siteMetadata.author,
      }],
    }
    
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article>
          <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
            <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6">
                {mdxBlog.title}
              </h1>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
            <Image
              src={mdxBlog.image.src}
              placeholder="blur"
              blurDataURL={mdxBlog.image.blurDataURL}
              alt={mdxBlog.title}
              width={mdxBlog.image.width}
              height={mdxBlog.image.height}
              className="aspect-square w-full h-full object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
          <div className="flex items-center justify-center px-5 md:px-10">
            <div className="max-w-4xl w-full">
              <RenderMdx blog={mdxBlog} />
            </div>
          </div>
        </article>
      </>
    )
  }

  const contentfulPosts = await getBlogPosts()
  const contentfulBlog = contentfulPosts.find((post) => post.fields.slug === slug)
  
  if (contentfulBlog) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: contentfulBlog.fields.title,
      description: contentfulBlog.fields.description || contentfulBlog.fields.title,
      datePublished: new Date(contentfulBlog.sys.createdAt).toISOString(),
      dateModified: new Date(contentfulBlog.sys.updatedAt).toISOString(),
      author: [{
        "@type": "Person",
        name: siteMetadata.author,
      }],
    }
    
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article>
          <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
            <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6">
                {contentfulBlog.fields.title}
              </h1>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
            {contentfulBlog.fields.image && (
              <Image
                src={`https:${contentfulBlog.fields.image.fields.file.url}`}
                alt={contentfulBlog.fields.image.fields.title || contentfulBlog.fields.title}
                width={contentfulBlog.fields.image.fields.file.details.image.width}
                height={contentfulBlog.fields.image.fields.file.details.image.height}
                className="aspect-square w-full h-full object-cover object-center"
                priority
                sizes="100vw"
              />
            )}
          </div>
          <div className="flex items-center justify-center px-5 md:px-10">
            <div className="max-w-4xl w-full prose dark:prose-dark">
              {contentfulBlog.fields.body ? (
                documentToReactComponents(contentfulBlog.fields.body)
              ) : (
                <p>No content available</p>
              )}
            </div>
          </div>
        </article>
      </>
    )
  }
  
  return notFound()
}