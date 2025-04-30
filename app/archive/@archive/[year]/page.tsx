import NewsList from '@/components/news-list'
import { getArticlesForYear } from '@/lib/articles'

export default async function FilteredNewsPage({
  params
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params
  const articles = await getArticlesForYear(year)
  return <NewsList articles={articles} />
}
