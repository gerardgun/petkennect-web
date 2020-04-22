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
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Sign on'
            name='legal_sign_on'
            type='date'/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Liability'
            name='legal_liability'
            toggle
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='KC Waiver'
            name='legal_kc_waiver'
            toggle
            type='checkbox'/>
        </Form.Group>
        <Divider/>
        <Header as='h4'>Credit Card</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='CC Type'
            name='cc_type'
            options={[
              { key: 1, value: 'visa', text: 'Visa' },
              { key: 2, value: 'mastercard', text: 'Mastercard' },
              { key: 5, value: 'express', text: 'Express' }
            ]}
            placeholder='Select a CC Type'
            selectOnBlur={false}/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Expiration date'
            name='cc_exp_month'
            placeholder='MM'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='&nbsp;'
            name='cc_exp_year'
            placeholder='YY'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Card number'
            name='cc_number'
            placeholder='XXXX-XXXX-XXXX-XXXX'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='CVC'
            name='cc_cvc'
            placeholder='XXX'/>
          <Form.Field/>
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
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {}
  ),
  reduxForm({
    form            : 'client-create-legal-releases',
    destroyOnUnmount: false
  })
)(FormInformation)

