import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, isSubmitting } from 'redux-form'
import { Form, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'

const zipes = [ { key: 1, value: 1, text : '25435' } ]

const FormInformation = props => {
  const {
    clientDetail,
    match,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(!initialized && clientDetail.item.id) {
      props.initialize({
        ...clientDetail.item,
        state: 'PA',
        city: 'DOYLESTOWN',
        zip_code: 1,
        contact_location_id: 1
      })
    }
  }, [ clientDetail.status ])

  const isUpdating = match.params.client

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={clientDetail.status === 'GETTING'}>
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            name='first_name'
            component={FormField}
            control={Form.Input}
            label='Name *'
            placeholder='Enter names'
            readOnly={isUpdating}
            autoFocus
            autoComplete='off'
          />
          <Field
            name='last_name'
            component={FormField}
            control={Form.Input}
            label='Lastname *'
            placeholder='Enter lastname'
            readOnly={isUpdating}
            autoComplete='off'
          />
          <Field
            name='spouse'
            component={FormField}
            control={Form.Input}
            label='Spouse'
            placeholder='Enter spouse'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='contact_date'
            component={FormField}
            control={Form.Input}
            label='Contact date'
            type='date'
          />
          <Field
            name='contact_location_id'
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
          <Field
            name='status'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 'DECLINED', text : 'DECLINED' },
              { key: 2, value: 'GREEN', text : 'GREEN' },
              { key: 3, value: 'RED', text : 'RED - See notes' },
              { key: 4, value: 'VIP-CLIENT', text : 'VIP CLIENT' },
            ]}
            label='Status'
            placeholder='Select status'
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
            name='state'
            component={FormField}
            control={Form.Input}
            label='State *'
            autoComplete='off'
            readOnly
          />
          <Field
            name='city'
            component={FormField}
            control={Form.Input}
            label='City *'
            autoComplete='off'
            readOnly
          />
          <Field
            name='zip_code'
            component={FormField}
            control={Form.Select}
            options={zipes}
            label='Zip *'
            placeholder='Select zip'
            autoComplete='off'
            readOnly
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
  withRouter,
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
        first_name: YupFields.name,
        last_name: YupFields.first_lastname,
        zip_code: YupFields.zip,
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

