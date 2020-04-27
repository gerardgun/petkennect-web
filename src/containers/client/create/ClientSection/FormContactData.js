import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'

const FormContactData = props => {
  const {
    clientDetail,
    match,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(clientDetail.item.id && !initialized) props.initialize(clientDetail.item)
  }, [ clientDetail.status ])

  const isUpdating = match.params.client

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={clientDetail.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Cell Phone'
            name='phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Home Phone'
            name='phones[1]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Work Phone'
            name='phones[2]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Other Phone'
            name='phones[3]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Email *'
            name='email'
            placeholder='Enter email'
            readOnly={isUpdating}
            type='email'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Alt Email'
            name='alt_email'
            placeholder='Enter email'
            type='email'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='Referred'
            name='referred'
            options={[
              { key: 1, value: 1, text: 'Drive-by' },
              { key: 2, value: 2, text: 'Event' },
              { key: 3, value: 3, text: 'Internet search' },
              { key: 4, value: 4, text: 'Referral' },
              { key: 5, value: 5, text: 'Other' }
            ]}
            placeholder='Select an option'
            selectOnBlur={false}/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Send email'
            name='send_email'
            type='checkbox'/>
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
      </Form>
    </Tab.Pane>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {}
  ),
  reduxForm({
    form            : 'client-create-contact-data',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        email    : YupFields.email,
        alt_email: YupFields.emailNotRequired
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormContactData)

