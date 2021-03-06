import axios from 'axios'
import _set from 'lodash/set'
import _get from 'lodash/get'
import moment from 'moment'
import printJS from 'print-js'
import { SubmissionError } from 'redux-form'
import * as Yup from 'yup'

import { Get } from '@lib/utils/http-client'

export const obj2options = obj => {
  const options = Object.entries(obj)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

  return options
}

export const getAbbreviature = (str = '') => {
  const matches = str.match(/([\w']+)/g)
  let abbreviature = matches[0].substring(0, 2)

  if(matches.length >= 2) abbreviature = matches[0][0] + matches[1][0]

  return abbreviature.toUpperCase()
}

export const getAge = (date) => {
  if(!date) return '-'

  const years = moment().diff(date, 'year')
  const months = moment().diff(date, 'month')
  const days = moment().diff(date, 'day')
  if(years < 0  || months < 0 || days < 0)
    return ' -'

  if(years === 1)
    return `${years} year`

  if(years > 1)
    return `${years} years`

  if(years === 0) {
    if(months === 0)
      return `${days} days`

    if(months === 1)
      return `${months} month`

    if(months > 1)
      return `${months} months`
  }
}

export const getFileType = filepath => {
  const fileExt = filepath.split('.').pop()

  return [ 'png', 'jpg', 'jpeg' ].includes(fileExt) ? 'image' : 'video'
}

export const getVaccinationStatus = item => {
  if(!item.expired_at)
    return 'missing'

  if(item.request && !item.verified_at)
    return 'requested'

  const expiredAt = moment.utc(item.expired_at, 'YYYY-MM-DD HH-mm:ss Z')
  const now = moment()

  if(expiredAt.isSameOrBefore(now)) return 'expired'
  if(expiredAt.isSameOrBefore(now.add(30,'days'), 'day')) return  'comming_due'

  return 'vaccinated'
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
    .filter(([ , value ]) => {
      const isNotValidValue = value === null || typeof value === 'undefined'

      return !isNotValidValue
    })
    .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

  return values
}

export const parsePayload = payload => {
  let { is_formdata = false, ...body } = payload // Raw payload

  if(is_formdata === false)
    // If payload contains some File or FileList, create a FormData payload
    is_formdata = Object.values(payload).some(value => {
      return (
        value instanceof FileList
        || value instanceof File
        || (value instanceof Array && value.length > 0 && value[0] instanceof File)
      )
    })

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

export const downloadFileURL = (url, filename) => {
  axios.get(url, { responseType: 'blob' })
    .then((result) => {
      const objectURL = URL.createObjectURL(new Blob([ result.data ]))
      const link = document.createElement('a')

      link.setAttribute('href', objectURL)
      link.setAttribute('download', filename)

      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
    })
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

export const printFileURL = url => {
  let parts = url.split('/')

  const encodedFilename = parts.pop()
  const filename = decodeURIComponent(encodedFilename)

  parts.push(filename)

  printJS(parts.join('/'))
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

export const sortByProperty = property=>{
  return function(a,b) {
    if(a[property] > b[property])
      return 1
    else if(a[property] < b[property])
      return -1

    return 0
  }
}

export const formatPhoneNumber = phoneNumberString=>{
  try {
    phoneNumberString = phoneNumberString == null ? '' : phoneNumberString
    let cleaned = ('' + phoneNumberString.split(' ')[1]).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if(match)
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  catch {
    return null
  }
}

export const printAlphabets = () => {
  // set the default value of i & j to print A to Z
  let i = 65
  let j = 91
  let k
  let strArr = []
  // loop through the values from i to j
  for (k = i; k < j; k++) {
    // convert the char code to string (Alphabets)
    let str = String.fromCharCode(k)
    // print the result in console
    strArr.push({ key: k, value: `${str}`, text: `${str}` })
  }

  return strArr
}

export const monthDiff = (d1, d2) => {
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()

  return months <= 0 ? 1 : months + 1
}

export const weekAndDay = (date) => {
  var days = [ 'Sunday','Monday','Tuesday','Wednesday',
      'Thursday','Friday','Saturday' ],
    prefixes = [ '1st', '2nd', '3rd', '4th', '5th' ]

  return prefixes[Math.floor(date.getDate() / 7)] + ' ' + days[date.getDay()]
}

export const DayNth = function(d) {
  if(d > 3 && d < 21) return d + 'th'
  switch (d % 10) {
    case 1:  return d + 'st'
    case 2:  return d + 'nd'
    case 3:  return d + 'rd'
    default: return d + 'th'
  }
}
