import { Suspense } from 'react'
import FilterHeader from './filter-header'
import FilteredArticles from './filtered-articles'

export default async function FilteredNewsPage({
  params
}: {
  params: Promise<{ filter: string[] }>
}) {
  const { filter } = await params
  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1]

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredArticles year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  )
}
