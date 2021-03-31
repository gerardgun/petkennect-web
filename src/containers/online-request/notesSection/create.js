import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, TextArea, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import NoteItem from './Item'

import petNoteDetailDuck from '@reducers/pet/note/detail'

const NewNoteForm = props => {
  const {
    petNoteDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: petNoteDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petNoteDetail.mode), [ petNoteDetail.mode ])
  const isUpdating = Boolean(petNoteDetail.item.id)
  const isReply = petNoteDetail.mode == 'UPDATE' ? true : false

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isReply ? 'Reply' : 'Add Note'}</Header>
          <Field component='input' name='id' type='hidden'/>
          {
            isReply && (
              <>
                <NoteItem isShowDelete={true} isShowReply={true}/>
                <div className='c-note-item'>
                  <div className='flex justify-between align-center mv20 mb20'>
                    <div className='avatar-wrapper'>
                      <div className='avatar'>
                         A
                      </div>
                      <div>
                        <p>Aliica Valerica</p>
                        <span className='text-gray'>12/12/2020 22:34</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={TextArea}
              label='Description'
              name='description'
              placeholder='Enter description'
              required/>
          </Form.Group>
          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
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
      post     : petNoteDetailDuck.creators.post,
      put      : petNoteDetailDuck.creators.put,
      resetItem: petNoteDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-new-note-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(NewNoteForm)
