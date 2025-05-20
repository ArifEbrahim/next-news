import {
  getArticleMonths,
  getArticleYears
} from '@/lib/articles'
import Link from 'next/link'

interface FilterHeaderProps {
  year: string
  month?: string
}

export default async function FilterHeader({ year, month }: FilterHeaderProps) {
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