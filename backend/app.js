const sqlite = require('better-sqlite3')
const cors = require('cors')
const express = require('express')

const db = sqlite('data.db')

const app = express()

app.use(cors())

app.get('/news', (req, res) => {
  const news = db.prepare('SELECT * FROM news').all()
  res.json(news)
})

app.listen(8080)
