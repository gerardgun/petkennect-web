import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector,reduxForm } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Select, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import moment  from 'moment'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'
import serviceDuck from '@reducers/service'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

import AlertModal from './../alert-modal'

export const daycampFormId = 'daycamp-reservation-form'

const DaycampFormWizardFirst = props => {
  const {
    petReservationDetail,
    clientPet,
    location,
    serviceAttribute,
    services,
    selectedLocation,
    error, handleSubmit, reset
  } = props

  const _handlePetDropDownChange = (value) =>{
    let serviceVariations = []
    for (let item of value)
    {
      const petSize = clientPet.items.find(pet => pet.id === item).size

      const locationId = serviceAttribute.items && serviceAttribute.items.find(_location => _location.type === 'L')
        .values.find(_location => _location.value == selectedLocation).id

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

    props.setItem({ ...petReservationDetail.item,serviceVariations: serviceVariations },'CREATE')
  }

  return (
    <>
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
              fluid
              label='Pet'
              multiple
              name='pet'
              onChange={_handlePetDropDownChange}
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
          <Header as='h3' className='section-info-header text-center'>When will this event be?</Header>
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
              label='Departing Time'
              name='check_in_time'
              required
              type='time'/>
            <Field
              component={FormField}
              control={Input}
              label='Arriving Time'
              name='check_out_time'
              required
              type='time'/>
          </Form.Group>
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
      </Form>
      <AlertModal/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)

      const selectedLocation = formValueSelector(daycampFormId)(state, 'location')
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const service = serviceDuck.selectors.list(state)
      const daycampServices = service.items && service.items.filter(_ => _.type === 'D')
      const defaultInitialValues = petReservationDetail.item.id ? {
        check_in : petReservationDetail.item.reserved_at ? moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '',
        check_out: petReservationDetail.item.daycamp ? moment(petReservationDetail.item.daycamp.checkout_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '', pet      : [ petReservationDetail.item.pet ]
      } : {}

      return {
        auth,
        clientPet    : clientPetDuck.selectors.list(state),
        services     : daycampServices,
        initialValues: { ...petReservationDetail.item, ...defaultInitialValues, location: auth.location },
        location     : locationDuck.selectors.list(state),
        petReservationDetail,
        serviceAttribute,
        selectedLocation
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
        location      : Yup.mixed().required('Location is required'),
        pet           : Yup.mixed().required('Pet is required'),
        check_in_time : Yup.mixed().required('Departing Time is required'),
        check_out_time: Yup.mixed().required('Arriving Time is required'),
        check_in      : Yup
          .date('Check In date is required')
          .required(),
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
)(DaycampFormWizardFirst)
