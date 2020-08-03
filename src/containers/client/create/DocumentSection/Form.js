import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientDocumentTypesDuck from '@reducers/client/document/type'

const DocumentForm = props => {
  const {
    clientDocumentDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props
  const { client: clientId } = useParams()

  useEffect(()=> {
    props.getDocumentTypes()
  }, [ clientId ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ client_id: clientId, id: clientDocumentDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ client_id: clientId ,...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientDocumentDetail.mode), [ clientDocumentDetail.mode ])
  const isUpdating = Boolean(clientDocumentDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Document</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={TextArea}
              label='Description'
              name='description'
              placeholder='Enter description'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Document Type'
              name='type'
              options={props.clientDocumentTypes.items.map(_documentType => ({
                key  : _documentType.id,
                value: _documentType.id,
                text : `${_documentType.name}`
              }))}
              placeholder='Select type'
              required
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Input}
              label='File'
              name='files'
              required
              type='file'/>
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
                className='cls-TransCancelBtn'
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
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)
      const clientDocumentTypes = clientDocumentTypesDuck.selectors.list(state)

      return {
        clientDocumentDetail,
        initialValues: clientDocumentDetail.item,
        clientDocumentTypes
      }
    },
    {
      post            : clientDocumentDetailDuck.creators.post,
      put             : clientDocumentDetailDuck.creators.put,
      resetItem       : clientDocumentDetailDuck.creators.resetItem,
      getDocumentTypes: clientDocumentTypesDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'client-document-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        type : YupFields.num_required,
        files: YupFields.whenIsUpdating(YupFields.nullable, YupFields.file)
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DocumentForm)
