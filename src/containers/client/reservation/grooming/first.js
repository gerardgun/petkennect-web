import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Dropdown, Form, Header, Grid, Select, Segment, Icon, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'
import Message from '@components/Message'
import moment  from 'moment'
import serviceDuck from '@reducers/service'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'
import employeeDuck from '@reducers/employee'

import RecurringDaysForm from './../recurring-days'
import AlertModal from './../alert-modal'

export const groomingFormId = 'grooming-reservation-form'

const GroomingFormWizardFirst = props => {
  const {

    addonArray,
    services,
    petReservationDetail,
    selectedLocation,
    selectedPet,
    serviceAttribute,
    employee,
    clientPet,
    location,
    error, handleSubmit, reset
  } = props

  useEffect(() => {
    props.getEmployees()
  }, [])

  const [ overridePopupOpen, setOverridePopupOpen ] = useState(false)

  const _handleOkBtnClick = () =>{
    setOverridePopupOpen(false)
  }

  useEffect(() => {
    let serviceVariations
    if(selectedPet && selectedLocation) {
      const locationId = serviceAttribute.items && serviceAttribute.items.find(_location => _location.type === 'L')
        .values.find(_location => _location.value == selectedLocation).id

      const petSize = clientPet.items.find(pet => pet.id === selectedPet).size
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
        serviceVariations = { ...variation.find(_ => _.id == variationId), petId: selectedPet }

      else
        setOverridePopupOpen(true)

      props.setItem({ ...petReservationDetail.item, serviceVariations: serviceVariations,calculatedAddons: addonArray }, 'CREATE')
    }
  }, [ selectedLocation, selectedPet ])

  return  (

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
      <Form id={groomingFormId} onReset={reset} onSubmit={handleSubmit}>

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
        <Segment className='section-info-item-step1'>
          <Header as='h3' className='section-info-header'>Select  Package Details</Header>
          <Grid>
            <Grid.Column computer={16}>
              <Form.Group widths='2'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Select Package'
                  name='package'
                  options={[
                    { key: 1, value: 'Package1', text: 'Package1' }
                  ]}
                  placeholder='Select Package'

                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Price'
                  name='price'

                  selectOnBlur={false}
                  type='number'/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Description'
                  name='package_description'
                  placeholder='package description'
                  readOnly/>
              </Form.Group>

            </Grid.Column>

          </Grid>

        </Segment>
        <br/>
        <Segment>
          <div className='div-section-info-item-single'>
            <Header as='h3' className='section-info-header'>Select groomer</Header>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Groomer'
                name='groomer'
                options={employee.items.filter(_employee => _employee.title_name === 'Groomer').map(_employee=>
                  ({ key: _employee.id, value: _employee.id, text: `${_employee.first_name + ' ' + _employee.last_name}` }))
                }
                placeholder='Select Groomer'
                required
                selectOnBlur={false}/>
            </Form.Group>
          </div>
        </Segment>

        { petReservationDetail.item.id
          ? <Segment className='section-info-item-step1'>
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
            </Form.Group>

          </Segment> : <RecurringDaysForm serviceType='G'/>

        }
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign='center' width={16}>
                12/10/2020
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid className='grid-time-selection'>
            <Grid.Row>
              <Grid.Column width={1}>
               07:00
              </Grid.Column>
              <Grid.Column width={15}>
                <Button active className='w100 btn-groomer-time-select'></Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={1}>
               08:00
              </Grid.Column>
              <Grid.Column width={15}>
                <Button className='w100 btn-groomer-time-select'>Not Avaliable</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={1}>
               09:00
              </Grid.Column>
              <Grid.Column width={15}>
                <Button active className='w100 btn-groomer-time-select'></Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={1}>
               10:00
              </Grid.Column>
              <Grid.Column width={15}>
                <Button className='w100 btn-groomer-time-select'>Not Avaliable</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
              type='submit'/>
          </Form.Field>
        </Form.Group>
        <AlertModal isOpened={overridePopupOpen} onReply={_handleOkBtnClick}/>
      </Form>
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
      const selectedLocation = formValueSelector(groomingFormId)(state, 'location')
      const selectedPet = formValueSelector(groomingFormId)(state, 'pet')
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const intialLocation =  petReservationDetail.item.location ?  petReservationDetail.item.location : auth.location
      const service = serviceDuck.selectors.list(state)
      const checkInTime = petReservationDetail.item.reserved_at && petReservationDetail.item.reserved_at
      const initialCheckInTime =  moment.utc(`${checkInTime}`).format('HH:mm')
      const grommingServices = service.items && service.items.filter(_ => _.type === 'G')
      let serviceArray = []
      let  addonArray = []
      const sub_services =  petReservationDetail.item.addons && service.items.filter(
        item => item.parent_service === petReservationDetail.item.service)

      petReservationDetail.item.id &&  petReservationDetail.item.addons.forEach(addons=>{
        for (let item of sub_services) {
          let serviceVariation = item.variations.find(variation=>variation.id === addons.service_variation)

          if(serviceVariation !== undefined) {
            serviceArray.push(item.id)
            addonArray.push({ ...addons, name: item.name, addOn_id: item.id })
          }
        }
      })

      const defaultInitialValues = petReservationDetail.item.id ? {
        check_in      : moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD'),
        groomer       : petReservationDetail.item.employee,
        check_in_time : initialCheckInTime,
        grooming_offer: serviceArray
      } : {}

      return {
        addonArray,
        serviceArray,
        service,
        sub_services,
        intialLocation,
        serviceAttribute    : serviceAttribute,
        petReservationDetail: petReservationDetail,
        services            : grommingServices,
        clientPet           : clientPetDuck.selectors.list(state),
        initialValues       : { ...petReservationDetail.item, ...defaultInitialValues,  location: intialLocation },
        location            : locationDuck.selectors.list(state),
        employee            : employeeDuck.selectors.list(state),
        selectedLocation    : selectedLocation,
        selectedPet         : selectedPet
      }
    },
    {
      getEmployees: employeeDuck.creators.get,
      setItem     : petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : groomingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location     : Yup.mixed().required('Location is required'),
        pet          : Yup.mixed().required('Pet is required'),
        check_in_time: Yup.mixed().required('Check In time is required'),
        check_in     : Yup.mixed().required('Start Date is required'),
        groomer      : Yup.mixed().required('Groomer is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(GroomingFormWizardFirst)
