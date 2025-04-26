export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <h1>News Detail Page</h1>
      <p>News Id: {id}</p>
    </>
  )
}
