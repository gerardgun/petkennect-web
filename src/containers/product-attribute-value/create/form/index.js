import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputColor from '@components/Common/InputColor'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import productAttributeDetailDuck from '@reducers/product/product-attribute/detail'
import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'

const ProductAttributeValueCreateForm = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(productAttributeValueDetailDuck.selectors.detail)
  const productAttributeDetail = useSelector(productAttributeDetailDuck.selectors.detail)

  useEffect(() => {
    if(editing) initialize(detail.item)
  }, [])

  const _handleClose = () => {
    dispatch(
      productAttributeValueDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(
        productAttributeValueDetailDuck.creators.put({
          id                  : detail.item.id,
          product_attribute_id: productAttributeDetail.item.id,
          ...values
        })
      )
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(
        productAttributeValueDetailDuck.creators.post({
          product_attribute_id: productAttributeDetail.item.id,
          ...values
        })
      )
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='product-attribute-value' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Value'
          name='value_display'
          placeholder='Enter Value'
          required/>
      </Form.Group>
      {
        productAttributeDetail.item.type === 'C' && (
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={InputColor}
              label='Color'
              name='value'
              required/>
          </Form.Group>
        )
      }

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
  form    : 'product-attribute-value',
  validate: values => {
    const schema = {
      value_display: yup.string().required('Value is required'),
      value        : yup.string().matches(/^#[0-9a-fA-F]{3,6}\s*$/, 'Example: #CCCCCC').required('Color is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ProductAttributeValueCreateForm)
