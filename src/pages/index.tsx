import { AboutMe } from "~/components/AboutMe";
import { LatestBlogPosts } from "~/components/blog/LatestBlogPosts";

export default function Home() {
  return (
    <div className="flex flex-col text-theme-text-2">
      <h2 className="p-8 text-center text-4xl font-black">
        Hello and welcome to Reconnect Reiki.
      </h2>
      <AboutMe />
      <LatestBlogPosts />
    </div>
  );
}
