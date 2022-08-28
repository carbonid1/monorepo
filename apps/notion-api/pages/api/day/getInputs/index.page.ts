import type { NextApiRequest, NextApiResponse } from 'next'
import { cors } from 'lib/cors'
import { formInputs } from './formInputs'

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
  if (req.method === 'GET') {
    try {
      const { authorization } = req.headers

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        res.json(formInputs(req.body))
      } else {
        res.status(401).json({ success: false })
      }
    } catch (err) {
      // @ts-expect-error message is always present on eror
      res.status(err.code).json({ statusCode: err.code, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
