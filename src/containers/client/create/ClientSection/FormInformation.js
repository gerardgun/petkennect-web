import React, { useEffect } from 'react'
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

const zipes = [ { key: 1, value: 1, text: '25435' } ]

const FormInformation = props => {
  const {
    clientDetail,
    match,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(!initialized && clientDetail.item.id)
      props.initialize({
        ...clientDetail.item,
        state              : 'PA',
        city               : 'DOYLESTOWN',
        zip_code           : 1,
        contact_location_id: 1
      })
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
            label='Name *'
            name='first_name'
            placeholder='Enter names'
            readOnly={isUpdating}/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Lastname *'
            name='last_name'
            placeholder='Enter lastname'
            readOnly={isUpdating}/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Spouse'
            name='spouse'
            placeholder='Enter spouse'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Contact date'
            name='contact_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Contact Location'
            name='contact_location_id'
            options={[
              { key: 1, value: 1, text: '02-RH' },
              { key: 2, value: 2, text: '03-VP' },
              { key: 3, value: 3, text: '04-HH' },
              { key: 4, value: 4, text: '05-SC' }
            ]}
            placeholder='Contact Location'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Status'
            name='status'
            options={[
              { key: 1, value: 'DECLINED', text: 'DECLINED' },
              { key: 2, value: 'GREEN', text: 'GREEN' },
              { key: 3, value: 'RED', text: 'RED - See notes' },
              { key: 4, value: 'VIP-CLIENT', text: 'VIP CLIENT' }
            ]}
            placeholder='Select status'
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Address'
            name='address'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='State *'
            name='state'
            readOnly/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='City *'
            name='city'
            readOnly/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Select}
            label='Zip *'
            name='zip_code'
            options={zipes}
            placeholder='Select zip'
            readOnly
            search
            selectOnBlur={false}/>
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
    form            : 'client-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        first_name: YupFields.name,
        last_name : YupFields.first_lastname,
        zip_code  : YupFields.zip
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

