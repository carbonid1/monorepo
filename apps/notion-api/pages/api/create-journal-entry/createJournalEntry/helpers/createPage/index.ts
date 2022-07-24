import { MyNotion } from 'consts'
import { formatISO } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { ToDo } from '../fetchTodoList'

export const createPage = (toDos: ToDo[]) =>
  notionClient.pages.create({
    parent: { database_id: MyNotion.db.journal.id, type: 'database_id' },
    icon: { type: 'emoji', emoji: '⁉' },
    properties: {
      Name: {
        title: [
          {
            type: 'mention',
            mention: { date: { start: formatISO(new Date(), { representation: 'date' }) } },
          },
        ],
      },
    },
    children: [
      {
        type: 'toggle',
        toggle: {
          rich_text: [
            {
              type: 'text',
              text: { content: '🏃‍♂️ Routine' },
              annotations: { bold: true },
            },
          ],
          children: toDos
            .filter(todo => todo.status === 'permanent')
            .map(page => ({
              type: 'to_do',
              to_do: { rich_text: [{ type: 'mention', mention: { page: { id: page.id } } }] },
            })),
        },
      },
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
          children: toDos
            .filter(todo => todo.status !== 'permanent')
            .map(page => ({
              type: 'to_do',
              to_do: { rich_text: [{ type: 'mention', mention: { page: { id: page.id } } }] },
            })),
        },
      },
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
          children: [
            {
              type: 'to_do',
              to_do: { rich_text: [] },
            },
          ],
        },
      },
    ],
  })
