import { NextApiRequest, NextApiResponse } from 'next'

export const allowPOST = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
