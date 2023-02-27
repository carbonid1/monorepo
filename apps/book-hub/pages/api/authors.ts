import { NextApiResponse } from 'next'
import prisma from 'lib/prisma'

const handler = async (_, res: NextApiResponse) => {
  const authors = await prisma.author.findMany()

  res.status(200).json({ authors })
}

export default handler
