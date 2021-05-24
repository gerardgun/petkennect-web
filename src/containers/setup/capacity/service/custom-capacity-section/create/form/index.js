import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input } from 'semantic-ui-react'
import * as yup from 'yup'

import CheckboxGroup from '@components/Common/CheckboxGroup'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import { ProtectedProductFamilyType } from '@lib/constants/product'

import productAttributeDuck from '@reducers/product/product-attribute'
import productFamilyDetailDuck from '@reducers/product/family/detail'

const ProductFamilyCreateForm = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const productAttributeList = useSelector(productAttributeDuck.selectors.list)
  const detail = useSelector(productFamilyDetailDuck.selectors.detail)

  useEffect(() => {
    if(editing)
      initialize({
        ...detail.item,
        attributes: detail.item.attributes.map(({ product_attribute }) => product_attribute)
      })

    if(productAttributeList.items.length === 0)
      dispatch(
        productAttributeDuck.creators.get()
      )
  }, [])

  const _handleClose = () => {
    dispatch(
      productFamilyDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(productFamilyDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(productFamilyDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)
  const isProtected = Object.keys(ProtectedProductFamilyType).includes(detail.item.type)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='product-family' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          disabled={isProtected}
          label='Name'
          name='name'
          placeholder='Enter name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={CheckboxGroup}
          label='Which attributes will be variants?'
          name='attributes'
          options={
            productAttributeList.items
              .map(item => ({ text: item.name, value: item.id }))
          }
          required/>
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
  form    : 'product-family',
  validate: values => {
    const schema = {
      name      : yup.string().required('Name is required'),
      attributes: yup.array().required('Choose at least one attribute')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ProductFamilyCreateForm)
