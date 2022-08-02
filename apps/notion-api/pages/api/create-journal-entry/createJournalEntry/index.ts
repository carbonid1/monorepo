import { RequestBody } from '../intefaces'
import { createPage } from './helpers/createPage'
import { getPersonalTodos } from './helpers/getPersonalTodos'
import { getEngTodos } from './helpers/getEngTodos'
import { getHabits } from './helpers/getHabits'
import { getWorkTodos } from './helpers/getWorkTodos'
import { getWorkEvents } from './helpers/getWorkEvents'
import { sendEmail } from './helpers/sendEmail'
import { getCelebrations } from './helpers/getCelebrations'
import { isProduction } from 'consts'

type CreateJournalEntry = (params: RequestBody) => ReturnType<typeof createPage>

export const createJournalEntry: CreateJournalEntry = async ({
  settleEvents,
  celebrationEvents,
}) => {
  const createPageResponse = await createPage([
    ...(await getHabits()),
    ...(await getPersonalTodos()),
    ...(await getCelebrations(celebrationEvents)),
    ...(await getEngTodos()),
    ...(await getWorkEvents(settleEvents)),
    ...(await getWorkTodos()),
  ])

  if (isProduction) {
    await sendEmail('url' in createPageResponse ? createPageResponse.url : null)
  }

  return createPageResponse
}
