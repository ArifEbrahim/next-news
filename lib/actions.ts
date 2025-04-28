import { Article } from '@/types/article'
import { promises as fs } from 'fs'

export async function getAllArticles(): Promise<Article[]> {
  const file = await fs.readFile(process.cwd() + '/mock-news.json', 'utf8')
  return JSON.parse(file)
}

export async function getOneArticle(
  slug: string
): Promise<Article | undefined> {
  const file = await fs.readFile(process.cwd() + '/mock-news.json', 'utf8')
  const data = JSON.parse(file) as Article[]
  return data.find(item => item.slug === slug)
}
