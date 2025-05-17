import NewsList from '@/components/news-list'
import { getAllArticles } from '@/lib/articles'

export default async function NewsPage() {
  const articles = await getAllArticles()
  
  return (
    <>
      <h1>News Page</h1>
      <NewsList articles={articles} />
    </>
  )
}
