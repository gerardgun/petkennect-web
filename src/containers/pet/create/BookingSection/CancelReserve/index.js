import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Modal, Radio, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import { parseResponseError, syncValidate } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

const CancelReserveForm = props => {
  const {
    petReservationDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'READ')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    return props.put({ id: petReservationDetail.item.id, ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const [ cancelRadioButton, setCancelRadioButton ] = useState(null)
  const _handleRadioGroupChange = (e, { value })=>{
    setCancelRadioButton(value)
  }

  const isOpened = useMemo(() => getIsOpened(petReservationDetail.mode), [ petReservationDetail.mode ])

  return (
    <Modal
      className='form-modal'
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>What you want to do with this Reserve?</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Field>
            <Radio
              checked={cancelRadioButton === 'cancel'}
              label='Cancel'
              name='radioGroup'
              onChange={_handleRadioGroupChange}
              value='cancel'/>
          </Form.Field>
          {
            cancelRadioButton === 'cancel' && (
              <Field
                autoFocus
                component={FormField}
                control={Select}
                label='Reason'
                name='reason'
                placeholder='Enter Reason'
                required/>
            )
          }
          <Form.Field>
            <Radio
              checked={cancelRadioButton === 'delete'}
              label='Delete'
              name='radioGroup'
              onChange={_handleRadioGroupChange}
              value='delete'/>
          </Form.Field>
          {
            cancelRadioButton === 'delete' && (
              <Field
                autoFocus
                component={FormField}
                control={Select}
                label='Reason'
                name='reason'
                placeholder='Enter Reason'
                required/>
            )
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
                color='red'
                content='Done'
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
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const cancel = formValueSelector('pet-cancel-reserve-form')(state,'radioGroup')

      return {
        petReservationDetail,
        initialValues: petReservationDetail.item,
        hasCancelType: cancel === 'cancel' ? true : false
      }
    },
    {
      post     : petReservationDetailDuck.creators.post,
      put      : petReservationDetailDuck.creators.put,
      resetItem: petReservationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-cancel-reserve-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CancelReserveForm)

