import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './styles.scss'

function Item({ item, onDelete, onReply, isShowDelete, isShowReply }) {
  const _handleDeleteBtnClick = () => {
    onDelete(item)
  }

  const _handleNoteReply = () =>{
    onReply(item)
  }

  return (
    <div className='c-note-item'>
      {/* Header */}
      <div className='flex justify-between align-center mb20'>
        <div className='avatar-wrapper'>
          <div className='avatar'>
           A
          </div>
          <div>
            <p>Aliica Valerica</p>
            <span className='text-gray'>12/12/2020 22:34</span>
          </div>
        </div>
        <div>
          {
            !isShowDelete && (
              <Button
                basic color='red'
                icon='trash alternate outline' onClick={_handleDeleteBtnClick}/>
            )
          }
        </div>
      </div>

      {/* Content */}
      <p className='description'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pretium fringilla magna mi donec mauris quisque egestas interdum sapien.
                  In vitae scelerisque vitae nam vulputate urna. Urna egestas et,
                  eget turpis et id morbi posuere proin. Et tempor pellentesque lectus
                  consectetur
      </p>
      {
        !isShowReply && (
          <Link onClick={_handleNoteReply} to='#'>
          Reply
          </Link>
        )
      }
    </div>

  )
}

Item.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onReply : PropTypes.func.isRequired
}

Item.defaultProps = { }

export default Item
