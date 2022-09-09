import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { formatISO } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { myNotion } from 'consts'

export const getPersonalTodos = async (): Promise<
  NonNullable<CreatePageParameters['children']>
> => {
  const { results } = await notionClient.databases.query({
    database_id: myNotion.db.betterThanYesterday.id,
    filter: {
      and: [
        { property: 'Tags', multi_select: { does_not_contain: 'Habit' } },
        {
          property: 'Date',
          date: { on_or_before: formatISO(new Date().setHours(23, 59, 59, 999)) },
        },
        {
          or: [
            { property: 'Status', status: { equals: 'To Do' } },
            { property: 'Status', status: { equals: 'Doing' } },
          ],
        },
      ],
    },
    sorts: [
      { property: 'Status', direction: 'ascending' },
      { property: 'Date', direction: 'ascending' },
      { property: 'Deadline', direction: 'ascending' },
      { property: 'Date Created', direction: 'descending' },
      { property: 'Project', direction: 'ascending' },
    ],
  })

  return results.length === 0
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '👣 Personal' },
                annotations: { bold: true },
              },
            ],
            children: results.map(page => ({
              type: 'to_do',
              to_do: {
                rich_text: [{ type: 'mention', mention: { page: { id: page.id } } }],
              },
            })),
          },
        },
      ]
}
