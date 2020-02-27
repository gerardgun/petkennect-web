import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Divider, Form, Header } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import clientDetailDuck from '@reducers/client/detail'

const FormInformation = props => {
  const {
    clientDetail,
    error, handleSubmit, reset // redux-form
  } = props

  return (
    <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field
          name='sign_on'
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
          name='liability'
          component={FormField}
          control={Form.Checkbox}
          label='Liability'
          toggle
        />
        <Field
          name='kc_waiver'
          component={FormField}
          control={Form.Checkbox}
          label='KC Waiver'
          toggle
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
            { key: 1, value: 1, text : 'Visa' },
            { key: 2, value: 2, text : 'Mastercard' },
            { key: 5, value: 5, text : 'Express' },
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
  )
}

export default compose(
  connect(
    state => {
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        initialValues: clientDetail.item
      }
    },
    {}
  ),
  reduxForm({
    form              : 'client-create-legal-releases',
    destroyOnUnmount  : false,
  })
)(FormInformation)

