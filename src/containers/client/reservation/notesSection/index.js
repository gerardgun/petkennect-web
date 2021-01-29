import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import NoteItem from './Item'
import NoteCreate from './create'

import petNoteDuck from '@reducers/pet/note'
import petNoteDetailDuck from '@reducers/pet/note/detail'

function Notes({ ...props }) {
  const [ openDeleteModal, { _handleOpen, _handleClose } ] = useModal()

  const _handleDeleteBtnClick = () => {
    _handleOpen()
  }

  const _handleReplyNoteBtnClick = (item) =>{
    props.setItem(item, 'UPDATE')
  }

  return (
    <>
      <NoteItem onDelete={_handleDeleteBtnClick} onReply={_handleReplyNoteBtnClick}/>
      <ModalDelete
        duckDetail={petNoteDetailDuck}
        onClose={_handleClose}
        open={openDeleteModal}/>
      <NoteCreate/>
    </>
  )
}
export default compose(
  connect(
    ({ ...state }) => ({
      petNote: petNoteDuck.selectors.list(state)
    }), {
      setItem: petNoteDetailDuck.creators.setItem
    })
)(Notes)
