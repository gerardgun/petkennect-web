/* eslint-disable no-unused-vars */
import React  from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Grid, Header, Segment, List, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'

import FormError from '@components/Common/FormError'

import { parseResponseError, parseFormValues } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import clientPetDuck from '@reducers/client/pet'
import employeeDetailDuck from '@reducers/employee/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import { trainingFormId } from './first'

// function SelectedReservationDateList({ startDate,endDate, selectedWeek, untilNoOfOccurrences, checkInTime }) {
//   let arrDate = [ ]
//   let dfEndDate = new Date(endDate)

//   if(untilNoOfOccurrences) {
//     dfEndDate = new Date(startDate)
//     dfEndDate = new Date(dfEndDate.setDate((dfEndDate.getDate() + (7 * untilNoOfOccurrences))))
//   }

//   let weekCount = 0
//   for (let d = new Date(startDate); d <=  dfEndDate; d.setDate(d.getDate() + 1)) {
//     if(d.getDay() % 7 == 0)
//       weekCount = weekCount + 1

//     if(selectedWeek.includes('' + d.getDay() + ''))
//       arrDate.push(moment(d).format('MM/DD/YYYY'))
//   }

//   return arrDate.map((dateItem,i) =>{
//     return  (
//       <>
//         <List.Item>
//           <List.Content>
//             { dateItem }  {checkInTime}
//           </List.Content>
//         </List.Item>
//       </>
//     )
//   })
// }

const TrainingFormWizardThird = props => {
  const {
    petReservationDetail,
    employeeName,
    startDate,
    endDate,
    untilNoOfOccurrences,
    selectedPetName,
    checkInTime,
    currentTenant,
    services, error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()
  const history = useHistory()

  const _handleClose = () => {
    reset()
    props.resetItem()
    history.push(`/client/${clientId}`)
  }

  // eslint-disable-next-line no-unused-vars
  const _handleSubmit = values => {
    values = parseFormValues(values)
    const currentServiceType = services.items.find(({ type }) => type === props.serviceType)
    // eslint-disable-next-line no-unused-vars
    let serviceVariation = currentServiceType && currentServiceType.variations.length > 0 && currentServiceType.variations[0]

    // if(isUpdating)
    //   return props
    //     .put({ ...values, serviceVariation,
    //       petReservationDetail: petReservationDetail.item,
    //       currentTenant, serviceType         : props.serviceType, clientId })
    //     .then(_handleClose)
    //     .catch(parseResponseError)
    // else
    //   return props
    //     .post({ ...values, serviceVariation, currentTenant, serviceType: props.serviceType, clientId })
    //     .then(_handleClose)
    //     .catch(parseResponseError)
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
          <Header as='h3' className='section-info-header text-center'>Training Package1 Summary</Header>
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
                          value={`${startDate + ' ' + checkInTime}`}/>
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
                   Reservation note
                    </Header>
                    <div className='mt16'>
                      <label>Contract Comments</label>
                      <textarea className='w100' name='contract_comment' rows='5'></textarea>
                    </div>
                  </div>
                </div>
              </Segment>
            </Grid.Column >
          </Grid>
        </Segment>
        <Segment>
          <Header as='h3'>Reservation Date</Header>
          <p>{props.allSelectedWeek.join(', ')} starting {startDate} Ending after {untilNoOfOccurrences ? <>{untilNoOfOccurrences} occurrences</> : endDate}</p>
        </Segment>
        <Segment>
          <Header as='h3'>Charges</Header>
          <List className='list-total-addons' divided verticalAlign='middle'>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
              Lorem Ipsum
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
              Lorem Ipsum
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
              Lorem Ipsum
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
              Lorem Ipsum
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                <List.Header as='a'>Total $155</List.Header>
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
    ({ auth, service, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const startDate = formValueSelector(trainingFormId)(state, 'start_date')
      const endDate = formValueSelector(trainingFormId)(state, 'end_date')
      const checkInTime = formValueSelector(trainingFormId)(state, 'check_in_time')
      const allWeekDays = formValueSelector(trainingFormId)(state, 'all_week_days')
      const onlyWeekEnd = formValueSelector(trainingFormId)(state, 'only_week_end')
      const untilNoOfOccurrences = formValueSelector(trainingFormId)(state,'until_no_of_occurrences')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPet = formValueSelector(trainingFormId)(state, 'pet')
      const selectedPetName = clientPet.items.find(_ => _.id == selectedPet) && clientPet.items.find(_ => _.id == selectedPet).name
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
        allSelectedWeek: [].concat(petReservationDetail.item.allSelectedWeek),
        currentTenant  : authDuck.selectors.getCurrentTenant(auth),
        initialValues  : { ...petReservationDetail.item,  location: auth.location }
      }
    },
    {
      resetItem: petReservationDetailDuck.creators.resetItem,
      post     : petReservationDetailDuck.creators.post,
      put      : petReservationDetailDuck.creators.put
    }
  ),
  reduxForm({
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(TrainingFormWizardThird)
