import siteMetadata from '@/src/utils/siteMetaData'

const BlogSchema = ({ posts = [] }) => {
  const blogData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${siteMetadata.author} Blog`,
    "description": "Insights on economics, data science, AI, and technology from UC Berkeley student Evan Maus",
    "url": `${siteMetadata.siteUrl}/blog`,
    "inLanguage": "en-US",
    "author": {
      "@type": "Person",
      "name": siteMetadata.author,
      "url": siteMetadata.siteUrl,
      "sameAs": [
        siteMetadata.linkedin,
        siteMetadata.twitter,
        siteMetadata.github
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": siteMetadata.author,
      "url": siteMetadata.siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteMetadata.siteUrl}/blog`
    },
    "blogPost": posts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title || post.fields?.title,
      "description": post.description || post.fields?.description,
      "url": `${siteMetadata.siteUrl}/${post.slug || post.fields?.slug}`,
      "datePublished": new Date(post.publishedAt || post.sys?.createdAt).toISOString(),
      "dateModified": new Date(post.updatedAt || post.sys?.updatedAt).toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author || post.fields?.author || siteMetadata.author,
        "url": siteMetadata.siteUrl
      },
      "publisher": {
        "@type": "Person",
        "name": siteMetadata.author,
        "url": siteMetadata.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`
        }
      },
      "image": post.image ? {
        "@type": "ImageObject",
        "url": post.image.src || `https:${post.fields?.image?.fields?.file?.url}`,
        "width": post.image.width || post.fields?.image?.fields?.file?.details?.image?.width,
        "height": post.image.height || post.fields?.image?.fields?.file?.details?.image?.height
      } : {
        "@type": "ImageObject",
        "url": `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteMetadata.siteUrl}/${post.slug || post.fields?.slug}`
      },
      "keywords": post.tags ? post.tags.join(", ") : siteMetadata.keywords.slice(0, 5).join(", "),
      "articleSection": "Technology",
      "wordCount": post.content ? post.content.split(/\s+/).length : 500,
      "isAccessibleForFree": true,
      "inLanguage": "en-US"
    })),
    "about": {
      "@type": "Thing",
      "name": "Technology and Education",
      "description": "Blog covering economics, data science, AI, and technology topics"
    },
    "keywords": [
      "data science blog",
      "economics blog", 
      "AI research blog",
      "technology blog",
      "UC Berkeley student blog",
      "machine learning blog",
      "quantitative finance blog",
      "programming blog",
      "web development blog"
    ].join(", ")
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(blogData)
      }}
    />
  )
}

export default BlogSchema
