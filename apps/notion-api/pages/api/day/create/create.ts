import { GoogleCalendarsResponse } from 'lib/interfaces'
import { sendEmail } from './sendEmail'
import { createNotionPage } from './createNotionPage'
import { getCelebrations } from './getCelebrations'
import { getWorkEvents } from './getWorkEvents'
import { isProduction } from 'consts'

interface CreateParams {
  celebrationEvents: GoogleCalendarsResponse
  workEvents: GoogleCalendarsResponse
}

export const create = async ({ celebrationEvents, workEvents }: CreateParams) => {
  const createPageResponse = await createNotionPage([
    // ...(await getHabits()),
    // ...(await getPersonalTodos()),
    ...getCelebrations(celebrationEvents),
    // ...(await getEngTodos()),
    ...getWorkEvents(workEvents),
    // ...(await getWorkTodos()),
  ])

  if (isProduction) {
    await sendEmail('url' in createPageResponse ? createPageResponse.url : null)
  }
}
