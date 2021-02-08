import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm, FieldArray } from 'redux-form'
import { Button, Confirm, Input, Grid, Form, Header, Segment, Icon, Checkbox, Label, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { monthDiff, syncValidate } from '@lib/utils/functions'
import { PeekDaysAndFullDays } from '@lib/constants/pet'

import DayPicker from 'react-day-picker'

import Message from '@components/Message'

import moment  from 'moment'

import clientPetDuck from '@reducers/client/pet'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import VaccinationAlert from '../vaccination-alert'
import AlertModal from './../alert-modal'
import PetLocationForm from '../common-sections/location-pet-section'
import RecurringDaysForm from './../recurring-days'
export const boardingFormId = 'boarding-reservation-form'

const BoardingFormWizardFirst = props => {
  const {
    startDate,
    endDate,
    addonArray,
    clientPet,
    petReservationDetail,
    selectedLocation,
    selectedPets,
    services,
    serviceAttribute,
    // petKennelType,
    error, handleSubmit, reset
  } = props

  const [ numberOfMonths, setNumberOfMonth ] = useState(1)
  const [ selectedDates, setCalendarDates ] = useState([])
  const [ PeekAndFullDay, setPeekAndFullDay ] = useState({ peekday: [], fullDay: [] })
  const [ overridePopupOpen, setOverridePopupOpen ] = useState(false)
  const [ alertPopupOpen, setAlertPopupOpen ] = useState(false)
  const [ vaccinationAlert,setVaccinationAlert ] = useState(false)
  const [ showDate,setShowDate ] = useState(false)
  const [ recurringDays,setReccuringDays ] = useState(false)

  useEffect(() => {
    setPeekAndFullDay(PeekDaysAndFullDays)
  }, [])

  let _handleAddBtnClick

  useEffect(() => {
    let serviceVariations = []
    if(selectedPets && selectedLocation) {
      if(selectedPets.length < 1)
        setVaccinationAlert(false)
      for (let pet of selectedPets) {
        const petInfo =  clientPet.items.length != 0 && clientPet.items.find(_item=>_item.id === pet)
        if(petInfo.summary.vaccination_status === 'missing' || petInfo.summary.vaccination_status === 'expired')
          setVaccinationAlert(true)
        else
          setVaccinationAlert(false)
      }
      const locationId = serviceAttribute.items && serviceAttribute.items.find(_location => _location.type === 'L')
        .values.find(_location => _location.value == selectedLocation).id
      const petLength = selectedPets && selectedPets.length
      if(petLength > 0) {
        for (let item of selectedPets) {
          const petSize = clientPet.items.find(pet => pet.id === item).size
          const petSizeId = serviceAttribute.items && serviceAttribute.items.find(_petSize => _petSize.type === 'S')
            .values.find(_petSize => _petSize.value == petSize).id

          const variation = services[0].variations

          let variationId
          for (let item of variation) {
            let locationExist = item.attributes.find(_id => _id.service_attribute_value_id == locationId)
            let petSizeExist = item.attributes.find(_id => _id.service_attribute_value_id == petSizeId)

            if(locationExist != null && petSizeExist != null)
            {
              variationId = locationExist.service_variation_id
              break
            }
          }
          if(variationId != null)
            serviceVariations.push({ ...variation.find(_ => _.id == variationId), petId: item })

          else
            setAlertPopupOpen(true)
        }
        props.setItem({ ...petReservationDetail.item, serviceVariations: serviceVariations, calculatedAddons: addonArray }, 'CREATE')
      }
    }
  }, [ selectedPets, selectedLocation ])

  useEffect(() => {
    let allSelectedDate = []
    for (let d = new Date(startDate); d <=  new Date(endDate); d.setDate(d.getDate() + 1))
      allSelectedDate.push(new Date(d))

    for (let date of PeekAndFullDay.fullDay) {
      let fullDayExists = allSelectedDate.find(_ => moment(_).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY'))
      if(fullDayExists) {
        setOverridePopupOpen(true)
        break
      }
    }

    setCalendarDates([].concat(allSelectedDate))
    setNumberOfMonth(monthDiff(startDate, endDate))
  },[ startDate, endDate ])

  const _handleOkBtnClick = () =>{
    setAlertPopupOpen(false)
  }

  const _handleAddReservation = ()=>{
    _handleAddBtnClick()
  }

  const _handleCalendarView = ()=>{
    setShowDate(!showDate)
  }

  const _handleRecurringView = ()=>{
    setReccuringDays(!recurringDays)
  }

  const _handleCancelOverride = () => {
    setOverridePopupOpen(false)
    let selectedDays = [].concat(selectedDates)

    for (let date of PeekAndFullDay.fullDay) {
      let fullDayExists = selectedDays.find(_ => moment(_).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY'))
      if(fullDayExists) {
        const index = selectedDays.indexOf(fullDayExists)
        if(index > -1)
          selectedDays.splice(index, 1)
      }
    }

    setCalendarDates(selectedDays)
  }

  const _handleConfirmOverride = () =>{
    setOverridePopupOpen(false)
    setPeekAndFullDay({ peekday: PeekAndFullDay.peekday, fullDay: [] })
  }

  const ReservationList = ({ fields, meta: { error, submitFailed } }) => {
    _handleAddBtnClick = () =>{
      fields.push({ ...answerInitialState })
    }

    const _handleDeleteAnswerBtnClick = (e, { index }) =>{
      fields.remove(index)
    }
    const answerInitialState = {
      description: ''
    }

    return (
      <>
        {
          fields.map((item, index) => {
            return (
              <>
                <Divider section/>
                <Grid key={index}>  <Grid.Column computer={11}>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Check In'
                      name={`${item}check_in`}
                      required
                      type='date'/>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Check Out'
                      name={`${item}check_out`}
                      required
                      type='date'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Arriving Time'
                      name={`${item}check_in_time`}
                      type='time'/>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Departing Time'
                      name={`${item}check_out_time`}
                      type='time'/>

                  </Form.Group>
                </Grid.Column>
                <Grid.Column computer={5}>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label='Add to WaitList'
                    name={`${item}add_to_waitlist`}
                    type='checkbox'/>
                  <Form.Group>
                    <Field
                      className='send-confirmation'
                      component={FormField}
                      control={Checkbox}
                      format={Boolean}
                      label='Send confirmation'
                      name={`${item}send_confirmation`}
                      type='checkbox'/>
                    <Form.Button
                      basic className='delete-reservation'
                      color='red' data-index={index}
                      icon='trash alternate outline'
                      index={`${index}`}
                      onClick={_handleDeleteAnswerBtnClick}
                      type='button'/>
                  </Form.Group>

                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label='Special Hours'
                    name={`${item}special_hours`}
                    type='checkbox'/>

                </Grid.Column>

                </Grid>
              </>
            ) })
        }
        {
          submitFailed && error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }

      </>
    )
  }

  return (
    services[0] ? (<>
      <div className='div-progress-bar '>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Service Information</span>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-content'>
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
      <Form onReset={reset} onSubmit={handleSubmit}>

        <Segment className='section-info-item-step1'>
          <PetLocationForm multiple={true}/>
          {vaccinationAlert !== false && <Grid>
            <Grid.Column computer={5}>

            </Grid.Column>
            <Grid.Column
              className='message-grid pt0' computer={11} mobile={16}
              tablet={16}>
              <VaccinationAlert/>
            </Grid.Column>
          </Grid>

          }
        </Segment>
        <Segment className='section-info-item-step1'>
          <Header as='h3' className='section-info-header'>Select Reservation Dates</Header>
          <Grid>  <Grid.Column computer={11}>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Check In'
                name='check_in'
                required
                type='date'/>
              <Field
                component={FormField}
                control={Input}
                label='Check Out'
                name='check_out'
                required
                type='date'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Arriving Time'
                name='check_in_time'
                type='time'/>
              <Field
                component={FormField}
                control={Input}
                label='Departing Time'
                name='check_out_time'
                type='time'/>

            </Form.Group>
          </Grid.Column>
          <Grid.Column computer={5}>

            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Add to WaitList'
              name='add_to_waitlist'
              type='checkbox'/>
            <Field
              className='send-confirmation'
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Send confirmation'
              name='send_confirmation'
              type='checkbox'/>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Special Hours'
              name='special_hours'
              type='checkbox'/>

          </Grid.Column>

          </Grid>
          <FieldArray component={ReservationList} name='reservation_list' title='reservation-list'/>
          <br/>
          <Form.Group>
            <Form.Field>
              <Button
                className='reservation-buttons'
                color='teal'
                content='Add Reservation'
                onClick={_handleAddReservation}
                type='button'/>
              <Button
                className='reservation-buttons'
                color='teal'
                content='Add Recurring Reservation'
                onClick={_handleRecurringView}
                type='button'/>
              <Button
                className='reservation-buttons'
                color='teal'
                content='+/-With Calendar View'
                onClick={_handleCalendarView}
                type='button'/>
            </Form.Field>
          </Form.Group>
        </Segment>
        { recurringDays && <RecurringDaysForm serviceType='T'/>}

        {
          showDate &&  <Segment className='section-info-item-step1'>
            <Header as='h3' className='section-info-header'>Manually Add/Edit Dates-Calendar View</Header>
            <DayPicker
              fixedWeeks
              fromMonth={startDate}
              modifiers={PeekAndFullDay}
              month={startDate}
              numberOfMonths={numberOfMonths}
              selectedDays={selectedDates}
              toMonth={endDate}/>
            <Grid.Column className='ml16 div_align_center' floated='right' width={16}>
              <Label className='service_full' size='mini'>&nbsp;</Label>&nbsp;&nbsp;Full&nbsp;&nbsp;
              <Label className='color_peak' size='mini'>&nbsp;   </Label>&nbsp;&nbsp;Peak
            </Grid.Column >
          </Segment>

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
              className='w120'
              color='teal'
              content='Next'
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
      <AlertModal isOpened={alertPopupOpen} onReply={_handleOkBtnClick}/>
      <Confirm
        cancelButton='No'
        confirmButton='Yes'
        content='The reservation is full on some of the selected dates, do you want to overwrite and select the dates?'
        onCancel={_handleCancelOverride}
        onConfirm={_handleConfirmOverride}
        open={overridePopupOpen}/>
    </>) : (<>
      <Message
        content={
          <Grid padded style={{ marginLeft: -16 }}>
            <Grid.Column className='mb0 pb0' width='16'>
              <div className='message__title'>The service is not available for selected company</div>
            </Grid.Column>
            <Grid.Column width='16'>

            </Grid.Column>
          </Grid>

        } type='warning'/></>)

  )
}

export default compose(
  withRouter,
  connect(
    ({ auth, ...state }) => {
      const check_in = formValueSelector(boardingFormId)(state, 'check_in')
      const check_out = formValueSelector(boardingFormId)(state, 'check_out')
      let startDate =  check_in ? new Date(check_in) : new Date()
      let endDate = check_out ? new Date(check_out) : new Date()
      let todayDate = new Date()
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      const selectedLocation = formValueSelector(boardingFormId)(state, 'location')
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const service = serviceDuck.selectors.list(state)
      const selectedPetID  = petReservationDetail.item.pet && petReservationDetail.item.pet
      const initialLocation =  petReservationDetail.item.location ?  petReservationDetail.item.location : auth.location
      const initialDate = moment(todayDate).format('YYYY-MM-DD')
      const boardingServices = service.items && service.items.filter(_ => _.type === 'B')
      let serviceArray = []
      let addonArray = []
      const sub_services =  petReservationDetail.item.addons && service.items.filter(
        item => item.parent_service === petReservationDetail.item.service)
      petReservationDetail.item.id &&  petReservationDetail.item.addons.forEach(addons=>{
        for (let item of sub_services) {
          let serviceVariation = item.variations.find(variation=>variation.id === addons.service_variation)

          if(serviceVariation !== undefined) {
            serviceArray.push(item.id)

            addonArray.push({ ...addons, name: item.name, petId: selectedPetID, addOn_id: item.id })
          }
        }
      })
      const checkOutTime = petReservationDetail.item.boarding && petReservationDetail.item.boarding.checkout_at
      const initialCheckOutTime =  moment.utc(`${checkOutTime}`).format('HH:mm')
      const checkInTime = petReservationDetail.item.reserved_at && petReservationDetail.item.reserved_at
      const initialCheckInTime =  moment.utc(`${checkInTime}`).format('HH:mm')
      const defaultInitialValues = petReservationDetail.item.id ? {
        pet           : [ petReservationDetail.item.pet ],
        KennelType    : petReservationDetail.item.boarding ? petReservationDetail.item.boarding.kennel_type : '',
        check_in_time : initialCheckInTime,
        check_out_time: initialCheckOutTime, addon         : serviceArray
      } : {}

      return {
        startDate,
        endDate,
        addonArray,
        check_in,
        check_out,
        initialDate,
        initialCheckInTime,
        initialCheckOutTime,
        initialLocation,
        auth,
        clientPet           : clientPetDuck.selectors.list(state),
        services            : boardingServices,
        serviceAttribute    : serviceAttribute,
        petReservationDetail: petReservationDetail,
        initialValues       : { ...petReservationDetail.item, ...defaultInitialValues,
          location  : initialLocation,
          lodgingPet: selectedPets != undefined && selectedPets,
          check_in  : petReservationDetail.item.reserved_at
            ? moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : initialDate,
          check_out: petReservationDetail.item.boarding
            ? moment(petReservationDetail.item.boarding.checkout_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : initialDate
        },
        selectedPets    : selectedPets,
        selectedLocation: selectedLocation
      }
    },
    {
      setItem: petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location: Yup.mixed().required('Location is required'),
        pet     : Yup.mixed().required('Pet is required'),
        check_in: Yup
          .date()
          .required('Check In date is required'),
        check_out: Yup
          .date().required('Check Out date is required')
          .when(
            'check_in',
            (check_in, schema) => (check_in && schema.min(check_in))
          )
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(BoardingFormWizardFirst)
