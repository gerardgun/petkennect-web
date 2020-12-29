import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Checkbox, Grid, Select, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import locationDuck from '@reducers/location'
import clientPetDuck from '@reducers/client/pet'

import './styles.scss'

export const trainingFormId = 'training-reservation-form'

const TrainingFormWizardFirst = props => {
  const {
    clientPet,
    location,
    error, handleSubmit, reset
  } = props

  const [ allWeekDays, setAllWeekDays ] = useState(false)
  const [ allWeekEnd, setAllWeekEnd ] = useState(false)
  const [ allSelectedWeek, setAllSelectedWeek ] = useState([ '1', '2' ])

  const _handleAllWeekDayChange = (value) =>{
    setAllWeekDays(value)
  }

  const _handleOnlyWeekEndChange = (value) =>{
    setAllWeekEnd(value)
  }

  const _handleWeekDayClick = (e ,{ name }) =>{
    let allItem = allSelectedWeek
    const index = allItem.indexOf(name)
    if(index > -1)
      allItem.splice(index, 1)
    else
      allItem.push(name)

    setAllSelectedWeek([].concat(allItem))
  }

  return (
    <>
      <div className='div-progress-bar div-training-main'>
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
          <Header as='h3' className='section-info-header'>Select  Package Details</Header>
          <Grid>
            <Grid.Column computer={16}>
              <Form.Group widths='2'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Select Package'
                  name='package'
                  options={[
                    { key: 1, value: 'Package1', text: 'Package1' }
                  ]}
                  placeholder='Select Package'
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Price'
                  name='price'
                  selectOnBlur={false}
                  type='number'/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Description'
                  name='package_description'
                  placeholder='package description'
                  readOnly/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Reason for training'

                  name='reason'
                  options={[
                    { key: 1, value: 1, text: 'Reason 1' },
                    { key: 2, value: 2, text: 'Reason 2' },
                    { key: 3, value: 3, text: 'Reason 3' },
                    { key: 4, value: 4, text: 'Reason 4' }
                  ]}
                  placeholder='Select Reason'
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Select}
                  label='Select Trainer'

                  name='trainer'
                  options={[
                    { key: 1, value: 1, text: 'Trainer 1' },
                    { key: 2, value: 2, text: 'Trainer 2' },
                    { key: 3, value: 3, text: 'Trainer 3' },
                    { key: 4, value: 4, text: 'Trainer 4' }
                  ]}
                  placeholder='Select Trainer'
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Select}
                  label='Method'
                  name='method'
                  options={[
                    { key: 1, value: 1, text: 'method 1' },
                    { key: 2, value: 2, text: 'method 2' }

                  ]}
                  placeholder='Select Method'
                  selectOnBlur={false}/>
              </Form.Group>
            </Grid.Column>

          </Grid>

        </Segment>

        <Segment className='recurring_date_div section-info-item-step1'>
          <Header as='h3'>
        Select Dates
          </Header>

          <Form.Group widths={3}>
            <Field
              component={FormField}
              control={Input}
              label='Start Date'
              name='start_date'
              type='date'/>
            <Field
              component={FormField}
              control={Input}
              label='Check In Time'
              name='check_in_time'
              required
              type='time'/>
          </Form.Group>
          <Header as='h3'>
          Select Recurring Days
          </Header>
          <Form.Group className='form_group_label0'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Week Days'
              name='all_week_days'
              onChange={_handleAllWeekDayChange}/>
            <Field
              component={FormField}
              control={Checkbox}
              label='Weekend'
              name='only_week_end'
              onChange={_handleOnlyWeekEndChange}/>
          </Form.Group>
          <Button.Group className='week_btn_group'>
            <Button
              active={allWeekDays || allSelectedWeek.includes('1')} name='1' onClick={_handleWeekDayClick}
              type='button'>Monday</Button>
            <Button
              active={allWeekDays || allSelectedWeek.includes('2')} name='2' onClick={_handleWeekDayClick}
              type='button'>Tuesday</Button>
            <Button
              active={allWeekDays || allSelectedWeek.includes('3')} name='3' onClick={_handleWeekDayClick}
              type='button'>Wednesday</Button>
            <Button
              active={allWeekDays || allSelectedWeek.includes('4')} name='4' onClick={_handleWeekDayClick}
              type='button'>Thursday</Button>
            <Button
              active={allWeekDays || allSelectedWeek.includes('5')} name='5' onClick={_handleWeekDayClick}
              type='button'>Friday</Button>
            <Button
              active={allWeekEnd || allSelectedWeek.includes('6')} name='6' onClick={_handleWeekDayClick}
              type='button'>Saturday</Button>
            <Button
              active={allWeekEnd || allSelectedWeek.includes('7')} name='7' onClick={_handleWeekDayClick}
              type='button'>Sunday</Button>
          </Button.Group>
          <Grid className='mt8'>
            <Grid.Column computer={16} mobile={16} tablet={16}>
              <Header as='h3'>
              Frequency
              </Header>
              <Button.Group className='week_btn_group'>
                <Button
                  active={allSelectedWeek.includes('every_week')} name='every_week' onClick={_handleWeekDayClick}
                  type='button'>Every Week</Button>
                <Button
                  active={allSelectedWeek.includes('every_other_week')} name='every_other_week' onClick={_handleWeekDayClick}
                  type='button'>Every Other Week</Button>
              </Button.Group>

            </Grid.Column>
            {/* <Grid.Column
              className='grid_custom_input' computer={8}
              mobile={16} tablet={16}>
              <span>Custom - Repeat After # of Weeks</span>
              <Field
                className='w_input_set'
                component={FormField}
                control={Input}
                name='custom_after_no_of_weeks'
                type='number'/>
            </Grid.Column> */}
            <Grid.Column width={16}>
              <label className='custom_label'>Ending: Date/ Number of occurrences </label>
              <Form.Group computer={4} mobile={16} tablet={16}>
                <Field
                  component={FormField}
                  control={Input}
                  name='end_date'
                  type='date'/>
                <span className='custom_or'>OR</span>
                <Field
                  component={FormField}
                  control={Input}
                  name='until_no_of_occurrences'
                  type='number'/>
              </Form.Group>
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
              onClick={props.onNextStep(allSelectedWeek)}
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

      return {
        initialValues: { ...petReservationDetail.item },
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
        location: Yup.mixed().required('Location is required'),
        pet     : Yup.mixed().required('Pet is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TrainingFormWizardFirst)
