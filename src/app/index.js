import { getBlogPosts } from "@/lib/contentful"
import Menu from "@/src/components/Home/Menu"

export async function getStaticProps() {
  const posts = await getBlogPosts()

  if (!posts || posts.length === 0) {
    console.log(
      "No posts were fetched. Please check your Contentful API and content model."
    )
  } else {
    console.log("Fetched posts:", posts)
  }

  return {
    props: { posts },
    revalidate: 10,
  }
}

export default function BlogList({ posts }) {
  return (
    <div>
      <h1>All Blog Posts</h1>
      <Menu posts={posts} />
    </div>
  )
}
