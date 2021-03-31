import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Checkbox, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import foodTypeDetailDuck from '@reducers/pet/feeding-setting/food-type/detail'

const FoodTypeForm = (props) => {
  const {
    foodTypeDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    if(foodTypeDetail.item.id)
      props.get(foodTypeDetail.item.id)
  }, [ foodTypeDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: foodTypeDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(foodTypeDetail.mode), [
    foodTypeDetail.mode
  ])
  const isUpdating = Boolean(foodTypeDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Food Type
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Food Type'
              name='name'
              placeholder='Enter type'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Charges Type'
              name='charge_type'
              options={
                [ { key: 1, value: 'No Charge' , text: 'No Charge' },
                  { key: 1, value: 'Per Day' , text: 'Per Day' },
                  { key: 1, value: 'Per Meal', text: 'Per Meal' },
                  { key: 1, value: 'Per Bag' , text: 'Per Bag' } ]
              }
              placeholder='Select Charges'
              required/>
            <Field
              component={FormField}
              control={Input}
              label='Price'
              name='price'
              placeholder='Enter Price'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Charges Applies'
              name='charges'
              type='checkbox'/>
          </Form.Group>

          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

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
  connect(
    (state) => {
      const foodTypeDetail = foodTypeDetailDuck.selectors.detail(state)

      return {
        foodTypeDetail,
        initialValues: { ...foodTypeDetail.item }
      }
    },
    {
      get      : foodTypeDetailDuck.creators.get,
      post     : foodTypeDetailDuck.creators.post,
      put      : foodTypeDetailDuck.creators.put,
      resetItem: foodTypeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'food-type-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FoodTypeForm)
