import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import axios, { AxiosResponse } from 'axios'
import { pipedreamAPI } from 'consts/pipedream'

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
  const {
    data: { calendar_events },
  } = await axios.post<PipedreamArgs, AxiosResponse<PipedreamResponse>>(
    pipedreamAPI.getCelebrationsCalendar,
    {
      eventTimeMin: '2022-07-29T00:00:00+03:00',
      eventTimeMax: '2022-07-29T00:01:00+03:00',
    },
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
