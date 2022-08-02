import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

// Initializing the cors middleware
// https://github.com/expressjs/cors#configuration-options
const cors = Cors({ methods: ['POST', 'GET', 'HEAD'] })

export const allowCORS = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    cors(req, res, result => {
      if (result instanceof Error) reject(result)
      return resolve(result)
    })
  })
}
