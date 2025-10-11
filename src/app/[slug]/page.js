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
  const contentfulSlugs = contentfulPosts.map((post) => ({
    slug: post.fields.slug,
  }))
  return [...mdxSlugs, ...contentfulSlugs]
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const mdxBlog = blogs.find((blog) => blog.slug === slug)
  if (mdxBlog) {
    const publishedAt = new Date(mdxBlog.publishedAt).toISOString()
    let imageList = [siteMetadata.socialBanner]
    if (mdxBlog.image) {
      imageList =
        typeof mdxBlog.image.src === "string"
          ? [siteMetadata.siteUrl + mdxBlog.image.src]
          : mdxBlog.image
    }
    const ogImages = imageList.map((img) => ({
      url: img.includes("http") ? img : siteMetadata.siteUrl + img,
      width: 1200,
      height: 630,
      alt: mdxBlog.title,
    }))
    const authors = mdxBlog?.author ? [mdxBlog.author] : siteMetadata.author
    
    // Extract keywords from tags or use default keywords
    const keywords = mdxBlog.tags 
      ? [...mdxBlog.tags, ...siteMetadata.keywords]
      : siteMetadata.keywords
    
    return {
      title: mdxBlog.title,
      description: mdxBlog.description,
      keywords: keywords,
      authors: [{ name: authors }],
      openGraph: {
        title: mdxBlog.title,
        description: mdxBlog.description,
        url: siteMetadata.siteUrl + mdxBlog.slug,
        siteName: siteMetadata.title,
        locale: "en_US",
        type: "article",
        publishedTime: publishedAt,
        modifiedTime: new Date(mdxBlog.updatedAt || mdxBlog.publishedAt).toISOString(),
        images: ogImages,
        authors: authors.length > 0 ? authors : [siteMetadata.author],
      },
      twitter: {
        card: "summary_large_image",
        title: mdxBlog.title,
        description: mdxBlog.description,
        images: ogImages,
        creator: "@evanwillowmoss",
      },
      alternates: {
        canonical: `${siteMetadata.siteUrl}/${mdxBlog.slug}`,
      },
    }
  }

  const contentfulPosts = await getBlogPosts()
  const contentfulBlog = contentfulPosts.find(
    (post) => post.fields.slug === slug
  )
  if (contentfulBlog) {
    // Extract keywords from tags or use default keywords
    const keywords = contentfulBlog.fields.tags 
      ? [...contentfulBlog.fields.tags, ...siteMetadata.keywords]
      : siteMetadata.keywords
      
    // Get image for social sharing
    let ogImages = [{ 
      url: siteMetadata.socialBanner,
      width: 1200,
      height: 630,
      alt: contentfulBlog.fields.title
    }]
    
    if (contentfulBlog.fields.featuredImage) {
      ogImages = [{
        url: `https:${contentfulBlog.fields.featuredImage.fields.file.url}`,
        width: contentfulBlog.fields.featuredImage.fields.file.details.image.width,
        height: contentfulBlog.fields.featuredImage.fields.file.details.image.height,
        alt: contentfulBlog.fields.title
      }]
    }
    
    return {
      title: contentfulBlog.fields.title,
      description:
        contentfulBlog.fields.description || contentfulBlog.fields.title,
      keywords: keywords,
      authors: [{ name: contentfulBlog.fields.author || siteMetadata.author }],
      openGraph: {
        title: contentfulBlog.fields.title,
        description:
          contentfulBlog.fields.description || contentfulBlog.fields.title,
        url: siteMetadata.siteUrl + contentfulBlog.fields.slug,
        siteName: siteMetadata.title,
        locale: "en_US",
        type: "article",
        publishedTime: new Date(contentfulBlog.sys.createdAt).toISOString(),
        modifiedTime: new Date(contentfulBlog.sys.updatedAt).toISOString(),
        images: ogImages,
        authors: [contentfulBlog.fields.author || siteMetadata.author],
      },
      twitter: {
        card: "summary_large_image",
        title: contentfulBlog.fields.title,
        description: contentfulBlog.fields.description || contentfulBlog.fields.title,
        images: ogImages,
        creator: "@evanwillowmoss",
      },
      alternates: {
        canonical: `${siteMetadata.siteUrl}/${contentfulBlog.fields.slug}`,
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
      imageList =
        typeof mdxBlog.image.src === "string"
          ? [siteMetadata.siteUrl + mdxBlog.image.src]
          : mdxBlog.image
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: mdxBlog.title,
      description: mdxBlog.description,
      image: imageList,
      datePublished: new Date(mdxBlog.publishedAt).toISOString(),
      dateModified: new Date(mdxBlog.updatedAt || mdxBlog.publishedAt).toISOString(),
      author: {
        "@type": "Person",
        name: mdxBlog?.author ? mdxBlog.author : siteMetadata.author,
        url: siteMetadata.siteUrl,
        sameAs: [
          siteMetadata.twitter,
          siteMetadata.linkedin
        ]
      },
      publisher: {
        "@type": "Person",
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteMetadata.siteUrl}/${mdxBlog.slug}`
      },
      keywords: mdxBlog.tags ? mdxBlog.tags.join(", ") : siteMetadata.keywords.join(", "),
      articleBody: mdxBlog.content,
      wordCount: mdxBlog.content ? mdxBlog.content.split(/\s+/).length : 0,
      url: `${siteMetadata.siteUrl}/${mdxBlog.slug}`,
      isAccessibleForFree: true,
      inLanguage: siteMetadata.language
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
  const contentfulBlog = contentfulPosts.find(
    (post) => post.fields.slug === slug
  )

  if (contentfulBlog) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: contentfulBlog.fields.title,
      description: contentfulBlog.fields.description || contentfulBlog.fields.title,
      image: contentfulBlog.fields.featuredImage ? 
        [`https:${contentfulBlog.fields.featuredImage.fields.file.url}`] : 
        [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`],
      datePublished: new Date(contentfulBlog.sys.createdAt).toISOString(),
      dateModified: new Date(contentfulBlog.sys.updatedAt).toISOString(),
      author: {
        "@type": "Person",
        name: contentfulBlog.fields.author || siteMetadata.author,
        url: siteMetadata.siteUrl,
        sameAs: [
          siteMetadata.twitter,
          siteMetadata.linkedin
        ]
      },
      publisher: {
        "@type": "Person",
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteMetadata.siteUrl}/${contentfulBlog.fields.slug}`
      },
      keywords: contentfulBlog.fields.tags ? 
        contentfulBlog.fields.tags.join(", ") : 
        siteMetadata.keywords.join(", "),
      articleBody: contentfulBlog.fields.body ? 
        contentfulBlog.fields.body.content
          .map(item => item.content?.[0]?.value || "")
          .join(" ") : 
        "",
      wordCount: contentfulBlog.fields.body ? 
        contentfulBlog.fields.body.content
          .map(item => item.content?.[0]?.value || "")
          .join(" ")
          .split(/\s+/).length : 
        0,
      url: `${siteMetadata.siteUrl}/${contentfulBlog.fields.slug}`,
      isAccessibleForFree: true,
      inLanguage: siteMetadata.language
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
                {contentfulBlog.fields.title}
              </h1>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
            {contentfulBlog.fields.image && (
              <Image
                src={`https:${contentfulBlog.fields.image.fields.file.url}`}
                alt={
                  contentfulBlog.fields.image.fields.title ||
                  contentfulBlog.fields.title
                }
                width={
                  contentfulBlog.fields.image.fields.file.details.image.width
                }
                height={
                  contentfulBlog.fields.image.fields.file.details.image.height
                }
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
