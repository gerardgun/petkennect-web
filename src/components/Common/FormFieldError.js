import React from 'react'

import FormError from '@components/Common/FormError'

const FormFieldError = ({ /* input, */ meta }) => {
  return meta.touched && meta.error ? (
    <FormError message={meta.error}/>
  ) : null
}

export default FormFieldError
