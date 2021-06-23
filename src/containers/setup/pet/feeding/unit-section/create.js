import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import foodUnitDetailDuck from '@reducers/service/food/unit/detail'

const FoodMethodForm = props => {
  const {
    error, handleSubmit, initialize, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(foodUnitDetailDuck.selectors.detail)

  useEffect(() => {
    if(detail.item.id)
      initialize({
        id          : detail.item.id,
        name        : detail.item.name,
        food_type_id: detail.item.food_type
      })
    else
      initialize({
        food_type_id: null
      })
  }, [ detail.item.id ])

  useEffect(() => {
    if([ 'CREATE', 'UPDATE' ].includes(detail.mode))
      dispatch(
        foodUnitDetailDuck.creators.create()
      )
  }, [ detail.mode ])

  const _handleClose = () => {
    dispatch(
      foodUnitDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(foodUnitDetailDuck.creators.put(values))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(foodUnitDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)
  const open = [ 'CREATE', 'UPDATE' ].includes(detail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>
          {editing ? 'Update' : 'Add'} Food Unit
        </Header>

        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Food Type'
              name='food_type_id'
              options={detail.form.food_type_options}
              placeholder='Select food type'
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Food Unit'
              name='name'
              placeholder='Enter name'
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

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={editing ? 'Save changes' : 'Add Unit'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>

      </Modal.Content>
    </Modal>
  )
}

export default reduxForm({
  form    : 'food-unit-form',
  validate: values => {
    const schema = {
      name : yup.string().required('Name is required'),
      price: yup.number().typeError('Price must be a number').required('Price is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(FoodMethodForm)
