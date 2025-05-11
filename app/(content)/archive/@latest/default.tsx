import NewsList from "@/components/news-list"
import { getLatestArticles } from "@/lib/articles"

export default async function LatestNewsPage() {
  const latestArticles = await getLatestArticles()

  return (
    <>
      <h2>Latest News</h2>
      <NewsList articles={latestArticles} />
    </>
  )
}