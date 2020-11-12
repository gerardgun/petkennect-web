import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { formValueSelector, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import { formId } from './../../form/first'
import ProductFormThird from './../../form/third'

import authDuck from '@reducers/auth'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'

const ProductFormWizardSecond = props => {
  const {
    category,
    productDetail,
    productDetail: { status },
    handleSubmit, reset // redux-form
  } = props

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    values = parseFormValues(values)
    values.categories = values.categories.map((item,index) => {
      return  item == false ? null : category.items[index].id
    }).filter(function(el) {
      return el != null
    })

    if(isUpdating)
      return props.put({ id: productDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const saving = [ 'POSTING', 'PUTTING' ].includes(status)
  const isUpdating = Boolean(productDetail.item.id)

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <span>
          <span className='text-black'>
            Step 2
          </span>
          <span className='text-gray'>{' '}of 2</span>
        </span><br/>
        <span className='text-gray'>
          Configure SEO
        </span>

        <ProductFormThird/>

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Previous'
              disabled={saving}
              onClick={props.onPreviousStep}
              type='button'/>
            <Button
              color='teal'
              content={`${isUpdating ? 'Update' : 'Add'} Product`}
              disabled={saving}
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

export default compose(
  connect(
    ({ auth, category, ...state }) => {
      const productDetail = productFamiliesDetailDuck.selectors.detail(state)
      const product_name = formValueSelector(formId)(state, 'name')
      const short_description = formValueSelector(formId)(state, 'short_description')

      return {
        productDetail,
        product_name,
        short_description,
        category,
        currentTenant: authDuck.selectors.getCurrentTenant(auth),
        initialValues: { ...productDetail.item }
      }
    },
    {
      post     : productFamiliesDetailDuck.creators.post,
      put      : productFamiliesDetailDuck.creators.put,
      resetItem: productFamiliesDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form                    : formId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        short_description: Yup.string().required('Description name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductFormWizardSecond)
