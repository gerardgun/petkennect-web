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
          control={Input}
          label='Bin No'
          name='capacity'
          placeholder='0'
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
