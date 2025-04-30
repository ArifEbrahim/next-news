import { Article } from '@/types/article'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

interface NewsListProps extends PropsWithChildren {
  articles: Article[]
}

export default function NewsList({ articles }: NewsListProps) {
  return (
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
  )
}
