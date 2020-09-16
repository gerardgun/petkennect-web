import React, { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Divider, Header, Input, Select, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import { formId } from './../'

import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientDocumentTypeDuck from '@reducers/client/document/type'

const ClientDocumentList = props => {
  const {
    clientDocumentTypeOptions,
    fields, meta: { error, submitFailed } // redux-form
  } = props

  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const documentInitialState = {
    type       : null,
    description: '',
    file       : null,
    filename   : ''
  }

  const _handleDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      fields.push({
        ...documentInitialState,
        file,
        filename: file.name
      })
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop: _handleDrop, multiple: true })

  return (
    <>
      <Header as='h6' className='section-header' color='blue'>Select files</Header>
      <div {...getRootProps()}  className='document-upload-choose-file'>
        <input {...getInputProps()}/>
        <Button
          color='teal'
          content='Choose file'
          type='button'/>
      </div>

      <Header as='h6' className='section-header' color='blue'>Update Detail</Header>
      {
        fields.length > 0 ? (
          fields.map((item, index) => (
            <Fragment key={index} >
              <Form.Group widths='equal'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  label='Document Name'
                  name={`${item}.filename`}
                  placeholder='Enter document name'
                  required/>
                <Field
                  component={FormField}
                  control={Select}
                  label='Type'
                  name={`${item}.type`}
                  options={clientDocumentTypeOptions}
                  placeholder='Select type'
                  required
                  search
                  selectOnBlur={false}/>
                <div className='mt4'>
                  <label>&nbsp;</label>
                  <Button
                    basic color='red' data-index={index}
                    icon='trash alternate outline'
                    onClick={_handleRemoveBtnClick}
                    type='button'/>
                </div>
              </Form.Group>

              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Form.TextArea}
                  label='Comment'
                  name={`${item}.description`}
                  placeholder='Enter comment'/>
              </Form.Group>

              <Divider/>
            </Fragment>
          ))
        ) : (
          <p>You have still not uploaded any document</p>
        )
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

const ClientDocumentFormUpload = props => {
  const {
    clientDocumentType,
    error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()

  useEffect(() => {
    if(clientDocumentType.items.length === 0) props.getClientDocumentTypes()
  }, [])

  const _handleSubmit = values => {
    values = parseFormValues(values)

    return props.post({ client_id: clientId, ...values })
      .then(() => props.resetItem())
      .catch(parseResponseError)
  }

  const clientDocumentTypeOptions = useMemo(() => {
    return clientDocumentType.items
      .filter(({ type }) => type === 'O')
      .map(item => ({
        key  : item.id,
        value: item.id,
        text : item.name
      }))
  }, [ clientDocumentType.status ])

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <FieldArray
          clientDocumentTypeOptions={clientDocumentTypeOptions}
          component={ClientDocumentList}
          name='files'/>

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </Form>
    </>
  )
}

export default compose(
  connect(
    state => ({
      clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state),
      clientDocumentType  : clientDocumentTypeDuck.selectors.list(state)
    }),
    {
      getClientDocumentTypes: clientDocumentTypeDuck.creators.get,
      post                  : clientDocumentDetailDuck.creators.post,
      resetItem             : clientDocumentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        files: Yup.array()
          .of(
            Yup.object().shape({
              type    : Yup.mixed().required('Document type is required'),
              filename: Yup.mixed().required('Document name is required')
            })
          )
          .min(1, 'You must add at least one document')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientDocumentFormUpload)
