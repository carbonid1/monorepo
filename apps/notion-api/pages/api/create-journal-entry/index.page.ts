import type { NextApiRequest, NextApiResponse } from 'next'
import { cors } from 'lib/cors'
import { createJournalEntry } from './createJournalEntry'

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: typeof cors) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) reject(result)
      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors)
  await createJournalEntry()

  res.json({ message: 'Success!' })
}
