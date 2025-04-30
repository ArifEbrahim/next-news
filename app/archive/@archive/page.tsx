import { getArticleYears } from '@/lib/articles'
import Link from 'next/link'

export default async function ArchivePage() {
  const links = await getArticleYears()

  return (
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
  )
}
