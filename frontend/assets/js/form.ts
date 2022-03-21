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
const placeOrderButton = document.getElementById('new-order') as HTMLButtonElement
const orderOutput = document.getElementById('order-output')! as HTMLSpanElement

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
   */
  firstNameInput.addEventListener('input', handleNameValidation)
  lastNameInput.addEventListener('input', handleNameValidation)
  emailInput.addEventListener('input', handleEmailValidation)
  postalCodeInput.addEventListener('input', handlePostalCodeValidation)
  phoneNumberInput.addEventListener('input', handlePhoneNumberValidation)
  creditCardInput.addEventListener('input', handleCreditCardValidation)
  securityCodeInput.addEventListener('input', handleCVVValidation)
  expirationDateInput.addEventListener('input', handleExpirationDateValidation)

  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', () => {
      form.classList.remove('hidden')
      form.removeAttribute('aria-hidden')

      placeOrderButton.classList.add('hidden')
      placeOrderButton.setAttribute('aria-hidden', 'true')

      orderOutput.textContent = ''
    })
  }

  form.addEventListener('submit', (e) => {
    /**
     * We prevent the form from submitting and post the data to the server
     * through a fetch request.
     */
    e.preventDefault()

    window.fetch('/order', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()).then((data) => {
      if (data.message) {
        // We assume the API returns a message if the order was successful.
        orderOutput.textContent = data.message
        orderOutput.classList.toggle('error', false)

        form.reset()
        form.classList.add('hidden')
        form.setAttribute('aria-hidden', 'true')

        placeOrderButton.classList.remove('hidden')
        placeOrderButton.removeAttribute('aria-hidden')
      } else {
        // If the API returns an error, we assume it's a validation error.
        orderOutput.textContent = 'Please check your input and try again.'
        orderOutput.classList.toggle('error', true)

        const fields = Object.keys(data)

        // Focus on the first field with an invalid value and show the validation message
        const firstInvalidField = form.querySelector(`[name="${fields[0]}"]`) as HTMLInputElement | HTMLSelectElement
        firstInvalidField.setCustomValidity(String(data[fields[0]]))
        firstInvalidField.focus()
      }
    }).catch(() => {
      orderOutput.textContent = 'An error occurred. Please try again.'
      orderOutput.classList.toggle('error', true)
    })
  })
}
