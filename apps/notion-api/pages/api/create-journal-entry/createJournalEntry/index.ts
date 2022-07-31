import { createPage } from './helpers/createPage'
import { getPersonalTodos } from './helpers/getPersonalTodos'
import { getEngTodos } from './helpers/getEngTodos'
import { getHabits } from './helpers/getHabits'
import { getWorkTodos } from './helpers/getWorkTodos'
import { getWorkEvents } from './helpers/getWorkEvents'
import { sendEmail } from './helpers/sendEmail'
import { getCelebrations } from './helpers/getCelebrations'
import { fetchGoogleCalendarEvents } from './helpers/fetchGoogleCalendarEvents'
import { isProduction } from 'consts'

export const createJournalEntry = async () => {
  const { celebrationEvents, settleEvents } = await fetchGoogleCalendarEvents()

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
