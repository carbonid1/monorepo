import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { isWeekend } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { myNotion } from 'consts'

export const getWorkTodos = async (): Promise<NonNullable<CreatePageParameters['children']>> => {
  const fetchedList = await notionClient.databases.query({
    database_id: myNotion.db.workTodo.id,
    filter: {
      or: [
        { property: 'Status', status: { equals: 'Doing' } },
        { property: 'Status', status: { equals: 'To Do' } },
      ],
    },
  })

  const { results } = fetchedList

  const isTodayWeekend = isWeekend(new Date())
  return isTodayWeekend
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '🧑‍💻 Work' },
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
