import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {  reduxForm } from 'redux-form'
import { Button, Form, Icon, Header, Modal } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'

export const formId = 'express-check-in-confirmation'

const ExpressCheckInConfirmation = props => {
  const {
    petDetail,
    error
  } = props

  const getIsOpened = mode => (mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  // eslint-disable-next-line no-unused-vars
  const _handleConfirmClick = values => {
    _handleClose()
  }

  const alert_shadow = petDetail.item.express_check_in_type == 'training' ? 'rgb(153 187 222 / 30%)' : 'rgba(221, 75, 57, 0.3)'
  const alert_color = petDetail.item.express_check_in_type == 'training' ? 'blue' : 'red'

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [ petDetail.mode ])

  return (
    <Modal
      className='ui-delete-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <Icon
          circular color={alert_color} name='info circle icon'
          size='big' style={{ backgroundColor: alert_shadow, boxShadow: 'none', fontSize: '2.5rem' }}/>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Header as='h2' style={{ fontWeight: 500 }}>
         Confirmation
        </Header>
        {
          (petDetail.item.express_check_in_type == 'training' ||  petDetail.item.express_check_in_type == 'camp_fitness') &&  (
            <>
              <p style={{ color: 'gray' }}>
                  Are you sure you want to check in <b>{ petDetail.item.name }</b> into Training today?
              </p>
            </>
          )
        }
        {
          (petDetail.item.express_check_in_type == 'boarding_chk_in' ||  petDetail.item.express_check_in_type == 'boarding_chk_out') && (
            <>
              <p style={{ color: 'gray' }}>
                <b>No Reservation Exists! </b> This client does not have a boarding reservation.
              </p>
            </>
          )
        }

        {
          petDetail.item.express_check_in_type == 'daycamp_reservation' && (
            <>
              <p style={{ color: 'gray' }}>
              This dog&rsquo;s vaccinations will expire before the reservation date.
              To make this reservation, go to the pet record, send the email reminder,
               and book the reservation through Day Camp.
              </p>
            </>
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
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic className='w120' content='Cancel'
          onClick={_handleClose}/>
        {
          petDetail.item.express_check_in_type == 'training' ? (
            <>
              <Button
                className='w120'
                color='teal' content='Confirm'
                onClick={_handleConfirmClick}/>
            </>
          ) : (
            <>
              <Button
                className='w120'
                color='teal' content='OK'
                onClick={_handleConfirmClick}/>
            </>
          )
        }
      </Modal.Actions>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const petDetail = petReservationDetailDuck.selectors.detail(state)

      return {
        petDetail
      }
    },
    {
      post     : petReservationDetailDuck.creators.post,
      put      : petReservationDetailDuck.creators.put,
      resetItem: petReservationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(ExpressCheckInConfirmation)
