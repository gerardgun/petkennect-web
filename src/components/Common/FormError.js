import React from 'react'

const FormError = ({ message }) => {
  return message ? (
    <div style={{
      paddingTop: '0.3rem',
      fontSize: '0.9rem',
      color: '#6772e5'
    }}>
      { message }
    </div>
  ) : null
}

export default FormError