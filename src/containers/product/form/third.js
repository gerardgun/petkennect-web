import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Form, Input, Header, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import { syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import productFamilyDetailDuck from '@reducers/product/family/detail'
import { formId } from '../form/first'

const ProductFormThird = props => {
  const {
    watchedShortDescription = '',
    currentTenant,
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
            value={product_name}/>
        </div>
        <Form.Group className='text-area-container' widths='equal'>
          <Field
            component={FormField}
            control={TextArea}
            label='Meta Description'
            maxLength='160'
            name='short_description'
            placeholder='Enter Meta Description'
            required/>
          <Header className='text-area-counter' color='grey' size='tiny'>{watchedShortDescription.length}/160 characteres</Header>
        </Form.Group>

        <label>Browser preview</label>
        <div className='ui fluid card div_browser_preview'>
          <div className='content'>
            <div className='meta'>
              <a href={`https://${currentTenant.subdomain_prefix}.petkennect.com/${product_name}`} rel='noopener noreferrer' target='_blank'>{`https://${currentTenant.subdomain_prefix}.petkennect.com/${product_name}`}</a>
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
      const productDetail = productFamilyDetailDuck.selectors.detail(state)
      const product_name = formValueSelector(formId)(state, 'name')
      const short_description = formValueSelector(formId)(state, 'short_description')

      return {
        product_name,
        short_description,
        currentTenant          : authDuck.selectors.getCurrentTenant(auth),
        watchedShortDescription: formValueSelector(formId)(state,'short_description'),
        initialValues          : { ...productDetail.item }
      }
    },
    {
      post     : productFamilyDetailDuck.creators.post,
      put      : productFamilyDetailDuck.creators.put,
      resetItem: productFamilyDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form                    : formId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        short_description: Yup.string().required('Meta Description is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductFormThird)
