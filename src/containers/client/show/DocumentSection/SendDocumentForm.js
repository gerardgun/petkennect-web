import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Modal, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import clientDuck from '@reducers/client'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

const editorConfiguration = {
  toolbar: {
    items: [
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

const SendDocumentForm = (props) => {
  const {
    open,
    onClose,
    client,
    error,
    handleSubmit,
    reset,
    submitting // redux-form

  } = props

  useEffect(()=> {
    props.getClients()
  },[])

  useEffect(()=> {
    if(open)
      props.change('client_email', client.items[0].email)
  },[ client.items , open ])

  const _handleClose = () => {
    props.reset()
    onClose()
  }

  const _handleSubmit = (values) => {
    return props
      .sendEmail({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const _handleSubjectChange = value => props.change('body_title', value)

  const _handleChange = (event, editor) => {
    const data = editor.getData()
    props.change('body_text', data)
  }

  const isOpened = Boolean(open)

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
            Send email
          </Header>
          <Field component='input' name='body_text' type='hidden'/>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Input}
              label='Email'
              name='client_email'
              placeholder=''
              readOnly/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Input}
              label='Subject'
              name='subject'
              onChange={_handleSubjectChange}
              placeholder='Enter subject'/>
          </Form.Group>
          <Form.Group className='ph8' widths='equal'>
            <CKEditor
              config={editorConfiguration} data={props.watchedBodyText} editor={ClassicEditor}
              onChange={_handleChange}/>
          </Form.Group>

          <Divider/>

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
                content='Send'
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

SendDocumentForm.prototype = {
  open   : PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
SendDocumentForm.defaultProps = {}

export default compose(
  withRouter,
  connect(
    (state) => {
      const client = clientDuck.selectors.list(state)
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)

      return {
        client,
        clientDocumentDetail,
        initialValues: {
          subject  : '',
          body_text: ''
        },
        watchedBodyText: formValueSelector('client-send-document-form')(state,'body_text')
      }
    },
    {
      getClients: clientDuck.creators.get,
      sendEmail : clientDocumentDetailDuck.creators.sendEmail
    }
  ),
  reduxForm({
    form              : 'client-send-document-form',
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
)(SendDocumentForm)
