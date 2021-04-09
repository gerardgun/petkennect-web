import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Grid, Select, Segment, Icon, TextArea , Popup } from 'semantic-ui-react'
import * as Yup from 'yup'
import loadable from '@loadable/component'
import moment from 'moment'
import { syncValidate } from '@lib/utils/functions'
import RecurringDaysForm from './../recurring-days'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'
import trainingMethodDuck from '@reducers/training-method'
import trainingReasonDuck from '@reducers/training-reason'
import employeeDuck from '@reducers/employee'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import trainingReservationGroupClassDetailDuck from '@reducers/pet/reservation/training/reservation/group-class/detail'

import FormField from '@components/Common/FormField'

import './styles.scss'

export const trainingFormId = 'training-reservation-form'

const Message = loadable(() => import('@components/Message'))
const AlertModal = loadable(() => import('./../alert-modal'))
const VaccinationAlert = loadable(() => import('../vaccination-alert'))
const PetLocationForm = loadable(() => import('../common-sections/location-pet-section'))
const GroupClassForm = loadable(() => import('./group-class-modal'))
const FormError = loadable(() => import('@components/Common/FormError'))

const TrainingFormWizardFirst = props => {
  const {
    selectedLocation,
    selectedPets,
    serviceAttribute,
    services,
    employee,
    trainingMethod,
    trainingReason,
    clientPet,
    groupClass,
    petReservationDetail,
    error, handleSubmit, reset
  } = props
  const [ overridePopupOpen, setOverridePopupOpen ] = useState(false)
  const [ vaccinationAlert,setVaccinationAlert ] = useState(false)
  const [ selectedProgram, setSelectedProgram ] = useState()

  const _handleOkBtnClick = () =>{
    setOverridePopupOpen(false)
  }
  useEffect(()=>{
    if(selectedProgram != undefined && selectedProgram == 1)
      props.setGroupClassItem(null,'CREATE')
    else if(selectedProgram == undefined && groupClass.mode != 'READ')
      props.resetGroupClassItem()

    else if(selectedProgram != 1 &&  selectedProgram != undefined)
      props.resetGroupClassItem()
  },[ selectedProgram ])

  const _handleProgramOnChange = (value)=>{
    setSelectedProgram(value)
  }

  const _handleEditClassClick = () =>{
    props.setGroupClassItem(null,'CREATE')
  }
  useEffect(() => {
    let petSize
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

      let allSelectedPet = selectedPets.filter(_ => _ != null)
      const locationId = serviceAttribute.items && serviceAttribute.items.results.find(_location => _location.type === 'L')
        .values.find(_location => _location.value == selectedLocation)
      const petLength = selectedPets && selectedPets.length
      if(petLength > 0 && locationId) {
        for (let item of allSelectedPet) {
          const size = clientPet.items.find(pet => pet.id === item).size
          petSize = size != null ? size : 'M'
          const petSizeId = serviceAttribute.items && serviceAttribute.items.results.find(_petSize => _petSize.type === 'S')
            .values.find(_petSize => _petSize.value == petSize).id

          const variation = services[0].variations

          let variationId
          for (let item of variation) {
            let locationExist = item.attributes.find(_id => _id.service_attribute_value_id == locationId.id)
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
            setOverridePopupOpen(true)
        }
        props.setItem({ ...petReservationDetail.item, serviceVariations: serviceVariations }, 'CREATE')
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
      <Form id={trainingFormId} onReset={reset} onSubmit={handleSubmit}>

        <Segment className='section-info-item-step1'>
          <PetLocationForm multiple={true}/>
          {vaccinationAlert !== false && <Grid>

            <Grid.Column
              className='message-grid pl32' computer={11} mobile={16}
              tablet={16}>
              <VaccinationAlert/>
            </Grid.Column>
          </Grid>

          }
        </Segment>
        <Segment className='section-info-item-step1'>
          <Header as='h3' className='section-info-header'>Select  Package Details</Header>
          <Grid>
            <Grid.Column computer={16}>

              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Select Program Type'
                  name='program'
                  onChange={_handleProgramOnChange}
                  options={[
                    { key: 1, value: '1', text: 'Group Classes' },
                    { key: 2, value: '2', text: 'Day Training' },
                    { key: 3, value: '3', text: 'Board &  Train' },
                    { key: 4, value: '4', text: 'Private Lessons' }
                  ]}
                  placeholder='Select Program'
                  required
                  selectOnBlur={false}/>

              </Form.Group>

              {
                groupClass.mode == 'READ' && <>

                  <Grid>
                    <Grid.Column className='pr8' computer={8} mobile={16}>

                      <Form.Group widths='equal'>

                        <Form.Input
                          className='pr0 '
                          label='Class Name' readOnly
                          value={groupClass.item.class_name ? groupClass.item.class_name : '-'}/>
                        <Popup
                          content='Select Class'
                          inverted
                          trigger={<Button
                            basic
                            className='class-edit-button'
                            color='teal'
                            icon='ellipsis horizontal'
                            onClick={_handleEditClassClick}
                            type='button'/>}/>
                      </Form.Group>

                    </Grid.Column>

                    <Grid.Column className='pl8' computer={8} mobile={16}>
                      <Form.Group widths='equal' >
                        <Form.Input

                          label='Time' readOnly
                          value={groupClass.item.time ? groupClass.item.time : '-'}/>

                      </Form.Group>
                    </Grid.Column>
                  </Grid>

                  <Form.Group widths='equal'>
                    <Form.Input
                      label='Frequency' readOnly
                      value={groupClass.item.frequency ? groupClass.item.frequency : '-'}/>
                    <Form.Input
                      label='Trainer' readOnly
                      value={groupClass.item.trainer ? groupClass.item.trainer : '-'}/>

                  </Form.Group>

                  <Form.Group widths='two'>
                    <Form.Input
                      label='Price' readOnly
                      value={groupClass.item.price ? groupClass.item.price : '-'}/>

                  </Form.Group>

                </>
              }
              { props.groupClass.mode != 'READ'

                &&  <>
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
                  {/* <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Description'
                      name='package_description'
                      placeholder='package description'
                      readOnly/>
                  </Form.Group> */}
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
                </>

              }

              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={TextArea}
                  label='Employee Notes'
                  maxLength='160'
                  name='employee_notes'
                  placeholder='Write Notes'
                  required/>
              </Form.Group>

            </Grid.Column>

          </Grid>

        </Segment>

        { petReservationDetail.item.training === undefined  ? <RecurringDaysForm dateFunction={groupClass.mode == 'READ' ? false : true} serviceType='T'/>
          : <Segment className='section-info-item-step1'>
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
              disabled={groupClass.mode == 'READ' && groupClass.item.class_name == undefined}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
      <AlertModal isOpened={overridePopupOpen} onReply={_handleOkBtnClick}/>
      <GroupClassForm/>

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
    ({ auth, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const selectedLocation = formValueSelector(trainingFormId)(state, 'location')
      const selectedPets = formValueSelector(trainingFormId)(state, 'pet')
      const service = serviceDuck.selectors.list(state)
      const employees = employeeDuck.selectors.list(state)
      const trainingServices = service.items && service.items.filter(_ => _.type === 'T')
      const method  = petReservationDetail.item.training  && petReservationDetail.item.training.method
      const initialLocation =  petReservationDetail.item.location ?  petReservationDetail.item.location : auth.location
      const initialComment  = petReservationDetail.item.training  && petReservationDetail.item.training.comment
      const check_in     = moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD')
      const checkInTime = petReservationDetail.item.reserved_at && petReservationDetail.item.reserved_at
      const initialCheckInTime =  moment.utc(`${checkInTime}`).format('HH:mm')
      const petReservationTrainingGroupClass = trainingReservationGroupClassDetailDuck.selectors.detail(state)
      const defaultInitialValues = petReservationDetail.item.id ? {
        method       : method,
        comment      : initialComment,
        check_in     : check_in ,
        check_in_time: initialCheckInTime,
        pet          : [ petReservationDetail.item.pet ]
      } : {}

      return {
        selectedPets    : selectedPets,
        selectedLocation: selectedLocation,
        employee        : employees,
        serviceAttribute,
        initialComment,
        method,
        initialLocation,
        services        : trainingServices,
        petReservationDetail,
        groupClass      : petReservationTrainingGroupClass,
        initialValues   : { ...petReservationDetail.item, location: initialLocation,  check_in_time: '09:00' ,...defaultInitialValues    },
        trainingMethod  : trainingMethodDuck.selectors.list(state),
        trainingReason  : trainingReasonDuck.selectors.list(state),
        clientPet       : clientPetDuck.selectors.list(state)
      }
    },
    {
      setItem            : petReservationDetailDuck.creators.setItem,
      setGroupClassItem  : trainingReservationGroupClassDetailDuck.creators.setItem,
      resetGroupClassItem: trainingReservationGroupClassDetailDuck.creators.resetItem

    }
  ),
  reduxForm({
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location : Yup.mixed().required('Location is required'),
        pet      : Yup.mixed().required('Pet is required'),
        'package': Yup.mixed().required('Package is required'),
        check_in : Yup.mixed().required('Start Date is required'),
        price    : Yup.mixed().required('Price is required'),
        method   : Yup.mixed().required('Method is required'),
        trainer  : Yup.mixed().required('Trainer is required'),
        reason   : Yup.mixed().required('Reason is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TrainingFormWizardFirst)
