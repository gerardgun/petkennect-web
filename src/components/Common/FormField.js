import React from 'react'
import { Form } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'

const FormField = props => {
  const {
    control: WrappedComponent,
    input: {
      onBlur,
      onChange,
      ...input
    },
    meta,
    // Properties for Form.Field
    className = '',
    label = '',
    required = false,
    // Properties for the wrapped component
    ...rest
  } = props

  const getComputedInput = () => {
    let { ...computed } = input

    if(WrappedComponent.name === 'Checkbox')
      computed.label = label

    if(props.type === 'file')
      delete computed.value

    return computed
  }

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

  const computedInput = getComputedInput()
  const hasError = meta.touched && meta.error

  return (
    <Form.Field className={className} error={hasError} required={required}>
      {
        WrappedComponent.name !== 'Checkbox' ? <label>{label}</label> : <label>&nbsp;</label>
      }
      <WrappedComponent
        onBlur={_handleBlur}
        onChange={_handleChange}
        {...computedInput}
        {...rest}/>

      {/* Error Message */}
      {
        hasError && <FormError message={meta.error}/>
      }

    </Form.Field>
  )
}

export default FormField
