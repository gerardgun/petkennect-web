import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal, Icon } from 'semantic-ui-react'

import NoteItem from './'
import PetNoteCreate from './create'

import petNoteDetailDuck from '@reducers/pet/note/detail'

const ViewNoteForm = props => {
  const {
    petNoteDetail,
    reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'READ')

  const _handleAddNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'CREATE')
  }

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(petNoteDetail.mode), [ petNoteDetail.mode ])

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={isOpened}
        size='small'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset}>
            <Header as='h2' className='segment-content-header'>Notes</Header>
            <Field component='input' name='id' type='hidden'/>
            <div className='text-right'>
              <Button
                basic color='teal'
                icon='plus'
                onClick={_handleAddNoteBtnClick}>
                <Icon name='plus'/> Add Note
              </Button>
            </div>
            <NoteItem/>

            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  content='Cancel'
                  disabled={submitting}
                  onClick={_handleClose}
                  type='button'/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>

      <PetNoteCreate/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const petNoteDetail = petNoteDetailDuck.selectors.detail(state)

      return {
        petNoteDetail,
        initialValues: petNoteDetail.item
      }
    },
    {
      post       : petNoteDetailDuck.creators.post,
      put        : petNoteDetailDuck.creators.put,
      resetItem  : petNoteDetailDuck.creators.resetItem,
      setNoteItem: petNoteDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'pet-view-note-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(ViewNoteForm)
