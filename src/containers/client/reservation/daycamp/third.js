import React from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Grid, Header, Segment, Icon, List } from 'semantic-ui-react'
import { parseFormValues, parseResponseError } from '@lib/utils/functions'
import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'

import moment from 'moment'

import DatesSummary from '../dates-summary'
import AddReportCardForm from  './AddReportCardForm'

import ClientDocumentFormSendModal from '@containers/client/show/DocumentSection/form/send/modal'

import authDuck from '@reducers/auth'
import clientPetDuck from '@reducers/client/pet'
import clientDetailDuck from '@reducers/client/detail'
import clientDocumentDetailDuck from '@reducers/client/document/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import employeeDetailDuck from '@reducers/employee/detail'
import petReservationDaycampQuestionDetailDuck from '@reducers/pet/reservation/dacamp-question/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'

import AddNote from './../notesSection/create'
import ViewNoteSection from './../notesSection/view'

import { daycampFormId } from './first'

const DaycampFormWizardThird = props => {
  const {
    employeeName,
    startDate,
    endDate,
    untilNoOfOccurrences,
    checkInTime,
    selectedPetName,
    petReservationDetail,
    addons,
    clientPet,
    error,
    frequency,
    handleSubmit,
    submitting,
    currentTenant, reset // redux-form
  } = props

  let finalTotalCost = 0
  let totalCost = 0
  const reccuringDays = props.selectedDate.length

  const _handleAddNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'CREATE')
  }

  const _handleViewNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'READ')
  }

  const _handleAddReportCardBtnClick = () => {
    props.setItemDaycampQuesItem(null, 'CREATE')
  }

  const _handleEditReportCardBtnClick = () => {
    props.setItemDaycampQuesItem(null, 'UPDATE')
  }

  const _handleSendReportCardBtnClick = () =>{
    props.setDocumentItem('', 'SEND')
  }

  const { client: clientId } = useParams()
  const history = useHistory()

  const _handleClose = () => {
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

  const _handleSubmit = values => {
    values = parseFormValues(values)
    let serviceVariations = petReservationDetail.item.serviceVariations

    if(isUpdating)
      return props
        .put({ ...values, serviceVariations,  reservationDate     : props.reservationDate,
          petReservationDetail: petReservationDetail.item,
          currentTenant, serviceType         : props.serviceType, clientId })
        .then(_handleCloseForUpdate)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values, serviceVariations, reservationDate: props.reservationDate, currentTenant, serviceType: props.serviceType, clientId })
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
                      label='Pets'
                      value={`${selectedPetName}`}/>
                    <br/>
                    <Grid>
                      <Grid.Column  computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Check In'
                          value={`${ moment(startDate + ' ' + checkInTime).format('MM/DD/YYYY')}`}/>
                      </Grid.Column>
                      <Grid.Column  computer={8} mobile={16} tablet={6}>
                        <InputReadOnly
                          label='By'
                          value={`${employeeName}`}/>
                      </Grid.Column>
                    </Grid>

                  </div>
                </div>
              </Segment>
            </Grid.Column >
            <Grid.Column  computer={8} mobile={16} tablet={8}>
              <Segment style={{ height: '100%' }}>
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
                        name='comment'
                        placeholder='Enter Comment'
                        rows='4'/>
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
                selectedDates={props.selectedDate.join(', ')} startDate={startDate} untilNoOfOccurrences={untilNoOfOccurrences}/>)
          }
          {
            petReservationDetail.item.id && (
              <>
                <Segment>
                  <Header as='h3' className='section-info-header'>First Day Report Card</Header>
                  <Grid>
                    <Grid.Column width={16}>
                      <Button
                        basic
                        color='teal'
                        content='Add Report Card'
                        onClick={_handleAddReportCardBtnClick}
                        type='button'/>
                    </Grid.Column>
                    <Grid.Column width={16}>
                      <label>Report Card</label>
                      <Button
                        basic
                        className='ml16' icon onClick={_handleEditReportCardBtnClick}
                        type='button'>
                        <Icon name='edit outline'/>
                      </Button>
                      <Button
                        basic icon name='SendReport'
                        onClick={_handleSendReportCardBtnClick}  type='button'>
                        <Icon name='envelope outline'/>
                      </Button>

                      <Button basic icon>
                        <Icon color='red' name='trash alternate'/>
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Segment>

              </>
            )
          }

          <Segment>
            <Header as='h3'>Estimate Charges</Header>
            <List className='list-total-addons' divided verticalAlign='middle'>
              {
                petReservationDetail.item.serviceVariations && petReservationDetail.item.serviceVariations.map((item,index)=>{
                  totalCost = 0
                  totalCost += Number(item.price)
                  finalTotalCost += Number(item.price)

                  addons && addons.map((_item)=>{
                    let frequency = _item.subVariation.find(_ => _.petId == item.petId)
                    && _item.subVariation.find(_ => _.petId == item.petId).frequency

                    let addOnPrice = _item.subVariation.find(_ => _.petId == item.petId)
                     && _item.subVariation.find(_ => _.petId == item.petId).price

                    totalCost += (Number(addOnPrice) * Number(frequency))
                  })

                  return (
                    <>
                      <List.Item key={index}>
                        <List.Content className='final-cost' floated='right'>
                          <b>{totalCost}</b>
                        </List.Content>
                        <List.Content className='final-cost'>
                          <b>{clientPet.items && clientPet.items.find(_ => _.id == item.petId).name}</b>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content floated='right'>
                      ${Number(item.price)}
                        </List.Content>
                        <List.Content>
                          Boarding
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
                              addons && addons.map((_item,index)=>{
                                let frequency = _item.subVariation.find(_ => _.petId == item.petId)
                                && _item.subVariation.find(_ => _.petId == item.petId).frequency

                                let addOnPrice = _item.subVariation.find(_ => _.petId == item.petId)
                                 && _item.subVariation.find(_ => _.petId == item.petId).price

                                finalTotalCost += Number(addOnPrice) * Number(frequency)

                                return (
                                  <>
                                    <List.Item key={index}>
                                      <List.Content floated='right'>
                                      ${ frequency * addOnPrice }
                                      </List.Content>
                                      <List.Content>
                                        {_item.name}
                                      </List.Content>
                                    </List.Item>
                                  </>
                                )
                              })}
                          </>
                        )
                      }
                      <List.Item>
                        <List.Content floated='right'>
                      $0
                        </List.Content>
                        <List.Content>
                          <b>Kennel</b>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content floated='right'>
                      $0
                        </List.Content>
                        <List.Content>
                          <b>Activity Package</b>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content floated='right'>
                      $0
                        </List.Content>
                        <List.Content>
                          <b>Client Discount</b>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content >
                        </List.Content>
                        <List.Content floated='right' >
                        </List.Content>
                      </List.Item>
                      {/* <List.Item>
                        <List.Content floated='right'>
                       &nbsp;
                        </List.Content>
                      </List.Item> */}
                    </>
                  )
                })}
              {
                !isUpdating && (
                  <>
                    <List.Item className='final-cost'>
                      <List.Content floated='right'>
                        <b>${ finalTotalCost }</b>
                      </List.Content>
                      <List.Content>
                        <b>Total Cost for 1 Day</b>
                      </List.Content>
                    </List.Item>
                    <List.Item className='final-cost'>
                      <List.Content floated='right'>
                        <b>  {reccuringDays} * ${ finalTotalCost }</b>
                      </List.Content>
                      <List.Content>
                        <b>Reccuring Days Cost</b>
                      </List.Content>
                    </List.Item>
                    <List.Item className='final-cost'>
                      <List.Content floated='right'>
                        <b>${reccuringDays * finalTotalCost }</b>
                      </List.Content>
                      <List.Content>
                        <b>Total Recurring Cost</b>
                      </List.Content>
                    </List.Item>
                  </>)
              }
              {
                isUpdating && (
                  <List.Item className='final-cost'>
                    <List.Content floated='right'>
                      <b>${ finalTotalCost }</b>
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
              disabled={submitting}
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
      <ClientDocumentFormSendModal/>
      <AddReportCardForm/>
      <AddNote/>
      <ViewNoteSection/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth, service, ...state }) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const selectedPets = formValueSelector(daycampFormId)(state, 'pet')
      const check_in = formValueSelector(daycampFormId)(state, 'check_in')
      const check_out = formValueSelector(daycampFormId)(state, 'check_out')
      const check_in_time = formValueSelector(daycampFormId)(state, 'check_in_time')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPetName = selectedPets && selectedPets.map((item)=> {
        let petDetail = clientPet.items.find(_ => _.id == item)

        return (
          petDetail.name
        )
      }).join(', ')
      const employeeDetail = employeeDetailDuck.selectors.detail(state)
      const employeeName = employeeDetail.item && employeeDetail.item.first_name + ' ' + employeeDetail.item.last_name
      const addons = formValueSelector(daycampFormId)(state, 'daycamp_reservation_list')

      return {
        employeeName,
        startDate           : check_in,
        endDate             : check_out,
        checkInTime         : check_in_time,
        untilNoOfOccurrences: formValueSelector(daycampFormId)(state,'until_no_of_occurrences'),
        reservationDate     : [].concat(petReservationDetail.item.selectedDate),
        selectedDate        : [].concat(petReservationDetail.item.selectedDate).map((item) => moment(item).format('MM/DD/YYYY')),
        selectedPetName,
        addons,
        clientPet,
        petReservationDetail,
        services            : service,
        clientDetail,
        allSelectedWeek     : [].concat(petReservationDetail.item.allSelectedWeek),
        frequency           : petReservationDetail.item.frequency,
        clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state),
        initialValues       : { ...petReservationDetail.item },
        currentTenant       : authDuck.selectors.getCurrentTenant(auth)
      }
    },
    {
      resetItem             : petReservationDetailDuck.creators.resetItem,
      setItem               : petReservationDetailDuck.creators.setItem,
      setDocumentItem       : clientDocumentDetailDuck.creators.setItem,
      setItemDaycampQuesItem: petReservationDaycampQuestionDetailDuck.creators.setItem,
      post                  : petReservationDetailDuck.creators.post,
      put                   : petReservationDetailDuck.creators.put,
      setNoteItem           : petNoteDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : daycampFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(DaycampFormWizardThird)
