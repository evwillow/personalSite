import siteMetadata from '@/src/utils/siteMetaData'

const WebSiteSchema = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteMetadata.title,
    "alternateName": "Evan Maus Portfolio",
    "url": siteMetadata.siteUrl,
    "description": siteMetadata.description,
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "author": {
      "@type": "Person",
      "name": siteMetadata.author,
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
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteMetadata.siteUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ReadAction",
        "target": [
          `${siteMetadata.siteUrl}/blog`,
          `${siteMetadata.siteUrl}/about`,
          `${siteMetadata.siteUrl}/projects`,
          `${siteMetadata.siteUrl}/experience`
        ]
      }
    ],
    "mainEntity": {
      "@type": "Person",
      "name": siteMetadata.author,
      "url": siteMetadata.siteUrl,
      "jobTitle": "Economics & Data Science Student",
      "worksFor": {
        "@type": "Organization",
        "name": siteMetadata.university
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteMetadata.siteUrl
        }
      ]
    },
    "keywords": siteMetadata.keywords.join(", "),
    "about": [
      {
        "@type": "Thing",
        "name": "Economics",
        "description": "Study of economic systems and financial markets"
      },
      {
        "@type": "Thing", 
        "name": "Data Science",
        "description": "Extracting insights from data using statistical and computational methods"
      },
      {
        "@type": "Thing",
        "name": "Artificial Intelligence",
        "description": "Development of intelligent systems and machine learning algorithms"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData)
      }}
    />
  )
}

export default WebSiteSchema
