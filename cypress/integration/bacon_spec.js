/// <reference types="Cypress" />

const BACON_SELECTOR = '#bacon-container'

describe('Bacon Tests', () => {
  before('Navigate to the page containing bacon', () => {
    cy.visit('/bacon')
  })

  it ('should have exactly 1 bacon image', () => {
    cy.get(BACON_SELECTOR).get('img').should('have.length', 1)
  })

  it ('should be able to clone bacon', () => {
    cy.get(BACON_SELECTOR).get('button').click()

    cy.get(BACON_SELECTOR).get('img').should('have.length', 2)
  })

  it ('should be able to clone more bacon', () => {
    cy.get(BACON_SELECTOR).get('button').click()

    cy.get(BACON_SELECTOR).get('img').should('have.length', 3)
  })

  it ('should be able to clone even more bacon', () => {
    cy.get(BACON_SELECTOR).get('button').click()
    cy.get(BACON_SELECTOR).get('button').click()
    cy.get(BACON_SELECTOR).get('button').click()

    cy.get(BACON_SELECTOR).get('img').should('have.length', 6)
  })
})
