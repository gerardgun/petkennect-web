import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import foodTimeDetailDuck from '@reducers/service/food/time/detail'

const FeedingMethodForm = props => {
  const {
    error, handleSubmit, initialize, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(foodTimeDetailDuck.selectors.detail)

  useEffect(() => {
    if(detail.item.id)
      initialize({
        id        : detail.item.id,
        name      : detail.item.name,
        is_charged: detail.item.is_charged,
        price     : detail.item.price
      })
    else
      initialize({
        price: 0
      })
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      foodTimeDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(foodTimeDetailDuck.creators.put(values))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(foodTimeDetailDuck.creators.post(values))
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
          {editing ? 'Update' : 'Add'} Feeding Time
        </Header>

        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Feeding Time'
              name='name'
              placeholder='Enter name'
              required/>
          </Form.Group>
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
                content={editing ? 'Save changes' : 'Add Time'}
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
  form    : 'feeding-time-form',
  validate: values => {
    const schema = {
      name : yup.string().required('Name is required'),
      price: yup.number().typeError('Price must be a number').required('Price is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(FeedingMethodForm)
