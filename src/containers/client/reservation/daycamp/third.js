import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'
import { parseResponseError, parseFormValues } from '@lib/utils/functions'

import AddReportCardForm from  './AddReportCardForm'
import ClientDocumentFormSendModal from '@containers/client/show/DocumentSection/form/send/modal'

import authDuck from '@reducers/auth'
import serviceDuck from '@reducers/service'
import clientPetDuck from '@reducers/client/pet'
import clientDetailDuck from '@reducers/client/detail'
import clientDocumentDetailDuck from '@reducers/client/document/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import employeeDetailDuck from '@reducers/employee/detail'
import petReservationDaycampQuestionDetailDuck from '@reducers/pet/reservation/dacamp-question/detail'

import { daycampFormId } from './first'

const DaycampFormWizardThird = props => {
  const {
    employeeName,
    check_in,
    check_out,
    selectedPetName,
    services,
    petReservationDetail,
    error,
    handleSubmit,
    currentTenant, reset // redux-form
  } = props

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

  useEffect(() => {
    props.getServices()
  }, [])

  const _handleClose = () => {
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
                </div>
              </Segment>
            </Grid.Column >
            <Grid.Column  computer={8} mobile={16} tablet={8}>
              <Segment>
                <div className='flex justify-between align-center'>
                  <div className='w100'>
                    <Header as='h3'>
                   Reservation Note
                    </Header>
                    <div className='mt16'>
                      <label>Note</label>
                      <textarea className='w100' name='specialpickup' rows='5'></textarea>
                    </div>
                  </div>
                </div>
              </Segment>
            </Grid.Column >
          </Grid>
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
      <ClientDocumentFormSendModal/>
      <AddReportCardForm/>
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
      const arriving_time = formValueSelector(daycampFormId)(state, 'arriving_time')
      const departing_time = formValueSelector(daycampFormId)(state, 'departing_time')
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
        check_in            : check_in + ' ' + arriving_time,
        check_out           : check_out + ' ' + departing_time ,
        selectedPetName,
        petReservationDetail,
        services            : service,
        clientDetail,
        currentTenant       : authDuck.selectors.getCurrentTenant(auth),
        clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state),
        initialValues       : petReservationDetail.item
      }
    },
    {
      getServices           : serviceDuck.creators.get,
      resetItem             : petReservationDetailDuck.creators.resetItem,
      setItem               : petReservationDetailDuck.creators.setItem,
      setDocumentItem       : clientDocumentDetailDuck.creators.setItem,
      setItemDaycampQuesItem: petReservationDaycampQuestionDetailDuck.creators.setItem,
      post                  : petReservationDetailDuck.creators.post,
      put                   : petReservationDetailDuck.creators.put
    }
  ),
  reduxForm({
    form                    : daycampFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(DaycampFormWizardThird)
