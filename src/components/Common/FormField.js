import React from 'react'
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

  const getComputedInput = () => {
    let { ...computed } = input

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

  return (
    <Form.Field>
      <WrappedComponent
        onBlur={_handleBlur}
        onChange={_handleChange}
        {...computedInput}
        {...rest}/>
      <FormFieldError input={computedInput} meta={meta}/>
    </Form.Field>
  )
}

export default FormField
