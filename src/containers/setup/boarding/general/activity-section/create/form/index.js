import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Form, Input, Select } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import locationDuck from '@reducers/location'
import petKindDuck from '@reducers/pet/kind'
import kennelAreaDetailDuck from  '@reducers/order/service/boarding/kennel/area/detail'

const KennelAreaCreateForm = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const locationList = useSelector(locationDuck.selectors.list)
  const petKindList = useSelector(petKindDuck.selectors.list)
  const detail = useSelector(kennelAreaDetailDuck.selectors.detail)

  useEffect(() => {
    if(editing)
      initialize(detail.item)

    if(locationList.items.length === 0)
      dispatch(
        locationDuck.creators.get()
      )

    if(petKindList.items.length === 0)
      dispatch(
        petKindDuck.creators.get()
      )
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      petKindDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(kennelAreaDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(kennelAreaDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='kennel-area' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Select}
          label='Location'
          name='location'
          options={
            locationList.items.map(({ id, name }) => ({
              text : name,
              value: id
            }))
          }
          placeholder='Select Location'
          required
          search
          selectOnBlur={false}/>
        <Field
          component={FormField}
          control={Select}
          label='Service Group'
          name='service_group_id'
          options={
            locationList.items.map(({ id, name }) => ({
              text : name,
              value: id
            }))
          }
          placeholder='Select Service Group'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Area Name'
          name='name'
          placeholder='Enter area name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Species'
          name='pet_class'
          options={
            petKindList.items.map(({ id, name }) => ({
              text : name,
              value: id
            }))
          }
          placeholder='Select Species'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Surcharge'
          name='surcharge'
          type='checkbox'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Charge Type'
          name='charge_type'
          options={[
            { value: 'No Charge', text: 'No Charge' },
            { value: 'Per Stay', text: 'Per Stay' },
            { value: 'Per Night', text: 'Per Night' }
          ]}
          placeholder='Select charge type'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Price'
          name='price'
          placeholder='0.00'
          required
          type='number'/>
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
  )
}

export default reduxForm({
  form    : 'kennel-area',
  validate: values => {
    const schema = {
      name     : yup.string().required('Name is required'),
      pet_class: yup.mixed().required('Pet species is required'),
      location : yup.mixed().required('Location is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(KennelAreaCreateForm)
