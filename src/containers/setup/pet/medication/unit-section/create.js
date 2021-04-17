import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import medicationUnitDetailDuck from '@reducers/pet/medication-setting/medication-unit/detail'

const MedicationUnitForm = (props) => {
  const {
    medicationUnitDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    if(medicationUnitDetail.item.id)
      props.get(medicationUnitDetail.item.id)
  }, [ medicationUnitDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: medicationUnitDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(medicationUnitDetail.mode), [
    medicationUnitDetail.mode
  ])
  const isUpdating = Boolean(medicationUnitDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Medication Unit
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Medication Unit'
              name='name'
              placeholder='Enter unit'
              required/>
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
      const medicationUnitDetail = medicationUnitDetailDuck.selectors.detail(state)

      return {
        medicationUnitDetail,
        initialValues: { ...medicationUnitDetail.item }
      }
    },
    {
      get      : medicationUnitDetailDuck.creators.get,
      post     : medicationUnitDetailDuck.creators.post,
      put      : medicationUnitDetailDuck.creators.put,
      resetItem: medicationUnitDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'medication-unit-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Unit is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(MedicationUnitForm)
