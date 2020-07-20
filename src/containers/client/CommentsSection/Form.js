import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientCommentDetailDuck from '@reducers/client/comment/detail'
import authDuck from '@reducers/auth'

const ClientCommentForm = (props) => {
  const {
    clientCommentDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props
  const { id } = useParams()

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ client_id: id, id: clientCommentDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ client_id: id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientCommentDetail.mode), [
    clientCommentDetail.mode
  ])
  const isUpdating = Boolean(clientCommentDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'New'} Comment
          </Header>
          <Field component='input' name='employee' type='hidden'/>
          <Field component='input' name='location' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.TextArea}
              label='Internal Comment'
              name='comment'
              placeholder='Enter comment'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Follow Up'
              name='follow_up'
              type='checkbox'/>
          </Form.Group>
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}
          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                color='teal'
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
    ({ auth,...state }) => {
      const clientCommentDetail = clientCommentDetailDuck.selectors.detail(state)
      const currentTenant =  authDuck.selectors.getCurrentTenant(auth)

      return {
        clientCommentDetail,
        initialValues: {
          employee : currentTenant.employee,
          comment  : clientCommentDetail.item.comment,
          follow_up: clientCommentDetail.item.follow_up ? true : false,
          location : clientCommentDetail.item.location
        }
      }
    },
    {
      post     : clientCommentDetailDuck.creators.post,
      put      : clientCommentDetailDuck.creators.put,
      resetItem: clientCommentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'client-comment-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        comment: Yup.string().required('Internal Comment is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientCommentForm)
