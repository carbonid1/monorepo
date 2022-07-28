import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { formatISO } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { MyNotion } from 'consts'

export const createPage = (children: NonNullable<CreatePageParameters['children']>) =>
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
    children,
  })
