import Head from 'next/head'
import siteMetadata from '@/src/utils/siteMetaData'

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}) => {
  const pageTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title
  const pageDescription = description || siteMetadata.description
  const pageKeywords = keywords ? [...keywords, ...siteMetadata.keywords] : siteMetadata.keywords
  const pageImage = image || `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`
  const pageUrl = url || siteMetadata.siteUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(', ')} />
      <meta name="author" content={author || siteMetadata.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={siteMetadata.language} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content={siteMetadata.locale} />

      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />
      <meta name="twitter:creator" content={siteMetadata.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {/* Advanced SEO Meta Tags */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteMetadata.title} />
      
      {/* Advanced Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content={siteMetadata.title} />
      <meta name="msapplication-tooltip" content={siteMetadata.description} />
      <meta name="msapplication-starturl" content={siteMetadata.siteUrl} />
      <meta name="msapplication-navbutton-color" content="#ffffff" />
      <meta name="msapplication-TileImage" content={`${siteMetadata.siteUrl}${siteMetadata.siteLogo}`} />
      
      {/* Content Security and Performance */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Advanced Open Graph */}
      <meta property="og:updated_time" content={new Date().toISOString()} />
      <meta property="og:see_also" content={`${siteMetadata.siteUrl}/blog`} />
      <meta property="og:see_also" content={`${siteMetadata.siteUrl}/about`} />
      <meta property="og:see_also" content={`${siteMetadata.siteUrl}/projects`} />
      
      {/* Twitter Card Enhancements */}
      <meta name="twitter:domain" content="evwillow.com" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author || siteMetadata.author} />
      <meta name="twitter:label2" content="Est. reading time" />
      <meta name="twitter:data2" content="5 min read" />
      
      {/* Additional Meta Tags for Better Indexing */}
      <meta name="classification" content="Personal Website" />
      <meta name="category" content="Technology" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="resource-type" content="document" />
      <meta name="revisit-after" content="1 days" />
      <meta name="expires" content="never" />
      <meta name="cache-control" content="public" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Berkeley" />
      <meta name="geo.position" content="37.8719;-122.2585" />
      <meta name="ICBM" content="37.8719, -122.2585" />

      {/* Verification Tags */}
      {siteMetadata.googleSiteVerification && (
        <meta name="google-site-verification" content={siteMetadata.googleSiteVerification} />
      )}

      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": siteMetadata.author,
            "url": siteMetadata.siteUrl,
            "sameAs": [
              siteMetadata.linkedin,
              siteMetadata.twitter,
              siteMetadata.github
            ],
            "jobTitle": "Economics & Data Science Student",
            "description": siteMetadata.description,
            "image": `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
            "worksFor": {
              "@type": "Organization",
              "name": siteMetadata.university,
              "url": "https://berkeley.edu"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": siteMetadata.location.split(',')[0],
              "addressRegion": siteMetadata.location.split(',')[1]?.trim(),
              "addressCountry": "US"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": siteMetadata.university,
              "url": "https://berkeley.edu"
            },
            "knowsAbout": [
              "Economics",
              "Data Science", 
              "Artificial Intelligence",
              "Machine Learning",
              "Quantitative Finance",
              "Full Stack Development",
              "Python",
              "JavaScript",
              "React",
              "Next.js"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Student & Developer",
              "occupationLocation": {
                "@type": "City",
                "name": "Berkeley, CA"
              }
            }
          })
        }}
      />
    </Head>
  )
}

export default SEOHead
