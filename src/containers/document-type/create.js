import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDocumentTypeDetailDuck from '@reducers/client/document/type/detail'

const DocumentTypeForm = props => {
  const {
    clientDocumentTypeDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => props.resetItem()

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: clientDocumentTypeDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientDocumentTypeDetail.mode), [ clientDocumentTypeDetail.mode ])
  const isUpdating = Boolean(clientDocumentTypeDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Document Type</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Name'
              name='name'
              placeholder='Enter name'/>
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
      const clientDocumentTypeDetail = clientDocumentTypeDetailDuck.selectors.detail(state)

      return {
        clientDocumentTypeDetail,
        initialValues: clientDocumentTypeDetail.item
      }
    },
    {
      post     : clientDocumentTypeDetailDuck.creators.post,
      put      : clientDocumentTypeDetailDuck.creators.put,
      resetItem: clientDocumentTypeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'client-document-type-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DocumentTypeForm)
