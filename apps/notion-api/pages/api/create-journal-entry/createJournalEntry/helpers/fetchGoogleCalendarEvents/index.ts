import axios, { AxiosResponse } from 'axios'
import { formatRFC3339 } from 'date-fns'
import { isProduction, pipedreamAPI } from 'consts'

interface PipedreamArgs {
  eventTimeMin: string
  eventTimeMax: string
}

export interface CalendarEvent {
  url: string
  name: string
  date: {
    start: string
    end: string
  }
}

interface PipedreamResponse {
  settleEvents: CalendarEvent[]
  celebrationEvents: CalendarEvent[]
}

export const fetchGoogleCalendarEvents = async () => {
  if (isProduction) {
    const timeZone = 'Europe/Kiev'
    const eventTimeMin = formatRFC3339(new Date().setHours(0, 0, 0, 0))
    const eventTimeMax = formatRFC3339(new Date().setHours(23, 59, 59, 999))

    const {
      data: { celebrationEvents, settleEvents },
    } = await axios.post<PipedreamArgs, AxiosResponse<PipedreamResponse>>(
      pipedreamAPI.googleCalendarEvents,
      { eventTimeMin, eventTimeMax, timeZone },
    )

    return {
      settleEvents,
      celebrationEvents,
    }
  } else {
    return {
      settleEvents: [],
      celebrationEvents: [],
    }
  }
}
