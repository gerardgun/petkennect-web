import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Grid, Select, Segment, Icon, Step } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'

export const groomingFormId = 'grooming-reservation-form'

const GroomingFormWizardFirst = props => {
  const {
    clientPet,
    location,
    error, handleSubmit, reset
  } = props

  const [ reservatoinDayValue, setReservationDay ] = useState()

  const  _handleReservationDayChange = (e)=>{
    setReservationDay(e)
  }

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
              fluid
              label='Pet'
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
          <Header as='h3' className='section-info-header text-center'>When will this event be?</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Reservation Day'
              name='reservation_day'
              onChange={_handleReservationDayChange}
              required
              type='date'/>
            <Field
              component={FormField}
              control={Input}
              label='Appointment Time'
              name='appointment_time'
              required
              type='time'/>
          </Form.Group>
        </Segment>

        <div className='div-section-info-item-single'>
          <Header as='h3' className='section-info-header'>Select groomer</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Groomer'
              name='groomer'
              options={[
                { key: 1, value: 1, text: 'Test' }
              ]}
              placeholder='Select Groomer'
              selectOnBlur={false}/>
          </Form.Group>
        </div>

        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign='center' width={16}>
                {reservatoinDayValue}
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
    form                    : groomingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location       : Yup.mixed().required('Location is required'),
        pet            : Yup.mixed().required('Pet is required'),
        reservation_day: Yup
          .date()
          .required('Reservation day is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(GroomingFormWizardFirst)
