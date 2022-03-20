import {
  handleNameValidation,
  handleEmailValidation,
  handlePostalCodeValidation,
  handlePhoneNumberValidation,
  handleCreditCardValidation,
  handleCVVValidation,
  handleExpirationDateValidation,
} from './validations'

const form = document.querySelector('form')

if (form) {
  const firstNameInput = document.querySelector(
    '[name="firstName"]'
  ) as HTMLInputElement
  const lastNameInput = document.querySelector(
    '[name="lastName"]'
  ) as HTMLInputElement
  const emailInput = document.querySelector(
    '[name="email"]'
  ) as HTMLInputElement
  const postalCodeInput = document.querySelector('[name="postalCode"]') as HTMLInputElement
  const phoneNumberInput = document.querySelector('[name="phone"]') as HTMLInputElement
  const creditCardInput = document.querySelector('[name="creditCard"]') as HTMLInputElement
  const securityCodeInput = document.querySelector('[name="CVV"]') as HTMLInputElement
  const expirationDateInput = document.querySelector('[name="expDate"]') as HTMLInputElement

  /**
   * We're validating user input as he's typing. The preferred way to do this would be to validate
   * on `blur`, however, using `blur` would not let the user navigate through fields until
   * the current one is valid because of the `invalid` event triggered by the reportValidity() call on `blur`.
   *
   * This behaviour could be avoided by not using the HTMLInputElement validity spec.
   *
   * We're also assuming all fields are required for the sake of simplicity.
   */
  firstNameInput.addEventListener('input', handleNameValidation)
  lastNameInput.addEventListener('input', handleNameValidation)
  emailInput.addEventListener('input', handleEmailValidation)
  postalCodeInput.addEventListener('input', handlePostalCodeValidation)
  phoneNumberInput.addEventListener('input', handlePhoneNumberValidation)
  creditCardInput.addEventListener('input', handleCreditCardValidation)
  securityCodeInput.addEventListener('input', handleCVVValidation)
  expirationDateInput.addEventListener('input', handleExpirationDateValidation)

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    /**
     * We prevent the form from submitting and post the data to the server
     * through a fetch request.
     */
    window.fetch('/order', {
      method: 'POST',
      body: new FormData(form),
    })
  })
}
