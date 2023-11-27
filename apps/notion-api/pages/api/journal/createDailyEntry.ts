import { GoogleCalendarsResponse } from 'lib/interfaces'
import { createNotionPage } from './createNotionPage'
import { getCelebrations } from './getCelebrations'
import { getWorkEvents } from './getWorkEvents'
import { getRecurringTasks } from './getRecurringTasks/getRecurringTasks'
import { getWorkTodos } from './getWorkTodos/getWorkTodos'
import { getPersonalTodos } from './getPersonalTodos/getPersonalTodos'
import { getMemo } from './getMemo/getMemo'

interface Params {
  workEvents: GoogleCalendarsResponse
  celebrationEvents: GoogleCalendarsResponse
  timezone: string
}

export const createDailyEntry = async ({ celebrationEvents, workEvents, timezone }: Params) => {
  process.env.TZ = timezone

  await createNotionPage([
    ...(await getRecurringTasks()),
    ...(await getPersonalTodos()),
    ...getCelebrations(celebrationEvents),
    ...getWorkEvents(workEvents),
    ...(await getWorkTodos()),
    ...getMemo(),
  ])
}
