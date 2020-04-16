import React, { useEffect } from 'react'
import { connect } from 'react-redux'
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
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(clientDetail.item.id && !initialized) props.initialize(clientDetail.item)
  }, [ clientDetail.status ])

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={clientDetail.status === 'GETTING'}>
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            name='phones[0]'
            component={FormField}
            control={Form.Input}
            label='Cell Phone'
            placeholder='Enter phone number'
            type='tel'
            autoFocus
            autoComplete='off'
          />
          <Field
            name='phones[1]'
            component={FormField}
            control={Form.Input}
            label='Home Phone'
            placeholder='Enter phone number'
            type='tel'
            autoComplete='off'
          />
          <Field
            name='phones[2]'
            component={FormField}
            control={Form.Input}
            label='Work Phone'
            placeholder='Enter phone number'
            type='tel'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='phones[3]'
            component={FormField}
            control={Form.Input}
            label='Other Phone'
            placeholder='Enter phone number'
            type='tel'
            autoComplete='off'
          />
          <Field
            name='email'
            component={FormField}
            control={Form.Input}
            label='Email *'
            placeholder='Enter email'
            type='email'
            autoComplete='off'
          />
          <Field
            name='alt_email'
            component={FormField}
            control={Form.Input}
            label='Alt Email'
            placeholder='Enter email'
            type='email'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='referred'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 'DRIVE-BY', text : 'Drive-by' },
              { key: 2, value: 'EVENT', text : 'Event' },
              { key: 3, value: 'INTERNET-SEARCH', text : 'Internet search' },
              { key: 4, value: 'REFERRAL', text : 'Referral' },
              { key: 5, value: 'OTHER', text : 'Other' },
            ]}
            label='Referred'
            placeholder='Select an option'
            selectOnBlur={false}
          />
          <Form.Field />
          <Form.Field />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='send_email'
            component={FormField}
            control={Form.Checkbox}
            label='Send email'
            type='checkbox'
          />
        </Form.Group>

        {
          error && (
            <Form.Group widths="equal">
              <Form.Field>
                <FormError message={error} />
              </Form.Field>
            </Form.Group>
          )
        }
      </Form>
    </Tab.Pane>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {}
  ),
  reduxForm({
    form              : 'client-create-contact-data',
    destroyOnUnmount  : false,
    validate: values  => {
      const schema = {
        email    : YupFields.email,
        alt_email: YupFields.emailNotRequired,
      }
    
      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormContactData)

