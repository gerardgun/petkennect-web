import React from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector,Field } from 'redux-form'
import { Button, Form, Grid, Header, Segment, List, Icon } from 'semantic-ui-react'

import moment from 'moment'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'
import { parseResponseError, parseFormValues } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'
import authDuck from '@reducers/auth'

import clientPetDuck from '@reducers/client/pet'
import employeeDuck from '@reducers/employee'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

import AlertModal from './../alert-modal'
import { groomingFormId } from './first'

const GroomingFormWizardThird = props => {
  const {
    groomerDetail,
    startDate,
    endDate,
    untilNoOfOccurrences,
    checkInTime,
    selectedPetName,
    petReservationDetail,
    currentTenant,
    allSelectedWeek,
    frequency,
    submitting,
    error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()
  const history = useHistory()

  const _handleClose = () => {
    reset()
    props.resetItem()
    history.push({
      pathname: `/client/${clientId}`,
      state   : { option: 'reserves' }
    })
  }

  const groomerName = groomerDetail && groomerDetail.first_name + ' ' + groomerDetail.last_name
  let totalCost = 0

  const _handleSubmit = values => {
    values = parseFormValues(values)
    let serviceVariations = petReservationDetail.item.serviceVariations

    if(isUpdating)
      return props
        .put({ ...values, serviceVariations,
          petReservationDetail: petReservationDetail.item,
          currentTenant, serviceType         : props.serviceType, clientId, reservationDate     : props.reservationDate })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values, serviceVariations, currentTenant, serviceType: props.serviceType, clientId, reservationDate: props.reservationDate })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(petReservationDetail.item.id)

  return (
    <>
      <div className='div-progress-bar mv32'>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Service Information</span>
        </div>
        <div className='div-bar-line active'>
        </div>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Pet Information</span>
        </div>
        <div className='div-bar-line active'>
        </div>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Summary</span>
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>

        <Segment className='section-info-item'>
          <Header as='h3' className='section-info-header text-center'>Summary</Header>
          <Grid>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Segment style={{ height: '100%' }}>
                <div className='justify-between align-center'>
                  <div>
                    <Header as='h3'>
                   General Information
                    </Header>
                    <InputReadOnly
                      label='Pet'
                      value={`${selectedPetName}`}/>
                    <br/>
                    <Grid>
                      <Grid.Column computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Reservation Date'
                          value={`${ moment(startDate + ' ' + checkInTime).format('MM/DD/YYYY')}`}/>
                      </Grid.Column>
                      <Grid.Column  computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Groomer'
                          value={`${groomerName}`}/>
                      </Grid.Column>
                    </Grid>

                  </div>
                </div>
              </Segment>
            </Grid.Column >
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Segment  style={{ height: '100%' }}>
                <div className='flex justify-between align-center'>
                  <div className='w100'>
                    <Header as='h3'>
                   Reservation note
                    </Header>
                    <div className='mt16'>
                      <Field
                        component={FormField}
                        control={Form.TextArea}
                        label='Instructions'
                        name='comment'
                        placeholder='Enter instructions'/>
                    </div>
                  </div>
                </div>
              </Segment>
            </Grid.Column >
          </Grid>
        </Segment>
        <Segment>
          <Header as='h3'>Reservation Date</Header>
          <p><b>Starting From:</b> {moment(startDate).format('MM/DD/YYYY')} </p>
          {untilNoOfOccurrences
            ? <p><b>Number of Occurence:</b> {untilNoOfOccurrences}</p>
            : <p><b>Ending Date:</b> { moment(endDate).format('MM/DD/YYYY')} </p>
          }
          <p><b>Frequency:</b> {frequency == 'every_other_week' ? 'Every Other Week' : 'Every Week'}</p>
          <p><b>Days:</b> { allSelectedWeek.join(', ') }</p>
          <p><b>Selected Dates:</b> { props.selectedDate.join(', ') }</p>
        </Segment>
        <Segment>
          <Header as='h3' className='charges-heading'>Charges</Header>
          <List className='list-total-addons' divided verticalAlign='middle'>

            <List.Item>
              <List.Content floated='right'>
                {
                  petReservationDetail.item && petReservationDetail.item.serviceVariations && (
                    totalCost += Number(petReservationDetail.item.serviceVariations.price)
                  )
                }
              </List.Content>
              <List.Content>
                    Grooming
              </List.Content>
            </List.Item>

            {

              petReservationDetail.item.subServiceVariations && petReservationDetail.item.subServiceVariations.map((item,index)=>{
                totalCost += Number(item.price)

                return (

                  <List.Item key={index}>
                    <List.Content floated='right'>

                      {item.price}
                    </List.Content>
                    <List.Content>
                      {item.name}
                    </List.Content>

                  </List.Item>
                )
              })}

            <List.Item>
              <List.Content floated='right'>
                <List.Header as='a'>{totalCost}</List.Header>
              </List.Content>
              <List.Content>
                Total Cost
              </List.Content>
            </List.Item>
          </List>
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
          <Form.Field className='btnBack'>
            <Button
              basic
              className='w120'
              color='teal'
              content='Back'
              onClick={props.onPreviousStep}
              type='button'/>
          </Form.Field>
          <Form.Field>
            <Button
              className='w120'
              color='teal'
              content='Reserve!'
              disabled={submitting}
              loading={submitting}
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
      const check_in = formValueSelector(groomingFormId)(state, 'check_in')
      const check_in_time = formValueSelector(groomingFormId)(state, 'check_in_time')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPet = formValueSelector(groomingFormId)(state, 'pet')
      const groomer = formValueSelector(groomingFormId)(state, 'groomer')
      const check_out = formValueSelector(groomingFormId)(state, 'check_out')
      const selectedPetName = clientPet.items.find(_ => _.id == selectedPet) && clientPet.items.find(_ => _.id == selectedPet).name
      const employeeDetail = employeeDuck.selectors.list(state)
      const groomerDetail = employeeDetail.items && employeeDetail.items.find(_ => _.id == groomer)

      return {
        startDate           : check_in,
        endDate             : check_out,
        checkInTime         : check_in_time,
        untilNoOfOccurrences: formValueSelector(groomingFormId)(state,'until_no_of_occurrences'),
        clientPet,
        selectedPetName,
        groomerDetail,
        petReservationDetail,
        reservationDate     : [].concat(petReservationDetail.item.selectedDate),
        currentTenant       : authDuck.selectors.getCurrentTenant(auth),
        allSelectedWeek     : [].concat(petReservationDetail.item.allSelectedWeek),
        selectedDate        : [].concat(petReservationDetail.item.selectedDate).map((item) => moment(item).format('MM/DD/YYYY')),
        frequency           : petReservationDetail.item.frequency,
        initialValues       : petReservationDetail.item
      }
    },
    {
      resetItem: petReservationDetailDuck.creators.resetItem,
      post     : petReservationDetailDuck.creators.post,
      put      : petReservationDetailDuck.creators.put,
      setItem  : trainingMethodDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : groomingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(GroomingFormWizardThird)
