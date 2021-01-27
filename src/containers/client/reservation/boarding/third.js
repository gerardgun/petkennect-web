import React from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector, Field } from 'redux-form'
import { Button, Form, Grid, Header, Segment, List, Icon, Checkbox } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import { parseResponseError, parseFormValues } from '@lib/utils/functions'

import moment from 'moment'

import authDuck from '@reducers/auth'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import employeeDetailDuck from '@reducers/employee/detail'
import clientPetDuck from '@reducers/client/pet'
import trainingMethodDetailDuck from '@reducers/training-method/detail'
import EmailCreateForm from './email/email-create'
import EmailAlert from './email/email-alert'
import { boardingFormId } from './first'

const BoardingFormWizardThird = props => {
  const {
    employeeName,
    startDate,
    checkInTime,
    endDate,
    checkOutTime,
    petReservationDetail,
    addons,
    clientPet,
    selectedPetName,
    currentTenant,
    submitting,
    error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()

  let totalCost = 0
  let finalTotalCost = 0
  let selectedStartDate = new Date(startDate)
  let selectedEndDate = new Date(endDate)
  let difference_in_time = selectedEndDate.getTime() - selectedStartDate.getTime()
  let difference_in_days = difference_in_time / (1000 * 3600 * 24)

  const _handleClose = () => {
    reset()
    props.resetItem()
    props.setItemEmail({ clientId: clientId } , 'READ')

    // history.push({
    //   pathname: `/client/${clientId}`,
    //   state   : { option: 'reserves' }
    // })
  }
  const _handleSubmit = values => {
    values = parseFormValues(values)
    let serviceVariations = petReservationDetail.item.serviceVariations
    if(isUpdating)
      return props
        .put({ ...values, serviceVariations,
          petReservationDetail: petReservationDetail.item,
          currentTenant, serviceType         : props.serviceType, clientId })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values, serviceVariations, currentTenant, serviceType: props.serviceType, clientId })
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
          <Header as='h3' className='section-info-header'>Summary</Header>
          <Grid>
            <Grid.Column  computer={8} mobile={16} tablet={8}>
              <Segment style={{ height: '100%' }}>
                <div className='justify-between align-center'>
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
                  <Grid>
                    <Grid.Column computer={8} mobile={16} tablet={10}>
                      <InputReadOnly
                        label='Check Out'
                        value={`${moment(endDate + ' ' + checkOutTime).format('MM/DD/YYYY')}`}/>
                    </Grid.Column>
                    <Grid.Column computer={8} mobile={16} tablet={6}>
                      <InputReadOnly
                        label='By'
                        value={`${employeeName}`}/>
                    </Grid.Column>
                  </Grid>
                </div>
              </Segment>
            </Grid.Column >
            <Grid.Column  computer={8} mobile={16} tablet={8}>
              <Segment>
                <div className='flex justify-between align-center'>
                  <div className='w100'>
                    <Header as='h3'>
                   Charges
                    </Header>
                    <Grid>
                      <Grid.Column width={5}>
                        <InputReadOnly
                          label='Off peak nights'
                          value='56'/>
                        <br/>
                      </Grid.Column >
                      <Grid.Column width={5}>
                        <InputReadOnly
                          label='Pick nights'
                          value='5'/>
                      </Grid.Column >
                      <Grid.Column width={6}>
                        <InputReadOnly
                          label='Total night'
                          value={difference_in_days}/>
                      </Grid.Column >
                    </Grid>
                    <Form.Group widths='equal'>
                      <Field
                        className='charge-card-check'
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        label='Charge card on file'
                        name='charge_card_on_file'
                        type='checkbox'/>
                    </Form.Group>
                    <div className='mt16'>
                      <Field
                        component={FormField}
                        control={Form.TextArea}
                        label='Comment'
                        name='comment'
                        placeholder='Enter Comment'/>
                    </div>
                  </div>
                </div>
              </Segment>
            </Grid.Column >
          </Grid>

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
                      <List.Item className='final-cost' key={index}>
                        <List.Content floated='right'>
                          <b>{totalCost}</b>
                        </List.Content>
                        <List.Content>
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
                                <Header as='h3'>Add Ons</Header>
                              </List.Content>
                            </List.Item>
                            {
                              addons && addons.map((_item,index)=>{
                                let addOnPrice = _item.subVariation.find(_ => _.petId == item.petId)
                                 && _item.subVariation.find(_ => _.petId == item.petId).price

                                let frequency = _item.subVariation.find(_ => _.petId == item.petId)
                                 && _item.subVariation.find(_ => _.petId == item.petId).frequency

                                finalTotalCost += Number(addOnPrice)  * Number(frequency)

                                return (
                                  <>
                                    <List.Item key={index}>
                                      <List.Content floated='right'>
                                      ${ addOnPrice * Number(frequency)}
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
                        <List.Content floated='right'>

                        </List.Content>
                      </List.Item>
                    </>
                  )
                })}
              <List.Item className='final-cost'>
                <List.Content floated='right'>
                  <b>${ finalTotalCost }</b>
                </List.Content>
                <List.Content>
                  <b>Total Cost</b>
                </List.Content>
              </List.Item>
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
      <EmailAlert/>
      <EmailCreateForm/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      const check_in = formValueSelector(boardingFormId)(state, 'check_in')
      const check_in_time = formValueSelector(boardingFormId)(state, 'check_in_time')
      const check_out = formValueSelector(boardingFormId)(state, 'check_out')
      const check_out_time = formValueSelector(boardingFormId)(state, 'check_out_time')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPetName = selectedPets && selectedPets.map((item)=> {
        let petDetail = clientPet.items.find(_ => _.id == item)

        return (
          petDetail.name
        )
      }).join(', ')
      const employeeDetail = employeeDetailDuck.selectors.detail(state)
      const employeeName = employeeDetail.item && employeeDetail.item.first_name + ' ' + employeeDetail.item.last_name
      const addons = formValueSelector(boardingFormId)(state, 'boarding_reservation_list')

      return {
        employeeName,
        addons,
        petReservationDetail,
        selectedPets,
        clientPet,
        selectedPetName,
        startDate    : check_in,
        checkInTime  : check_in_time,
        endDate      : check_out,
        checkOutTime : check_out_time,
        initialValues: { ...petReservationDetail.item },
        currentTenant: authDuck.selectors.getCurrentTenant(auth)
      }
    },
    {
      resetItem   : petReservationDetailDuck.creators.resetItem,
      post        : petReservationDetailDuck.creators.post,
      put         : petReservationDetailDuck.creators.put,
      setItemEmail: trainingMethodDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardThird)
