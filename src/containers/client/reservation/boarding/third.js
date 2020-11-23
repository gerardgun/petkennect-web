import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { Button, Form, Grid, Header, Segment, Checkbox, List, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormError from '@components/Common/FormError'
import { parseResponseError, parseFormValues } from '@lib/utils/functions'

import moment from 'moment'

import authDuck from '@reducers/auth'
import serviceDuck from '@reducers/service'
import clientDetailDuck from '@reducers/client/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import { boardingFormId } from './first'

const BoardingFormWizardThird = props => {
  const {
    // eslint-disable-next-line no-unused-vars
    service,
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

    let services = []

    values.pet && values.pet.forEach(_pet => {
      services.push({
        service_variation     : '1',
        employee              : currentTenant.id,
        price                 : 10,
        reserved_at           : moment.utc(values.check_in , 'YYYY-MM-DD HH-mm:ss Z'),
        location              : values.location,
        pet                   : _pet,
        comment               : 'required field',
        belongings            : values.belongings,
        medication_name       : values.medication_name,
        medication_purpose    : values.medication_purpose,
        medication_instruction: values.medication_instruction,
        feeding               : values.feeding
      })
    })

    const paylord = {
      client  : values.id,
      employee: currentTenant.id,
      location: values.location,
      services: services
    }

    return props
      .post({ ...paylord })
      .then(_handleClose)
      .catch(parseResponseError)
  }

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
                    value='Lala,Poo'/>
                  <br/>
                  <Grid>
                    <Grid.Column  computer={8} mobile={16} tablet={10}>
                      <InputReadOnly
                        label='Check In'
                        value='28/12/12 3:12AM'/>
                    </Grid.Column>
                    <Grid.Column  computer={8} mobile={16} tablet={6}>
                      <InputReadOnly
                        label='By'
                        value='Sandra Maravilla'/>
                    </Grid.Column>
                  </Grid>
                  <Grid>
                    <Grid.Column computer={8} mobile={16} tablet={10}>
                      <InputReadOnly
                        label='Check Out'
                        value='28/12/12 3:12AM'/>
                    </Grid.Column>
                    <Grid.Column computer={8} mobile={16} tablet={6}>
                      <InputReadOnly
                        label='By'
                        value='Sandra Maravilla'/>
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
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        service,
        clientDetail,
        currentTenant: authDuck.selectors.getCurrentTenant(auth),
        initialValues: clientDetail.item
      }
    },
    {
      getServices: serviceDuck.creators.get,
      resetItem  : clientDetailDuck.creators.resetItem,
      post       : petReservationDetailDuck.creators.post
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardThird)
