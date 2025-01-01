import { createClient } from "contentful"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticProps() {
  console.log("Running getStaticProps...")
  const posts = await getBlogPosts()
  console.log("Fetched posts in getStaticProps:", posts)
  return {
    props: { posts },
  }
}

export async function getBlogPosts() {
  console.log("Fetching blog posts...") // Debugging log
  try {
    const response = await client.getEntries({
      content_type: "blog", // Replace with actual Content Type ID
    })
    console.log("Contentful response:", response) // Log full response
    return response.items
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}
