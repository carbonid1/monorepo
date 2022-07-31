import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import axios, { AxiosResponse } from 'axios'
import { formatRFC3339 } from 'date-fns'
import { pipedreamAPI } from 'consts'

interface PipedreamArgs {
  eventTimeMin: string
  eventTimeMax: string
}

interface PipedreamResponse {
  calendar_events: {
    url: string
    name: string
  }[]
}

export const getCelebrations = async (): Promise<NonNullable<CreatePageParameters['children']>> => {
  const eventTimeMin = formatRFC3339(new Date().setHours(12, 0))
  const eventTimeMax = formatRFC3339(new Date().setHours(12, 1))

  const {
    data: { calendar_events },
  } = await axios.post<PipedreamArgs, AxiosResponse<PipedreamResponse>>(
    pipedreamAPI.getCelebrationsCalendar,
    { eventTimeMin, eventTimeMax },
  )

  return calendar_events.length === 0
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '🎉 Celebrations' },
                annotations: { bold: true },
              },
            ],
            children: calendar_events.map(event => ({
              type: 'to_do',
              to_do: {
                rich_text: [
                  { type: 'text', text: { content: event.name, link: { url: event.url } } },
                ],
              },
            })),
          },
        },
      ]
}
