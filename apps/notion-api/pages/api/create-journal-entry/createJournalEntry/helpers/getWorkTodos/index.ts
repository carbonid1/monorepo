import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { isWeekend } from 'date-fns'

export const getWorkTodos = (): NonNullable<CreatePageParameters['children']> => {
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
            children: [
              {
                type: 'to_do',
                to_do: { rich_text: [] },
              },
            ],
          },
        },
      ]
}
