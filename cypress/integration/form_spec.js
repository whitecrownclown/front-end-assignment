/// <reference types="Cypress" />

const FORM_SELECTOR = '[data-cy="order-form"]'
const SUBMIT_BUTTON_SELECTOR = '[data-cy="submit"]'
const ORDER_SUMMARY_SELECTOR = '[data-cy="order-summary"]'

// Fields
const FIRST_NAME_SELECTOR = '[data-cy="firstName"]'
const LAST_NAME_SELECTOR = '[data-cy="lastName"]'
const EMAIL_SELECTOR = '[data-cy="email"]'
const COUNTRY_SELECTOR = '[data-cy="country"]'
const POSTAL_CODE_SELECTOR = '[data-cy="postalCode"]'
const PHONE_NUMBER_SELECTOR = '[data-cy="phone"]'
const CREDIT_CARD_NUMBER_SELECTOR = '[data-cy="creditCard"]'
const CVV_SELECTOR = '[data-cy="CVV"]'
const EXPIRATION_DATE_SELECTOR = '[data-cy="expDate"]'

describe('Form Tests', () => {
  before('Navigate to the form page', () => {
    cy.visit('/')
  })

  describe('Base Form Layout', () => {
    it('should have a form', () => {
      cy.get(FORM_SELECTOR).should('have.length', 1)
    })

    it('should have the correct form action and method', () => {
      cy.get(FORM_SELECTOR).should('have.attr', 'action', '/order')
      cy.get(FORM_SELECTOR).should('have.attr', 'method', 'post')
    })

    it('should have a [type="submit"] button', () => {
      cy.get(FORM_SELECTOR)
        .get(SUBMIT_BUTTON_SELECTOR)
        .should('have.attr', 'type', 'submit')
    })

    it('should have all the fields', () => {
      cy.get(FORM_SELECTOR).get('input').should('have.length', 8)
      cy.get(FORM_SELECTOR).get('select').should('have.length', 1)
    })

    it('should have an order summary', () => {
      cy.get(ORDER_SUMMARY_SELECTOR).should('have.length', 1)
    })
  })

  describe('Form Tab Navigation', () => {
    it('should focus the first invalid input when submitting with empty fields', () => {
      cy.get(FORM_SELECTOR).get(SUBMIT_BUTTON_SELECTOR).click()

      cy.get(FORM_SELECTOR).get('input').first().should('be.focused')
    })

    it('should allow tab navigation', () => {
      cy.get(FORM_SELECTOR).get('input').first().tab()

      cy.get(FORM_SELECTOR).get('input').first().should('not.be.focused')
      cy.get(FORM_SELECTOR).get('input').eq(1).should('be.focused')
    })

    it('should allow tab navigation if the current input is invalid', () => {
      cy.get(FORM_SELECTOR).get('input').first().type('ab')

      cy.get(FORM_SELECTOR)
        .get('input')
        .first()
        .invoke('prop', 'validity')
        .should('deep.include', {
          valid: false,
        })

      cy.tab()

      cy.get(FORM_SELECTOR).get('input').eq(1).should('be.focused')
    })
  })

  describe('Form Validation', () => {
    it('should validate first name input', () => {
      cy.get(FORM_SELECTOR).get(FIRST_NAME_SELECTOR).type('abc')

      cy.get(FORM_SELECTOR)
        .get('input')
        .first()
        .invoke('prop', 'validity')
        .should('deep.include', {
          valid: true,
        })
    })

    it('should validate last name input', () => {
      cy.get(FORM_SELECTOR).get(LAST_NAME_SELECTOR).type('bca')

      cy.get(FORM_SELECTOR)
        .get('input')
        .first()
        .invoke('prop', 'validity')
        .should('deep.include', {
          valid: true,
        })
    })

    it('should validate email address', () => {
      cy.get(FORM_SELECTOR).get(EMAIL_SELECTOR).type('123')

      cy.get(FORM_SELECTOR)
        .get(EMAIL_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', {
          valid: false,
        })

      cy.get(FORM_SELECTOR).get(EMAIL_SELECTOR).type('test@test')

      cy.get(FORM_SELECTOR)
        .get(EMAIL_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', {
          valid: false,
        })

      cy.get(FORM_SELECTOR).get(EMAIL_SELECTOR).clear().type('test@test.test')

      cy.get(FORM_SELECTOR)
        .get(EMAIL_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', {
          valid: true,
        })
    })

    it('should have US selected as default value', () => {
      cy.get(FORM_SELECTOR).get(COUNTRY_SELECTOR).should('have.value', 'US')
    })

    it('should be able to select through countries', () => {
      cy.get(FORM_SELECTOR).get(COUNTRY_SELECTOR).select('RO')

      cy.get(FORM_SELECTOR).get(COUNTRY_SELECTOR).should('have.value', 'RO')
    })

    it('should validate postal code', () => {
      cy.get(FORM_SELECTOR).get(POSTAL_CODE_SELECTOR).type('abc')

      cy.get(FORM_SELECTOR)
        .get(POSTAL_CODE_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: false })

      cy.get(FORM_SELECTOR).get(POSTAL_CODE_SELECTOR).clear().type('12345')

      cy.get(FORM_SELECTOR)
        .get(POSTAL_CODE_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: true })
    })

    it ('should validate phone number', () => {
      cy.get(FORM_SELECTOR).get(PHONE_NUMBER_SELECTOR).type('abc')

      cy.get(FORM_SELECTOR)
        .get(PHONE_NUMBER_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: false })

      cy.get(FORM_SELECTOR).get(PHONE_NUMBER_SELECTOR).clear().type('1234567899')

      cy.get(FORM_SELECTOR)
        .get(PHONE_NUMBER_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: true })
    })

    it ('should validate credit card number', () => {
      cy.get(FORM_SELECTOR).get(CREDIT_CARD_NUMBER_SELECTOR).type('abc')

      cy.get(FORM_SELECTOR)
        .get(CREDIT_CARD_NUMBER_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: false })

      cy.get(FORM_SELECTOR).get(CREDIT_CARD_NUMBER_SELECTOR).clear().type('0000000000000000')

      cy.get(FORM_SELECTOR)
        .get(CREDIT_CARD_NUMBER_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: true })
    })

    it ('should validate security code', () => {
      cy.get(FORM_SELECTOR).get(CVV_SELECTOR).type('abc')

      cy.get(FORM_SELECTOR)
        .get(CVV_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: false })

      cy.get(FORM_SELECTOR).get(CVV_SELECTOR).clear().type('123')

      cy.get(FORM_SELECTOR)
        .get(CVV_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: true })
    })

    it ('should validate expiration date', () => {
      cy.get(FORM_SELECTOR).get(EXPIRATION_DATE_SELECTOR).type('abc')

      cy.get(FORM_SELECTOR)
        .get(EXPIRATION_DATE_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: false })

      cy.get(FORM_SELECTOR).get(EXPIRATION_DATE_SELECTOR).clear().type('123')

      cy.get(FORM_SELECTOR)
        .get(EXPIRATION_DATE_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: false })

      cy.get(FORM_SELECTOR).get(EXPIRATION_DATE_SELECTOR).clear().type('2002')

      cy.get(FORM_SELECTOR)
        .get(EXPIRATION_DATE_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: false, patternMismatch: true })

      cy.get(FORM_SELECTOR).get(EXPIRATION_DATE_SELECTOR).clear().type('20/02')

      cy.get(FORM_SELECTOR)
        .get(EXPIRATION_DATE_SELECTOR)
        .invoke('prop', 'validity')
        .should('deep.include', { valid: true, patternMismatch: false })
    })
  })

  describe('Form Submission', () => {
    it ('should send a POST request with the form fields', () => {
      cy.intercept('POST', '/order').as('order')
      cy.get(FORM_SELECTOR).get(SUBMIT_BUTTON_SELECTOR).click()

      cy.wait('@order').then((interception) => {
        expect(interception.request.body).to.eql({
          CVV: '123',
          country: 'RO',
          creditCard: '0000000000000000',
          email: 'test@test.test',
          expDate: '20/02',
          firstName: 'ababc',
          lastName: 'bca',
          phone: '123456789',
          postalCode: '12345',
        })
      })
    })
  })
})
