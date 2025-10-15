import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
import { samplePosts } from "@/lib/samplePosts"
import siteMetadata from "@/src/utils/siteMetaData"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"

export const metadata = {
  title: "Blog",
  description: "Read the latest insights on economics, data science, AI, and technology from Evan Maus, UC Berkeley student and developer.",
  keywords: [
    "blog",
    "economics",
    "data science",
    "AI",
    "machine learning",
    "technology",
    "UC Berkeley",
    "Evan Maus"
  ],
  openGraph: {
    title: "Blog | Evan Maus",
    description: "Read the latest insights on economics, data science, AI, and technology from Evan Maus, UC Berkeley student and developer.",
    url: `${siteMetadata.siteUrl}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Evan Maus",
    description: "Read the latest insights on economics, data science, AI, and technology from Evan Maus, UC Berkeley student and developer.",
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/blog`,
  },
}

export default async function BlogPage() {
  try {
    const posts = await getBlogPosts()
    
    // Use sample posts only in development (localhost) when no real posts exist
    const isLocalhost = process.env.NODE_ENV === 'development'
    const postsToDisplay = (posts.length === 0 && isLocalhost) ? samplePosts : posts
    
    const allPosts = [...blogs, ...postsToDisplay]
    
    // Sort posts by date (newest first)
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.sys?.createdAt)
      const dateB = new Date(b.publishedAt || b.sys?.createdAt)
      return dateB - dateA
    })

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      url: `${siteMetadata.siteUrl}/blog`,
      name: "Evan Maus Blog",
      description: "Read the latest insights on economics, data science, AI, and technology from Evan Maus, UC Berkeley student and developer.",
      author: {
        "@type": "Person",
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        sameAs: [
          siteMetadata.linkedin,
          siteMetadata.twitter
        ]
      },
      blogPost: sortedPosts.map(post => ({
        "@type": "BlogPosting",
        headline: post.title || post.fields?.title,
        description: post.description || post.fields?.description,
        url: `${siteMetadata.siteUrl}/${post.slug || post.fields?.slug}`,
        datePublished: new Date(post.publishedAt || post.sys?.createdAt).toISOString(),
        dateModified: new Date(post.updatedAt || post.sys?.updatedAt).toISOString(),
        author: {
          "@type": "Person",
          name: post.author || post.fields?.author || siteMetadata.author
        },
        isAccessibleForFree: true
      }))
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        
        <div className="container mx-auto px-4 my-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-gray-100" aria-current="page">
                  Blog
                </span>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Insights on economics, data science, AI, and technology from a UC Berkeley student's perspective
            </p>
          </header>

          {/* Blog Posts Grid */}
          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post, index) => {
                const postTitle = post.title || post.fields?.title
                const postDescription = post.description || post.fields?.description
                const postSlug = post.slug || post.fields?.slug
                const postDate = post.publishedAt || post.sys?.createdAt
                const postImage = post.image?.src || post.fields?.image?.fields?.file?.url
                const postTags = post.tags || post.fields?.tags || []

                return (
                  <article 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    itemScope 
                    itemType="https://schema.org/BlogPosting"
                  >
                    {postImage && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={postImage.startsWith('http') ? postImage : `https:${postImage}`}
                          alt={postTitle}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="mb-2">
                        <time 
                          className="text-sm text-gray-500 dark:text-gray-400"
                          dateTime={new Date(postDate).toISOString()}
                          itemProp="datePublished"
                        >
                          {format(new Date(postDate), 'MMMM dd, yyyy')}
                        </time>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                        <Link 
                          href={`/${postSlug}`}
                          className="hover:text-accent transition-colors"
                          itemProp="headline"
                        >
                          {postTitle}
                        </Link>
                      </h2>
                      
                      {postDescription && (
                        <p 
                          className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
                          itemProp="description"
                        >
                          {postDescription}
                        </p>
                      )}
                      
                      {postTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {postTags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Link 
                        href={`/${postSlug}`}
                        className="inline-flex items-center text-accent hover:text-accentDark transition-colors font-medium"
                      >
                        Read More
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center my-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No blog posts available yet. Check back soon for new content!
              </p>
            </div>
          )}
        </div>
      </>
    )
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return (
      <div className="container mx-auto px-4 my-8">
        <div className="text-center my-12">
          <p className="text-red-600 dark:text-red-400 text-lg">
            Unable to load blog posts. Please try again later.
          </p>
        </div>
      </div>
    )
  }
}
