import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Select, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import moment  from 'moment'

import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'
import petKennelTypeDuck from '@reducers/pet/pet-kennel-type'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

export const boardingFormId = 'boarding-reservation-form'

const BoardingFormWizardFirst = props => {
  const {
    clientPet,
    location,
    petKennelType,
    error, handleSubmit, reset
  } = props

  useEffect(() => {
    props.getPetKennelType()
  }, [])

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
          <Header as='h3' className='section-info-header'>When will this event be?</Header>
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
              name='departing_time'
              required
              type='time'/>
            <Field
              component={FormField}
              control={Input}
              label='Arriving Time'
              name='arriving_time'
              required
              type='time'/>
          </Form.Group>
        </Segment>
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
            {
              props.hasSharedKennelType && (
                props.selectedPets && props.selectedPets.map((petId)=> (
                  <Form.Group key={petId} widths='equal'>
                    <Field
                      component={FormField}
                      control={Select}
                      label={`Type of stay for ${clientPet.items.filter(_pet => _pet.id === petId)[0].name}`}
                      name={`type_of_stay_${petId}`}
                      options={[
                        { key: 1, value: 1, text: 'Dog Boarding' },
                        { key: 2, value: 2, text: 'Additional Dog Boarding' }
                      ]}
                      placeholder='Select status'
                      required
                      selectOnBlur={false}/>
                  </Form.Group>
                ))

              )
            }
          </div>
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
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const KennelType = formValueSelector(boardingFormId)(state, 'kennel_type')
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const defaultInitialValues = petReservationDetail.item.id ? {
        check_in  : petReservationDetail.item.reserved_at ? moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '',
        check_out : petReservationDetail.item.boarding ? moment(petReservationDetail.item.boarding.checkout_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '', pet       : [ petReservationDetail.item.pet ],
        KennelType: petReservationDetail.item.boarding ? petReservationDetail.item.boarding.kennel_type : '' } : {}

      return {
        clientPet          : clientPetDuck.selectors.list(state),
        initialValues      : { ...petReservationDetail.item, ...defaultInitialValues },
        location           : locationDuck.selectors.list(state),
        petKennelType      : petKennelTypeDuck.selectors.list(state),
        hasSharedKennelType: KennelType === 'shared' ? true : false,
        selectedPets       : selectedPets
      }
    },
    {
      getPetKennelType: petKennelTypeDuck.creators.get
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
        departing_time: Yup.mixed().required('Departing Time is required'),
        arriving_time : Yup.mixed().required('Arriving Time is required'),
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
