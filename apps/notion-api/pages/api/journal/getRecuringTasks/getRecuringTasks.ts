import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { format, isLastDayOfMonth } from 'date-fns'
import { notionClient } from 'lib/notion-client'
import { myNotionIds } from 'consts'

export const getRecuringTasks = async (): Promise<
  NonNullable<CreatePageParameters['children']>
> => {
  const today = new Date().setHours(23, 59, 59, 999)
  const dayName = format(today, 'EEEE')

  const fetchedList = await notionClient.databases.query({
    database_id: myNotionIds.db.recurrentTasks,
    filter: {
      and: [
        { property: 'Status', status: { equals: 'Doing' } },
        {
          or: [
            { property: 'Time', multi_select: { contains: 'Every day' } },
            { property: 'Time', multi_select: { contains: dayName } },
            ...(isLastDayOfMonth(today)
              ? [{ property: 'Time', multi_select: { contains: 'Last day of month' } }]
              : []),
          ],
        },
      ],
    },
  })

  const sorted = fetchedList.results.sort((pageA, pageB) => {
    // @ts-expect-error it's fine!
    const multiselectA = pageA.properties.Time.multi_select
    // @ts-expect-error it's fine!
    const multiselectB = pageB.properties.Time.multi_select

    const isAMorning = multiselectA.some(({ name }) => name === 'Morning')
    const isAEvening = multiselectA.some(({ name }) => name === 'Evening')
    const isANone = !isAMorning && !isAEvening
    const isBMorning = multiselectB.some(({ name }) => name === 'Morning')
    const isBEvening = multiselectB.some(({ name }) => name === 'Evening')
    const isBNone = !isBMorning && !isBEvening

    // sort by morning, none, evening
    if (isAMorning && !isBMorning) return -1
    if (!isAMorning && isBMorning) return 1
    if (isANone && !isBNone) return -1
    if (!isANone && isBNone) return 1
    if (isAEvening && !isBEvening) return -1
    if (!isAEvening && isBEvening) return 1

    return 0
  })

  return sorted.length === 0
    ? []
    : [
        {
          type: 'toggle',
          toggle: {
            rich_text: [
              {
                type: 'text',
                text: { content: '🧔 Recurring tasks' },
                annotations: { bold: true },
              },
            ],
            children: sorted.map(page => ({
              type: 'to_do',
              to_do: { rich_text: [{ type: 'mention', mention: { page: { id: page.id } } }] },
            })),
          },
        },
      ]
}
