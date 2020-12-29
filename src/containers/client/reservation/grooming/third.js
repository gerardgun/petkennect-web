import React, { useEffect }  from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector,Field } from 'redux-form'
import { Button, Form, Grid, Header, Segment, List, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'
import { parseResponseError, parseFormValues } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'
import authDuck from '@reducers/auth'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import clientPetDuck from '@reducers/client/pet'
import employeeDuck from '@reducers/employee'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import AlertModal from './alert-modal'
import { groomingFormId } from './first'

const GroomingFormWizardThird = props => {
  const {
    groomerDetail,
    check_in,
    clientPet,
    selectedPetName,
    petReservationDetail,
    currentTenant,
    services,
    serviceAttribute, error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getServices({ type: 'G' })
    props.getServiceAttributes()
  }, [])

  const _handleClose = () => {
    reset()
    props.resetItem()
    history.push(`/client/${clientId}`)
  }

  const groomerName = groomerDetail && groomerDetail.first_name + ' ' + groomerDetail.last_name

  const _handleSubmit = values => {
    values = parseFormValues(values)
    const location = values.location
    const petSize = clientPet.items.find(pet => pet.id === values.pet).size

    const locationId = serviceAttribute.items && serviceAttribute.items.find(_location => _location.type === 'L')
      .values.find(_location => _location.value == location).id
    const petSizeId = serviceAttribute.items && serviceAttribute.items.find(_petSize => _petSize.type === 'S')
      .values.find(_petSize => _petSize.value == petSize).id

    const variation = services.items[0].variations

    let variationId
    for (let item of variation) {
      let locationExist = item.attributes.find(_id => _id.service_attribute_value_id == locationId)
      let petSizeExist = item.attributes.find(_id => _id.service_attribute_value_id == petSizeId)

      if(locationExist != null && petSizeExist != null)
      {
        variationId = locationExist.service_variation_id
        break
      }
    }

    if(variationId == null)
      props.setItem(null, 'READ')

    let serviceVariation = variation.find(_ => _.id == variationId)
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
                          value={`${check_in}`}/>
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
      <AlertModal/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth, service, ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const check_in = formValueSelector(groomingFormId)(state, 'check_in')
      const appointment_time = formValueSelector(groomingFormId)(state, 'appointment_time')
      const clientPet = clientPetDuck.selectors.list(state)
      const selectedPet = formValueSelector(groomingFormId)(state, 'pet')
      const groomer = formValueSelector(groomingFormId)(state, 'groomer')
      const selectedPetName = clientPet.items.find(_ => _.id == selectedPet) && clientPet.items.find(_ => _.id == selectedPet).name
      const employeeDetail = employeeDuck.selectors.list(state)
      const groomerDetail = employeeDetail.items && employeeDetail.items.find(_ => _.id == groomer)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)

      return {
        check_in     : check_in + ' ' + appointment_time,
        clientPet,
        selectedPetName,
        groomerDetail,
        petReservationDetail,
        services     : service,
        serviceAttribute,
        currentTenant: authDuck.selectors.getCurrentTenant(auth),
        initialValues: petReservationDetail.item
      }
    },
    {
      getServices         : serviceDuck.creators.get,
      getServiceAttributes: serviceAttributeDuck.creators.get,
      resetItem           : petReservationDetailDuck.creators.resetItem,
      post                : petReservationDetailDuck.creators.post,
      put                 : petReservationDetailDuck.creators.put,
      setItem             : petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : groomingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(GroomingFormWizardThird)
