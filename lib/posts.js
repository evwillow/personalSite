import { posts } from "@/.velite/generated"
import { formatDate } from "@/lib/caseStudies"

export { formatDate }

// Drafts are visible only under `next dev`. Production builds never see them:
// velite.config.js drops draft entries from its output when NODE_ENV is
// production, and this filter is a second guard on top of that.
export const showDrafts = process.env.NODE_ENV !== "production"

const byDateDesc = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)

export function getPosts({ includeDrafts = showDrafts } = {}) {
  return posts.filter((post) => includeDrafts || !post.draft).sort(byDateDesc)
}

// For RSS and sitemaps: never list a draft, in any environment.
export function getPublishedPosts() {
  return getPosts({ includeDrafts: false })
}

export function getPost(slug) {
  return getPosts().find((post) => post.slug === slug) || null
}

