import { getPersonalTodos } from './getPersonalTodos'

describe('getPersonalTodos', () => {
  it('does not inject the Kyivstar todo item when today is not the last day of month', () => {
    const now = new Date(2022, 1, 20) // 20th of February 2022
    cy.clock(now)

    cy.intercept('https://api.notion.com/**', { results: [] })
      .as('notionApi')
      .then(async () => {
        const todos = await getPersonalTodos()
        expect(todos).to.be.empty
      })
  })

  it('injects the Kyivstar todo item when it is the last day of month', () => {
    const now = new Date(2022, 1, 28) // 20th of February 2022
    cy.clock(now)

    cy.intercept('https://api.notion.com/**', { results: [] })
      .as('notionApi')
      .then(async () => {
        const todos = await getPersonalTodos()
        expect(todos[0]).to.have.nested.property(
          'toggle.children[0].to_do.rich_text[0].mention.page.id',
          '200e71ab17cf480e913c969aeb22b55a',
        )
      })
  })
})
