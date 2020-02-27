import _set from 'lodash/set'
import _get from 'lodash/get'
import { SubmissionError } from 'redux-form'
import * as Yup from 'yup'

export const getMessageError = e => {
  let currentMessage = 'Error'

  if(e.response) {
    const { message = '', errors } = e.response.data

    if(message) currentMessage = message
    else if(errors) for (const key of Object.keys(errors)) currentMessage += errors[key].join(',') + '\n'
  } else {
    currentMessage = e.message
  }

  return currentMessage
}

export const asyncValidate = schema => {
  return async values => {
    return await schema
      .validate(values, { abortEarly: false })
      .then(() => {}) // Return empty errors object
      .catch(errors => {
        throw errors.inner.reduce((errors, err) => ({
          ...errors,
          [err.path]: err.message
        }), {}) // Return errors object
      })
  }
}

export const syncValidate = (schema, values) => {
  try {
    schema.validateSync(values, { abortEarly: false })

    // Not errors
    return {}
  } catch (validationError) {
    let errors = {}

    validationError.inner.map(validationError => {
      const isArraySchema = _get(schema.fields, validationError.path, null) instanceof Yup.array

      _set(
        errors,
        isArraySchema ? `${validationError.path}._error` : validationError.path,
        validationError.message
      )
    })

    return errors
  }
}

export const jsonToFormData = json => {
  const form = new FormData()

  Object.entries(json).forEach(([key, value]) => {
    if(typeof value !== 'undefined') {
      if(value instanceof Array) {
        value.forEach((value, index) => {
          form.append(`${key}[${index}]`, value)
        })
      } else if(value instanceof FileList) {
        form.append(key, value[0])
      } else {
        form.append(key, value)
      }
    }
  })

  return form
}

export const parseResponseError = e => {
  let errors = {}

  if(typeof e.response === 'undefined') {
    errors._error = 'There was an error communicating with the service.'
  }

  throw new SubmissionError(errors)
}