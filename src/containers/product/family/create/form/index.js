import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import CheckboxGroup from '@components/Common/CheckboxGroup'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import { ProtectedProductFamilyType } from '@lib/constants/product'

import productAttributeDuck from '@reducers/product/product-attribute'
import productFamilyDetailDuck from '@reducers/product/family/detail'

export const formId = 'product-family'

const ProductFamilyCreateForm = props => {
  const {
    productAttribute,
    productFamilyDetail,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getProductAttributes()
  }, [])

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put(values)
        .then(props.resetProductFamily)
        .catch(parseResponseError)
    else
      return props.post(values)
        .then(props.resetProductFamily)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(productFamilyDetail.item.id)
  const isProtected = Object.keys(ProtectedProductFamilyType).includes(productFamilyDetail.item.type)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
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
            productAttribute.items
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

      <Field component='input' name='id' type='hidden'/>
    </Form>
  )
}

export default compose(
  connect(
    state => {
      const productFamilyDetail = productFamilyDetailDuck.selectors.detail(state)

      return {
        productAttribute: productAttributeDuck.selectors.list(state),
        productFamilyDetail,
        initialValues   : productFamilyDetail.item
      }
    },
    {
      getProductAttributes: productAttributeDuck.creators.get,
      post                : productFamilyDetailDuck.creators.post,
      put                 : productFamilyDetailDuck.creators.put,
      resetProductFamily  : productFamilyDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form    : formId,
    validate: values => {
      const schema = {
        name      : Yup.string().required('Name is required'),
        attributes: Yup.array().required('Choose at least one attribute')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductFamilyCreateForm)
