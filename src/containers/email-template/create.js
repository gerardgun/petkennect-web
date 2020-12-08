import React, { useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Input, Modal, Checkbox, Select, Search } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import emailTemplateDetailDuck from '@reducers/email-template/detail'

import './styles.scss'

const editorConfiguration = {
  fontFamily: {
    options: [
      'default',
      'Ubuntu, Arial, sans-serif',
      'Ubuntu Mono, Courier New, Courier, monospace'
    ]
  },
  toolbar: {
    items: [
      'fontFamily',
      'heading',
      '|',
      'bold',
      'italic',
      'Link',
      'bulletedList',
      'numberedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'Blockquote',
      'insertTable',
      '|',
      'undo',
      'redo'
    ],location: 'bottom'
  },
  toolbarLocation: 'bottom',
  table          : {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  }
}

const EmailTemplateForm = (props) => {
  const {
    emailTemplateDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form

  } = props

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    return props
      .sendEmail({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const _handleDrop = useCallback(acceptedFiles => {
    // eslint-disable-next-line no-unused-vars
    acceptedFiles.forEach(file => {

    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop: _handleDrop, multiple: true })

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleSubjectChange = value => props.change('body_title', value)

  const _handleChange = (event, editor) => {
    const data = editor.getData()
    props.change('body_text', data)
  }

  const isOpened = useMemo(() => getIsOpened(emailTemplateDetail.mode), [ emailTemplateDetail.mode ])

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
            Add Email Template
          </Header>
          <Field component='input' name='body_text' type='hidden'/>

          <Form.Group widths='equal'>

            <Field
              component={FormField}
              control={Select}
              label='Category'
              name='category'
              onChange=''
              options={[
                { key: 1, value: 'client', text: 'Client' },
                { key: 2, value: 'employee', text: 'Employee' }

              ]}
              placeholder='Select Category'
              selectOnBlur={false}/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Name'
              name='purpose'
              placeholder='Enter Name'/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Subject'
              name='subject'
              onChange={_handleSubjectChange}
              placeholder='Enter subject'/>
          </Form.Group>
          <label>Variables</label>
          <br></br>
          <Form.Group widths='equal'>

            <Field
              component={FormField}
              control={Search}
              label='You can use the following variables to customize this template'
              name='variable'
              onChange=''

              placeholder='search for a variable'
              selectOnBlur={false}/>

          </Form.Group>
          <p>{'{first_name},{last_name},{animal_name},{location_name},'}</p>
          <p>{'{location_address_1},{location_address_2},{location_city},{location_state},'}</p>
          <p>{'{location_zip},{location_phone},{location_fax,{location_email},'}</p>
          <p>{'{location_hours}'}</p>
          <Form.Group className='ph8' widths='equal'>
            <CKEditor
              config={editorConfiguration} data={props.watchedBodyText} editor={ClassicEditor}
              onChange={_handleChange}/>
          </Form.Group>

          <div {...getRootProps()}  className='document-upload-choose-file'>
            <input {...getInputProps()}/>
            <Button
              color='teal'
              content='Choose file'
              type='button'/>
          </div>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Active'
              name='status'
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
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={'Save'}
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
    ({ ...state }) => {
      return {

        emailTemplateDetail: emailTemplateDetailDuck.selectors.detail(state),
        watchedBodyText    : formValueSelector('email-template-form')(state,'body_text')
      }
    },
    {
      resetItem: emailTemplateDetailDuck.creators.resetItem,
      sendEmail: emailTemplateDetailDuck.creators.sendEmail
    }
  ),
  reduxForm({
    form              : 'email-template-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        subject  : Yup.string().required('Subject is required'),
        body_text: Yup.string().required('Message is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmailTemplateForm)
