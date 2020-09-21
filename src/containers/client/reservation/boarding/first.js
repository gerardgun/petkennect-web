import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Select, Segment, Icon, Step } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'

export const boardingFormId = 'boarding-reservation-form'

const BoardingFormWizardFirst = props => {
  const {
    clientPet,
    location,
    error, handleSubmit, reset
  } = props

  useEffect(() => {
    props.getLocations()
    props.getClientPets()
  }, [])

  return (
    <>
      <Step.Group widths={16}>
        <Step active>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Service Information</Step.Title>
          </Step.Content>
        </Step>
        <Step disabled>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Pet Information</Step.Title>
          </Step.Content>
        </Step>
        <Step disabled>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Summary</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
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
          <Header as='h3' className='section-info-headertext-center'>When will this event be?</Header>
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
        <Segment className='section-info-item-step1'>
          <Header as='h3' className='section-info-header'>Select package and kennel type?</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Kennel Type'
              name='kennel_type'
              options={[
                { key: 1, value: 1, text: 'Single' },
                { key: 2, value: 2, text: 'Shared' }
              ]}
              placeholder='Select Kennel'
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Select}
              label='Type of stay'
              name='type_of_stay'
              options={[
                { key: 1, value: 1, text: 'Dog Boarding' },
                { key: 2, value: 2, text: 'Additional Dog Boarding' }
              ]}
              placeholder='Select status'
              selectOnBlur={false}/>
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
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        initialValues: clientDetail.item,
        location     : locationDuck.selectors.list(state),
        clientPet    : clientPetDuck.selectors.list(state)
      }
    },
    {
      getLocations : locationDuck.creators.get,
      getClientPets: clientPetDuck.creators.get,
      resetItem    : clientDetailDuck.creators.resetItem
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
)(BoardingFormWizardFirst)
