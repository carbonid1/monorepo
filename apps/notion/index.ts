import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cron from 'node-cron'
import { createJournalEntry } from './src/modules/createJournalEntry'

// createJournalEntry()
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error(err)
//     process.exit(1)
//   })

const app = express()
const { PORT } = process.env

app.listen(PORT, () => {
  cron.schedule('24 1 * * *', createJournalEntry)
  if (process.env.NODE_ENV === 'development') {
    console.log(`⚡️ [server]: Server is running at https://localhost:${PORT}`)
  }
})
