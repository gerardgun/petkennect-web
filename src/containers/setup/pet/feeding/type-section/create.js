import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import foodTypeDetailDuck from '@reducers/service/food/type/detail'

const selector = formValueSelector('food-type-form')

const FoodTypeForm = props => {
  const {
    error, handleSubmit, initialize, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(foodTypeDetailDuck.selectors.detail)
  const is_charged = useSelector(state => selector(state, 'is_charged'))

  useEffect(() => {
    if(detail.item.id)
      initialize({
        id         : detail.item.id,
        name       : detail.item.name,
        charge_type: detail.item.charge_type,
        is_charged : detail.item.is_charged,
        price      : detail.item.price
      })
    else
      initialize({
        charge_type: null,
        price      : 0
      })
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      foodTypeDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(foodTypeDetailDuck.creators.put(values))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(foodTypeDetailDuck.creators.post(values))
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
          {editing ? 'Update' : 'Add'} Food Type
        </Header>

        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Food Type'
              name='name'
              placeholder='Enter name'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Is Charged'
              name='is_charged'
              toggle
              type='checkbox'/>
          </Form.Group>
          <Field
            component={FormField}
            control={Select}
            label='Charges Type'
            name='charge_type'
            options={[
              { key: 1, value: 'D' , text: 'Per Day' },
              { key: 2, value: 'M', text: 'Per Meal' }
              // { key: 3, value: 'Per Bag' , text: 'Per Bag' }
            ]}
            placeholder='Select Charges'
            required={is_charged === true}/>
          <Form.Group widths={2}>
            <Field
              component={FormField}
              control={Input}
              label='Price'
              name='price'
              parse={parseFloat}
              placeholder='$0.00'
              required
              type='number'/>
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
                content={editing ? 'Save changes' : 'Add Food Type'}
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
  form    : 'food-type-form',
  validate: values => {
    let schema = {
      name : yup.string().required('Name is required'),
      price: yup.number().typeError('Price must be a number').required('Price is required')
    }

    if(values.is_charged === true)
      schema = {
        ...schema,
        charge_type: yup.mixed().required('Charge Type is required')
      }

    return syncValidate(yup.object().shape(schema), values)
  }
})(FoodTypeForm)
