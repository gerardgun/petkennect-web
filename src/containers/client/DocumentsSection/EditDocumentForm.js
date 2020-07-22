import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter,useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientDocumentTypesDuck from '@reducers/client/document/type'

const EditDocumentForm = props => {
  const {
    clientDocumentDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const { id } = useParams()

  const getIsOpened = mode => (mode === 'UPDATE')

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const _handleSubmit = values => {
    return props.put({ client_id: id, id: clientDocumentDetail.item.id, ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientDocumentDetail.mode), [ clientDocumentDetail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>Edit Document</Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Document Name'
              name='filename'
              placeholder='Enter document name'/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Type'
              name='type'
              options={props.clientDocumentTypes.items.map(_documentType => ({
                key  : _documentType.id,
                value: _documentType.id,
                text : `${_documentType.name}`
              }))}
              placeholder='Select type'
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.TextArea}
              label='Comment'
              name='description'
              placeholder='Enter comment'/>
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
                color='teal'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                size='small'/>
              <Button
                color='teal'
                content='Save Changes'
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
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)
      const clientDocumentTypes = clientDocumentTypesDuck.selectors.list(state)
      const initialValues = { ...clientDocumentDetail.item }

      return {
        clientDocumentDetail,
        clientDocumentTypes,
        initialValues
      }
    },
    {
      post            : clientDocumentDetailDuck.creators.post,
      put             : clientDocumentDetailDuck.creators.put,
      getDocumentTypes: clientDocumentTypesDuck.creators.get,
      resetItem       : clientDocumentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'edit-document-form',
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        type    : Yup.mixed().required('Document type is required'),
        filename: Yup.mixed().required('Document name type is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EditDocumentForm)
