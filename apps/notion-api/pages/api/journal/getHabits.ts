import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { format } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { myNotion } from 'consts'

export const getHabits = async (): Promise<NonNullable<CreatePageParameters['children']>> => {
  const dayName = format(new Date(), 'EEEE')
  const fetchedList = await notionClient.databases.query({
    database_id: myNotion.db.betterThanYesterday.id,
    filter: {
      and: [
        { property: 'Status', status: { equals: 'Doing' } },
        { property: 'Tags', multi_select: { contains: 'Habit' } },
        {
          or: [
            { property: 'Days', multi_select: { is_empty: true } },
            { property: 'Days', multi_select: { contains: dayName } },
          ],
        },
      ],
    },
  })

  const { results } = fetchedList

  return results.length === 0
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '🏃‍♂️ Habits' },
                annotations: { bold: true },
              },
            ],
            children: results.map(page => ({
              type: 'to_do',
              to_do: { rich_text: [{ type: 'mention', mention: { page: { id: page.id } } }] },
            })),
          },
        },
      ]
}
