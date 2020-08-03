import _set from 'lodash/set'
import _get from 'lodash/get'
import { SubmissionError } from 'redux-form'
import * as Yup from 'yup'
import { Get } from '@lib/utils/http-client'

export const getAbbreviature = (str = '') => {
  const matches = str.match(/([\w']+)/g)
  let abbreviature = matches[0].substring(0, 2)

  if(matches.length >= 2) abbreviature = matches[0][0] + matches[1][0]

  return abbreviature.toUpperCase()
}

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

export const parseFormValues = payload => {
  let values = Object.entries(payload)
    .filter(([ , value ]) => !(value === null || typeof value === 'undefined'))
    .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

  return values
}

export const parsePayload = payload => {
  let { is_formdata = false, ...body } = payload // Raw payload

  if(is_formdata === false)
    // If payload contains some File or FileList, create a FormData payload
    is_formdata = Object.values(payload).some(value => value instanceof FileList || value instanceof File)

  if(is_formdata) {
    body = new FormData()

    Object.entries(payload).forEach(([ key, value ]) => {
      if(typeof value !== 'undefined')
        if(value instanceof Array) {
          const isAnArrayOfFiles = value.some(item => item instanceof File)

          if(isAnArrayOfFiles)
            body.append(key, value.length > 1 ? value : value[0])
          else
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
  else if(typeof e.response.data === 'object' && 'detail' in e.response.data)
    errors._error = e.response.data.detail
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

export const openIncidentPDF = (petId, incidentId) => {
  Get(`/pets/${petId}/incidents/${incidentId}/view-report`,{}, {
    responseType: 'arraybuffer'
  })
    .then((response) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([ response ], { type: 'application/pdf' }))

      window.open(downloadUrl)
    })
}

export const downloadIncidentPDF = (petId, incidentId, name) => {
  Get(`/pets/${petId}/incidents/${incidentId}/view-report`,{}, {
    responseType: 'arraybuffer'
  })
    .then((response) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([ response ], { type: 'application/pdf' }))

      const link = document.createElement('a')

      link.href = downloadUrl

      link.setAttribute('download', `${name}.pdf`) // any other extension

      document.body.appendChild(link)

      link.click()

      link.remove()
    })
}

