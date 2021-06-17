import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, TextArea, Modal } from 'semantic-ui-react'
import loadable from '@loadable/component'
import * as Yup from 'yup'
import { getAbbreviature } from '@lib/utils/functions'

import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import noteDetailDuck from '@reducers/manager-dashboard/employee/employee-note/detail'
const FormError = loadable(() => import('@components/Common/FormError'))

const ReplyNoteForm = props => {
  const {
    noteDetail,
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

  const isOpened = useMemo(() => getIsOpened(noteDetail.mode), [ noteDetail.mode ])
  const isReply = noteDetail.mode == 'READ' ? true : false
  const item = noteDetail.item
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
                        {getAbbreviature('user_multi petkennect')}
                      </div>
                      <div>
                        <p>user_multi petkennect</p>
                        <span className='text-gray'>6/17/2021, 9:49:54 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className='description'>
                    Test Comment
                  </p>
                </div>

                <div className='c-note-item' key={item.id}>
                  <div className='flex justify-between align-center mb20 mv12'>
                    <div className='avatar-wrapper'>
                      <div className='avatar'>
                        {getAbbreviature('user_multi petkennect')}
                      </div>
                      <div>
                        <p>user_multi petkennect</p>
                        <span className='text-gray'>6/17/2021, 9:49:54 AM</span>
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
      const noteDetail = noteDetailDuck.selectors.detail(state)

      return {
        noteDetail,
        // for redux form
        initialValues: { ...noteDetail.item }
      }
    },
    {
      post     : noteDetailDuck.creators.post,
      put      : noteDetailDuck.creators.put,
      resetItem: noteDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'employee-reply-note-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        description: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ReplyNoteForm)
