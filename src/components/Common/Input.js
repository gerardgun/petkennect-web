import React from 'react'
import { Input as SemanticInput } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'

const Input = props => {
  const {
    input: {
      checked,
      name,
      onBlur,
      onChange
    },
    meta,
    // Properties for this component
    label,
    // Properties for SemanticInput
    children,
    ...rest
  } = props

  const _handleBlur = e => {
    return onBlur(e)
  }

  const _handleChange = (e, { value }) => {
    return onChange(value)
  }

  const hasError = meta.touched && meta.error

  return (
    <>
      {
        label && <label>{label}</label>
      }

      <SemanticInput
        {...rest}
        checked={checked}
        name={name}
        onBlur={_handleBlur}
        onChange={_handleChange}>
        {children}
      </SemanticInput>

      {
        hasError && <FormError message={meta.error}/>
      }
    </>
  )
}

Input.defaultProps = {
  label: null
}

export default Input
