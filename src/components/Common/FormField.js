import React from 'react'
import { Form, Ref } from 'semantic-ui-react'

import FormFieldError from '@components/Common/FormFieldError'

const FormField = React.forwardRef((props, ref) => {
  const {
    control: WrappedComponent,
    input: {
      onBlur,
      onChange,
      ...input
    },
    meta,
    // Custom properties for the wrapped component
    className = '',
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
    <Form.Field className={className}>
      <Ref innerRef={ref}>
        <WrappedComponent
          onBlur={_handleBlur}
          onChange={_handleChange}
          {...computedInput}
          {...rest}/>
      </Ref>
      <FormFieldError input={computedInput} meta={meta}/>
    </Form.Field>
  )
})

export default FormField
