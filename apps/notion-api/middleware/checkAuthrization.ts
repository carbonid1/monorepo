import { NextApiRequest, NextApiResponse } from 'next'

export const checkAuthorization = (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers

  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(401).json({ success: false })
  }
}
