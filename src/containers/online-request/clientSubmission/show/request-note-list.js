import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { compose } from 'redux'
import { reset } from 'redux-form'
import { Button, TextArea, Divider, Header, Tab, Grid, Modal } from 'semantic-ui-react'
import loadable from '@loadable/component'

import useModal from '@components/Modal/useModal'
import RequestNoteForm from './request-note-form'
import { parseFormValues, parseResponseError, getAbbreviature } from '@lib/utils/functions'

import onlineRequestNoteDuck from '@reducers/online-request/note'
import onlineRequestNoteDetailDuck from '@reducers/online-request/note/detail'

const ModalDelete = loadable(() => import('@components/Modal/Delete'))

const RequestNoteList = props => {
  const {
    requestNote
  } = props

  const dispatch = useDispatch()
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const _handleDeleteBtnClick = (e, data) => {
    const item = requestNote.items.find(({ id }) => id === +data['data-item-id'])

    props.setItem(item, 'DELETE')
    _handleOpen()
  }

  const _handleEditBtnClick = () => {

  }

  const _handleSubmit = values => {
    values = parseFormValues(values)

    return props.post(values)
      .then(() => dispatch(reset('request-note')))
      .catch(parseResponseError)
  }

  return (
    <>
      {
        requestNote.items.map((item, index) => {
          const createdAt = new Date(item.created_at).toLocaleString('en-US')
          const fullname = `${item.employee.first_name} ${item.employee.last_name}`

          return (
            <div className='c-note-item' key={index}>
              {/* Header */}
              <div className='flex justify-between align-center mb20'>
                <div className='avatar-wrapper'>
                  <div className='avatar'>
                    {getAbbreviature(fullname)}
                  </div>
                  <div>
                    <p>{fullname}</p>
                    <span className='text-gray'>{createdAt}</span>
                  </div>
                </div>
                <div>
                  <Button
                    basic color='red' data-item-id={item.id}
                    icon='trash alternate outline'
                    onClick={_handleDeleteBtnClick}/>
                  {/* <Button
                    basic data-item-id={item.id} icon='edit outline'
                    onClick={_handleEditBtnClick}/> */}
                </div>
              </div>

              {/* Content */}
              <p className='description'>
                {item.message}
              </p>
            </div>
          )
        })
      }

      {
        requestNote.items.length === 0 && (
          <p style={{ color: 'grey' }}>
            {'There aren\'t notes'}
          </p>
        )
      }

      <br/>

      <RequestNoteForm onSubmit={_handleSubmit}/>
      <ModalDelete
        duckDetail={onlineRequestNoteDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  connect(
    state  => {
      const requestNote = onlineRequestNoteDuck.selectors.list(state)

      return {
        requestNote
      }
    },
    {
      getRequestNotes: onlineRequestNoteDuck.creators.get,
      setItem        : onlineRequestNoteDetailDuck.creators.setItem,
      post           : onlineRequestNoteDetailDuck.creators.post
    }
  )
)(RequestNoteList)
