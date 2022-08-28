import { formatRFC3339 } from 'date-fns'

type Params = {
  timezone: string
  hour: number
}
type Response = {
  calendarEvents: {
    timeMin: string
    timeMax: string
  }
}
type FormInputs = (params: Params) => Response

export const formInputs: FormInputs = ({ timezone, hour }) => {
  process.env.TZ = timezone
  const timeMin = formatRFC3339(new Date().setHours(0, hour, 0, 0))
  const timeMax = formatRFC3339(new Date().setHours(23, 59, 59, 999))

  return {
    calendarEvents: {
      timeMax,
      timeMin,
    },
  }
}
