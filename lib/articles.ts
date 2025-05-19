import { Article } from '@/types/article'
import sql from 'better-sqlite3'

const db = sql('data.db')

const addDelay = async () =>
  await new Promise(resolve => setTimeout(resolve, 2000))

interface SQLData {
  year?: string
  month?: string
}

// getAllNews
export const getAllArticles = async () => {
  await addDelay()
  return db.prepare('SELECT * FROM news').all() as Article[]
}

// getNewsItem
export const getOneArticle = async (slug: string): Promise<Article> => {
  await addDelay()
  const article = db
    .prepare('SELECT * FROM news WHERE slug = ?')
    .get(slug) as Article
  return article
}

// getLatestNews
export const getLatestArticles = async () => {
  await addDelay()
  const latestArticles = db
    .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
    .all() as Article[]
  return latestArticles
}

// getAvailableNewsYears
export const getArticleYears = async () => {
  await addDelay()
  const articleYears = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all() as SQLData[]

  return articleYears.map(year => year.year)
}

// getAvailableNewsMonths
export const getArticleMonths = async (year: string) => {
  await addDelay()
  const articleMonths = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year) as SQLData[]

  return articleMonths.map(month => month.month)
}

// getNewsForYear
export const getArticlesForYear = async (year: string) => {
  await addDelay()
  const articles = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year)
  return articles
}

// getNewsForYearAndMonth
export const getArticleForYearAndMonth = async (
  year: string,
  month: string
) => {
  await addDelay()
  const articles = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month)
  return articles
}
