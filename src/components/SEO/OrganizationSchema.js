import siteMetadata from '@/src/utils/siteMetaData'

const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Evan Maus Portfolio",
    "url": siteMetadata.siteUrl,
    "logo": `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
    "description": siteMetadata.description,
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": siteMetadata.author,
      "url": siteMetadata.siteUrl
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "Personal",
      "email": siteMetadata.email,
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Berkeley",
      "addressRegion": "CA",
      "addressCountry": "US",
      "postalCode": "94720"
    },
    "sameAs": [
      siteMetadata.linkedin,
      siteMetadata.twitter,
      siteMetadata.github
    ],
    "knowsAbout": [
      "Economics",
      "Data Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Quantitative Finance",
      "Full Stack Development",
      "Python Programming",
      "JavaScript Development",
      "React Development",
      "Next.js Development",
      "Algorithmic Trading",
      "Financial Technology",
      "Sustainable Technology",
      "Climate Technology",
      "Web Development",
      "Software Engineering",
      "Research and Development",
      "Academic Research",
      "Statistical Analysis",
      "Data Visualization"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services and Expertise",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Stack Web Development",
            "description": "Custom web applications using React, Next.js, and modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Science Consulting",
            "description": "Data analysis, machine learning, and statistical modeling services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Quantitative Research",
            "description": "Financial modeling, algorithmic trading, and economic analysis"
          }
        }
      ]
    },
    "memberOf": {
      "@type": "Organization",
      "name": siteMetadata.university,
      "url": "https://berkeley.edu"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData)
      }}
    />
  )
}

export default OrganizationSchema
