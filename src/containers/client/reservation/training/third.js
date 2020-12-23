/* eslint-disable no-unused-vars */
import React, { useEffect }  from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Checkbox, Grid, Header, Segment, List, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import { parseResponseError, parseFormValues } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import serviceDuck from '@reducers/service'
import clientPetDuck from '@reducers/client/pet'
import employeeDetailDuck from '@reducers/employee/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import { trainingFormId } from './first'

const TrainingFormWizardThird = props => {
  const {
    employeeName,
    check_in,
    selectedPetName,
    petReservationDetail,
    currentTenant,
    services, error, handleSubmit, reset // redux-form
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

  // eslint-disable-next-line no-unused-vars
  const _handleSubmit = values => {
    values = parseFormValues(values)
    const currentServiceType = services.items.find(({ type }) => type === props.serviceType)
    // eslint-disable-next-line no-unused-vars
    let serviceVariation = currentServiceType && currentServiceType.variations.length > 0 && currentServiceType.variations[0]
    // if(isUpdating)
    // return props
    //   .put({ ...values, serviceVariation,
    //     petReservationDetail: petReservationDetail.item,
    //     currentTenant, serviceType         : props.serviceType, clientId })
    //   .then(_handleClose)
    //   .catch(parseResponseError)
    // else
    // return props
    //   .post({ ...values, serviceVariation, currentTenant, serviceType: props.serviceType, clientId })
    //   .then(_handleClose)
    //   .catch(parseResponseError)
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
                      <Grid.Column computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Reservation Date'
                          value={`${check_in}`}/>
                      </Grid.Column>
                      <Grid.Column  computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Groomer'
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
          <Grid>
            <Grid.Column computer={16} mobile={16} tablet={16}>
              <Header as='h3'>
                   Email Section
              </Header>
              <Form.Group>
                <Field
                  component={FormField}
                  control={Checkbox}
                  label='Training Agreement Only'
                  name='training_agreement_only'
                  type='checkbox'/>
                <Field
                  component={FormField}
                  control={Checkbox}
                  label='Training Agreement + Client Forms'
                  name='training_agreement_client_forms'
                  type='checkbox'/>
                <Form.Field/>
                <Form.Field/>
              </Form.Group>
              <Form.Group>
                <Field
                  component={FormField}
                  control={Checkbox}
                  label='Follow-up and Feedback'
                  name='follow_up_and_feedback'
                  type='checkbox'/>
                <Field
                  component={FormField}
                  control={Checkbox}
                  label='Follow up emailed on'
                  name='follow_up_emailed_on'
                  type='checkbox'/>
                <Form.Field/>
                <Form.Field/>
              </Form.Group>
            </Grid.Column >
          </Grid>
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
      const check_in = formValueSelector(trainingFormId)(state, 'check_in')
      const appointment_time = formValueSelector(trainingFormId)(state, 'appointment_time')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPet = formValueSelector(trainingFormId)(state, 'pet')
      const selectedPetName = clientPet.items.find(_ => _.id == selectedPet) && clientPet.items.find(_ => _.id == selectedPet).name
      const employeeDetail = employeeDetailDuck.selectors.detail(state)
      const employeeName = employeeDetail.item && employeeDetail.item.first_name + ' ' + employeeDetail.item.last_name

      return {
        check_in     : check_in + ' ' + appointment_time,
        selectedPetName,
        employeeName,
        petReservationDetail,
        services     : service,
        currentTenant: authDuck.selectors.getCurrentTenant(auth),
        initialValues: petReservationDetail.item
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
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(TrainingFormWizardThird)
