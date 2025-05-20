import NewsList from '@/components/news-list'
import {
  getArticleForYearAndMonth,
  getArticleMonths,
  getArticlesForYear,
  getArticleYears
} from '@/lib/articles'
import Link from 'next/link'
import { Suspense } from 'react'

interface SharedFilterProps {
  year: string
  month?: string
}

const FilterHeader = async ({ year, month }: SharedFilterProps) => {
  const availableArticleYears = await getArticleYears()
  const availableArticleMonths = await getArticleMonths(year)
  let links = availableArticleYears

  const isNoNewsForYear = year && !availableArticleYears.includes(year)
  const isNoNewsForMonth = month && !availableArticleMonths.includes(month)

  if (isNoNewsForMonth || isNoNewsForYear) {
    throw new Error('invalid filter')
  }

  if (year && !month) {
    links = availableArticleMonths
  } else if (year && month) {
    links = []
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map(link => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

const FilteredArticles = async ({ year, month }: SharedFilterProps) => {
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

export default async function FilteredNewsPage({
  params
}: {
  params: Promise<{ filter: string[] }>
}) {
  const { filter } = await params
  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1]

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredArticles year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  )
}
