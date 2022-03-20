/// <reference types="Cypress" />

const FORM_SELECTOR = '[data-cy="order-form"]'
const SUBMIT_BUTTON_SELECTOR = '[data-cy="submit"]'
const ORDER_SUMMARY_SELECTOR = '[data-cy="order-summary"]'

describe('Form Tests', () => {
  before('Navigate to the form page', () => {
    cy.visit('/')
  })

  it ('should have a form', () => {
    cy.get(FORM_SELECTOR).should('have.length', 1)
  })

  it ('should have the correct form action and method', () => {
    cy.get(FORM_SELECTOR).should('have.attr', 'action', '/order')
    cy.get(FORM_SELECTOR).should('have.attr', 'method', 'post')
  })

  it('should have a [type="submit"] button', () => {
    cy.get(FORM_SELECTOR).get(SUBMIT_BUTTON_SELECTOR).should('have.attr', 'type', 'submit')
  })

  it ('should have all the fields', () => {
    cy.get(FORM_SELECTOR).get('input').should('have.length', 8)
    cy.get(FORM_SELECTOR).get('select').should('have.length', 1)
  })

  it ('should have an order summary', () => {
    cy.get(ORDER_SUMMARY_SELECTOR).should('have.length', 1)
  })
})
