import React from 'react'
import { Form, Icon, Popup } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'

const FormField = props => {
  const {
    help : helpText,                   // for help icon on fields
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
    children,
    ...rest
  } = props

  const getComputedInput = () => {
    let { ...computed } = input

    if(props.type === 'checkbox' || props.type === 'radio')
      computed.label = label

    if(props.type === 'file')
      delete computed.value

    return computed
  }

  const _handleBlur = (e, data = {}) => {
    let value = ''

    if(typeof data.value !== 'undefined')
      value = data.value
    else
      value = e

    return onBlur(value)
  }

  const _handleChange = (e, { type, checked, value }) => {
    if(type === 'checkbox')
      return onChange(checked)
    else
      return onChange(value)
  }

  const computedInput = getComputedInput()
  const hasError = meta.touched && meta.error

  return (
    <Form.Field className={className} error={hasError} required={required}>    {/* update for help icon with label    */}
      {
        [ 'checkbox', 'radio' ].includes(props.type) ? <label>&nbsp;</label> : helpText != undefined ? <label>{label}<Popup
          content={helpText} inverted position='bottom center'
          trigger={<Icon name='info circle'  size='large' style={{ 'padding-left': '.5rem', 'margin-bottom': '.3rem' }}/>}/></label> : <label>{label}</label>
      }
      <WrappedComponent
        onBlur={_handleBlur}
        onChange={_handleChange}
        {...computedInput}
        {...rest}>
        {children}
      </WrappedComponent>

      {/* Error Message */}
      {
        hasError && <FormError message={meta.error}/>
      }

    </Form.Field>
  )
}

export default FormField
