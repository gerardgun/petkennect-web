import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import medicationTypeDetailDuck from '@reducers/pet/medication-setting/medication-type/detail'

const MedicationTypeForm = (props) => {
  const {
    error, handleSubmit, initialize, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const medicationTypes = useSelector(medicationTypeDetailDuck.selectors.detail)

  useEffect(() => {
    if(medicationTypes.item.id)
      initialize({
        name      : medicationTypes.item.name,
        price     : medicationTypes.item.price,
        is_charged: medicationTypes.item.is_charged
      })
    else
      initialize({
        is_charged: false,
        price     : null
      })
  }, [ medicationTypes.item.id ])

  const _handleClose = () => {
    dispatch(
      medicationTypeDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return dispatch(medicationTypeDetailDuck.creators.put({ id: medicationTypes.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(medicationTypeDetailDuck.creators.post({ ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(medicationTypes.item.id)
  const open = [ 'CREATE' , 'UPDATE' ].includes(medicationTypes.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Medication Type
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Medication Type'
              name='name'
              placeholder='Enter type'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
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
              name='is_charged'
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

export default reduxForm({
  form    : 'medication-type-form',
  validate: values => {
    const schema = {
      name: Yup.string().required('Name is required')
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(MedicationTypeForm)
