import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import { parseResponseError, syncValidate } from '@lib/utils/functions'
import FormError from '@components/Common/FormError'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

const AbsentForm = props => {
  const {
    petReservationDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'DELETE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    return props.put({ id: petReservationDetail.item.id, ...values })
      .then(_handleClose)
      .catch(parseResponseError)
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
          <Header as='h2' className='segment-content-header'>Are you sure you want to mark the Reservation Absent?</Header>
          <Field component='input' name='id' type='hidden'/>
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
                basic
                color='teal'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Of course!'
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

      return {
        petReservationDetail,
        initialValues: petReservationDetail.item
      }
    },
    {
      post     : petReservationDetailDuck.creators.post,
      put      : petReservationDetailDuck.creators.put,
      resetItem: petReservationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'absent-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(AbsentForm)

