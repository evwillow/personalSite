import { createClient } from "contentful"
import fs from "node:fs"

// Local verification only: CONTENTFUL_FIXTURE=<path to JSON {items:[...]}>
// stands in for the Contentful API when no credentials are present. Ignored on
// Vercel. The access token is read only from the environment, never a file.
const fixturePath = !process.env.VERCEL ? process.env.CONTENTFUL_FIXTURE : undefined

// Only create client if environment variables are available
const client = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
  : null

export async function getBlogPosts() {
  console.log("Fetching blog posts...") // Debugging log

  if (fixturePath) {
    return JSON.parse(fs.readFileSync(fixturePath, "utf8")).items || []
  }
  
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
