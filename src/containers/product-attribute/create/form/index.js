import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Select, Input } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import { ProductAttributeTypeOptions } from '@lib/constants/product'

import productAttributeDetailDuck from '@reducers/product/product-attribute/detail'

const ProductAttributeCreateForm = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(productAttributeDetailDuck.selectors.detail)

  useEffect(() => {
    if(editing) initialize(detail.item)
  }, [])

  const _handleClose = () => {
    dispatch(
      productAttributeDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(productAttributeDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(productAttributeDetailDuck.creators.post({ ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='product-attribute' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Name'
          name='name'
          placeholder='Enter name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={editing}
          label='Type'
          name='type'
          options={ProductAttributeTypeOptions}
          placeholder='Select an option'
          required
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
  form    : 'product-attribute',
  validate: values  => {
    const schema = {
      name: yup.string().required('Name is required'),
      type: yup.string().required('Type is reqired')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ProductAttributeCreateForm)
