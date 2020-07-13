import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
function Alert({ open, className , message }) {
  return open && (<div className={`c-alert wrapper ${className}`}>
    <div className='text'>
      {message}
    </div>
  </div>)
}

Alert.propTypes = {
  open     : PropTypes.bool,
  color    : PropTypes.string,
  className: PropTypes.string,
  message  : PropTypes.string
}

Alert.defaultProps = {
  open     : false,
  color    : 'default',
  className: ''

}

export default Alert
