import { getAllArticles } from '@/lib/articles'
import Image from 'next/image'
import Link from 'next/link'

export default async function NewsPage() {
  const articles = await getAllArticles()

  return (
    <>
      <h1>News Page</h1>
      <ul className="news-list">
        {articles.map(item => (
          <li key={item.id}>
            <Link href={`/news/${item.slug}`}>
              <Image
                src={`/images/${item.image}`}
                alt={item.title}
                height={400}
                width={400}
              />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
