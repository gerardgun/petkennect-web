import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDuck from '@reducers/client'
import petDetailDuck from '@reducers/pet/detail'
import petIncidentDetailDuck from '@reducers/pet/incident/detail'

const EmailForm = (props) => {
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
  },[])
  useEffect(()=> {
    if(petDetail.item.client && open)
      props.change('client_email', (client.items.find(_client=> _client.id === petDetail.item.client) || {}).email)
  },[ petDetail.item.client , client.items , open ])

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
          <Field component='input' name='body_title' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              label='To'
              name='client_email'
              placeholder=''
              readOnly/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Subject'
              name='subject'
              onChange={_handleSubjectChange}
              placeholder='Enter subject'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.TextArea}
              label=''
              name='body_text'
              placeholder='Enter message...'
              rows={10}/>

          </Form.Group>

          <Divider/>
          <Header as='h4'>Attachments</Header>

          <Form.Group>

            <Field
              component={FormField}
              control={Form.Input}
              label=''
              name='files'
              type='file'/>
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

EmailForm.prototype = {
  open   : PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
EmailForm.defaultProps = {}

export default compose(
  withRouter,
  connect(
    (state) => {
      const client = clientDuck.selectors.list(state)
      const petDetail = petDetailDuck.selectors.detail(state)

      return {
        client,
        petDetail,
        initialValues: {
          subject   : 'Pet Incident Notification',
          body_title: 'Pet Incident Notification',
          body_text : 'Dear {{client_name}} {{client_lastname}},\n'
          + 'Attached is the incident report involving your pet. The purpose of this report is to document'
          + 'the incident to keep you aware of any changes in the future.\n\n'

          + 'Thank You,\n'
          + '{{company_name}}'
        }
      }
    },
    {
      getClients: clientDuck.creators.get,
      sendEmail : petIncidentDetailDuck.creators.sendEmail
    }
  ),
  reduxForm({
    form              : 'pet-incident-email-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        subject   : Yup.string().required('Subject is required'),
        body_text : Yup.string().required('Message is required'),
        body_title: Yup.string().required('Title is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmailForm)
