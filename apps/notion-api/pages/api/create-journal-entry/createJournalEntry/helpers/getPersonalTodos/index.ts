import type {
  CreatePageParameters,
  DatePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { MyNotion } from 'consts'

interface ToDoBase {
  id: string
  properties: {
    dateId: string
    statusId: string
    nextStepId: string
  }
}
interface ToDoWithDate extends ToDoBase {
  date: DatePropertyItemObjectResponse['date']
}

interface ToDoWithStatus extends ToDoWithDate {
  status: 'to-do' | 'doing' | null
}

interface ToDoWithNextStep extends ToDoWithStatus {
  nextStep: string | null
}

export type ToDo = ToDoWithNextStep

export const getPersonalTodos = async (): Promise<
  NonNullable<CreatePageParameters['children']>
> => {
  const fetchedList = await notionClient.databases.query({
    database_id: MyNotion.db.betterThanYesterday.id,
    filter: {
      and: [
        { property: 'Tags', multi_select: { does_not_contain: 'Habit' } },
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
          dateId: page.properties.Date.id,
          statusId: page.properties.Status.id,
          nextStepId: page.properties['Next Step'].id,
        },
      }
    }

    throw new Error('ToDo has no properties')
  })

  const todosWithDate: ToDoWithDate[] = await Promise.all(
    baseTodos.map(async page => {
      const property = await notionClient.pages.properties.retrieve({
        page_id: page.id,
        property_id: page.properties.dateId,
      })

      if (property.type === 'date') {
        return { ...page, date: property.date }
      }

      return { ...page, date: null }
    }),
  )

  const todosWithStatus: ToDoWithStatus[] = await Promise.all(
    todosWithDate.map(async page => {
      const property = await notionClient.pages.properties.retrieve({
        page_id: page.id,
        property_id: page.properties.statusId,
      })

      if (property.type === 'select') {
        switch (property.select?.name) {
          case 'To Do':
            return { ...page, status: 'to-do' }
          case 'Doing':
            return { ...page, status: 'doing' }
        }
      }
      return { ...page, status: null }
    }),
  )

  const todosBeforeTomorrow = todosWithStatus.filter(page => {
    if (page.status === 'to-do') {
      if (page.date?.start) {
        return isBefore(parseISO(page.date?.start), startOfTomorrow())
      }
      return false
    }
    return true
  })

  const todosWithNextStep: ToDoWithNextStep[] = await Promise.all(
    todosBeforeTomorrow.map(async page => {
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
