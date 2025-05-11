'use client'

import { getOneArticle } from '@/lib/articles'
import { notFound, useRouter } from 'next/navigation'

export default async function InterceptedImagePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getOneArticle(slug)
  const router = useRouter()
  if (!article) notFound()

  return (
    <>
      <div className="model-backdrop" onClick={router.back}/>
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${article.image}`} alt={article.title} />
        </div>
      </dialog>
    </>
  )
}
