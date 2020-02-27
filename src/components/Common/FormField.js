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

  const _handleBlur = (e, data) => {
    let value = ''

    if(data && 'value' in data)
      value = data.value
    else if(e && 'currentTarget' in e && 'value' in e.currentTarget)
      value = e

    return onBlur(value)
  }

  const _handleChange = (e, { value }) => onChange(value)

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