import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputColor from '@components/Common/InputColor'

import { parseResponseError, syncValidate } from '@lib/utils/functions'

import productAttributeDetailDuck from '@reducers/product/product-attribute/detail'
import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'

const ProductAttributeValueCreateForm = props => {
  const {
    productAttributeValueDetail,
    productAttributeDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: productAttributeValueDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(productAttributeValueDetail.mode), [ productAttributeValueDetail.mode ])
  const isUpdating = Boolean(productAttributeValueDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Value</Header>
          <Field component='input' name='id' type='hidden'/>
          <Field component='input' name='product_attribute' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Value'
              name='display_value'
              placeholder='Enter Value'
              required/>
          </Form.Group>
          {productAttributeDetail.item.type == 'C'
          && <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={InputColor}
              label='Color'
              name='value'
              required/>
          </Form.Group>
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

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const productAttributeValueDetail = productAttributeValueDetailDuck.selectors.detail(state)
      const productAttributeDetail = productAttributeDetailDuck.selectors.detail(state)

      return {
        productAttributeValueDetail,
        productAttributeDetail,
        initialValues: { ...productAttributeValueDetail.item, product_attribute: productAttributeDetail.item.id }
      }
    },
    {
      post     : productAttributeValueDetailDuck.creators.post,
      put      : productAttributeValueDetailDuck.creators.put,
      resetItem: productAttributeValueDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'product-attribute-value-create-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        display_value: Yup.string().required('Value is required'),
        value        : Yup.string().required('Color is reqired')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductAttributeValueCreateForm)
