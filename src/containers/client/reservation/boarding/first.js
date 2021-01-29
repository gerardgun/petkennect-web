import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Dropdown, Confirm, Input, Grid, Form, Header, Select, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { monthDiff, syncValidate } from '@lib/utils/functions'
import { PeekDaysAndFullDays } from '@lib/constants/pet'

import DayPicker from 'react-day-picker'

import Message from '@components/Message'

import moment  from 'moment'

import AlertModal from './../alert-modal'

import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import petKennelTypeDuck from '@reducers/pet/pet-kennel-type'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import VaccinationAlert from '../vaccination-alert'

export const boardingFormId = 'boarding-reservation-form'

const BoardingFormWizardFirst = props => {
  const {
    addonArray,
    clientPet,
    petReservationDetail,
    location,
    selectedLocation,
    selectedPets,
    services,
    serviceAttribute,
    petKennelType,
    error, handleSubmit, reset
  } = props

  const [ startDate, setStartDate ] = useState(new Date())
  const [ endDate, setEndDate ] = useState(new Date())
  const [ numberOfMonths, setNumberOfMonth ] = useState(1)
  const [ selectedDates, setCalendarDates ] = useState([])
  const [ PeekAndFullDay, setPeekAndFullDay ] = useState({ peekday: [], fullDay: [] })
  const [ overridePopupOpen, setOverridePopupOpen ] = useState(false)
  const [ alertPopupOpen, setAlertPopupOpen ] = useState(false)
  const [ vaccinationAlert,setVaccinationAlert ] = useState(false)
  const [ petName,setPetName ] = useState('')

  useEffect(() => {
    props.getPetKennelType()
    setPeekAndFullDay(PeekDaysAndFullDays)
  }, [])

  useEffect(() => {
    let serviceVariations = []
    if(selectedPets && selectedLocation) {
      if(selectedPets.length < 1)
        setVaccinationAlert(false)
      for (let pet of selectedPets) {
        const petInfo =  clientPet.items.length != 0 && clientPet.items.find(_item=>_item.id === pet)
        if(petInfo.summary.vaccination_status === 'missing' || petInfo.summary.vaccination_status === 'expired') {
          setVaccinationAlert(true)
          setPetName(petInfo.name)
          break
        }

        else {
          setVaccinationAlert(false)
        }
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

  const _handleCheckInChange = (value)=>{
    setStartDate(new Date(value))
  }

  const _handleCheckOutChange = (value)=>{
    setEndDate(new Date(value))
  }

  const _handleOkBtnClick = () =>{
    setAlertPopupOpen(false)
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
          <span>Pet Information</span>
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
          <Header as='h3' className='section-info-header'>Select location and pet</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Location'
              name='location'
              options={location.items.map(_location =>
                ({ key: _location.id, value: _location.id, text: `${_location.code}` }))
              }
              placeholder='Location'
              required
              selectOnBlur={false}/>
            <Field
              closeOnChange
              component={FormField}
              control={Dropdown}
              disabled={petReservationDetail.item.pet != undefined}
              fluid
              label='Pet'
              multiple
              name='pet'
              options={clientPet.items.map((_clientPet) => ({
                key  : _clientPet.id,
                value: _clientPet.id,
                text : `${_clientPet.name}`
              }))}
              placeholder='Search pet'
              required
              selectOnBlur={false}
              selection/>
          </Form.Group>
          {vaccinationAlert !== false && <Grid>
            <Grid.Column computer={8}>

            </Grid.Column>
            <Grid.Column
              className='message-grid' computer={8} mobile={16}
              tablet={16}>
              <VaccinationAlert petName={petName}/>
            </Grid.Column>
          </Grid>

          }
        </Segment>
        <Segment className='section-info-item-step1'>
          <Header as='h3' className='section-info-header'>When will this event be?</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Check In'
              name='check_in'
              onChange={_handleCheckInChange}
              required
              type='date'/>
            <Field
              component={FormField}
              control={Input}
              label='Check Out'
              name='check_out'
              onChange={_handleCheckOutChange}
              required
              type='date'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Departing Time'
              name='check_out_time'
              required
              type='time'/>
            <Field
              component={FormField}
              control={Input}
              label='Arriving Time'
              name='check_in_time'
              required
              type='time'/>
          </Form.Group>
        </Segment>
        <Segment className='section-info-item-step1'>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Source'
              name='source'
              options={
                [ { key: 1 , value: 1, text: 'Online' },
                  { key: 2 , value: 2, text: 'Email' },
                  { key: 3 , value: 3, text: 'Phone Call' },
                  { key: 4 , value: 4, text: 'Walk In' }
                ]
              }
              placeholder='Select Source'
              required/>
            <Field
              component={FormField}
              control={Select}
              label='Type of stay'
              name='type_of_stay'
              options={
                [ { key: 1 , value: 1, text: 'Dog Boarding' },
                  { key: 2 , value: 2, text: 'Add\'l Dog' },
                  { key: 3 , value: 3 ,  text: 'Boarding' }
                ]
              }
              placeholder='Select type of stay '
              required/>
          </Form.Group>
        </Segment>
        <br/>
        <Segment>
          <div  className='div-section-info-item-single'>
            <Header as='h3' className='section-info-header'>Select package and kennel type</Header>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Kennel Type'
                name='kennel_type'
                options={petKennelType.items.map(_kennelType =>
                  ({ key: _kennelType.id, value: _kennelType.id, text: `${_kennelType.name}` }))
                }
                placeholder='Select Kennel'
                required
                selectOnBlur={false}/>
            </Form.Group>
          </div>
        </Segment>
        <Segment className='section-info-item-step1'>
          <DayPicker
            fixedWeeks
            fromMonth={startDate}
            modifiers={PeekAndFullDay}
            month={startDate}
            numberOfMonths={numberOfMonths}
            selectedDays={selectedDates}
            toMonth={endDate}/>
        </Segment>

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
              disabled={vaccinationAlert}
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
      const KennelType = formValueSelector(boardingFormId)(state, 'kennel_type')
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      const selectedLocation = formValueSelector(boardingFormId)(state, 'location')
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const service = serviceDuck.selectors.list(state)
      const selectedPetID  = petReservationDetail.item.pet && petReservationDetail.item.pet
      const initialLocation =  petReservationDetail.item.location ?  petReservationDetail.item.location : auth.location

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
      const initialCheckOutTime =  moment(`${checkOutTime}`).format('HH:mm')
      const checkInTime = petReservationDetail.item.reserved_at && petReservationDetail.item.reserved_at
      const initialCheckInTime =  moment.utc(`${checkInTime}`).format('HH:mm')
      const defaultInitialValues = petReservationDetail.item.id ? {
        check_in      : petReservationDetail.item.reserved_at ? moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '',
        check_out     : petReservationDetail.item.boarding ? moment(petReservationDetail.item.boarding.checkout_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '', pet           : [ petReservationDetail.item.pet ],
        KennelType    : petReservationDetail.item.boarding ? petReservationDetail.item.boarding.kennel_type : '',
        check_in_time : initialCheckInTime,
        check_out_time: initialCheckOutTime, addon         : serviceArray
      } : {}

      return {
        addonArray,
        initialCheckInTime,
        initialCheckOutTime,
        initialLocation,
        auth,
        clientPet           : clientPetDuck.selectors.list(state),
        services            : boardingServices,
        serviceAttribute    : serviceAttribute,
        petReservationDetail: petReservationDetail,
        initialValues       : { ...petReservationDetail.item, ...defaultInitialValues,
          location: initialLocation
        },
        location           : locationDuck.selectors.list(state),
        petKennelType      : petKennelTypeDuck.selectors.list(state),
        hasSharedKennelType: KennelType === 'shared' ? true : false,
        selectedPets       : selectedPets,
        selectedLocation   : selectedLocation
      }
    },
    {
      getPetKennelType: petKennelTypeDuck.creators.get,
      setItem         : petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location      : Yup.mixed().required('Location is required'),
        pet           : Yup.mixed().required('Pet is required'),
        check_in_time : Yup.mixed().required('Departing Time is required'),
        check_out_time: Yup.mixed().required('Arriving Time is required'),
        kennel_type   : Yup.mixed().required('Kennel Type is required'),
        check_in      : Yup
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
