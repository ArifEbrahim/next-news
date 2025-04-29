import { getOneArticle } from '@/lib/articles'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getOneArticle(slug)
  if (!article) notFound()

  return (
    <article className="news-article">
      <header>
        <Image
          src={`/images/${article.image}`}
          alt={article.title}
          height={900}
          width={900}
        />
        <h1>{article.title}</h1>
        <time dateTime={article.date}>{article.date}</time>
      </header>
      <p>{article.content}</p>
    </article>
  )
}
