import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { GoogleCalendarsResponse } from 'lib/interfaces'

export const getWorkEvents = (
  list: GoogleCalendarsResponse,
): NonNullable<CreatePageParameters['children']> => {
  const events = list.items

  const acceptedEvents = events.filter(({ attendees, organizer, start }) => {
    if (!start.dateTime) return false

    const { responseStatus } = attendees?.find(attendee => attendee.self) ?? {}
    return responseStatus === 'accepted' || organizer.self
  })

  return acceptedEvents.length === 0
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
            children: acceptedEvents.map(event => ({
              type: 'to_do',
              to_do: {
                rich_text: [
                  { type: 'text', text: { content: event.summary, link: { url: event.htmlLink } } },
                  { type: 'text', text: { content: ' ' } },
                  {
                    type: 'mention',
                    mention: { date: { start: event.start.dateTime, end: event.end.dateTime } },
                  },
                ],
              },
            })),
          },
        },
      ]
}
