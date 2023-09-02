import { updateExchangeRates } from './updateExchangeRates'

describe('updateExchangeRates', () => {
  it('calls Notion API with correct rates', () => {
    const rates = {
      UAH: { rate: '36.5686' },
      GBP: { rate: '0.8861' },
      EUR: { rate: '1.013' },
      PLN: { rate: '0.232' },
    }

    cy.intercept('/v1/pages/d7a9423acb1d4be4951bdd2da61d9047', [])
      .as('updateUAH')
      .intercept('/v1/pages/cd020b59658340058d1677425d28c051', [])
      .as('updateGBP')
      .intercept('/v1/pages/f85faa0106ef4ea59909a6b366df5b7b', [])
      .as('updateEUR')
      .intercept('/v1/pages/20850c53907446de871f8e5b5e815d7d', [])
      .as('updatePLN')
      .then(() => updateExchangeRates({ rates }))

    cy.wait('@updateUAH')
      .its('request.body')
      .should('deep.equal', { properties: { Rate: { number: 36.5686 } } })
    cy.wait('@updateGBP')
      .its('request.body')
      .should('deep.equal', { properties: { Rate: { number: 0.8861 } } })
    cy.wait('@updateEUR')
      .its('request.body')
      .should('deep.equal', { properties: { Rate: { number: 1.013 } } })
    cy.wait('@updatePLN')
      .its('request.body')
      .should('deep.equal', { properties: { Rate: { number: 0.232 } } })
  })
})
