import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, TextArea, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import { getAbbreviature } from '@lib/utils/functions'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientCommentDetailDuck from '@reducers/client/comment/detail'

const NewNoteForm = props => {
  const {
    clientCommentDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'READ')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }
  const _handleSubmit = values => {
    return props.post(values)
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientCommentDetail.mode), [ clientCommentDetail.mode ])
  const isReply = clientCommentDetail.mode == 'READ' ? true : false
  const item = clientCommentDetail.item
  const createdAt = new Date(item.created_at).toLocaleString('en-US')

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>Reply</Header>
          <Field component='input' name='id' type='hidden'/>
          {
            isReply && (
              <>
                <div className='c-note-item' key={item.id}>
                  {/* Header */}
                  <div className='flex justify-between align-center mb20 mv12'>
                    <div className='avatar-wrapper'>
                      <div className='avatar'>
                        {getAbbreviature(item.employee_full_name)}
                      </div>
                      <div>
                        <p>{item.employee_full_name}</p>
                        <span className='text-gray'>{createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className='description'>
                    {item.comment}
                  </p>
                </div>

                <div className='c-note-item' key={item.id}>
                  <div className='flex justify-between align-center mb20 mv12'>
                    <div className='avatar-wrapper'>
                      <div className='avatar'>
                        {getAbbreviature(item.employee_full_name)}
                      </div>
                      <div>
                        <p>{item.employee_full_name}</p>
                        <span className='text-gray'>{createdAt}</span>
                      </div>
                    </div>
                  </div>
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
                </div>
              </>
            )
          }
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
                content='Save'
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
      const clientCommentDetail = clientCommentDetailDuck.selectors.detail(state)

      return {
        clientCommentDetail,
        // for redux form
        initialValues: { ...clientCommentDetail.item }
      }
    },
    {
      post     : clientCommentDetailDuck.creators.post,
      put      : clientCommentDetailDuck.creators.put,
      resetItem: clientCommentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'client-note-form',
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
