import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Input, Modal, Divider } from 'semantic-ui-react'
import loadable from '@loadable/component'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDuck from '@reducers/client'
import authDuck from '@reducers/auth'
import petDetailDuck from '@reducers/pet/detail'
import petIncidentDuck from '@reducers/pet/incident'
import petIncidentDetailDuck from '@reducers/pet/incident/detail'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const FormError = loadable(() => import('@components/Common/FormError'))

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

const SendReportForm = (props) => {
  const {
    open,
    onClose,
    client,
    petDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form

  } = props

  useEffect(()=> {
    props.getClients()

    return ()=> {
      props.removeSelectedItems()
    }
  },[])
  useEffect(()=> {
    if(petDetail.item.client && open)
      props.change('client_email', (client.items.find(_client=> _client.id === petDetail.item.client) || {}).email)
  },[ petDetail.item.client , client.items , open ])

  const _handleClose = () => {
    props.reset()
    onClose()
    props.removeSelectedItems()
  }

  const _handleSubmit = (values) => {
    return props
      .sendEmail({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const _handleChange = (event, editor) => {
    const data = editor.getData()
    props.change('body_text', data)
  }

  const _handleSubjectChange = value => props.change('body_title', value)

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
            Email Form
          </Header>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Email'
              name='client_email'
              placeholder=''
              readOnly/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
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
          {/* <Header as='h4'>Attachments</Header>

          <Form.Group>

            <Field
              component={FormField}
              control={Input}
              label=''
              name='files'
              type='file'/>
          </Form.Group> */}
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
                content={'Send'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

SendReportForm.prototype = {
  open   : PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
SendReportForm.defaultProps = {}

export default compose(
  withRouter,
  connect(
    ({ auth,...state }) => {
      const client = clientDuck.selectors.list(state)
      const petDetail = petDetailDuck.selectors.detail(state)
      const currentTenant = authDuck.selectors.getCurrentTenant(auth)

      const clientFullName = `${petDetail.item.client_first_name || ''} ${petDetail.item.client_last_name || ''}`

      return {
        client,
        petDetail,
        initialValues: {
          subject  : 'Pet Incident Notification',
          body_text: `Dear ${clientFullName},<br/>`
          + 'Attached is the incident report involving your pet.  The purpose of this report is to document the incident to keep you aware of any changes in the future.<br/><br/>'
          + 'Thank You,<br/>'
          + `${currentTenant.legal_name}`
        },
        watchedBodyText: formValueSelector('pet-incident-section-send-report-form')(state,'body_text')

      }
    },
    {
      getClients         : clientDuck.creators.get,
      sendEmail          : petIncidentDetailDuck.creators.sendEmail,
      removeSelectedItems: petIncidentDuck.creators.removeSelectedIds

    }
  ),
  reduxForm({
    form              : 'pet-incident-section-send-report-form',
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
)(SendReportForm)
