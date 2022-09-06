import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
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
        { property: 'Date', date: { on_or_before: new Date().toISOString() } },
        { property: 'Tasks', relation: { is_empty: true } },
        {
          or: [
            {
              property: 'Status',
              select: { equals: 'To Do' },
            },
            {
              property: 'Status',
              select: { equals: 'Doing' },
            },
          ],
        },
      ],
    },
    sorts: [
      { property: 'Status', direction: 'ascending' },
      { property: 'Date', direction: 'ascending' },
      { property: 'Deadline', direction: 'ascending' },
      { property: 'Date Created', direction: 'descending' },
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
