import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import moment  from 'moment'
import { Button, Icon } from 'semantic-ui-react'

function NoteItem({ item , onUpdate, onDelete }) {
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
            {(item.employee_fullname || '').substr(0,2).toUpperCase()}
          </div>
          <div>
            <div className='thumbnail-title'>{item.employee_fullname}</div>
            <div className='thumbnail-date'>{(item.updated_at && moment(item.updated_at).format('MM/DD/YYYY HH:mm')) || '-'}</div>

          </div>
        </div>
        <div>
          <Button
            basic
            color='google plus' icon onClick={_handleDeleteBtnClick}
            size='small'>
            <Icon name='trash alternate outline'/>
          </Button>
          <Button
            basic
            className='ml16' icon onClick={_handleUpdateBtnClick}
            size='small'>
            <Icon name='edit outline'/>
          </Button>
        </div>
      </div>
      <div className='description'>
        {item.description}
      </div>

    </div>)
}

NoteItem.propTypes = { onUpdate: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired }

NoteItem.defaultProps = {  }

export default NoteItem
