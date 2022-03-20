const PHONE_NUMBER_REGEX = /^[\d]{9}$/
const POSTAL_CODE_REGEX = /^[\d]{5}$/
const CREDIT_CARD_REGEX = /^[\d]{16}$/
const CVV_REGEX = /^[\d]{3}$/
const EXPIRATION_DATE_REGEX = /^[\d]{2}\/[\d]{2}$/

export function validateMinLength (
  value: string | number,
  minLength: number = 1
): boolean {
  return String(value).trim().length >= minLength
}

export function setAndReportValidationFeedback ({
  field,
  message,
  reportValidity = true,
}: {
  field: HTMLInputElement;
  message: string;
  reportValidity?: boolean;
}): void {
  field.setCustomValidity(message)

  if (reportValidity) {
    field.reportValidity()
  }
}

function buildValidationMessage (field, message = 'must be valid.'): string {
  return `${field.previousElementSibling?.textContent} ${message}`
}

export function handleNameValidation (event: KeyboardEvent): void {
  const field = event.currentTarget as HTMLInputElement

  const isValid = validateMinLength(field.value, 3)

  setAndReportValidationFeedback({
    field,
    message: isValid
      ? ''
      : buildValidationMessage(field, 'must be at least 3 characters long.'),
    reportValidity: !isValid,
  })
}

export function handleEmailValidation (event: KeyboardEvent): void {
  const field = event.currentTarget as HTMLInputElement

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)

  setAndReportValidationFeedback({
    field,
    message: isValid ? '' : buildValidationMessage(field),
    reportValidity: !isValid,
  })
}

export function handlePostalCodeValidation (event: KeyboardEvent): void {
  const field = event.currentTarget as HTMLInputElement

  let message = ''

  const isValid = POSTAL_CODE_REGEX.test(field.value)

  if (!isValid) {
    if (field.value.length !== 5) {
      message = buildValidationMessage(field, 'must be 5 digits long.')
    } else {
      message = buildValidationMessage(field, 'must be numeric.')
    }
  }

  setAndReportValidationFeedback({
    field,
    message,
    reportValidity: !isValid,
  })
}

export function handlePhoneNumberValidation (event: KeyboardEvent): void {
  const field = event.currentTarget as HTMLInputElement

  const isValid = PHONE_NUMBER_REGEX.test(field.value)

  setAndReportValidationFeedback({
    field,
    message: isValid ? '' : buildValidationMessage(field, 'must be 9 digits long.'),
    reportValidity: !isValid,
  })
}

export function handleCreditCardValidation (event: KeyboardEvent): void {
  const field = event.currentTarget as HTMLInputElement

  const isValid = CREDIT_CARD_REGEX.test(field.value)

  setAndReportValidationFeedback({
    field,
    message: isValid ? '' : buildValidationMessage(field, 'must be 16 digits long.'),
    reportValidity: !isValid,
  })
}

export function handleCVVValidation (event: KeyboardEvent): void {
  const field = event.currentTarget as HTMLInputElement

  const isValid = CVV_REGEX.test(field.value)

  setAndReportValidationFeedback({
    field,
    message: isValid ? '' : buildValidationMessage(field, 'must be 3 digits long.'),
    reportValidity: !isValid,
  })
}

export function handleExpirationDateValidation (event: KeyboardEvent): void {
  const field = event.currentTarget as HTMLInputElement

  const isValid = EXPIRATION_DATE_REGEX.test(field.value)

  setAndReportValidationFeedback({
    field,
    message: isValid ? '' : buildValidationMessage(field, 'must have the following format MM/YY.'),
    reportValidity: !isValid,
  })
}
