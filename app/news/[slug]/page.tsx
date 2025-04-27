import * as mockNews from '@/mock-news.json'
import Image from 'next/image'

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = mockNews.find(item => item.slug === slug)
  if (!item) return

  return (
    <article className="news-article">
      <header>
        <Image src={`/images/${item.image}`} alt={item.title} />
        <h1>{item.title}</h1>
        <time dateTime={item.date}>{item.date}</time>
      </header>
      <p>{item.content}</p>
    </article>
  )
}
