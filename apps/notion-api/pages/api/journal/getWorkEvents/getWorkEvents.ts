import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { format, parseISO } from 'date-fns'
import { GoogleCalendarsResponse } from 'lib/interfaces'

export const getFormattedDates = (start: string, end: string) => {
  const startDate = parseISO(start)
  const endDate = parseISO(end)

  const formattedStart = format(startDate, 'HH:mm')
  const formattedEnd = format(endDate, 'HH:mm')

  return `${formattedStart} - ${formattedEnd}`
}

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
                    type: 'text',
                    text: { content: getFormattedDates(event.start.dateTime, event.end.dateTime) },
                  },
                ],
              },
            })),
          },
        },
      ]
}
