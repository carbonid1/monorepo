import { GoogleCalendarsResponse } from 'lib/interfaces'
import { sendEmail } from './sendEmail'
import { createNotionPage } from './createNotionPage'
import { getCelebrations } from './getCelebrations'
import { getWorkEvents } from './getWorkEvents'
import { getHabits } from './getHabits'
import { getEngTodos } from './getEngTodos'
import { getWorkTodos } from './getWorkTodos'
import { getPersonalTodos } from './getPersonalTodos'
import { isProduction } from 'consts'

export interface CreateParams {
  workEvents: GoogleCalendarsResponse
  celebrationEvents: GoogleCalendarsResponse
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
}

export const create = async ({ celebrationEvents, workEvents, dayName }: CreateParams) => {
  const createPageResponse = await createNotionPage([
    ...(await getHabits({ dayName })),
    ...(await getPersonalTodos()),
    ...getCelebrations(celebrationEvents),
    ...(await getEngTodos()),
    ...getWorkEvents(workEvents),
    ...(await getWorkTodos()),
  ])

  if (isProduction) {
    await sendEmail('url' in createPageResponse ? createPageResponse.url : null)
  }
}
