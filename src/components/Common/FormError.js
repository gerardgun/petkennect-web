import React from 'react'

const FormError = ({ message }) => {
  return message ? (
    <div className='form-error-message'>
      { message }
    </div>
  ) : null
}

export default FormError
