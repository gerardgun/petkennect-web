import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Grid, Header, Segment, Checkbox, List, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'
import { parseResponseError, parseFormValues } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import serviceDuck from '@reducers/service'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import employeeDetailDuck from '@reducers/employee/detail'
import clientPetDuck from '@reducers/client/pet'

import { boardingFormId } from './first'

const BoardingFormWizardThird = props => {
  const {
    employeeName,
    check_in,
    check_out,
    petReservationDetail,
    selectedPetName,
    services,
    currentTenant,
    error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getServices()
  }, [])

  const _handleClose = () => {
    reset()
    props.resetItem()
    history.push(`/client/${clientId}`)
  }

  const _handleSubmit = values => {
    values = parseFormValues(values)
    const currentServiceType = services.items.find(({ type }) => type === props.serviceType)
    let serviceVariation = currentServiceType && currentServiceType.variations.length > 0 && currentServiceType.variations[0]
    if(isUpdating)
      return props
        .put({ ...values, serviceVariation,
          petReservationDetail: petReservationDetail.item,
          currentTenant, serviceType         : props.serviceType, clientId })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values, serviceVariation, currentTenant, serviceType: props.serviceType, clientId })
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
                        value={`${check_in}`}/>
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
                        value={`${check_out}`}/>
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
                          label='Off peach nights'
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
                          value='61'/>
                      </Grid.Column >
                    </Grid>
                    <Checkbox label='Special Pick Up'/>
                    <div className='mt16'>
                      <label>Special Pick Up Information</label>
                      <textarea className='w100' name='specialpickup' rows='5'></textarea>
                    </div>
                  </div>
                </div>
              </Segment>
            </Grid.Column >
          </Grid>
        </Segment>
        <Segment>
          <Header as='h3'>Add Ons</Header>
          <List className='list-total-addons' divided verticalAlign='middle'>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
                Kennel
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
               Activity Package
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <b>Add Ons</b>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
                Name
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                $34
              </List.Content>
              <List.Content>
               Name
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
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      const check_in = formValueSelector(boardingFormId)(state, 'check_in')
      const check_out = formValueSelector(boardingFormId)(state, 'check_out')
      const arriving_time = formValueSelector(boardingFormId)(state, 'arriving_time')
      const departing_time = formValueSelector(boardingFormId)(state, 'departing_time')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPetName = selectedPets && selectedPets.map((item)=> {
        let petDetail = clientPet.items.find(_ => _.id == item)

        return (
          petDetail.name
        )
      }).join(', ')
      const employeeDetail = employeeDetailDuck.selectors.detail(state)
      const employeeName = employeeDetail.item && employeeDetail.item.first_name + ' ' + employeeDetail.item.last_name

      return {
        employeeName,
        check_in     : check_in + ' ' + arriving_time,
        check_out    : check_out + ' ' + departing_time ,
        services     : service,
        petReservationDetail,
        selectedPets,
        selectedPetName,
        initialValues: { ...petReservationDetail.item },
        currentTenant: authDuck.selectors.getCurrentTenant(auth)
      }
    },
    {
      getServices: serviceDuck.creators.get,
      resetItem  : petReservationDetailDuck.creators.resetItem,
      post       : petReservationDetailDuck.creators.post,
      put        : petReservationDetailDuck.creators.put
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardThird)
