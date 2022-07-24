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

  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const page = await createJournalEntry()
        res.json({ message: 'url' in page ? page.url : page.id })
      } else {
        res.status(401).json({ success: false })
      }
    } catch (err) {
      // @ts-expect-error message is always present on eror
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
