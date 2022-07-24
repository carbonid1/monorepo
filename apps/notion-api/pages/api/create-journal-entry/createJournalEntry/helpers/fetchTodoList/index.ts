import type { DatePropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints'
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
  status: 'to-do' | 'permanent' | 'doing' | null
}

interface ToDoWithNextStep extends ToDoWithStatus {
  nextStep: string | null
}

export type ToDo = ToDoWithNextStep

export const fetchTodoList = async (): Promise<ToDo[]> => {
  const fetchedList = await notionClient.databases.query({
    database_id: MyNotion.db.betterThanYesterday.id,
    filter: {
      or: [
        { property: 'Status', select: { equals: 'To Do' } },
        { property: 'Status', select: { equals: 'Doing' } },
        { property: 'Status', select: { equals: 'Permanent' } },
      ],
    },
  })

  const basetodos: ToDoBase[] = fetchedList.results.map(page => {
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
    basetodos.map(async page => {
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
          case 'Permanent':
            return { ...page, status: 'permanent' }
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

  return todosWithNextStep
}
