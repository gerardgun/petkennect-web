import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Form, Header, Input, Label, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import productDetailDuck from '@reducers/product/detail'

const selector = formValueSelector('product')

const ProductEditSeoForm = props => {
  const {
    error, handleSubmit, initialize, reset // redux-form
  } = props

  const currentTenant = useSelector(authDuck.selectors.currentTenant)
  const dispatch = useDispatch()
  const detail = useSelector(productDetailDuck.selectors.detail)
  const watchedShortDescription = useSelector(state => selector(state, 'short_description'))

  useEffect(() => {
    if(detail.status === 'GOT' || detail.status === 'PUT') initialize(detail.item)
  }, [ detail.status ])

  const _handleSubmit = values => {
    return dispatch(productDetailDuck.creators.put({ id: detail.item.id, ...values }))
      .catch(parseResponseError)
  }

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='product' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Product URL'
          labelPosition='left'
          name='slug'
          placeholder='Enter slug'
          readOnly
          required>
          <Label content={`https://${currentTenant.subdomain_prefix}.petkennect.com/`}/>
          <input/>
        </Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={TextArea}
          label='Meta Description (160 characteres)'
          maxLength='160'
          name='short_description'
          placeholder='Enter meta description'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Browser preview</label>

          <div style={{ padding: '1.5rem 2rem', backgroundColor: '#EEEEEE70', maxWidth: '50rem', borderRadius: '0.3rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#009e0f' }}>{`https://${currentTenant.subdomain_prefix}.petkennect.com/${detail.item.slug}`}</span>
            </div>
            <Header style={{ marginTop: '0rem', color: '#1a0dab', fontWeight: '500' }}>{currentTenant.legal_name} | {detail.item.name}</Header>
            <div>
              <p style={{ color: '#333333' }}>
                {watchedShortDescription}
              </p>
            </div>
          </div>
        </Form.Field>
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
  form    : 'product',
  validate: values => {
    const schema = {
      short_description: yup.string().required('Meta description is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ProductEditSeoForm)
