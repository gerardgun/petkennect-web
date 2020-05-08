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

export const parsePayload = payload => {
  const containsFileList = Object.values(payload).some(value => value instanceof FileList)
  let body = payload // Raw payload

  // If payload contains some FileList, create a FormData payload
  if(containsFileList) {
    body = new FormData()

    Object.entries(payload).forEach(([ key, value ]) => {
      if(typeof value !== 'undefined')
        if(value instanceof Array) {
          value.forEach((value, index) => {
            body.append(`${key}[${index}]`, value)
          })
        } else if(value instanceof FileList) {
          if(value.length > 0) body.append(key, value[0])
        } else {
          body.append(key, value)
        }
    })
  }

  return body
}

export const parseResponseError = e => {
  let errors = {}

  if(typeof e.response === 'undefined')
    errors._error = 'There was an error communicating with the service.'
  else if(e.response.status === 422 || e.response.status === 400)
    Object.entries(e.response.data).forEach(([ fieldname, errorList ]) => {
      fieldname = fieldname === 'non_field_errors' ? '_error' : fieldname

      return errors[fieldname] = errorList[0]
    })
  else if(e.response.status === 500)
    errors._error = 'Error 500. The server has a internal error, contact us please.'
  else
    errors._error = 'There was an error communicating with the service.'

  throw new SubmissionError(errors)
}

/** temp utils, until backend update TINY_INT to BOOL fields
 * PD: solo es hasta que corrijan lo de backend, ahi noma lo dejo :D*/
export const formatIntToBool = value => !!value

export const parseBoolToInt = value => value ? 1 : 0

