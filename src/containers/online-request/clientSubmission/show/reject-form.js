import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, TextArea, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

const formId = 'client-submission-reject-form'

const RejectForm = props => {
  const {
    onClose: _handleClose,
    error, reset, submitting, handleSubmit // redux-form
  } = props

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit}>
          <Header as='h2' className='segment-content-header'>What is the reason for rejection?</Header>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              autoFocus
              component={FormField}
              control={TextArea}
              label='Comment'
              name='comment'
              placeholder='Enter comment'
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
                basic
                className='w120'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                className='w120'
                color='red'
                content='Decline'
                disabled={submitting}
                loading={submitting}
                type='submit'/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  reduxForm({
    form    : formId,
    validate: values => {
      const schema = {
        comment: Yup.string().required('This field is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(RejectForm)
