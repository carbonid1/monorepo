import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { CalendarEvent } from 'pages/api/create-journal-entry/intefaces'

export const getWorkEvents = async (
  events: CalendarEvent[],
): Promise<NonNullable<CreatePageParameters['children']>> => {
  return events.length === 0
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '⏰ Work Events' },
                annotations: { bold: true },
              },
            ],
            children: events.map(event => ({
              type: 'to_do',
              to_do: {
                rich_text: [
                  { type: 'text', text: { content: event.name, link: { url: event.url } } },
                  { type: 'text', text: { content: ' ' } },
                  {
                    type: 'mention',
                    mention: { date: { start: event.date.start, end: event.date.end } },
                  },
                ],
              },
            })),
          },
        },
      ]
}
