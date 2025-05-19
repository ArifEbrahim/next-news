import ModalBackdrop from '@/components/modal-backdrop'
import { getOneArticle } from '@/lib/articles'
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
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${article.image}`} alt={article.title} />
        </div>
      </dialog>
    </>
  )
}
