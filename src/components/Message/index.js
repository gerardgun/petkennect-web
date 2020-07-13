import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

function Message({ type, content, className }) {
  return (
    <div className={`c-message c-message-wrapper ${type} ${className}`}>
      <Icon className={`c-message__icon ${type}`}  name={'warning circle'} size='large'/>
      <div className='c-message__content'>
        {content}
      </div>
    </div>
  )
}

Message.propTypes = {
  type     : PropTypes.oneOf([ 'warning','danger' ]).isRequired,
  content  : PropTypes.string.isRequired,
  className: PropTypes.string
}

Message.defaultProps = {  classsName: '' }

export default Message
