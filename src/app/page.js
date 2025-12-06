import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
import { samplePosts } from "@/lib/samplePosts"
import Featured from "@/src/components/Home/Featured"
import Recent from "@/src/components/Home/Recent"
import siteMetadata from "@/src/utils/siteMetaData"
import FAQSchema from "@/src/components/SEO/FAQSchema"
import OrganizationSchema from "@/src/components/SEO/OrganizationSchema"
import WebSiteSchema from "@/src/components/SEO/WebSiteSchema"
import BlogSchema from "@/src/components/SEO/BlogSchema"
import Script from "next/script"

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default async function Home() {
  try {
    const posts = await getBlogPosts()
    
    // Use sample posts only in development (localhost) when no real posts exist
    const isLocalhost = process.env.NODE_ENV === 'development'
    const postsToDisplay = (posts.length === 0 && isLocalhost) ? samplePosts : posts
    
    const allPosts = [...blogs, ...postsToDisplay]

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: siteMetadata.siteUrl,
      name: siteMetadata.title,
      description: siteMetadata.description,
      author: {
        "@type": "Person",
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        sameAs: [
          siteMetadata.linkedin,
          siteMetadata.twitter
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
      inLanguage: siteMetadata.language,
      copyrightYear: new Date().getFullYear(),
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteMetadata.siteUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      url: siteMetadata.siteUrl,
      name: siteMetadata.title,
      description: siteMetadata.description,
      author: {
        "@type": "Person",
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        sameAs: [
          siteMetadata.linkedin,
          siteMetadata.twitter
        ]
      },
      blogPost: allPosts.map(post => ({
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

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
      email: siteMetadata.email,
      sameAs: [
        siteMetadata.github,
        siteMetadata.linkedin,
        siteMetadata.twitter
      ],
      jobTitle: "Full-Stack Engineer",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: siteMetadata.university
      },
      image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      description: siteMetadata.description,
      knowsAbout: ["Full-Stack Development", "Machine Learning", "Quantitative Finance", "Data Science", "Economics"]
    }

    return (
      <main className="flex flex-col items-center">
        <Script id="schema-website" type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </Script>
        <Script id="schema-blog" type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </Script>
        <Script id="schema-person" type="application/ld+json">
          {JSON.stringify(personSchema)}
        </Script>
        <FAQSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <BlogSchema posts={postsToDisplay} />
        <Featured posts={postsToDisplay} />
        <Recent posts={postsToDisplay} />
      </main>
    )
  } catch (error) {
    console.error("Error fetching blog posts in Home component:", error)
    return (
      <main className="flex flex-col items-center">
        <p>Unable to fetch blog posts. Please try again later.</p>
      </main>
    )
  }
}
