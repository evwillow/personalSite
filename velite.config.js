import { defineConfig, s } from 'velite'
import GithubSlugger from "github-slugger"
import readingTime from "reading-time"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const codeOptions = {
  theme: 'github-dark',
  grid: false,
}

// Define the blog schema
const blog = s
  .object({
    title: s.string(),
    publishedAt: s.isodate(),
    updatedAt: s.isodate(),
    description: s.string(), 
    image: s.image(),
    isPublished: s.boolean().default(true),
    author: s.string(),
    tags: s.array(s.string()),
    body: s.mdx(),
    toc: s.toc(),
    slug: s.string(),
  })
  .transform(data => {
    return {
      ...data,
      url: `/${data.slug}`,
      readingTime: readingTime(data.body),
    //   toc: headings,
      image: {
        ...data.image,
        src: data.image.src.replace("/static", ""),
      },
    }
  })

// Case studies: content/case-studies/*.mdx
// draft: true posts render under `next dev` and are dropped from the velite
// output in production builds (see prepare below), so they never reach a
// production page, the sitemap or the RSS feed.
const includeDrafts =
  process.env.NODE_ENV !== 'production' || process.env.VELITE_INCLUDE_DRAFTS === '1'

const caseStudy = s
  .object({
    title: s.string().max(140),
    slug: s.slug('case-studies'),
    description: s.string().max(400),
    publishedAt: s.isodate(),
    updatedAt: s.isodate().optional(),
    draft: s.boolean().default(false),
    author: s.string().default('Evan Maus'),
    tags: s.array(s.string()).default([]),
    metadata: s.metadata(),
    toc: s.toc(),
    body: s.mdx(),
  })
  .transform(data => ({
    ...data,
    url: `/case-studies/${data.slug}`,
    readingTime: Math.max(1, Math.ceil(data.metadata.readingTime)),
    wordCount: data.metadata.wordCount,
  }))

export default defineConfig({
  root: 'content',
  collections: {
    blogs: {
      name: 'Blog',
      pattern: 'blogs/**/*.mdx',
      schema: blog,
    },
    caseStudies: {
      name: 'CaseStudy',
      pattern: 'case-studies/**/*.mdx',
      schema: caseStudy,
    },
  },
  prepare: (data) => {
    if (!includeDrafts) {
      data.caseStudies = data.caseStudies.filter(post => !post.draft)
    }
  },
  output: {
    data: '.velite/generated',
    assets: 'public/',
    clean: true,
  },
  // Add MDX plugins
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [rehypePrettyCode, codeOptions]
    ]
  }
})
