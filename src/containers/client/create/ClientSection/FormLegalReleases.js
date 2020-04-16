import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Divider, Form, Header, Tab } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import clientDetailDuck from '@reducers/client/detail'

const FormInformation = props => {
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
            name='legal_sign_on'
            component={FormField}
            control={Form.Input}
            label='Sign on'
            type='date'
            autoFocus
            autoComplete='off'
          />
          <Form.Field />
          <Form.Field />
        </Form.Group>
        <Form.Group>
          <Field
            name='legal_liability'
            component={FormField}
            control={Form.Checkbox}
            label='Liability'
            toggle
            type='checkbox'
          />
          <Field
            name='legal_kc_waiver'
            component={FormField}
            control={Form.Checkbox}
            label='KC Waiver'
            toggle
            type='checkbox'
          />
        </Form.Group>
        <Divider />
        <Header as='h4'>Credit Card</Header>
        <Form.Group widths='equal'>
          <Field
            name='cc_type'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 'visa', text : 'Visa' },
              { key: 2, value: 'mastercard', text : 'Mastercard' },
              { key: 5, value: 'express', text : 'Express' },
            ]}
            label='CC Type'
            placeholder='Select a CC Type'
            selectOnBlur={false}
          />
          <Field
            name='cc_exp_month'
            component={FormField}
            control={Form.Input}
            label='Expiration date'
            placeholder='MM'
            autoComplete='off'
          />
          <Field
            name='cc_exp_year'
            component={FormField}
            control={Form.Input}
            label='&nbsp;'
            placeholder='YY'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='cc_number'
            component={FormField}
            control={Form.Input}
            label='Card number'
            placeholder='XXXX-XXXX-XXXX-XXXX'
            autoComplete='off'
          />
          <Field
            name='cc_cvc'
            component={FormField}
            control={Form.Input}
            label='CVC'
            placeholder='XXX'
            autoComplete='off'
          />
          <Form.Field />
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
    form              : 'client-create-legal-releases',
    destroyOnUnmount  : false,
  })
)(FormInformation)

