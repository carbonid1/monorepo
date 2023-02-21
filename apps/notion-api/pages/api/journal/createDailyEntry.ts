import { GoogleCalendarsResponse } from 'lib/interfaces'
import { createNotionPage } from './createNotionPage'
import { getCelebrations } from './getCelebrations'
import { getWorkEvents } from './getWorkEvents'
import { getHabits } from './getHabits'
import { getEngTodos } from './getEngTodos'
import { getWorkTodos } from './getWorkTodos'
import { getPersonalTodos } from './getPersonalTodos/getPersonalTodos'

interface Params {
  workEvents: GoogleCalendarsResponse
  celebrationEvents: GoogleCalendarsResponse
  timezone: string
}

export const createDailyEntry = async ({ celebrationEvents, workEvents, timezone }: Params) => {
  process.env.TZ = timezone

  await createNotionPage([
    ...(await getHabits()),
    ...(await getPersonalTodos()),
    ...getCelebrations(celebrationEvents),
    ...(await getEngTodos()),
    ...getWorkEvents(workEvents),
    ...(await getWorkTodos()),
  ])
}
