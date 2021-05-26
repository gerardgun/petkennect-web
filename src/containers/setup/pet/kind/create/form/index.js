import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Input, Select } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petKindDetailDuck from '@reducers/pet/kind/detail'

const PetKindCreateForm = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(petKindDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(petKindDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing)
      initialize({
        ...detail.item,
        locations: detail.item.locations.map(({ id }) => id)
      })
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      petKindDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(values.sku_id === detail.item.sku_id)
      delete values.sku_id

    if(editing)
      return dispatch(petKindDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(petKindDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='pet-kind' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Species Name'
          name='name'
          placeholder='Enter Name'
          required/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Applies to</Header>

      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Location'
          multiple
          name='locations'
          options={detail.form.location_options}
          placeholder='Select Locations'
          required
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
  )
}

export default reduxForm({
  form    : 'pet-kind',
  validate: values => {
    const schema = {
      name     : yup.string().required('Name is required'),
      locations: yup.array().required('Choose at least one location')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(PetKindCreateForm)
