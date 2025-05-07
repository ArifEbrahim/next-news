import { getOneArticle } from '@/lib/articles'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function InterceptedImagePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getOneArticle(slug)
  if (!article) notFound()

  return (
    <>
      <h2>Intercepted!</h2>
      <div className="fullscreen-image">
        <Image src={`/images/${article.image}`} alt={article.title} fill />
      </div>
    </>
  )
}
