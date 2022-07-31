import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { notionClient } from 'lib/notion-client'
import { myNotion } from 'consts'

interface ToDoBase {
  id: string
  properties: {
    nextStepId: string
  }
}
interface ToDoWithNextStep extends ToDoBase {
  nextStep: string | null
}

export type ToDo = ToDoWithNextStep

export const getPersonalTodos = async (): Promise<
  NonNullable<CreatePageParameters['children']>
> => {
  const fetchedList = await notionClient.databases.query({
    database_id: myNotion.db.betterThanYesterday.id,
    filter: {
      and: [
        { property: 'Tags', multi_select: { does_not_contain: 'Habit' } },
        { property: 'Date', date: { on_or_before: new Date().toISOString() } },
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

  const baseTodos: ToDoBase[] = fetchedList.results.map(page => {
    if ('properties' in page) {
      return {
        id: page.id,
        properties: {
          nextStepId: page.properties['Next Step'].id,
        },
      }
    }

    throw new Error('ToDo has no properties')
  })

  const todosWithNextStep: ToDoWithNextStep[] = await Promise.all(
    baseTodos.map(async page => {
      const property = await notionClient.pages.properties.retrieve({
        page_id: page.id,
        property_id: page.properties.nextStepId,
      })

      if (property.type === 'property_item') {
        const firstResult = property.results[0]
        if (firstResult?.type === 'rich_text') {
          firstResult.rich_text.plain_text
          return { ...page, nextStep: firstResult.rich_text.plain_text ?? null }
        }
      }

      return { ...page, nextStep: null }
    }),
  )

  return todosWithNextStep.length === 0
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '👣 Personal' },
                annotations: { bold: true },
              },
            ],
            children: todosWithNextStep.map(page => ({
              type: 'to_do',
              to_do: {
                rich_text: [
                  { type: 'mention', mention: { page: { id: page.id } } },
                  page.nextStep
                    ? {
                        type: 'text',
                        annotations: { bold: true },
                        text: { content: `: ${page.nextStep}` },
                      }
                    : { type: 'text', text: { content: '' } },
                ],
              },
            })),
          },
        },
      ]
}
