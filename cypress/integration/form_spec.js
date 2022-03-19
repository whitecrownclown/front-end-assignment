/// <reference types="Cypress" />

describe('Form Tests', () => {
  before('Navigate to the form page', () => {
    cy.visit('localhost:3333/')
  })

  it ('should have a form', () => {
    cy.get('form').should('have.length', 1)
  })

  it ('should have the correct form action and method', () => {
    cy.get('form').should('have.attr', 'action', '/order')
    cy.get('form').should('have.attr', 'method', 'post')
  })

  it('should have a [type="submit"] button', () => {
    cy.get('form').get('button').should('have.attr', 'type', 'submit')
  })

  it ('should have all the fields', () => {
    cy.get('form').get('input').should('have.length', 8)
    cy.get('form').get('select').should('have.length', 1)
  })

  it ('should have an order summary', () => {
    cy.get('#order-summary').should('have.length', 1)
  })
})
