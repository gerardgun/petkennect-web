import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

function Alert({ open, onDismiss: _handleDissmiss , className }) {
  return open && (<div className={`c-alert wrapper ${className}`}>
    <div className='text'>
    Rabies vaccine expired. Email  was sent to the customer on 12/12/2020 23:45.
    </div>
    <Icon name='delete' onClick={_handleDissmiss}/>
  </div>)
}

Alert.propTypes = {
  open     : PropTypes.bool,
  color    : PropTypes.string,
  className: PropTypes.string
}

Alert.defaultProps = {
  open     : false,
  color    : 'default',
  className: ''
}

export default Alert
