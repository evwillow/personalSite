import { blogs } from "@/.velite/generated"
import { getBlogPosts } from "@/lib/contentful"
import Featured from "@/src/components/Home/Featured"
import Recent from "@/src/components/Home/Recent"

export default async function Home() {
  try {
    const posts = await getBlogPosts()

    return (
      <main className="flex flex-col items-center justify-center">
        <Featured posts={posts} />
        <Recent posts={posts} />
      </main>
    )
  } catch (error) {
    console.error("Error fetching blog posts in Home component:", error)
    return (
      <main className="flex flex-col items-center justify-center">
        <p>Unable to fetch blog posts. Please try again later.</p>
      </main>
    )
  }
}
