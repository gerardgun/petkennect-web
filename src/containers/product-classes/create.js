import React, { useMemo , useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import productAttributeDuck from '@reducers/product/product-attribute'
import productClassesDetailDuck from '@reducers/product/product-classes/detail'

const ProductClassesCreateForm = (props) => {
  const {
    productAttributes,
    productClassesDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(() => {
    props.getProductAttributes()
  }, [])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    values.attributes = values.attributes.map((item,index) => {
      return  item == false ? null : productAttributes.items[index].id
    }).filter(function(el) {
      return el != null
    })

    if(isUpdating)
      return props.put({ id: productClassesDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(productClassesDetail.mode), [ productClassesDetail.mode ])
  const isUpdating = Boolean(productClassesDetail.item.id)
  const isDisabled = productClassesDetail.item.type == 'F' || productClassesDetail.item.type == 'A' ? true : false

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Product Class</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              disabled={isDisabled}
              label='Name'
              name='name'
              placeholder='Enter name'
              required/>
          </Form.Group>

          <label> Which attributes will be variants?</label>
          <Form.Group computer={8} mobile={8} tablet={8}>
            {
              productAttributes.items.length > 0 ? (
                productAttributes.items.map((item, index) => {
                  return (
                    <Field
                      component={FormField}
                      control={Checkbox}
                      disabled={isDisabled}
                      key={item.id}
                      label={item.name}
                      name={`attributes[${index}]`}
                      type='checkbox'/>
                  )
                })
              ) : null

            }

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
                disabled={submitting || isDisabled}
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
      const productClassesDetail = productClassesDetailDuck.selectors.detail(state)
      const productAttributes = productAttributeDuck.selectors.list(state)

      return {
        productClassesDetail,
        productAttributes,
        initialValues: { ...productClassesDetail.item, attributes: productAttributes.items.map((item)=>{
          return (productClassesDetail.item.attributes && productClassesDetail.item.attributes.filter(function(id) {
            return id == item.id}).length > 0 ? true : false
          )
        }) }
      }
    },
    {
      post                : productClassesDetailDuck.creators.post,
      put                 : productClassesDetailDuck.creators.put,
      resetItem           : productClassesDetailDuck.creators.resetItem,
      getProductAttributes: productAttributeDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'product-class-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required('Name is required'),
        type: Yup.string().required('Type is reqired')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductClassesCreateForm)
