import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import kennelDetailDuck from  '@reducers/order/service/boarding/kennel/detail'
import kennelTypeDuck from '@reducers/order/service/boarding/kennel/type'

const KennelFormModal = (props) => {
  const {
    kennelDetail,
    kennelTypeList,
    change, error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(()=> {
    if(kennelDetail.item.id) props.get(kennelDetail.item.id)

    if(kennelTypeList.items.length === 0) props.getKennelTypes()
  }, [ kennelDetail.item.id ])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      change('file', file)
    })
  }, [])

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: kennelDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(kennelDetail.item.id)
  const open = [ 'CREATE_BULK' ].includes(kennelDetail.mode)
  const { getRootProps, getInputProps } = useDropzone({ onDrop: _handleDrop, multiple: true })

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            New Bulk Upload
          </Header>

          <div {...getRootProps()}  className='document-upload-choose-file'>
            <input {...getInputProps()}/>
            <Button
              color='teal'
              content='Choose file'
              type='button'/>
          </div>

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
                color='teal'
                content={isUpdating ? 'Save changes' : 'Done'}
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
      const kennelDetail = kennelDetailDuck.selectors.detail(state)

      return {
        kennelDetail,
        kennelTypeList: kennelTypeDuck.selectors.list(state),
        initialValues : kennelDetail.item
      }
    },
    {
      get           : kennelDetailDuck.creators.get,
      getKennelTypes: kennelTypeDuck.creators.get,
      post          : kennelDetailDuck.creators.post,
      put           : kennelDetailDuck.creators.put,
      resetItem     : kennelDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'kennel-bulk-upload',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(KennelFormModal)
