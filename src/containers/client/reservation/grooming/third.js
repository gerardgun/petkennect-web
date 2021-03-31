import React from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Grid, Header, Segment, List, Icon } from 'semantic-ui-react'

import moment from 'moment'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'
import { parseResponseError, parseFormValues } from '@lib/utils/functions'
import authDuck from '@reducers/auth'

import clientPetDuck from '@reducers/client/pet'
import employeeDuck from '@reducers/employee'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import trainingMethodDetailDuck from '@reducers/training-method/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'

import AddNote from './../notesSection/create'
import ViewNoteSection from './../notesSection/view'
import DatesSummary from '../dates-summary'
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
    addons,
    petReservationDetail,
    currentTenant,
    frequency,
    submitting,
    error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()
  const history = useHistory()

  const _handleAddNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'CREATE')
  }

  const _handleViewNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'READ')
  }

  const _handleClose = () => {
    reset()
    props.resetItem()
    history.push({
      pathname: `/client/${clientId}`,
      state   : { option: 'reserves' }
    })
  }

  const _handleCloseForUpdate = () => {
    reset()
    props.resetItem()
    history.push({
      pathname: `/pet/${petId}`,
      state   : { option: 'services' }
    })
  }
  const petId = petReservationDetail.item.pet && petReservationDetail.item.pet

  const groomerName = groomerDetail && groomerDetail.first_name + ' ' + groomerDetail.last_name
  let totalCost = 0
  const reccuringDays = props.selectedDate.length
  const _handleSubmit = values => {
    values = parseFormValues(values)
    let serviceVariations = petReservationDetail.item.serviceVariations

    if(isUpdating)
      return props
        .put({ ...values, serviceVariations,
          petReservationDetail: petReservationDetail.item,
          currentTenant, serviceType         : props.serviceType, clientId, reservationDate     : props.reservationDate })
        .then(_handleCloseForUpdate)
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
                    Reservation Notes
                    </Header>
                    {/* <div className='mt16'>
                      <Field
                        component={FormField}
                        control={Form.TextArea}
                        label='Comment'
                        name='comment'/>
                    </div> */}

                    <Form.Group className='form-modal-actions' widths='equal'>
                      <Form.Field className='btnBack'>
                        <Button
                          basic
                          className='w140'
                          color='teal'
                          onClick={_handleAddNoteBtnClick}
                          type='button'>
                          <Icon name='plus'/> Add Note
                        </Button>
                      </Form.Field>
                      {
                        isUpdating && (
                          <Form.Field>
                            <Button
                              basic
                              className='w120'
                              color='teal'
                              onClick={_handleViewNoteBtnClick}
                              type='button'> View Note
                            </Button>
                          </Form.Field>)
                      }
                    </Form.Group>

                  </div>
                </div>
              </Segment>
            </Grid.Column >
          </Grid>
          {
            !isUpdating && (
              <DatesSummary
                allSelectedWeek={props.allSelectedWeek} endDate={endDate} frequency={frequency}
                selectedDates={props.selectedDate.join(', ')} startDate={startDate} untilNoOfOccurrences={untilNoOfOccurrences}/>
            )
          }
          <Segment>
            <Header as='h3' className='charges-heading'>Estimate Charges</Header>
            <List className='list-total-addons' divided verticalAlign='middle'>
              <List.Item>
                <List.Content className='final-cost'>
                  <b>{selectedPetName}</b>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated='right'>
                ${
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
                addons && addons.length > 0 && (
                  <>
                    <List.Item>
                      <List.Content>
                        <Header as='h4'>Add Ons</Header>
                      </List.Content>
                    </List.Item>

                    {
                      addons && addons.map((item,index)=>{
                        totalCost += Number(item.price)

                        return (
                          <List.Item key={index}>
                            <List.Content floated='right'>
                      ${Number(item.price)}
                            </List.Content>
                            <List.Content>
                              {item.name}
                            </List.Content>
                          </List.Item>
                        )
                      })}
                  </>
                )
              }
              {
                !isUpdating && (
                  <>
                    <List.Item className='final-cost'>
                      <List.Content floated='right'>
                        <b>${ totalCost }</b>
                      </List.Content>
                      <List.Content>
                        <b>Total cost for one day</b>
                      </List.Content>
                    </List.Item>
                    <List.Item className='final-cost'>
                      <List.Content floated='right'>
                        <b>  {reccuringDays} * ${ totalCost }</b>
                      </List.Content>
                      <List.Content>
                        <b>Reccuring days cost</b>
                      </List.Content>
                    </List.Item>
                    <List.Item className='final-cost'>
                      <List.Content floated='right'>
                        <b>${reccuringDays * totalCost }</b>
                      </List.Content>
                      <List.Content>
                        <b>Total recurring cost</b>
                      </List.Content>
                    </List.Item>
                  </>)
              }
              {
                isUpdating && (
                  <List.Item className='final-cost'>
                    <List.Content floated='right'>
                      <b>${ totalCost }</b>
                    </List.Content>
                    <List.Content>
                      <b>Total Cost</b>
                    </List.Content>
                  </List.Item>
                ) }
            </List>
          </Segment>

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
      <AddNote/>
      <ViewNoteSection/>
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
      const addons = formValueSelector(groomingFormId)(state, 'grooming_service_list')

      return {
        addons,
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
      resetItem  : petReservationDetailDuck.creators.resetItem,
      post       : petReservationDetailDuck.creators.post,
      put        : petReservationDetailDuck.creators.put,
      setItem    : trainingMethodDetailDuck.creators.setItem,
      setNoteItem: petNoteDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : groomingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(GroomingFormWizardThird)
