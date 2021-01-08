import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Grid, Select, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'
import Message from '@components/Message'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'
import trainingMethodDuck from '@reducers/training-method'
import trainingReasonDuck from '@reducers/training-reason'
import employeeDuck from '@reducers/employee'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

import AlertModal from './../alert-modal'
import RecurringDaysForm from './../recurring-days'

import './styles.scss'

export const trainingFormId = 'training-reservation-form'

const TrainingFormWizardFirst = props => {
  const {
    selectedLocation,
    serviceAttribute,
    services,
    employee,
    trainingMethod,
    trainingReason,
    clientPet,
    petReservationDetail,
    location,
    error, handleSubmit, reset
  } = props

  useEffect(() => {
    props.getEmployees()
    props.getTrainingMethod()
    props.getTrainingReason()
  }, [])

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
    services[0] ? (<>
      <div className='div-progress-bar div-training-main'>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Service Information</span>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-content'>
          <Icon name='check circle'/>
          <span>Summary</span>
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={trainingFormId} onReset={reset} onSubmit={handleSubmit}>

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
                  required
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Price'
                  name='price'
                  required
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
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Reason for training'
                  name='reason'
                  options={trainingReason.items.map(_trainingReason =>
                    ({ key: _trainingReason.id, value: _trainingReason.id, text: `${_trainingReason.name}` }))
                  }
                  placeholder='Select Reason'
                  required
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Select}
                  label='Select Trainer'

                  name='trainer'
                  options={employee.items.filter(_employee => _employee.title_name === 'Groomer').map(_employee=>
                    ({ key: _employee.id, value: _employee.id, text: `${_employee.first_name + ' ' + _employee.last_name}` }))
                  }
                  placeholder='Select Trainer'
                  required
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Select}
                  label='Method'
                  name='method'
                  options={trainingMethod.items.map(_trainingMethod =>
                    ({ key: _trainingMethod.id, value: _trainingMethod.id, text: `${_trainingMethod.name}` }))
                  }
                  placeholder='Select Method'
                  required
                  selectOnBlur={false}/>
              </Form.Group>
            </Grid.Column>

          </Grid>

        </Segment>

        <RecurringDaysForm serviceType='T'/>

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
    ) : (<><Message
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
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const selectedLocation = formValueSelector(trainingFormId)(state, 'location')
      const service = serviceDuck.selectors.list(state)
      const trainingServices = service.items && service.items.filter(_ => _.type === 'T')

      return {
        selectedLocation,
        serviceAttribute,
        services      : trainingServices,
        petReservationDetail,
        initialValues : { ...petReservationDetail.item },
        location      : locationDuck.selectors.list(state),
        trainingMethod: trainingMethodDuck.selectors.list(state),
        trainingReason: trainingReasonDuck.selectors.list(state),
        clientPet     : clientPetDuck.selectors.list(state),
        employee      : employeeDuck.selectors.list(state)
      }
    },
    {
      getEmployees     : employeeDuck.creators.get,
      getTrainingMethod: trainingMethodDuck.creators.get,
      getTrainingReason: trainingReasonDuck.creators.get,
      setItem          : petReservationDetailDuck.creators.setItem,
      setItemVariation : trainingMethodDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location     : Yup.mixed().required('Location is required'),
        pet          : Yup.mixed().required('Pet is required'),
        'package'    : Yup.mixed().required('Package is required'),
        check_in_time: Yup.mixed().required('Check In time is required'),
        check_in     : Yup.mixed().required('Start Date is required'),
        price        : Yup.mixed().required('Price is required'),
        method       : Yup.mixed().required('Method is required'),
        trainer      : Yup.mixed().required('Trainer is required'),
        reason       : Yup.mixed().required('Reason is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TrainingFormWizardFirst)
