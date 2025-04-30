import NewsList from '@/components/news-list'
import {
  getArticleForYearAndMonth,
  getArticleMonths,
  getArticlesForYear,
  getArticleYears
} from '@/lib/articles'
import { Article } from '@/types/article'
import Link from 'next/link'

export default async function FilteredNewsPage({
  params
}: {
  params: Promise<{ filter: string[] }>
}) {
  const { filter } = await params
  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1]

  let articles: Article[] = []
  let links = await getArticleYears()

  if (selectedYear && !selectedMonth) {
    articles = await getArticlesForYear(selectedYear)
    links = await getArticleMonths(selectedYear)
  } else if (selectedYear && selectedMonth) {
    articles = await getArticleForYearAndMonth(selectedYear, selectedMonth)
    links = []
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
      <NewsList articles={articles} />
    </>
  )
}
