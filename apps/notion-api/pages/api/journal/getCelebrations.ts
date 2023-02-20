import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { GoogleCalendarsResponse } from 'lib/interfaces'

export const getCelebrations = (
  list: GoogleCalendarsResponse,
): NonNullable<CreatePageParameters['children']> => {
  const events = list.items
  return events.length === 0
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
            children: events.map(event => ({
              type: 'to_do',
              to_do: {
                rich_text: [
                  { type: 'text', text: { content: event.summary, link: { url: event.htmlLink } } },
                ],
              },
            })),
          },
        },
      ]
}
