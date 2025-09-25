import { createClient } from "contentful"

// Only create client if environment variables are available
const client = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
  : null

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
  
  // Check if Contentful client is available
  if (!client) {
    console.log("Contentful credentials not configured, returning empty array")
    return []
  }
  
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
