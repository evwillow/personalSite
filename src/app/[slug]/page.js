import RenderMdx from "@/src/components/Blog/RenderMdx"
import siteMetadata from "@/src/utils/siteMetaData"
import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
import { samplePosts } from "@/lib/samplePosts"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const mdxSlugs = blogs.map((blog) => ({ slug: blog.slug }))
  const contentfulPosts = await getBlogPosts()
  const contentfulSlugs = contentfulPosts.map((post) => ({
    slug: post.fields.slug,
  }))
  
  // Include sample posts in development mode
  const sampleSlugs = process.env.NODE_ENV === 'development'
    ? samplePosts.map((post) => ({ slug: post.fields.slug }))
    : []
  
  return [...mdxSlugs, ...contentfulSlugs, ...sampleSlugs]
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const mdxBlog = blogs.find((blog) => blog.slug === slug)
  if (mdxBlog) {
    const publishedAt = new Date(mdxBlog.publishedAt).toISOString()
    // Ensure we always have a proper image for social sharing
    let imageList = [siteMetadata.defaultBlogImage]
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
        creator: "@evwillow1",
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
      
    // Get image for social sharing - prioritize featured image from Contentful
    let ogImages = [{ 
      url: `${siteMetadata.siteUrl}${siteMetadata.defaultBlogImage}`,
      width: 1200,
      height: 630,
      alt: contentfulBlog.fields.title
    }]
    
    // Use featured image if available, otherwise check for image field
    if (contentfulBlog.fields.featuredImage) {
      ogImages = [{
        url: `https:${contentfulBlog.fields.featuredImage.fields.file.url}`,
        width: contentfulBlog.fields.featuredImage.fields.file.details.image.width,
        height: contentfulBlog.fields.featuredImage.fields.file.details.image.height,
        alt: contentfulBlog.fields.title
      }]
    } else if (contentfulBlog.fields.image) {
      // Fallback to image field if featuredImage is not available
      ogImages = [{
        url: `https:${contentfulBlog.fields.image.fields.file.url}`,
        width: contentfulBlog.fields.image.fields.file.details.image.width,
        height: contentfulBlog.fields.image.fields.file.details.image.height,
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
        url: `${siteMetadata.siteUrl}/${contentfulBlog.fields.slug}`,
        siteName: siteMetadata.title,
        locale: "en_US",
        type: "article",
        publishedTime: new Date(contentfulBlog.sys.createdAt).toISOString(),
        modifiedTime: new Date(contentfulBlog.sys.updatedAt).toISOString(),
        images: ogImages,
        authors: [contentfulBlog.fields.author || siteMetadata.author],
        section: "Blog",
        tags: contentfulBlog.fields.tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title: contentfulBlog.fields.title,
        description: contentfulBlog.fields.description || contentfulBlog.fields.title,
        images: ogImages,
        creator: "@evwillow1",
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
    // Ensure we always have a proper image for social sharing
    let imageList = [siteMetadata.defaultBlogImage]
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
        <article itemScope itemType="https://schema.org/BlogPosting">

          <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
            <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 
                className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6"
                itemProp="headline"
              >
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
              itemProp="image"
            />
          </div>
          <div className="flex items-center justify-center px-5 md:px-10">
            <div className="max-w-4xl w-full">
              <div itemProp="articleBody">
                <RenderMdx blog={mdxBlog} />
              </div>
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
        contentfulBlog.fields.image ?
        [`https:${contentfulBlog.fields.image.fields.file.url}`] :
        [`${siteMetadata.siteUrl}${siteMetadata.defaultBlogImage}`],
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
        <article itemScope itemType="https://schema.org/BlogPosting">

          <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
            <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 
                className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6"
                itemProp="headline"
              >
                {contentfulBlog.fields.title}
              </h1>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
            {(contentfulBlog.fields.featuredImage || contentfulBlog.fields.image) && (
              <Image
                src={`https:${(contentfulBlog.fields.featuredImage || contentfulBlog.fields.image).fields.file.url}`}
                alt={
                  (contentfulBlog.fields.featuredImage || contentfulBlog.fields.image).fields.title ||
                  contentfulBlog.fields.title
                }
                width={
                  (contentfulBlog.fields.featuredImage || contentfulBlog.fields.image).fields.file.details.image.width
                }
                height={
                  (contentfulBlog.fields.featuredImage || contentfulBlog.fields.image).fields.file.details.image.height
                }
                className="aspect-square w-full h-full object-cover object-center"
                priority
                sizes="100vw"
                itemProp="image"
              />
            )}
          </div>
          <div className="flex items-center justify-center px-5 md:px-10">
            <div className="max-w-4xl w-full prose dark:prose-dark">
              <div itemProp="articleBody">
                {contentfulBlog.fields.body ? (
                  documentToReactComponents(contentfulBlog.fields.body)
                ) : (
                  <p>No content available</p>
                )}
              </div>
            </div>
          </div>
        </article>
      </>
    )
  }

  // Check for sample posts in development mode
  if (process.env.NODE_ENV === 'development') {
    const samplePost = samplePosts.find(post => post.fields.slug === slug)
    
    if (samplePost) {
      return (
        <>
          <article>
            <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
              <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6">
                  {samplePost.fields.title}
                </h1>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
              {samplePost.fields.image?.fields?.file?.url && (
                <Image
                  src={`https:${samplePost.fields.image.fields.file.url}`}
                  alt={samplePost.fields.title}
                  width={samplePost.fields.image.fields.file.details.image.width}
                  height={samplePost.fields.image.fields.file.details.image.height}
                  className="aspect-square w-full h-full object-cover object-center"
                  priority
                  sizes="100vw"
                />
              )}
            </div>
            <div className="flex items-center justify-center px-5 md:px-10">
              <div className="max-w-4xl w-full prose dark:prose-dark">
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 mb-8 not-prose">
                  <p className="text-blue-800 dark:text-blue-200 font-medium">
                    📝 This is a sample blog post for local development. 
                    Create real content in your CMS to replace this placeholder.
                  </p>
                </div>
                
                <p className="lead">
                  {samplePost.fields.description}
                </p>
                
                <p>
                  This is a sample blog post to demonstrate how your blog will look. 
                  Replace this content by creating actual blog posts in your content management system.
                </p>
                
                <h2>Getting Started</h2>
                <p>
                  To add your own blog posts, you can:
                </p>
                <ul>
                  <li>Create content in your Contentful CMS</li>
                  <li>Add MDX files to your content directory</li>
                  <li>Configure your content sources</li>
                </ul>
                
                <h2>Sample Content</h2>
                <p>
                  This placeholder demonstrates the layout and styling of your blog posts.
                  Your actual content will appear here once you publish it. The layout matches
                  exactly what you'll see with real blog posts from your CMS.
                </p>
                
                <h3>Key Features</h3>
                <p>
                  Your blog posts will support rich content including:
                </p>
                <ul>
                  <li>Beautiful typography with the prose classes</li>
                  <li>Featured images displayed as hero sections</li>
                  <li>Responsive design that looks great on all devices</li>
                  <li>Dark mode support</li>
                </ul>
                
                <p>
                  Once you add real content, it will seamlessly integrate with this layout,
                  providing a professional and polished reading experience for your visitors.
                </p>
              </div>
            </div>
          </article>
        </>
      )
    }
  }

  return notFound()
}
