import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Icon } from 'semantic-ui-react'
import loadable from '@loadable/component'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import { boardingFormId } from './first'

const FormError = loadable(() => import('@components/Common/FormError'))

const AddonForm = loadable(() => import('./../common-sections/addon-section'))

const BoardingFormWizardSecond = props => {
  const {
    selectedPets,
    checkIn,
    checkOut,
    checkInTime,
    checkOutTime,
    error, handleSubmit, reset // redux-form
  } = props

  return (
    <>
      <div className='div-progress-bar mv32'>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Service Information</span>
        </div>
        <div className='div-bar-line active'>
        </div>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Reservation Information</span>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-content'>
          <Icon name='check circle'/>
          <span>Summary</span>
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='section-info-item-form' onReset={reset} onSubmit={handleSubmit}>
        <AddonForm
          checkIn={checkIn} checkInTime={checkInTime} checkOut={checkOut}
          checkOutTime={checkOutTime}
          reservation='boarding' selectedPets={selectedPets}/>
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
          <Form.Field className='btnBack'>
            <Button
              basic
              className='w140'
              color='teal'
              content='Back'
              onClick={props.onPreviousStep}
              type='button'/>
          </Form.Field>
          <Form.Field>
            <Button
              className='w140'
              color='teal'
              content='Next'
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      let checkOut = formValueSelector(boardingFormId)(state, 'check_out')
      let checkIn = formValueSelector(boardingFormId)(state, 'check_in')
      let checkInTime = formValueSelector(boardingFormId)(state, 'check_in_time')
      let checkOutTime = formValueSelector(boardingFormId)(state, 'check_out_time')

      return {
        selectedPets,
        checkOut,
        checkIn,
        checkInTime,
        checkOutTime,
        petReservationDetail: petReservationDetail,
        initialValues       : { ...petReservationDetail.item }
      }
    },
    {
      // setReserveItem              : petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardSecond)
