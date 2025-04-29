import { Article } from '@/types/article'
import { promises as fs } from 'fs'

const parseData = async () => {
  const file = await fs.readFile(process.cwd() + '/mock-news.json', 'utf8')
  return JSON.parse(file) as Article[]
}

// getAllNews
export const getAllArticles = async () => {
  return await parseData()
}

export const getOneArticle = async (
  slug: string
): Promise<Article | undefined> => {
  const data = await parseData()
  return data.find(item => item.slug === slug)
}

// getLatestNews
export const getLatestArticles = async () => {
  return (await parseData()).slice(0, 3)
}

// getAvailableNewsYears
export const getArticleYears = async () => {
  const articleYears = (await parseData()).reduce<number[]>(
    (years, article) => {
      const year = new Date(article.date).getFullYear()
      if (!years.includes(year)) {
        years.push(year)
      }
      return years
    },
    []
  )
  return articleYears.sort((a, b) => b - a)
}

// getAvailableNewsMonths
export const getArticleMonths = async (year: string) => {
  const articleMonths = (await parseData()).reduce<number[]>(
    (months, article) => {
      const articleDate = new Date(article.date)
      const articleYear = articleDate.getFullYear()
      if (articleYear === +year) {
        const month = articleDate.getMonth()
        if (!months.includes(month)) {
          months.push(month + 1)
        }
      }
      return months
    },
    []
  )
  return articleMonths.sort((a, b) => b - a)
}

// getNewsForYear
export const getArticlesForYear = async (year: string) => {
  return (await parseData()).filter(
    article => new Date(article.date).getFullYear() === +year
  )
}

// getNewsForYearAndMonth
export const getArticleForYearAndMonth = async (
  year: string,
  month: string
) => {
  return (await parseData()).filter(article => {
    const articleDate = new Date(article.date)
    const articleYear = articleDate.getFullYear()
    const articleMonth = articleDate.getMonth() + 1
    return articleYear === +year && articleMonth === +month
  })
}
