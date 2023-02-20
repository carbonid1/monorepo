import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { formatISO } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { myNotion } from 'consts'

export const createNotionPage = (children: NonNullable<CreatePageParameters['children']>) => {
  return notionClient.pages.create({
    parent: { database_id: myNotion.db.journal.id, type: 'database_id' },
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
}
