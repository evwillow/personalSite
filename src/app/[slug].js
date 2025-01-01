import { getBlogPosts } from "@/lib/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export async function getStaticPaths() {
  const posts = await getBlogPosts()

  // Generate paths based on the slugs from Contentful
  const paths = posts.map((post) => ({
    params: { slug: post.fields.slug },
  }))

  return {
    paths,
    fallback: false, // Return 404 for unknown slugs
  }
}

export async function getStaticProps({ params }) {
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.fields.slug === params.slug)

  console.log("Fetched post:", post) // Debugging log

  if (!post) {
    return {
      notFound: true, // Return 404 if no post is found
    }
  }

  return {
    props: { post },
  }
}

export default function BlogPost({ post }) {
  // Ensure `post` exists before rendering
  if (!post) {
    return <div>Error: Post not found</div>
  }

  return (
    <div>
      <h1>{post.fields.title}</h1>
      <div>
        {post.fields.body ? (
          documentToReactComponents(post.fields.body) // Render rich text
        ) : (
          <p>No content available</p>
        )}{" "}
        {/* Fallback for missing body */}
      </div>
    </div>
  )
}
