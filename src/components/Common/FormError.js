import React from 'react'

const FormError = ({ message }) => {
  return message ? (
    <div className='message'>
      { message }
    </div>
  ) : null
}

export default FormError
