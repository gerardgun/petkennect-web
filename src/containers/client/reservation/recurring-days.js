import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field } from 'redux-form'
import { Button, Form, Header, Input, Checkbox, Grid, Segment } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import './styles.scss'

const RecurringDaysForm = ({ serviceType, ...props }) => {
  const {
    petReservationDetail,
    error, handleSubmit, reset
  } = props

  const [ frequency, setFrequency ] = useState('every_week')
  const [ allSelectedWeek, setAllSelectedWeek ] = useState([])

  useEffect(() => {
    if(petReservationDetail.item.allSelectedWeek !== undefined) {
      var defaultValue = petReservationDetail.item.allSelectedWeek
      setAllSelectedWeek([].concat(defaultValue))
    }
    if(petReservationDetail.item.frequency !== undefined) {
      var defaultWeekValue = petReservationDetail.item.frequency
      setFrequency(defaultWeekValue)
    }
  }, [])

  const _handleAllWeekDayChange = (value) =>{
    let selectedDays = allSelectedWeek
    let days = []
    if(value === true)
    {
      var toRemove = [ 'Monday', 'Tuesday','Wednesday','Thursday','Friday' ]
      var weekDays = selectedDays.filter(value => !toRemove.includes(value))
      weekDays.push('Monday', 'Tuesday','Wednesday','Thursday','Friday')
      setAllSelectedWeek([].concat(weekDays))
      days = [].concat(weekDays)
    }
    else
    {
      var remove = [ 'Monday', 'Tuesday','Wednesday','Thursday','Friday' ]
      var remainingDays = selectedDays.filter(value => !remove.includes(value))
      setAllSelectedWeek([].concat(remainingDays))
      days = [].concat(remainingDays)
    }
    props.setItem({ ...petReservationDetail.item, allSelectedWeek: days })
  }

  const _handleOnlyWeekEndChange = (value) =>{
    let selectedDays = allSelectedWeek
    let days = []
    if(value === true)
    {
      var toRemove = [ 'Saturday','Sunday' ]
      var weekDays = selectedDays.filter(value => !toRemove.includes(value))
      weekDays.push('Saturday','Sunday')
      setAllSelectedWeek([].concat(weekDays))
      days = [].concat(weekDays)
    }
    else
    {
      var remove = [ 'Saturday','Sunday' ]
      var remainingDays = selectedDays.filter(value => !remove.includes(value))
      setAllSelectedWeek([].concat(remainingDays))
      days = [].concat(remainingDays)
    }

    props.setItem({ ...petReservationDetail.item, allSelectedWeek: days })
  }
  const _handleFrequencyClick = (e ,{ name }) =>{
    setFrequency(name)
    props.setItem({ ...petReservationDetail.item, frequency: name })
  }

  const _handleWeekDayClick = (e ,{ name }) =>{
    let allItem = allSelectedWeek
    const index = allItem.indexOf(name)
    if(index > -1)
      allItem.splice(index, 1)
    else
      allItem.push(name)

    setAllSelectedWeek([].concat(allItem))

    props.setItem({ ...petReservationDetail.item, allSelectedWeek })
  }

  return (
    <>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <Segment className='recurring_date_div section-info-item-step1'>
          <Header as='h3'>
        Select Dates
          </Header>

          <Form.Group computer={3} mobile={16} tablet={2}>
            <Field
              component={FormField}
              control={Input}
              label='Start Date'
              name='check_in'
              requied
              type='date'/>
            <Field
              component={FormField}
              control={Input}
              label='Check In Time'
              name='check_in_time'
              required
              type='time'/>
          </Form.Group>
          <Header as='h3' className='mb0'>
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
              active={allSelectedWeek.includes('Monday')} name='Monday' onClick={_handleWeekDayClick}
              type='button'>Monday</Button>
            <Button
              active={allSelectedWeek.includes('Tuesday')} name='Tuesday' onClick={_handleWeekDayClick}
              type='button'>Tuesday</Button>
            <Button
              active={allSelectedWeek.includes('Wednesday')} name='Wednesday' onClick={_handleWeekDayClick}
              type='button'>Wednesday</Button>
            <Button
              active={allSelectedWeek.includes('Thursday')} name='Thursday' onClick={_handleWeekDayClick}
              type='button'>Thursday</Button>
            <Button
              active={allSelectedWeek.includes('Friday')} name='Friday' onClick={_handleWeekDayClick}
              type='button'>Friday</Button>
            <Button
              active={allSelectedWeek.includes('Saturday')} name='Saturday' onClick={_handleWeekDayClick}
              type='button'>Saturday</Button>
            <Button
              active={allSelectedWeek.includes('Sunday')} name='Sunday' onClick={_handleWeekDayClick}
              type='button'>Sunday</Button>
          </Button.Group>
          <Grid className='mt8'>
            <Grid.Column
              className='grid_width_100' computer={6} mobile={16}
              tablet={16}>
              <Header as='h3'>
              Frequency
              </Header>
              <Button.Group className='week_btn_group'>
                <Button
                  active={frequency === 'every_week'} name='every_week' onClick={_handleFrequencyClick}
                  type='button'>Every Week</Button>
                <Button
                  active={frequency === 'every_other_week'} name='every_other_week' onClick={_handleFrequencyClick}
                  type='button'>Every Other Week</Button>
              </Button.Group>

            </Grid.Column>
            <Grid.Column
              className='grid_custom_input grid_width_100'
              computer={6} mobile={16} tablet={16}>
              <label>Ending: Date/ Number of occurrences</label>
              <Form.Group
                className='mt0_8' computer={16} mobile={16}
                tablet={16}>
                <Field
                  component={FormField}
                  control={Input}
                  name='check_out'
                  type='date'/>
                <span className='custom_or'>OR</span>
                <Field
                  className='w_input_set'
                  component={FormField}
                  control={Input}
                  name='until_no_of_occurrences'
                  type='number'/>
              </Form.Group>
            </Grid.Column>
            <Grid.Column
              className='grid_custom_checkout'
              computer={4} mobile={8} tablet={8}>
              {
                (serviceType != 'G' && serviceType != 'T') && (
                  <Field
                    component={FormField}
                    control={Input}
                    label='Check Out Time'
                    name='check_out_time'
                    required
                    type='time'/>
                )
              }
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
      </Form>
    </>
  )
}

RecurringDaysForm.propTypes = {
}

RecurringDaysForm.defaultProps = { }

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)

      return {
        petReservationDetail,
        initialValues: { ...petReservationDetail.item }
      }
    },
    {
      setItem: petReservationDetailDuck.creators.setItem
    }
  )
)(RecurringDaysForm)
