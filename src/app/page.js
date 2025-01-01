import {blogs} from "@/.velite/generated";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <FeaturedPosts blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </main>
  )
}
