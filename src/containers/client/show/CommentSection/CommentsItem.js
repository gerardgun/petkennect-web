import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import moment  from 'moment'
import { Button, Icon } from 'semantic-ui-react'

function CommentsItem({ item , onUpdate, onDelete , enableUpdate }) {
  const  _handleUpdateBtnClick = () => {
    onUpdate(item)
  }
  const  _handleDeleteBtnClick = () => {
    onDelete(item)
  }

  return (
    <div className='c-note-item wrapper'>
      <div className='flex justify-between align-center'>
        <div className='thumbnail-wrapper'>
          <div className='thumbnail'>
            {(item.employee_full_name || '').substr(0,2).toUpperCase()}
          </div>
          <div>
            <div className='thumbnail-title'>{item.employee_full_name}</div>
            <div className='thumbnail-date'>{(item.updated_at && moment(item.updated_at).format('MM/DD/YYYY HH:mm')) || '-'}</div>
          </div>
        </div>
        <div>
          <Button
            basic
            color='red' icon onClick={_handleDeleteBtnClick}
            size='small'>
            <Icon name='trash alternate outline'/>
          </Button>
          {enableUpdate && (
            <Button
              basic
              className='ml16' icon onClick={_handleUpdateBtnClick}
              size='small'>
              <Icon name='edit outline'/>
            </Button>
          )}
        </div>
      </div>
      <div className='description'>
        {item.comment}
      </div>

      <div>
        {item.follow_up
          ?          <Button
            basic
            className='mt8'
            color='orange'
            content='Follow up'
            size='small'/>
          :    <Button
            basic
            className='mt8'
            color='gray'
            content='Follow up'
            size='small'/>
        }
      </div>

    </div>)
}

CommentsItem.propTypes = {
  onUpdate    : PropTypes.func.isRequired,
  onDelete    : PropTypes.func.isRequired,
  enableUpdate: PropTypes.bool
}

CommentsItem.defaultProps = { }

export default CommentsItem
