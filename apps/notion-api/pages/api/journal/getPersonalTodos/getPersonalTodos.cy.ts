import { getPersonalTodos } from './getPersonalTodos'

describe('getPersonalTodos', () => {
  it('injects Kyivstar item when it is the last day of month', () => {
    const now = new Date(2023, 1, 20) // 02/20/2023

    cy.clock(now, ['Date'])

    cy.intercept('https://api.notion.com/**', { results: [] })
      .as('betterThanYesterday')
      .then(async () => {
        const result = await getPersonalTodos()
        expect(result).to.eq([])
      })
  })
})
