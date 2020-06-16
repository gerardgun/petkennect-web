import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

function InputReadOnly({ value, label, className }) {
  return (<div className={`c-input-read-only wrapper ${className}`}>
    <div className='label'>
      {label}
    </div>
    <div className='input'>
      {value}
    </div>
  </div>)
}

InputReadOnly.propTypes = {
  value    : PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,
  label    : PropTypes.string.isRequired,
  className: PropTypes.string
}

InputReadOnly.defaultProps = { className: '' }

export default InputReadOnly
