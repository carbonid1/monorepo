import { getRecurringTasks } from './getRecurringTasks'

describe('getRecurringTasks', () => {
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
})
