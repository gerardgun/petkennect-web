import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'
import _times from 'lodash/times'
import faker from 'faker'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'

const cities = _times(10, index => ({ key: index, value: index, text : faker.address.city() }))
const states = _times(10, index => ({ key: index, value: index, text : faker.address.state() }))
const zipes = _times(10, index => ({ key: index, value: index, text : faker.address.zipCode() }))

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
            name='name'
            component={FormField}
            control={Form.Input}
            label='Name *'
            placeholder='Enter names'
            autoFocus
            autoComplete='off'
          />
          <Field
            name='lastname'
            component={FormField}
            control={Form.Input}
            label='Lastname *'
            placeholder='Enter lastname'
            autoComplete='off'
          />
          <Field
            name='second_lastname'
            component={FormField}
            control={Form.Input}
            label='Second lastname *'
            placeholder='Enter second lastname'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='spouse'
            component={FormField}
            control={Form.Input}
            label='Spouse'
            placeholder='Enter spouse'
            autoComplete='off'
          />
          <Field
            name='contact_date'
            component={FormField}
            control={Form.Input}
            label='Contact date'
            type='date'
          />
          <Field
            name='contact_location'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 1, text : '02-RH' },
              { key: 2, value: 2, text : '03-VP' },
              { key: 3, value: 3, text : '04-HH' },
              { key: 4, value: 4, text : '05-SC' },
            ]}
            label='Contact Location'
            placeholder='Contact Location'
            selectOnBlur={false}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='address'
            component={FormField}
            control={Form.Input}
            label='Address'
            placeholder='Enter address'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='city'
            component={FormField}
            control={Form.Select}
            options={cities}
            label='City *'
            placeholder='Select city'
            autoComplete='off'
            search
            selectOnBlur={false}
          />
          <Field
            name='state'
            component={FormField}
            control={Form.Select}
            options={states}
            label='State *'
            placeholder='Select state'
            autoComplete='off'
            search
            selectOnBlur={false}
          />
          <Field
            name='zip'
            component={FormField}
            control={Form.Select}
            options={zipes}
            label='Zip *'
            placeholder='Select zip'
            autoComplete='off'
            search
            selectOnBlur={false}
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
    form            : 'client-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        name: YupFields.name,
        lastname: YupFields.first_lastname,
        second_lastname: YupFields.second_lastname,
        city: YupFields.city,
        state: YupFields.state,
        zip: YupFields.zip,
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

