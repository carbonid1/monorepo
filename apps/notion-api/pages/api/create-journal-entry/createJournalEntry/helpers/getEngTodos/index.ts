import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionClient } from 'lib/notion-client'
import { myNotion } from 'consts'

export const getEngTodos = async (): Promise<NonNullable<CreatePageParameters['children']>> => {
  const fetchedList = await notionClient.databases.query({
    database_id: myNotion.db.engProjects.id,
    filter: {
      or: [
        { property: 'Status', select: { equals: 'Doing' } },
        { property: 'Status', select: { equals: 'To Do' } },
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
                text: { content: '👨‍🏭 Eng Projects' },
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
