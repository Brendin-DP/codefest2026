import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const dbPath = join(projectRoot, 'public', 'db.json')
const distPath = join(projectRoot, 'dist')

const app = express()
app.use(express.json())

app.get('/api/db', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, must-revalidate')
  try {
    if (!existsSync(dbPath)) {
      return res.status(404).json({ error: 'db.json not found' })
    }
    const raw = readFileSync(dbPath, 'utf-8')
    const db = JSON.parse(raw)
    res.json(db)
  } catch (err) {
    res.status(500).json({ error: err?.message ?? 'Failed to read db' })
  }
})

app.patch('/api/allocations', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, must-revalidate')
  try {
    const { allocations } = req.body
    if (!allocations || typeof allocations !== 'object') {
      return res.status(400).json({ error: 'allocations object required' })
    }
    if (!existsSync(dbPath)) {
      return res.status(404).json({ error: 'db.json not found' })
    }
    const raw = readFileSync(dbPath, 'utf-8')
    const db = JSON.parse(raw)
    db.allocations = allocations
    writeFileSync(dbPath, JSON.stringify(db, null, 2))
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err?.message ?? 'Failed to save allocations' })
  }
})

app.get('/db.json', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, must-revalidate')
  try {
    if (!existsSync(dbPath)) {
      return res.status(404).send('db.json not found')
    }
    const raw = readFileSync(dbPath, 'utf-8')
    res.type('json').send(raw)
  } catch (err) {
    res.status(500).send(err?.message ?? 'Failed to read db')
  }
})

if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('/*splat', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(join(distPath, 'index.html'))
  })
}

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
