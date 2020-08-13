import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Icon, Input, Label } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import TextAreaEditor from '@components/Common/TextAreaEditor'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientDetailDuck from '@reducers/client/detail'

export const formId = 'client-document-send-form'

function ClientDocumentFormSend(props) {
  const {
    clientDetail,
    clientDocumentDetail,
    change, error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    change('email', clientDetail.item.email)
  }, [])

  const _handleSubmit = values => {
    values = parseFormValues(values)

    return props.sendEmail({ ...values, client_id: clientDetail.item.id })
      .then(() => props.resetItem())
      .catch(parseResponseError)
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Email'
            name='email'
            placeholder='Enter email'
            readOnly
            required
            type='email'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Input}
            label='Subject'
            name='subject'
            placeholder='Enter subject'
            required/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextAreaEditor}
            label='Description'
            name='body_text'
            required/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Attachments</Header>
        <Label
          basic color='grey' size='large'
          style={{ fontWeight: '400' }}>
          <Icon name='attach'/> {clientDocumentDetail.item.filename}
        </Label>

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }

        <Field component='input' name='id' type='hidden'/>
      </Form>
    </>
  )
}

export default compose(
  connect(
    state => {
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)

      return {
        clientDetail : clientDetailDuck.selectors.detail(state),
        clientDocumentDetail,
        // for redux form
        initialValues: {
          id: clientDocumentDetail.item.id
        }
      }
    },
    {
      sendEmail: clientDocumentDetailDuck.creators.sendEmail,
      resetItem: clientDocumentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        email    : Yup.string().email().required('Email is required'),
        subject  : Yup.string().required('Subject is required'),
        body_text: Yup.string().required('Message is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientDocumentFormSend)
