/* eslint-disable react/no-unescaped-entities */
import React, { useMemo,useEffect,useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter,useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm,FieldArray } from 'redux-form'
import { Button, Form, Header, Modal, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate, parseResponseError } from '@lib/utils/functions'

import clientDocumentDuck from '@reducers/client/document'
import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientDocumentTypesDuck from '@reducers/client/document/type'

const UploadDocumentForm = (props) => {
  const {
    clientDocumentDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const { id } = useParams()

  function ClientDocumentList({ fields, meta: { error, submitFailed } }) {
    const inputFileRef = useRef()

    const _handleUpload = () => {
      if(inputFileRef.current)
        inputFileRef.current.click()
    }

    const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

    const documentListInitialState = {
      type       : '',
      description: '',
      files      : '',
      filename   : ''
    }
    const _handleFileChange = e => {
      if(e.target.files && e.target.files[0])
        documentListInitialState.files = e.target.files[0]
      documentListInitialState.filename = e.target.files[0].name
      fields.push({ ...documentListInitialState })
    }

    return (
      <>
        <Header as='h6' className='section-header' color='blue'>SELECT FILE</Header>
        <div className='document-upload-choose-file'>
          <Button
            className='w120'
            color='teal'
            content='Choose file'
            onClick={_handleUpload}
            type='button'/>
        </div>

        <Header as='h6' className='section-header' color='blue'>UPDATE DETAIL</Header>
        {
          fields.length <= 0 ? (
            <div className='description'>
You have still not uploaded any document
            </div>) : ''

        }
        <input
          accept='image/*'
          hidden onChange={_handleFileChange}  ref={inputFileRef}
          type='file'/>
        {
          fields.map((item, index) => (

            <div  key={index} >

              <input
                accept='image/*'
                hidden
                name={`${item}.files`}
                type='file'/>
              <Form.Group widths='equal'>

                <Field
                  autoComplete='off'
                  autoFocus
                  component={FormField}
                  control={Form.Input}
                  label='Document Name'
                  name={`${item}.filename`}
                  placeholder='Enter document name'/>

                <Field
                  component={FormField}
                  control={Form.Select}
                  label='Type'
                  name={`${item}.type`}
                  options={props.clientDocumentTypes.items.map(_documentType => ({
                    key  : _documentType.id,
                    value: _documentType.id,
                    text : `${_documentType.name}`
                  }))}
                  placeholder='Select type'
                  search
                  selectOnBlur={false}/>
                <div className='mt4'>
                  <label>&nbsp;</label>
                  <button
                    className='ui red basic icon button'  data-index='0' onClick={_handleRemoveBtnClick}
                    type='button'>
                    <i aria-hidden='true' className='trash alternate outline icon' ></i>
                  </button></div>
              </Form.Group>

              <Form.Group widths='equal'>
                <Field
                  autoFocus
                  component={FormField}
                  control={Form.TextArea}
                  label='Comment'
                  name={`${item}.description`}
                  placeholder='Enter comment'/>
              </Form.Group>
              <Divider/>
            </div>
          ))
        }

        {
          submitFailed && error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </>
    )
  }

  useEffect(()=> {
    props.getDocumentTypes()
  }, [ id ])

  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
    props.removeSelectedItem()
  }

  const _handleSubmit = (values) => {
    // eslint-disable-next-line no-unused-vars
    values && values.client_document_list && values.client_document_list.forEach((value,index) => {
      if(value.type && value.filename)

        props
          .post({ client_id: id, ...value })
          .then(_handleClose)
          .catch(parseResponseError)
    })
  }

  const isOpened = useMemo(() => getIsOpened(clientDocumentDetail.mode), [
    clientDocumentDetail.mode
  ])

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
            New Document
          </Header>
          <Field component='input' name='id' type='hidden'/>

          <FieldArray
            component={ClientDocumentList}
            name='client_document_list'
            title='client Document List'/>

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
                className='w120'
                color='teal'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                size='small'/>
              <Button
                className='w120'
                color='teal'
                content='Save'
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
    (state) => {
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)
      const clientDocument = clientDocumentDuck.selectors.list(state)
      const clientDocumentTypes = clientDocumentTypesDuck.selectors.list(state)

      return {
        clientDocumentDetail,
        clientDocument,
        clientDocumentTypes,
        initialValues: {}
      }
    },
    {
      post              : clientDocumentDetailDuck.creators.post,
      resetItem         : clientDocumentDetailDuck.creators.resetItem,
      getDocumentTypes  : clientDocumentTypesDuck.creators.get,
      removeSelectedItem: clientDocumentDuck.creators.removeSelectedIds
    }
  ),
  reduxForm({
    form              : 'client-document-upload-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        type    : Yup.mixed().required('Document type is required'),
        filename: Yup.mixed().required('Document name type is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(UploadDocumentForm)
