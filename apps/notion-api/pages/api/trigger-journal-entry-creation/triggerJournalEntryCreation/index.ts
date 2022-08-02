import axios from 'axios'
import { formatRFC3339 } from 'date-fns'
import { pipedreamAPI } from 'consts'

const { VERCEL_URL, VERCEL_ENV } = process.env

export const triggerJournalEntryCreation = async () => {
  const timeZone = 'Europe/Kiev'
  const eventTimeMin = formatRFC3339(new Date().setHours(0, 0, 0, 0))
  const eventTimeMax = formatRFC3339(new Date().setHours(23, 59, 59, 999))

  const { data } = await axios.post(pipedreamAPI.googleCalendarEvents, {
    eventTimeMin,
    eventTimeMax,
    timeZone,
  })

  return axios.post(
    `${VERCEL_ENV === 'development' ? 'http' : 'https'}://${VERCEL_URL}/api/create-journal-entry`,
    {
      settleEvents: data.settleEvents,
      celebrationEvents: data.celebrationEvents,
    },
  )
}
