import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { format, isLastDayOfMonth } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { myNotionIds } from 'consts'

export const getRecurringTasks = async (): Promise<
  NonNullable<CreatePageParameters['children']>
> => {
  const today = new Date().setHours(23, 59, 59, 999)
  const dayName = format(today, 'EEEE')

  const fetchedList = await notionClient.databases.query({
    database_id: myNotionIds.db.recurrentTasks,
    sorts: [{ property: 'Order', direction: 'ascending' }],
    filter: {
      and: [
        { property: 'Status', status: { equals: 'Doing' } },
        {
          or: [
            { property: 'Time', multi_select: { contains: 'Every day' } },
            { property: 'Time', multi_select: { contains: dayName } },
            ...(isLastDayOfMonth(today)
              ? [{ property: 'Time', multi_select: { contains: 'Last day of month' } }]
              : []),
          ],
        },
      ],
    },
  })

  return fetchedList.results.length === 0
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '🧔 Recurring tasks' },
                annotations: { bold: true },
              },
            ],
            children: fetchedList.results.map(page => ({
              type: 'to_do',
              to_do: { rich_text: [{ type: 'mention', mention: { page: { id: page.id } } }] },
            })),
          },
        },
      ]
}
