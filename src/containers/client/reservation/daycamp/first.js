import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Select, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import moment  from 'moment'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'

export const daycampFormId = 'daycamp-reservation-form'

const DaycampFormWizardFirst = props => {
  const {
    clientPet,
    location,
    error, handleSubmit, reset
  } = props

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
              onClick={props.onNextStep}
              type='button'/>
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
      const defaultInitialValues = petReservationDetail.item.id ? {
        check_in : petReservationDetail.item.reserved_at ? moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '',
        check_out: petReservationDetail.item.daycamp ? moment(petReservationDetail.item.daycamp.checkout_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '', pet      : [ petReservationDetail.item.pet ]
      } : {}

      return {
        clientPet    : clientPetDuck.selectors.list(state),
        initialValues: { ...petReservationDetail.item, ...defaultInitialValues },
        location     : locationDuck.selectors.list(state)
      }
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
          .required(),
        check_out: Yup
          .date().required()
          .when(
            'check_in',
            (check_in, schema) => (check_in && schema.min(check_in))
          )
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DaycampFormWizardFirst)
