import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'

export const getMemo = (): NonNullable<CreatePageParameters['children']> => {
  return [
    {
      type: 'toggle',
      toggle: {
        rich_text: [
          {
            type: 'text',
            text: { content: '📅 Memo' },
            annotations: { bold: true },
          },
        ],
        children: [],
      },
    },
  ]
}
