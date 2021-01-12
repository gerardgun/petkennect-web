import React, { useState,useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Grid, Button, Form, Header, Dropdown, Select, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import _truncate from 'lodash/truncate'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import Message from '@components/Message'

import { parseResponseError, parseFormValues, syncValidate } from '@lib/utils/functions'
import clientPetDuck from '@reducers/client/pet'
import petReservationDetailDuck from '@reducers/pet/reservation/express-check-in/detail'
import trainingMethodDuck from '@reducers/training-method'
import employeeDuck from '@reducers/employee'
import serviceDuck from '@reducers/service'
import authDuck from '@reducers/auth'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import yardTypesDuck from '@reducers/pet/pet-yard-type'

export const formId = 'express-check-in-form'

const ExpressCheckInForm = props => {
  const {
    clientPet,
    currentTenant,
    petReservationDetail,
    serviceAttribute,
    services,
    yardTypes,
    selectedLocation,
    trainingMethod,
    location,
    hasExpressCheckIn,

    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE')
  const [ variationAlert,setVariationAlert ] = useState(false)

  useEffect(() => {
    props.getServices()
    props.getServiceAttributes()
    props.getEmployees()
    props.getClientPets()
    props.getTrainingMethod()
    props.getYardTypes()
  }, [])

  let serviceVariations = []
  const  _handlePetDropDownChange = (value) =>{
    serviceVariations = []
    let allSelectedPet = value.filter(_ => _ != null)
    for (let item of allSelectedPet)
    {
      const petSize = clientPet.items.find(pet => pet.id === item).size

      const locationId = serviceAttribute.items && serviceAttribute.items.find(_location => _location.type === 'L')
        .values.find(_location => _location.value == selectedLocation).id

      const petSizeId = serviceAttribute.items && serviceAttribute.items.find(_petSize => _petSize.type === 'S')
        .values.find(_petSize => _petSize.value == petSize).id

      const variation = services.variations

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

      if(variationId != null) {
        serviceVariations.push({ ...variation.find(_ => _.id == variationId), petId: item })
        setVariationAlert(false)
      }

      else
      {setVariationAlert(true)}
    }
  }

  const locationItems = useMemo(() => {
    return location.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : _truncate(item.code, { length: 16 })
    }))
  }, [ location.status ])

  const _handleClose = () => {
    reset()
    props.resetItem()
    setVariationAlert(false)
  }
  // eslint-disable-next-line no-unused-vars
  const _handleSubmit = values => {
    values = parseFormValues(values)

    return props
      .post({ ...values, serviceVariations, currentTenant,  clientId: petReservationDetail.item.client })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petReservationDetail.mode), [ petReservationDetail.mode ])
  const yardTypesOptions = yardTypes.items.map(_yardTypes =>
    ({ key: _yardTypes.id, value: _yardTypes.id, text: `${_yardTypes.name}` }))

  const isDisabled = Boolean(!services)

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={isOpened}
        size='small'>
        <Modal.Content>

          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Header as='h2' className='segment-content-header'>Express Check In</Header>
            <Field component='input' name='id' type='hidden'/>

            {variationAlert && <><Message
              content={
                <Grid padded style={{ marginLeft: -16 }}>
                  <Grid.Column className='mb0 pb0' width='16'>
                    <div className='message__title'>Price variation is not available for this pet.</div>
                  </Grid.Column>
                  <Grid.Column width='16'>

                  </Grid.Column>
                </Grid>

              } type='warning'/><br/></>}
            {!services && <><Message
              content={
                <Grid padded style={{ marginLeft: -16 }}>
                  <Grid.Column className='mb0 pb0' width='16'>
                    <div className='message__title'>The Service is not available for selected comapny.</div>
                  </Grid.Column>
                  <Grid.Column width='16'>

                  </Grid.Column>
                </Grid>

              } type='warning'/><br/></>}

            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Service Type'
                name='service_type'
                options={[
                  { key: 1, value: 'D', text: 'Camp/ Fitness' },
                  { key: 2, value: 'T', text: 'Training' },
                  { key: 3, value: 'boarding_chk_in', text: 'Boarding Chk-In' },
                  { key: 4, value: 'boarding_chk_out', text: 'Boarding Chk-Out' },
                  { key: 5, value: 'daycamp_reservation', text: 'DayCamp Reservations' }
                ]}
                placeholder='Select option'
                required
                selectOnBlur={false}/>
            </Form.Group>

            <Form.Group widths='equal'>
              <Field
                closeOnChange
                component={FormField}
                control={Dropdown}
                disabled={Boolean(petReservationDetail.item.pet) || isDisabled}
                fluid
                label='Pet'
                multiple
                name='pet'
                onChange={_handlePetDropDownChange}
                options={[ ...clientPet.items ].map((_clientPet) => ({
                  key  : _clientPet.id,
                  value: _clientPet.id,
                  text : `${_clientPet.name}`
                }))}
                placeholder='Search pet'
                required
                selection
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Location'
                name='location'
                options={locationItems}
                placeholder='Select option'
                required
                selectOnBlur={false}/>
            </Form.Group>

            {
              hasExpressCheckIn === 'D' && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Yard'
                      name='yard'
                      options={yardTypesOptions}
                      placeholder='Select option'
                      required
                      selectOnBlur={false}/>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Lunch'
                      name='lunch'
                      options={[
                        { key: 1, value: 'true', text: 'Yes' },
                        { key: 2, value: 'false', text: 'No' }
                      ]}
                      placeholder='Select option'
                      required
                      selectOnBlur={false}/>
                  </Form.Group>
                </>
              )
            }
            {
              hasExpressCheckIn === 'T' && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Training'
                      name='method'
                      options={trainingMethod.items.map(_trainingMethod =>
                        ({ key: _trainingMethod.id, value: _trainingMethod.id, text: `${_trainingMethod.name}` }))
                      }
                      placeholder='Select option'
                      selectOnBlur={false}/>
                  </Form.Group>
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

            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  content='Cancel'
                  disabled={submitting}
                  onClick={_handleClose}
                  type='button'/>
                <Button
                  color='teal'
                  content='Check In!'
                  disabled={submitting || isDisabled}
                  loading={submitting}
                  type='submit'/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ location, auth, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const hasExpressCheckIn = formValueSelector(formId)(state, 'service_type')
      const selectedLocation = formValueSelector(formId)(state, 'location')
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const service = serviceDuck.selectors.list(state)
      const services = service.items && service.items.find(_ => _.type === hasExpressCheckIn)

      return {
        petReservationDetail,
        service,
        location,
        selectedLocation,
        serviceAttribute,
        hasExpressCheckIn,
        yardTypes     : yardTypesDuck.selectors.list(state),
        employee      : employeeDuck.selectors.list(state),
        currentTenant : authDuck.selectors.getCurrentTenant(auth),
        services   ,
        trainingMethod: trainingMethodDuck.selectors.list(state),
        clientPet     : clientPetDuck.selectors.list(state),
        initialValues : { ...petReservationDetail.item, location: auth.location, pet: [ petReservationDetail.item.pet ], service_type: 'D' }
      }
    },
    { getEmployees        : employeeDuck.creators.get,
      getYardTypes        : yardTypesDuck.creators.get,
      post                : petReservationDetailDuck.creators.post,
      put                 : petReservationDetailDuck.creators.put,
      setItem             : petReservationDetailDuck.creators.setItem,
      getClientPets       : clientPetDuck.creators.get,
      resetItem           : petReservationDetailDuck.creators.resetItem,
      getTrainingMethod   : trainingMethodDuck.creators.get,
      getServices         : serviceDuck.creators.get,
      getServiceAttributes: serviceAttributeDuck.creators.get
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        pet     : Yup.string().required('Pet is required'),
        location: Yup.string().required('Location is required'),
        yard    : Yup.string().required('Yard is required'),
        lunch   : Yup.string().required('Lunch is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ExpressCheckInForm)
