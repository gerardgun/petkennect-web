import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Grid, Select, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import moment  from 'moment'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'

import './styles.scss'

export const trainingFormId = 'training-reservation-form'

const ClassesVisitsList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddClassBtnClick = () => fields.push({ type: 'class' })

  const _handleAddVisitBtnClick = () => fields.push({ type: 'visit' })

  const _handleAddProgramBtnClick = () => fields.push({ type: 'program' })

  const _handleDeleteQuestionBtnClick = (e, { index }) =>{
    fields.remove(index)
  }

  return (
    <>
      <div className='mh16 mb16 flex align-center justify-center'>
        <Button
          color='teal'
          content='Add Program'
          icon='plus'
          onClick={_handleAddProgramBtnClick}
          type='button'/>

        <Button
          color='teal'
          content='Add Class'
          icon='plus'
          onClick={_handleAddClassBtnClick}
          type='button'/>

        <Button
          color='teal'
          content='Add Visit'
          icon='plus'
          onClick={_handleAddVisitBtnClick}
          type='button'/>
      </div>
      {
        fields.length > 0 && (
          <Header as='h3' className='section-info-header text-center'>When will this event be?</Header>
        )
      }
      {
        fields.map((item, index) => {
          return (
            <Grid columns={2} key={index}  >
              {
                fields.get(index).type == 'class' && (
                  <>
                    <Grid.Column  computer={14} mobile={10}>
                      <Form.Group widths='equal'>
                        <Field
                          component={FormField}
                          control={Input}
                          label='Evel  Date'
                          name={`${index}_evel_date`}
                          required
                          type='date'/>
                        <Field
                          component={FormField}
                          control={Input}
                          label='Starting Date'
                          name={`${index}_starting_date`}
                          required
                          type='date'/>
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column
                      className='flex align-center flex_imp' computer={2} mobile={6}
                      tablet={1}>
                      <Button
                        basic
                        color='red'
                        data-index={index} icon='trash alternate outline'
                        index={`${index}`}
                        onClick={_handleDeleteQuestionBtnClick}
                        type='button'/>
                    </Grid.Column>
                  </>
                )
              }

              {
                fields.get(index).type == 'visit' && (
                  <>
                    <Grid.Column  computer={14} mobile={10}>
                      <Form.Group widths='equal'>
                        <Field
                          component={FormField}
                          control={Input}
                          label='Visit  Date'
                          name={`${index}_visit_date`}
                          required
                          type='date'/>
                        <Field
                          component={FormField}
                          control={Input}
                          label='Check In Time'
                          name={`${index}_check_in_time`}
                          required
                          type='time'/>
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column
                      className='flex align-center flex_imp' computer={2} mobile={6}
                      tablet={1}>
                      <Button
                        basic
                        color='red'
                        data-index={index} icon='trash alternate outline'
                        index={`${index}`}
                        onClick={_handleDeleteQuestionBtnClick}
                        type='button'/>
                    </Grid.Column>
                  </>
                )
              }

              {
                fields.get(index).type == 'program' && (
                  <>
                    <Grid.Column  computer={14} mobile={10}>
                      <Field
                        component={FormField}
                        control={Select}
                        label='Training'
                        name='reason_for_training'
                        options={[ {
                          key  : 1,
                          value: 'Day Train',
                          text : 'Day Train'
                        }, {
                          key  : 2,
                          value: 'Group Class',
                          text : 'Group Class'
                        } ,
                        {
                          key  : 2,
                          value: 'Private Lession',
                          text : 'Private Lession'
                        }  ]}/>
                    </Grid.Column>
                    <Grid.Column
                      className='flex align-center flex_imp' computer={2} mobile={6}
                      tablet={1}>
                      <Button
                        basic
                        className='mt8'
                        color='red'
                        data-index={index} icon='trash alternate outline'
                        index={`${index}`}
                        onClick={_handleDeleteQuestionBtnClick}
                        type='button'/>
                    </Grid.Column>
                  </>
                )
              }
            </Grid>
          )
        })
      }

      {
        submitFailed && error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )
      }
    </>
  )
}

const TrainingFormWizardFirst = props => {
  const {
    clientPet,
    location,
    error, handleSubmit, reset
  } = props

  return (
    <>
      <div className='div-progress-bar '>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Service Information</span>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-content'>
          <Icon name='check circle'/>
          <span>Pet Information</span>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-content'>
          <Icon name='check circle'/>
          <span>Summary</span>
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={trainingFormId} onReset={reset} onSubmit={handleSubmit}>

        <Segment className='section-info-item-step1'>
          <Header as='h3' className='section-info-header'>Select location and pet</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Location'
              name='location'
              options={location.items.map(_location =>
                ({ key: _location.id, value: _location.id, text: `${_location.code}` }))
              }
              placeholder='Location'
              required
              selectOnBlur={false}/>
            <Field
              closeOnChange
              component={FormField}
              control={Dropdown}
              fluid
              label='Pet'
              name='pet'
              options={[ ...clientPet.items ].map((_clientPet) => ({
                key  : _clientPet.id,
                value: _clientPet.id,
                text : `${_clientPet.name}`
              }))}
              placeholder='Search pet'
              required
              selection
              selectOnBlur={false}/>
          </Form.Group>
        </Segment>
        <Segment className='section-info-item-step1'>
          <FieldArray
            component={ClassesVisitsList}
            name='classes_visits'
            title='Classes Visits'/>
        </Segment>

        <Segment className='recurring_date_div'>
          <Header as='h3'>
        Select Dates
          </Header>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Start Date'
              name='start_date'
              type='date'/>
            <Field
              component={FormField}
              control={Input}
              label='End Date'
              name='end_date'
              type='date'/>
          </Form.Group>
          <Header as='h3'>
          Select Recurring Dates
          </Header>
          <Button.Group basic>
            <Button  color='blue'>Sunday</Button>
            <Button  color='blue'>Monday</Button>
            <Button color='blue'>Tuesday</Button>
            <Button  color='blue'>Wednesday</Button>
            <Button>Thursday</Button>
            <Button>Friday</Button>
            <Button>Saturday</Button>
          </Button.Group>
          <Grid className='mt8'>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Header as='h3'>
              Frequency
              </Header>
              <Button.Group basic>
                <Button  color='blue'>Every Week</Button>
                <Button>Every Other Weeek</Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Header as='h3'>
              Custom # of Weeks
              </Header>
              <Field
                component={FormField}
                control={Input}
                label=''
                name='no_of_weeks'
                placeholder=''/>
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Header as='h3'>
              Ending
              </Header>
              <Field
                component={FormField}
                control={Input}
                label=''
                name='ending'
                placeholder=''
                type='date'/>
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <Header as='h3'>
              Until # of Occurrences
              </Header>
              <Field
                component={FormField}
                control={Input}
                label=''
                name='number_of_date_to_add'
                placeholder=''/>
            </Grid.Column>
          </Grid>
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
          <Form.Field>
            <Button
              className='w120'
              color='teal'
              content='Next'
              onClick={props.onNextStep}
              type='button'/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const defaultInitialValues = petReservationDetail.item.id ? {
        check_in: petReservationDetail.item.reserved_at ? moment(petReservationDetail.item.reserved_at,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD') : '',
        pet     : [ petReservationDetail.item.pet ]
      } : {}

      return {
        initialValues: { ...petReservationDetail.item, ...defaultInitialValues },
        location     : locationDuck.selectors.list(state),
        clientPet    : clientPetDuck.selectors.list(state)
      }
    }
  ),
  reduxForm({
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        location       : Yup.mixed().required('Location is required'),
        pet            : Yup.mixed().required('Pet is required'),
        reservation_day: Yup
          .date()
          .required('Reservation day is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TrainingFormWizardFirst)
