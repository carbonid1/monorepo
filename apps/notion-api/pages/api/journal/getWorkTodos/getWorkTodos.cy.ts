import { getWorkTodos } from './getWorkTodos'

describe('getWorkTodos', () => {
  it('does not return the checklist on the weekend', () => {
    const now = new Date(2022, 1, 26) // 26th of February 2022
    cy.clock(now)

    cy.intercept('https://api.notion.com/**', { results: [] })
      .as('notionApi')
      .then(async () => {
        const result = await getWorkTodos()
        expect(result).to.be.empty
      })
  })

  it('includes default items every working day', () => {
    const now = new Date(2022, 1, 24) // 24th of February 2022
    cy.clock(now)

    cy.intercept('https://api.notion.com/**', { results: [] })
      .as('notionApi')
      .then(async () => {
        const [checklist] = await getWorkTodos()
        expect(checklist).to.have.nested.property(
          'toggle.children[0].to_do.rich_text[0].text.content',
          'Review PRs',
        )
        expect(checklist).to.have.nested.property(
          'toggle.children[1].to_do.rich_text[0].text.content',
          'Slack reminders',
        )
      })
  })
})
