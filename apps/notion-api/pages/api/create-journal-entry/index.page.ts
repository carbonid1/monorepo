import type { NextApiRequest, NextApiResponse } from 'next'
import { createJournalEntry } from './createJournalEntry'
import { allowPOST } from 'middleware'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  allowPOST(req, res)

  await createJournalEntry(req.body)
  res.json({ message: 'Done!' })
}
