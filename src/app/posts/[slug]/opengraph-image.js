import { ImageResponse } from "next/og"
import { getPosts, getPost } from "@/lib/posts"
import siteMetadata from "@/src/utils/siteMetaData"

export const alt = "Post by Evan Maus"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export default async function OpengraphImage({ params }) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post ? post.title : "Post"
  const meta = post ? `${post.readingTime} min read` : ""

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#1b1b1b",
          color: "#f2f2f2",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#00cffd", letterSpacing: 2 }}>FIELD NOTES</div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 56 : 68, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#bdbdbd" }}>
          <span>{siteMetadata.author}</span>
          <span>{meta}</span>
          <span>evwillow.com</span>
        </div>
      </div>
    ),
    size
  )
}
