import siteMetadata from "@/src/utils/siteMetaData"

// Person JSON-LD. Every value comes from the site itself (siteMetaData.js, the about page)
// or 2027_Applications/canonical/canonical_facts.md section 1 and the education table.
// Deliberately left out: phone, street or city address, job title, employer, any metric
// (none is canonical or safe under never_claim.md).
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteMetadata.siteUrl}/#person`,
  name: siteMetadata.author,
  url: siteMetadata.siteUrl,
  image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
  email: `mailto:${siteMetadata.email}`,
  description:
    "UC Berkeley student pursuing a dual B.A. in Economics and Data Science (expected December 2026) who builds software.",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of California, Berkeley",
    url: "https://www.berkeley.edu",
  },
  knowsAbout: ["Economics", "Data Science", "Python", "Next.js", "React"],
  sameAs: [
    siteMetadata.github,
    "https://www.linkedin.com/in/evanmaus",
    siteMetadata.twitter,
  ],
}

export default function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  )
}
