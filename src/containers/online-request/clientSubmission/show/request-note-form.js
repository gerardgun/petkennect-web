import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

const formId = 'request-note'

const RequestNoteForm = props => {
  const {
    error, reset, submitting, handleSubmit // redux-form
  } = props

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={TextArea}
            name='message'
            placeholder='Enter message'/>
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

        <Form.Group widths='equal'>
          <Form.Field>
            <Button
              className='w120'
              color='teal'
              content='Add Note'
              disabled={submitting}
              loading={submitting}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

export default compose(
  reduxForm({
    form    : formId,
    validate: values => {
      const schema = {
        message: Yup.string().required('This field is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(RequestNoteForm)
