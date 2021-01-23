import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector,reduxForm } from 'redux-form'
import { Button, Dropdown, Grid, Form, Header, Select, Segment, Icon, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'
import Message from '@components/Message'

import moment  from 'moment'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'
import serviceDuck from '@reducers/service'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

import AlertModal from './../alert-modal'
import RecurringDaysForm from './../recurring-days'

export const daycampFormId = 'daycamp-reservation-form'

const DaycampFormWizardFirst = props => {
  const {
    petReservationDetail,
    addonArray,
    clientPet,
    location,
    serviceAttribute,
    services,
    selectedLocation,
    selectedPets,
    error, handleSubmit, reset
  } = props

  useEffect(() => {
    let serviceVariations = []
    if(selectedPets && selectedLocation) {
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
            props.setItemVariation(null, 'READ')
        }
        props.setItem({ ...petReservationDetail.item, serviceVariations: serviceVariations, calculatedAddons: addonArray }, 'CREATE')
      }
    }
  }, [ selectedLocation, selectedPets ])

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
              disabled={petReservationDetail && petReservationDetail.item.pet != undefined}
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
              selection
              selectOnBlur={false}/>
          </Form.Group>
        </Segment>

        {
          petReservationDetail.item.id === undefined ? <RecurringDaysForm serviceType='D'/>
            : <>
              <Segment className='section-info-item-step1'>
                <Header as='h3' className='section-info-header'>When will this event be?</Header>
                <Form.Group widths='equal'>
                  <Field
                    component={FormField}
                    control={Input}
                    label='reserved date'
                    name='check_in'
                    required
                    type='date'/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Check in time'
                    name='check_in_time'
                    required
                    type='time'/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Check out time'
                    name='check_out_time'
                    required
                    type='time'/>
                </Form.Group>

              </Segment>
            </>
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
      <AlertModal/>
    </>) : (<><Message
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
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const checkInTime = petReservationDetail.item.reserved_at && petReservationDetail.item.reserved_at
      const initialCheckInTime =  moment.utc(`${checkInTime}`).format('HH:mm')
      const checkOutTime = petReservationDetail.item.checkout && petReservationDetail.item.checkout
      const initialCheckOutTime = moment.utc(checkOutTime).format('HH:mm')
      const selectedLocation = formValueSelector(daycampFormId)(state, 'location')
      const selectedPets = formValueSelector(daycampFormId)(state, 'pet')
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const initialLocation =  petReservationDetail.item.location ?  petReservationDetail.item.location : auth.location
      const service = serviceDuck.selectors.list(state)
      const daycampServices = service.items && service.items.filter(_ => _.type === 'D')
      let serviceArray = []
      let  addonArray = []
      const sub_services =  petReservationDetail.item.addons && service.items.filter(
        item => item.parent_service === petReservationDetail.item.service)
      petReservationDetail.item.id &&  petReservationDetail.item.addons.forEach(addons=>{
        for (let item of sub_services) {
          let serviceVariation = item.variations.find(variation=>variation.id === addons.service_variation)

          if(serviceVariation !== undefined) {
            serviceArray.push(item.id)

            addonArray.push({ ...addons, name: item.name, petId: selectedPets, addOn_id: item.id })
          }
        }
      })
      const defaultInitialValues = petReservationDetail.item.id ? {
        check_in      : petReservationDetail.item.reserved_at ? moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '',
        check_out     : petReservationDetail.item.daycamp ? moment(petReservationDetail.item.daycamp.checkout_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '', pet           : [ petReservationDetail.item.pet ],
        addon         : serviceArray, check_in_time : initialCheckInTime, check_out_time: initialCheckOutTime
      } : {}

      return {
        service,
        sub_services,
        addonArray,
        serviceArray,
        auth,
        clientPet       : clientPetDuck.selectors.list(state),
        services        : daycampServices,
        initialValues   : { ...petReservationDetail.item, ...defaultInitialValues, location: initialLocation },
        location        : locationDuck.selectors.list(state),
        petReservationDetail,
        serviceAttribute,
        selectedPets    : selectedPets,
        selectedLocation: selectedLocation
      }
    },
    {
      setItem         : petReservationDetailDuck.creators.setItem,
      setItemVariation: trainingMethodDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : daycampFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location: Yup.mixed().required('Location is required'),
        pet     : Yup.mixed().required('Pet is required'),
        check_in: Yup
          .date()
          .required('Start date is required'),
        check_in_time : Yup.mixed().required('Check In time is required'),
        check_out_time: Yup.mixed().required('Check Out time is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DaycampFormWizardFirst)
