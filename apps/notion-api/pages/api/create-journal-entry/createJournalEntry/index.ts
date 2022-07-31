import { createPage } from './helpers/createPage'
import { getPersonalTodos } from './helpers/getPersonalTodos'
import { getEngTodos } from './helpers/getEngTodos'
import { getHabits } from './helpers/getHabits'
import { getWorkTodos } from './helpers/getWorkTodos'
import { sendEmail } from './helpers/sendEmail'
import { getCelebrations } from './helpers/getCelebrations'
import { isProduction } from 'consts'

export const createJournalEntry = async () => {
  const createPageResponse = await createPage([
    ...(await getHabits()),
    ...(await getPersonalTodos()),
    ...(isProduction ? await getCelebrations() : []),
    ...(await getEngTodos()),
    ...(await getWorkTodos()),
  ])

  if (isProduction) {
    await sendEmail('url' in createPageResponse ? createPageResponse.url : null)
  }

  return createPageResponse
}
