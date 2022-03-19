const BACON_SELECTOR = '#bacon-container'

describe('Bacon Tests', () => {
  before('Navigate to the page containing bacon', () => {
    cy.visit('localhost:3333/bacon')
  })

  it ('should have exactly 1 bacon image', () => {
    cy.get(BACON_SELECTOR).get('img').should('have.length', 1)
  })

  it ('should be able to clone bacon', () => {
    cy.get(BACON_SELECTOR).get('button').click()

    cy.get(BACON_SELECTOR).get('img').should('have.length', 2)
  })
})
