import React, { useMemo, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useDropzone } from 'react-dropzone'
import { Field, reduxForm } from 'redux-form'
import moment  from 'moment'
import { Button, Form, Header, Select, Modal, Grid, Input, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import documentDetailDuck from '@reducers/manager-dashboard/employee/employee-document/detail'

const DocumentForm = (props) => {
  const {
    documentDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {

  }, [ ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = () => {
  }

  const isOpened = useMemo(() => getIsOpened(documentDetail.mode), [
    documentDetail.mode
  ])

  const _handleDrop = useCallback(acceptedFiles => {
    // eslint-disable-next-line no-unused-vars
    acceptedFiles.forEach(file => {
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop: _handleDrop, multiple: false })

  const isUpdating = documentDetail.mode === 'UPDATE' ? true : false

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
            {isUpdating ? 'Update' : 'Upload'} Document
          </Header>
          <Grid>
            <Grid.Column width={16}>
              <Field
                component={FormField}
                control={Input}
                label='File Name'
                name='file_name'
                placeholder='Enter file name'
                required/>
              <Field
                component={FormField}
                control={Select}
                label='Document Type'
                name='document_type'
                options={[
                  { key: 1, value: 'I-9 Form', text: 'I-9 Form' },
                  { key: 2, value: 'W-4 Form', text: 'W-4 Form' },
                  { key: 3, value: 'Other Document', text: 'Other Document' },
                  { key: 4, value: 'Direct Deposit', text: 'Direct Deposit' }
                ]}
                placeholder='Select document type'
                required/>
              <Field
                component={FormField}
                control={Input}
                label='Description'
                name='description'
                placeholder='Enter description'/>
              <Field
                component={FormField}
                control={Select}
                fluid
                label='Category'
                name='category'
                options={[
                  { key: 1, value: 'Tax Forms', text: 'Tax Forms' },
                  { key: 2, value: 'New Hire Paperwork', text: 'New Hire Paperwork' },
                  { key: 3, value: 'Performance Document', text: 'Performance Document' },
                  { key: 4, value: 'Acknowledgements', text: 'Acknowledgements' }
                ]}
                placeholder='Select category'
                required
                selectOnBlur={false}/>

              <Field
                component={FormField}
                control={Input}
                label='Date Added'
                name='date_added'
                required
                type='date'/>
              <Field
                component={FormField}
                control={Checkbox}
                label='Show Document to Employee?'
                name='show_document_to_employee'
                type='checkbox'/>
              <div {...getRootProps()}  className='document-upload-choose-file'>
                <input {...getInputProps()}/>
                <Button
                  color='teal'
                  content='Choose file'
                  type='button'/>
              </div>

            </Grid.Column>
          </Grid>

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
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save Changes' : 'Upload Document'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default  compose(
  connect(
    (state) => {
      const documentDetail = documentDetailDuck.selectors.detail(state)

      return {
        documentDetail,
        initialValues: { date_added: moment(new Date(),'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') }
      }
    },
    {
      post     : documentDetailDuck.creators.post,
      put      : documentDetailDuck.creators.put,
      resetItem: documentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'employee-document-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        file_name: Yup.string().required('Name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DocumentForm)

