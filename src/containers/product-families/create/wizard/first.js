import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import { syncValidate } from '@lib/utils/functions'

import productClassesDuck from '@reducers/product/product-classes'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'
import categoryDuck from '@reducers/category'

import ProductFormFirst, { formId } from './../../form/first'

const ProductFormWizardFirst = props => {
  const {
    handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getProductClasses()
    props.getCategories()
  }, [])

  const _handleClose = () => {
    props.resetItem()
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>
        <span>
          <span className='text-black'>
            Step 1
          </span>
          <span className='text-gray'>{' '}of 2</span>
        </span><br/>
        <span className='text-gray'>
          Complete Product Info
        </span>

        <ProductFormFirst/>

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              onClick={_handleClose}
              type='button'/>
            <Button
              className='w120'
              color='teal'
              content='Continue'
              type='submit'/>
          </Form.Field>
        </Form.Group>

        <Field component='input' name='id' type='hidden'/>
      </Form>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const productDetail = productFamiliesDetailDuck.selectors.detail(state)
      const categories =  categoryDuck.selectors.list(state)

      return {
        initialValues: { ...productDetail.item, categories: categories.items.map((item)=>{
          return (productDetail.item.categories && productDetail.item.categories.filter(function(id) {
            return id == item.id}).length > 0 ? true : false
          )
        }) },
        productClasses: productClassesDuck.selectors.list(state),
        category      : categories
      }
    },
    {
      getProductClasses: productClassesDuck.creators.get,
      getCategories    : categoryDuck.creators.get,
      resetItem        : productFamiliesDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form                    : formId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        name   : Yup.string().required('Product name is required'),
        'class': Yup.string().required('Class is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductFormWizardFirst)
