import { GoogleCalendarsResponse } from 'lib/interfaces'
import { createNotionPage } from './createNotionPage'
import { getCelebrations } from './getCelebrations'
import { getWorkEvents } from './getWorkEvents'
import { getRecuringTasks } from './getRecuringTasks/getRecuringTasks'
import { getEngTodos } from './getEngTodos'
import { getWorkTodos } from './getWorkTodos/getWorkTodos'
import { getPersonalTodos } from './getPersonalTodos/getPersonalTodos'

interface Params {
  workEvents: GoogleCalendarsResponse
  celebrationEvents: GoogleCalendarsResponse
  timezone: string
}

export const createDailyEntry = async ({ celebrationEvents, workEvents, timezone }: Params) => {
  process.env.TZ = timezone

  await createNotionPage([
    ...(await getRecuringTasks()),
    ...(await getPersonalTodos()),
    ...getCelebrations(celebrationEvents),
    ...(await getEngTodos()),
    ...getWorkEvents(workEvents),
    ...(await getWorkTodos()),
  ])
}
