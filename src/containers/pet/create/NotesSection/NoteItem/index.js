import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import moment  from 'moment'
import { Button, Icon } from 'semantic-ui-react'

function NoteItem({ item , onUpdate, onDelete , editable }) {
  const _handleUpdateBtnClick = () => {
    onUpdate(item)
  }
  const _handleDeleteBtnClick = () => {
    onDelete(item)
  }

  return (
    <div className='c-note-item'>
      <div className='flex justify-between align-center'>
        <div className='avatar-wrapper'>
          <div className='avatar'>
            {(item.employee_fullname || '').substr(0,2).toUpperCase()}
          </div>
          <div>
            <p>{item.employee_fullname}</p>
            <span className='text-gray'>{(item.updated_at && moment(item.updated_at).format('MM/DD/YYYY HH:mm')) || '-'}</span>
          </div>
        </div>
        <div>
          <Button
            basic
            color='google plus' icon onClick={_handleDeleteBtnClick}>
            <Icon name='trash alternate outline'/>
          </Button>
          {
            editable && (
              <Button
                basic
                className='ml16' icon onClick={_handleUpdateBtnClick}>
                <Icon name='edit outline'/>
              </Button>
            )
          }
        </div>
      </div>
      <p className='description'>
        {item.description}
      </p>
    </div>)
}

NoteItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool
}

NoteItem.defaultProps = { }

export default NoteItem
