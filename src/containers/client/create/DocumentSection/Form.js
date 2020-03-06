import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDocumentDetailDuck from '@reducers/client/document/detail'

const DocumentForm = props => {
  const {
    clientDocumentDetail,
    error, handleSubmit, pristine, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => props.resetItem()

  const _handleSubmit = values => {
    if(isUpdating) {
      return props.put({ id: clientDocumentDetail.item.id, ...values})
        .then(_handleClose)
        .catch(parseResponseError)
    } else {
      return props.post(values)
        .then(_handleClose)
        .catch(parseResponseError)
    }
  }

  const isOpened = useMemo(() => getIsOpened(clientDocumentDetail.mode), [ clientDocumentDetail.mode ])
  const isUpdating = Boolean(clientDocumentDetail.item.id)

  return (
    <Modal
      className='form-modal'
      open={isOpened}
      onClose={_handleClose}
      size='small'
    >
      <Modal.Content>
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Document</Header>
          <Field name='id' component='input' type='hidden' />
          <Form.Group widths='equal'>
            <Field
              name='description'
              component={FormField}
              control={Form.TextArea}
              label='Description'
              placeholder='Enter description'
              autoFocus
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='document_type_id'
              component={FormField}
              control={Form.Select}
              options={[
                { key: 1, value: 1, text : 'Vet Letter' },
                { key: 2, value: 2, text : 'Medication Instructions' },
                { key: 3, value: 3, text : 'Pet Photo' },
                { key: 4, value: 4, text : 'PDF' },
              ]}
              label='Document Type *'
              placeholder='Select type'
              search
              selectOnBlur={false}
            />
            <Field
              name='file'
              component={FormField}
              control={Form.Input}
              label='File *'
              type='file'
            />
          </Form.Group>

          {
            error && (
              <Form.Group widths="equal">
                <Form.Field>
                  <FormError message={error} />
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group widths='equal' className='form-modal-actions'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                type="button"
                onClick={_handleClose}
              />
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}
              />
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
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)

      return {
        clientDocumentDetail,
        initialValues: clientDocumentDetail.item
      }
    },
    {
      post: clientDocumentDetailDuck.creators.post,
      put: clientDocumentDetailDuck.creators.put,
      resetItem: clientDocumentDetailDuck.creators.resetItem,
    }
  ),
  reduxForm({
    form              : 'client-document-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate: values  => {
      const schema = {
        document_type_id: YupFields.num_required,
        file: YupFields.whenIsUpdating(YupFields.nullable, YupFields.file),
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DocumentForm)
