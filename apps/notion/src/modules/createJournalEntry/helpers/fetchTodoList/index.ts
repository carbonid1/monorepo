import type { DatePropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { MyNotion } from '../../../../consts'
import { notionClient } from '../../../../lib/notion-client'

interface ToDoBase {
  id: string
  properties: {
    dateId: string
    statusId: string
  }
}
interface ToDoWithDate extends ToDoBase {
  date: DatePropertyItemObjectResponse['date']
}
interface ToDoWithStatus extends ToDoWithDate {
  status: 'to-do' | 'permanent' | 'doing' | null
}

export type ToDo = ToDoWithStatus

export const fetchTodoList = async (): Promise<ToDo[]> => {
  const baseToDos: ToDoBase[] = await notionClient.databases
    .query({
      database_id: MyNotion.db.betterThanYesterday.id,
      filter: {
        or: [
          { property: 'Status', select: { equals: 'To Do' } },
          { property: 'Status', select: { equals: 'Doing' } },
          { property: 'Status', select: { equals: 'Permanent' } },
        ],
      },
    })
    .then(res =>
      res.results.map(page => {
        if ('properties' in page) {
          return {
            id: page.id,
            properties: {
              dateId: page.properties.Date.id,
              statusId: page.properties.Status.id,
            },
          }
        }

        throw new Error('ToDo has no properties')
      }),
    )

  const toDosWithDate: ToDoWithDate[] = await Promise.all(
    baseToDos.map(async page => {
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

  const toDosWithStatus: ToDoWithStatus[] = await Promise.all(
    toDosWithDate.map(async page => {
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

  const toDos = toDosWithStatus.filter(page => {
    if (page.status === 'to-do') {
      if (page.date?.start) {
        return isBefore(parseISO(page.date?.start), startOfTomorrow())
      }
      return false
    }
    return true
  })

  return toDos
}
