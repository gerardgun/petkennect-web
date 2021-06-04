import React from 'react'
import { Radio as SematicRadio } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'

const Radio = props => {
  const {
    input: {
      checked,
      name,
      onChange,
      value
    },
    meta,
    ...rest
  } = props

  const _handleChange = () => {
    return onChange(value)
  }

  const hasError = meta.touched && meta.error

  return (
    <>
      <SematicRadio
        {...rest}
        checked={checked}
        name={name}
        onChange={_handleChange}/>

      {
        hasError && <FormError message={meta.error}/>
      }
    </>
  )
}

export default Radio
