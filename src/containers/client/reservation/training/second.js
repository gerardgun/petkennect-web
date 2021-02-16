import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Icon } from 'semantic-ui-react'
import moment from 'moment'
import FormError from '@components/Common/FormError'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import trainingReservationGroupClassDetailDuck from '@reducers/pet/reservation/training/reservation/group-class/detail'

import AddonForm from './../common-sections/addon-section'
import { trainingFormId } from './first'

const BoardingFormWizardSecond = props => {
  const {
    groupClass,
    selectedProgram,
    selectedPets,
    checkInTime,
    error, handleSubmit, reset // redux-form
  } = props

  const checkOutTime  = '17:00'
  let checkIn
  let checkOut
  let reservationArray

  if(selectedProgram == 1) {
    checkIn = groupClass.item.start_date
    checkOut = groupClass.item.ends
  }
  else {
    let selectedDateArray = props.petReservationDetail.item.selectedDate && props.petReservationDetail.item.selectedDate
    reservationArray = selectedDateArray.map(_item=>moment(new Date(_item)).format('MM/DD/YYYY'))
    let startDate = selectedDateArray[0]
    let endDate   = selectedDateArray[selectedDateArray.length - 1]

    checkIn = moment(new Date(startDate)).format('YYYY-MM-DD')
    checkOut = moment(new Date(endDate)).format('YYYY-MM-DD')
  }

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
          checkOutTime={checkOutTime} lodgingSection={selectedProgram == 3 ? true : false}
          reservation='training' reservationDateArrayProp={selectedProgram == 1 ? [] : reservationArray} selectedPets={selectedPets}/>

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
      const petReservationTrainingGroupClass = trainingReservationGroupClassDetailDuck.selectors.detail(state)
      const selectedPets = formValueSelector(trainingFormId)(state, 'pet')
      const selectedProgram = formValueSelector(trainingFormId)(state, 'program')
      let checkInTime = formValueSelector(trainingFormId)(state, 'check_in_time')

      return {
        selectedPets,
        selectedProgram,
        checkInTime,
        petReservationDetail: petReservationDetail,
        groupClass          : petReservationTrainingGroupClass,
        initialValues       : { ...petReservationDetail.item }
      }
    }),
  reduxForm({
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardSecond)
