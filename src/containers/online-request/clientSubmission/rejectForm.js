import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import { parseResponseError, syncValidate } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'

const RejectForm = props => {
  const {
    clientSubmissionDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'READ')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    return props.put({ id: clientSubmissionDetail.item.id, ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientSubmissionDetail.mode), [ clientSubmissionDetail.mode ])

  return (
    <Modal
      className='form-modal'
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>What is the reason for rejection?</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Field>
            <Field
              autoFocus
              component={FormField}
              control={Select}
              label='Reason'
              name='reason'
              placeholder='Enter Reason'
              required/>
          </Form.Field>
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
                color='red'
                content='Done'
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
      const clientSubmissionDetail = clientSubmissionDetailDuck.selectors.detail(state)

      return {
        clientSubmissionDetail,
        initialValues: clientSubmissionDetail.item
      }
    },
    {
      post     : clientSubmissionDetailDuck.creators.post,
      put      : clientSubmissionDetailDuck.creators.put,
      resetItem: clientSubmissionDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'reject-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(RejectForm)

