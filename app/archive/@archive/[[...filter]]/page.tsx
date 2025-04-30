import NewsList from '@/components/news-list'
import { getArticlesForYear, getArticleYears } from '@/lib/articles'
import Link from 'next/link'

export default async function FilteredNewsPage({
  params
}: {
  params: Promise<{ filter: string[] }>
}) {
  const { filter } = await params
  const articles = filter ? await getArticlesForYear(filter[0]) : []
  const links = await getArticleYears()
  
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => (
              <li key={link}>
                <Link href={`/archive/${link}`}>{link}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <NewsList articles={articles} />
    </>
  )
}
