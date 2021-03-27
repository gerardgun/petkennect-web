import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import ModalDelete from '@components/Modal/Delete'

import NoteItem from './Item'
import NoteCreate from './create'

import petNoteDuck from '@reducers/pet/note'
import petNoteDetailDuck from '@reducers/pet/note/detail'

function Notes({ ...props }) {
  const _handleDeleteBtnClick = () => {
    props.setItem(null, 'DELETE')
  }

  const _handleReplyNoteBtnClick = (item) =>{
    props.setItem(item, 'UPDATE')
  }

  return (
    <>
      <NoteItem onDelete={_handleDeleteBtnClick} onReply={_handleReplyNoteBtnClick}/>
      <ModalDelete duckDetail={petNoteDetailDuck}/>
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
