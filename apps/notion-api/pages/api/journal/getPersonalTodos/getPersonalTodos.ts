import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { formatISO } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { myNotionIds } from 'consts'

export const getPersonalTodos = async (): Promise<
  NonNullable<CreatePageParameters['children']>
> => {
  const today = new Date().setHours(23, 59, 59, 999)
  const { results } = await notionClient.databases.query({
    database_id: myNotionIds.db.betterThanYesterday,
    filter: {
      and: [
        {
          property: 'Date',
          date: { on_or_before: formatISO(today) },
        },
        {
          or: [
            { property: 'Status', status: { equals: 'To Do' } },
            { property: 'Status', status: { equals: 'Doing' } },
          ],
        },
        {
          property: 'Items',
          relation: { is_empty: true },
        },
      ],
    },
    sorts: [
      { property: 'Status', direction: 'ascending' },
      { property: 'Date', direction: 'ascending' },
      { property: 'Date Created', direction: 'descending' },
    ],
  })

  const pageIds = results.map(page => page.id)
  return [
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
        children: pageIds.map(pageId => ({
          type: 'to_do',
          to_do: {
            rich_text: [{ type: 'mention', mention: { page: { id: pageId } } }],
          },
        })),
      },
    },
  ]
}
