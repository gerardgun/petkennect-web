import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Form, Input, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import { syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'
import { formId } from '../form/first'

const ProductFormThird = props => {
  const {
    currentTenant,
    productDetail,
    product_name,
    short_description,
    error, handleSubmit, reset // redux-form
  } = props

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>
        <div className='mt32 mb16 div_url'>
          <label>Product URL</label>
          <br/>
          <Input
            disabled label={`http://${currentTenant.subdomain_prefix}.petkennect.com/`}
            value={productDetail.item.slug}/>
        </div>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={TextArea}
            label='Meta Description'
            name='short_description'
            placeholder='Enter description'
            required/>
        </Form.Group>
        <label>Browser preview</label>
        <div className='ui fluid card div_browser_preview'>
          <div className='content'>
            <div className='meta'>
              <a href={`https://${currentTenant.subdomain_prefix}.petkennect.com/${productDetail.item.slug}`} rel='noopener noreferrer' target='_blank'>{`https://${currentTenant.subdomain_prefix}.petkennect.com/${productDetail.item.slug}`}</a>
            </div>
            <div className='header mb8 mt8'>{product_name}</div>
            <div className='description'>{short_description}</div>
          </div>
        </div>
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
    </>
  )
}

export default compose(
  connect(
    ({ auth, ...state }) => {
      const productDetail = productFamiliesDetailDuck.selectors.detail(state)
      const product_name = formValueSelector(formId)(state, 'name')
      const short_description = formValueSelector(formId)(state, 'short_description')

      return {
        productDetail,
        product_name,
        short_description,
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
)(ProductFormThird)
