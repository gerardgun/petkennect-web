import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

import FormFieldError from '@components/Common/FormFieldError'

const FormField = props => {
  const {
    control: WrappedComponent,
    input: {
      onBlur,
      onChange,
      ...input
    },
    meta,
    ...rest
  } = props

  const _handleBlur = (e, data = {}) => {
    let value = ''

    if(data.value)
      value = data.value
    else
      value = e

    return onBlur(value)
  }

  const _handleChange = (e, { checked, value }) => {
    return onChange(typeof checked !== 'undefined' ? checked : value)
  }

  return (
    <Form.Field>
      <WrappedComponent
        onChange={_handleChange}
        onBlur={_handleBlur}
        {...input}
        {...rest}
      />
      <FormFieldError input={input} meta={meta} />
    </Form.Field>
  )
}

export default FormField