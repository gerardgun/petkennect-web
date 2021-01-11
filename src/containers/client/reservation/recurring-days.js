import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field } from 'redux-form'
import { Button, Form, Header, Icon, Accordion, Input, Checkbox, Grid, Segment } from 'semantic-ui-react'
import DayPicker, { DateUtils } from 'react-day-picker'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import 'react-day-picker/lib/style.css'
import './styles.scss'

const RecurringDaysForm = ({ serviceType, ...props }) => {
  const {
    petReservationDetail,
    error, handleSubmit, reset
  } = props

  const [ frequency, setFrequency ] = useState('every_week')
  const [ startDate, setStartDate ] = useState(new Date())
  const [ endDate, setEndDate ] = useState(new Date())
  const [ untilNoOfOccurrences, setUntilNoOfOccurrences ] = useState(1)
  const [ allSelectedWeek, setAllSelectedWeek ] = useState([])
  const [ selectedDates, setSelectedDates ] = useState([])
  const [ activeIndex, setActiveIndex ] = useState(1)

  useEffect(() => {
    // if only endDate fill
    let dfEndDate = new Date(endDate)

    // for frequency
    let weekValue = 0
    if(frequency === 'every_other_week')
      weekValue = 2
    else
      weekValue = 1

    // if until no of occurrences
    if(untilNoOfOccurrences > 0) {
      dfEndDate = new Date(startDate)
      dfEndDate = new Date(dfEndDate.setDate((dfEndDate.getDate() + ((7 * untilNoOfOccurrences * weekValue) - 1))))
    }
    else {
      dfEndDate = new Date(dfEndDate.setDate((dfEndDate.getDate() *  weekValue)))
    }

    let weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
    let reservationDateArr = []
    let weekCount = 1
    let cycleCount = 0
    let startDateDay = (new Date(startDate)).getDay()

    for (let d = new Date(startDate); d <=  dfEndDate; d.setDate(d.getDate() + 1)) {
      let currentDay = d.getDay()

      if(cycleCount == 0) {
        if(currentDay == startDateDay)
          cycleCount++
      }
      else
      if(currentDay + 1 == 2)
      {weekCount++}

      // for if isEveryOtherWeek is Clicked
      let isEveryOtherWeek = true
      if(weekValue == 2 && weekCount % 2 == 0)
        isEveryOtherWeek = false

      if(allSelectedWeek.includes('' + weekday[currentDay] + '') && isEveryOtherWeek)
        reservationDateArr.push(new Date(d))
    }
    setSelectedDates([].concat(reservationDateArr))

    props.setItem({ ...petReservationDetail.item, selectedDate: reservationDateArr, frequency, allSelectedWeek, untilNoOfOccurrences })
  },[ frequency, allSelectedWeek, startDate, endDate, untilNoOfOccurrences  ])

  useEffect(() => {
    if(petReservationDetail.item.selectedDate) {
      setSelectedDates([].concat(petReservationDetail.item.selectedDate))
      setFrequency(petReservationDetail.item.frequency)
      setAllSelectedWeek([].concat(petReservationDetail.item.allSelectedWeek))
    }
  }, [])

  const _handleStartDateChange = (value) =>{
    setStartDate(new Date(value))
  }

  const _handleEndDateChange = (value) =>{
    setEndDate(new Date(value))
    setUntilNoOfOccurrences(0)
  }

  const _handleUntilNoChange = (value) =>{
    setUntilNoOfOccurrences(value)
  }

  const _handleAllWeekDayChange = (value) =>{
    let selectedDays =  [].concat(allSelectedWeek)
    let weekDays = [ 'Monday', 'Tuesday','Wednesday','Thursday','Friday' ]
    let remainingDays = selectedDays.filter(value => !weekDays.includes(value))
    if(value)
      remainingDays.push('Monday', 'Tuesday','Wednesday','Thursday','Friday')
    setAllSelectedWeek([].concat(remainingDays))
  }

  const _handleOnlyWeekEndChange = (value) =>{
    let selectedDays = [].concat(allSelectedWeek)
    let weekEndDays = [ 'Saturday','Sunday' ]
    let remainingDays = selectedDays.filter(value => !weekEndDays.includes(value))
    if(value)
      remainingDays.push('Saturday','Sunday')
    setAllSelectedWeek([].concat(remainingDays))
  }

  const _handleFrequencyClick = (e ,{ name }) =>{
    setFrequency(name)
  }

  const _handleWeekDayClick = (e ,{ name }) =>{
    let allItem = [].concat(allSelectedWeek)
    const index = allItem.indexOf(name)
    if(index > -1)
      allItem.splice(index, 1)
    else
      allItem.push(name)

    setAllSelectedWeek([].concat(allItem))
  }

  const _handleDayClick = (day, { selected }) => {
    let selectedDays = [].concat(selectedDates)

    if(selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(selectedIndex, 1)
    } else {
      selectedDays.push(day)
    }
    setSelectedDates(selectedDays)
  }

  const  _handleSelectRecurringDaysClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
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
              onChange={_handleStartDateChange}
              requied
              type='date'/>
            <Field
              component={FormField}
              control={Input}
              label='Check In Time'
              name='check_in_time'
              required
              type='time'/>
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
          </Form.Group>

          <Header as='h3' className='mb0'>
          Select Recurring Days
          </Header>

          <Form.Group style={{ marginTop: '-1rem' }}>
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
                  onChange={_handleEndDateChange}
                  type='date'/>
                <span className='custom_or'>OR</span>
                <Field
                  className='w_input_set'
                  component={FormField}
                  control={Input}
                  name='until_no_of_occurrences'
                  onChange={_handleUntilNoChange}
                  type='number'/>
              </Form.Group>
            </Grid.Column>
          </Grid>

          <Accordion styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={_handleSelectRecurringDaysClick}>
              <Header as='h3' className='mb0'>
              Manually Add Additional Dates
                <Icon name='dropdown'/>
              </Header>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <div>
                <DayPicker
                  disabledDays={
                    [
                      { before: startDate }
                    ]
                  }
                  onDayClick={_handleDayClick}
                  selectedDays={selectedDates}/>
              </div>
            </Accordion.Content>
          </Accordion>
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
