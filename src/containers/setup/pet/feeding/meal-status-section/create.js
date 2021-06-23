import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import foodReportStatusDetailDuck from '@reducers/service/food/report-status/detail'

const FoodReportStatusForm = props => {
  const {
    error, handleSubmit, initialize, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(foodReportStatusDetailDuck.selectors.detail)

  useEffect(() => {
    if(detail.item.id)
      initialize({
        id  : detail.item.id,
        name: detail.item.name
      })
    else
      initialize({})
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      foodReportStatusDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(foodReportStatusDetailDuck.creators.put(values))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(foodReportStatusDetailDuck.creators.post(values))
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
          {editing ? 'Update' : 'Add'} Feeding Meal Status
        </Header>

        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Feeding Meal Status'
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
                content={editing ? 'Save changes' : 'Add Meal Status'}
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
  form    : 'food-report-status-form',
  validate: values => {
    const schema = {
      name: yup.string().required('Name is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(FoodReportStatusForm)
