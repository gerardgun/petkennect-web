import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import medicationDetailDuck from '@reducers/pet/medication-setting/medication/detail'

const MedicationForm = (props) => {
  const {
    medicationDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    if(medicationDetail.item.id)
      props.get(medicationDetail.item.id)
  }, [ medicationDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: medicationDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(medicationDetail.mode), [
    medicationDetail.mode
  ])
  const isUpdating = Boolean(medicationDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Medication
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Medication Name'
              name='name'
              placeholder='Enter name'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Purpose'
              name='purpose'
              placeholder='Enter purpose'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Type'
              name='type'
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
      const medicationDetail = medicationDetailDuck.selectors.detail(state)

      return {
        medicationDetail,
        initialValues: { ...medicationDetail.item }
      }
    },
    {
      get      : medicationDetailDuck.creators.get,
      post     : medicationDetailDuck.creators.post,
      put      : medicationDetailDuck.creators.put,
      resetItem: medicationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'medication-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Medication is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(MedicationForm)
