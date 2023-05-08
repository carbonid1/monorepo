import { getRecurringTasks } from './getRecurringTasks'

describe('getRecuringTasks', () => {
  it('applies usual filters', () => {
    const now = new Date(2023, 3, 15) // 15th of April 2023, Saturday
    cy.clock(now)

    cy.intercept('https://api.notion.com/**', { results: [] })
      .as('notionApi')
      .then(getRecurringTasks)

    cy.wait('@notionApi').then(({ request }) => {
      expect(request)
        .to.have.nested.property('body.filter.and[1].or')
        .to.deep.equal([
          { property: 'Time', multi_select: { contains: 'Every day' } },
          { property: 'Time', multi_select: { contains: 'Saturday' } },
        ])
    })
  })

  it('filters by last day of month', () => {
    const now = new Date(2023, 3, 30) // 30th of April 2023, Sunday
    cy.clock(now)

    cy.intercept('https://api.notion.com/**', { results: [] })
      .as('notionApi')
      .then(getRecurringTasks)

    cy.wait('@notionApi').then(({ request }) => {
      expect(
        request.body.filter.and[1].or.some(
          filter => filter.multi_select.contains === 'Last day of month',
        ),
      )
    })
  })

  it('sorts results by Time', () => {
    const response = [
      {
        id: '1',
        properties: {
          Time: {
            multi_select: [{ name: 'Morning' }],
          },
        },
      },
      {
        id: '2',
        properties: {
          Time: {
            multi_select: [{ name: 'Evening' }],
          },
        },
      },
      {
        id: '3',
        properties: {
          Time: {
            multi_select: [{ name: 'Monday' }, { name: 'Morning' }],
          },
        },
      },
      {
        id: '4',
        properties: {
          Time: {
            multi_select: [{ name: 'Sunday' }, { name: 'Evening' }],
          },
        },
      },
      {
        id: '5',
        properties: {
          Time: {
            multi_select: [{ name: 'Friday' }, { name: 'Hello' }],
          },
        },
      },
      {
        id: '6',
        properties: {
          Time: {
            multi_select: [{ name: 'Morning' }],
          },
        },
      },
      {
        id: '7',
        properties: {
          Time: {
            multi_select: [{ name: 'Evening' }],
          },
        },
      },
      {
        id: '8',
        properties: {
          Time: {
            multi_select: [{ name: 'Morning' }],
          },
        },
      },
    ]

    cy.intercept('https://api.notion.com/**', { results: response })
      .as('notionApi')
      .then(async () => {
        const todos = await getRecurringTasks()
        expect(todos[0]).to.have.nested.property(
          'toggle.children[0].to_do.rich_text[0].mention.page.id',
          '1',
        )
        expect(todos[0]).to.have.nested.property(
          'toggle.children[1].to_do.rich_text[0].mention.page.id',
          '3',
        )
        expect(todos[0]).to.have.nested.property(
          'toggle.children[2].to_do.rich_text[0].mention.page.id',
          '6',
        )
        expect(todos[0]).to.have.nested.property(
          'toggle.children[3].to_do.rich_text[0].mention.page.id',
          '8',
        )
        expect(todos[0]).to.have.nested.property(
          'toggle.children[4].to_do.rich_text[0].mention.page.id',
          '5',
        )
        expect(todos[0]).to.have.nested.property(
          'toggle.children[5].to_do.rich_text[0].mention.page.id',
          '2',
        )
        expect(todos[0]).to.have.nested.property(
          'toggle.children[6].to_do.rich_text[0].mention.page.id',
          '4',
        )
        expect(todos[0]).to.have.nested.property(
          'toggle.children[7].to_do.rich_text[0].mention.page.id',
          '7',
        )
      })
  })
})
