import { caseStudies } from "@/.velite/generated"

// Drafts are visible only under `next dev`. Production builds never see them:
// velite.config.js drops draft entries from its output when NODE_ENV is
// production, and this filter is a second guard on top of that.
export const showDrafts = process.env.NODE_ENV !== "production"

const byDateDesc = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)

export function getCaseStudies({ includeDrafts = showDrafts } = {}) {
  return caseStudies.filter((post) => includeDrafts || !post.draft).sort(byDateDesc)
}

// For RSS and sitemaps: never list a draft, in any environment.
export function getPublishedCaseStudies() {
  return getCaseStudies({ includeDrafts: false })
}

export function getCaseStudy(slug) {
  return getCaseStudies().find((post) => post.slug === slug) || null
}

// publishedAt is a date at UTC midnight; format it in UTC so the day does not
// shift back by one in US time zones.
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
