import type { NextApiRequest, NextApiResponse } from 'next'
import { triggerJournalEntryCreation } from './triggerJournalEntryCreation'
import { allowCORS, allowPOST, checkAuthorization } from 'middleware'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await allowCORS(req, res)
  checkAuthorization(req, res)
  allowPOST(req, res)

  triggerJournalEntryCreation()
  res.json({ message: 'Done!' })
}
