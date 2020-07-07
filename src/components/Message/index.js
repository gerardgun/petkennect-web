import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

function Message({ type, content }) {
  return (
    <div className={`c-message c-message-wrapper ${type}`}>
      <Icon className={`c-message__icon ${type}`}  name={'warning circle'} size='large'/>
      <div className='c-message__content'>
        {content}
      </div>
    </div>
  )
}

Message.propTypes = {
  type   : PropTypes.oneOf([ 'warning','danger' ]).isRequired,
  content: PropTypes.string.isRequired
}

Message.defaultProps = {  }

export default Message
