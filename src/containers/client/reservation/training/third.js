import React  from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'

import moment from 'moment'
import loadable from '@loadable/component'
import { parseResponseError, parseFormValues } from '@lib/utils/functions'

import DatesSummary from '../dates-summary'

import authDuck from '@reducers/auth'
import clientPetDuck from '@reducers/client/pet'
import employeeDetailDuck from '@reducers/employee/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'

import { trainingFormId } from './first'

const AddNote = loadable(() => import('./../notesSection/create'))
const  ViewNoteSection = loadable(() => import('./../notesSection/view'))

const TrainingFormWizardThird = props => {
  const {
    petReservationDetail,
    employeeName,
    startDate,
    endDate,
    untilNoOfOccurrences,
    selectedPetName,
    checkInTime,
    frequency,
    submitting,
    currentTenant, error, handleSubmit, reset // redux-form
  } = props
  console.log(petReservationDetail)
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

  const _handleSubmit = values => {
    values = parseFormValues(values)
    let serviceVariations = petReservationDetail.item.serviceVariations
    if(isUpdating)
      return props
        .put({ ...values, serviceVariations, reservationDate     : props.reservationDate,
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
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-line'>
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
                      <Grid.Column computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Reservation Date'
                          value={`${ moment(startDate + ' ' + checkInTime).format('MM/DD/YYYY')}`}/>
                      </Grid.Column>
                      <Grid.Column  computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Trainer'
                          value={`${employeeName}`}/>
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
                      <label>Comment</label>
                      <Form.Group widths='equal'>
                        <Field
                          component={FormField}
                          control={TextArea}
                          name='comment'
                          selectOnBlur={false}/>
                      </Form.Group>
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
              className='w120 button-margin'
              color='teal'
              content='Reserve!'
              disabled={submitting}
              loading={submitting}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
      <AddNote/>
      <ViewNoteSection/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth, service, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const startDate = formValueSelector(trainingFormId)(state, 'check_in')
      const endDate = formValueSelector(trainingFormId)(state, 'check_out')
      const checkInTime = formValueSelector(trainingFormId)(state, 'check_in_time')
      const allWeekDays = formValueSelector(trainingFormId)(state, 'all_week_days')
      const onlyWeekEnd = formValueSelector(trainingFormId)(state, 'only_week_end')
      const untilNoOfOccurrences = formValueSelector(trainingFormId)(state,'until_no_of_occurrences')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPets = formValueSelector(trainingFormId)(state, 'pet')
      const selectedPetName = selectedPets && selectedPets.filter(_=>_ != undefined).map((item)=> {
        let petDetail = clientPet.items.find(_ => _.id == item)

        return (
          petDetail.name
        )
      }).join(', ')
      const employeeDetail = employeeDetailDuck.selectors.detail(state)
      const employeeName = employeeDetail.item && employeeDetail.item.first_name + ' ' + employeeDetail.item.last_name

      return {
        checkInTime,
        allWeekDays,
        onlyWeekEnd,
        startDate      : startDate,
        endDate        : endDate,
        untilNoOfOccurrences,
        selectedPetName,
        employeeName,
        petReservationDetail,
        services       : service,
        reservationDate: [].concat(petReservationDetail.item.selectedDate),
        allSelectedWeek: [].concat(petReservationDetail.item.allSelectedWeek),
        selectedDate   : [].concat(petReservationDetail.item.selectedDate).map((item) => moment(item).format('MM/DD/YYYY')),
        frequency      : petReservationDetail.item.frequency,
        currentTenant  : authDuck.selectors.getCurrentTenant(auth),
        initialValues  : { ...petReservationDetail.item,  location: auth.location }
      }
    },
    {
      resetItem  : petReservationDetailDuck.creators.resetItem,
      post       : petReservationDetailDuck.creators.post,
      put        : petReservationDetailDuck.creators.put,
      setNoteItem: petNoteDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(TrainingFormWizardThird)
