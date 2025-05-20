import NewsList from '@/components/news-list'
import { getArticleForYearAndMonth, getArticlesForYear } from '@/lib/articles'

interface FilterdArticleProps {
  year: string
  month?: string
}

export default async function FilteredArticles({
  year,
  month
}: FilterdArticleProps) {
  let articles

  if (year && !month) {
    articles = await getArticlesForYear(year)
  } else if (year && month) {
    articles = await getArticleForYearAndMonth(year, month)
  }

  let newsContent = <p>No news found</p>

  if (articles && articles.length > 0) {
    newsContent = <NewsList articles={articles} />
  }

  return newsContent
}
