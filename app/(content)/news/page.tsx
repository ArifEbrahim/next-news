'use client'

import NewsList from '@/components/news-list'
import { useState, useEffect } from 'react'

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true)
      const response = await fetch('http://localhost:8080/news')

      if (!response.ok) {
        setError('Failed to fetch news')
        setIsLoading(false)
      }

      const data = await response.json()
      setIsLoading(false)
      setArticles(data)
    }

    fetchNews()
  }, [])

  if (isLoading) {
    return <>Loading...</>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>News Page</h1>
      {articles.length > 0 && <NewsList articles={articles} />}
    </>
  )
}
