import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field } from 'redux-form'
import { Button, Form, Header, Label, Icon, Accordion, Input, Checkbox, Grid, Segment, Confirm } from 'semantic-ui-react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { monthDiff, DayNth, weekAndDay } from '@lib/utils/functions'
import { PeekDaysAndFullDays } from '@lib/constants/pet'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import moment from 'moment'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import 'react-day-picker/lib/style.css'
import './styles.scss'

const RecurringDaysForm = ({ ...props }) => {
  const {
    petReservationDetail,
    error, handleSubmit, reset
  } = props

  const [ frequency, setFrequency ] = useState('every_week')
  const [ startDate, setStartDate ] = useState('')
  const [ calendarDates, setCalendarDates ] = useState({ endDate: new Date(), numberOfMonths: 1 })
  const [ monthlyRadio, setMonthlyRadio ] = useState({ first: '', second: '' })
  const [ endDate, setEndDate ] = useState(new Date())
  const [ endByAfter, setEndByAfter ] = useState('end_by')
  const [ untilNoOfOccurrences, setUntilNoOfOccurrences ] = useState(1)
  const [ customWeekNumber, setCustomWeekNumber ] = useState(1)
  const [ allSelectedWeek, setAllSelectedWeek ] = useState([])
  const [ selectedDates, setSelectedDates ] = useState([])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ selectedMonthly, setSelectedMonthly ] = useState('monthly_date')
  const [ overridePopupOpen, setOverridePopupOpen ] = useState(false)
  const [ PeekAndFullDay, setPeekAndFullDay ] = useState({ peekday: [], fullDay: [] })

  const weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

  useEffect(() => {
    if(petReservationDetail.item.selectedDate) {
      setSelectedDates(petReservationDetail.item.selectedDate)
      setFrequency(petReservationDetail.item.frequency)
      setAllSelectedWeek(petReservationDetail.item.allSelectedWeek)
      setEndByAfter(petReservationDetail.item.endByAfter)
      setUntilNoOfOccurrences(petReservationDetail.item.untilNoOfOccurrences)
      setSelectedMonthly(petReservationDetail.item.selectedMonthly)
      setCalendarDates(petReservationDetail.item.calendarDates)
      setStartDate(petReservationDetail.item.startDate)
      setEndDate(petReservationDetail.item.endDate)
    }
    setPeekAndFullDay(PeekDaysAndFullDays)
  }, [])

  useEffect(() => {
    if(startDate !== '') {
    // if only endDate fill
      let dfEndDate = new Date(endDate)

      // for frequency
      let weekValue = 1
      if(frequency === 'every_other_week')
        weekValue = 2
      else if(frequency === 'every_custom_week')
        weekValue = customWeekNumber
      else if(frequency === 'monthly')
        weekValue = 4

      // if until no of occurrences
      if(endByAfter === 'end_after' && untilNoOfOccurrences > 0) {
        dfEndDate = new Date(startDate)
        dfEndDate = new Date(dfEndDate.setDate((dfEndDate.getDate() + (((7 * untilNoOfOccurrences * weekValue) - 1)))))
      }
      else if(endByAfter === 'no_end_date') {
        dfEndDate = new Date(dfEndDate.setMonth((dfEndDate.getMonth() + 12)))
      }

      let reservationDateArr = []
      let cycleCount = 0
      let startDateDay = (new Date(startDate)).getDay()
      let nextDate = new Date(startDate)
      let nextDateStart = new Date(startDate)
      let nextDateEnd = new Date(startDate)
      nextDateEnd = new Date(nextDateEnd.setDate((nextDateEnd.getDate() + (7 - startDateDay))))
      let isWeekChange = false

      for (let d = new Date(startDate); d <=  dfEndDate; d.setDate(d.getDate() + 1)) {
        let currentDay = d.getDay()
        if(cycleCount == 0) {
          if(currentDay == startDateDay)
            cycleCount++
        }
        else
        if(currentDay + 1 == 2) {
          isWeekChange = true
        }

        if(frequency === 'every_week') {
          if(allSelectedWeek.includes('' + weekday[currentDay] + ''))
            reservationDateArr.push(new Date(d))
        }
        else if(frequency === 'monthly') {
          if(selectedMonthly === 'monthly_day') {
            if(d.getDay() === (new Date(startDate)).getDay()) {
              let currentDayCount = Math.floor(d.getDate() / 7)
              let startDayCount =  Math.floor(startDate.getDate() / 7)
              if(currentDayCount === startDayCount)
                reservationDateArr.push(new Date(d))
            }
          } else
          if(d.getDate() === (new Date(startDate)).getDate()) {
            reservationDateArr.push(new Date(d))
          }
        }
        else
        {
          if(nextDateEnd <= d && isWeekChange) {
            nextDate = new Date(nextDate.setDate((nextDate.getDate() + (7 * (weekValue - 1)))))
            nextDateStart = new Date(d)
            nextDateStart = new Date(nextDateStart.setDate((nextDateStart.getDate() + (7 * (weekValue - 1)))))
            nextDateEnd = new Date(nextDateStart)
            nextDateEnd = new Date(nextDateEnd.setDate((nextDateEnd.getDate() + 7)))
          }
          if(d >= nextDateStart && d <= nextDateEnd)
            if(allSelectedWeek.includes('' + weekday[currentDay] + ''))
              reservationDateArr.push(new Date(d))
        }
      }

      for (let date of PeekAndFullDay.fullDay) {
        let fullDayExists = reservationDateArr.find(_ => moment(_).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY'))
        if(fullDayExists) {
          setOverridePopupOpen(true)
          break
        }
      }
      setSelectedDates(reservationDateArr)
      setCalendarDates({ endDate: dfEndDate, numberOfMonths: monthDiff(startDate, dfEndDate) })
      props.setItem({ ...petReservationDetail.item, selectedDate: reservationDateArr,
        frequency, allSelectedWeek, startDate, untilNoOfOccurrences, endByAfter, calendarDates, selectedMonthly, endDate })
    }
  },[ frequency, allSelectedWeek, startDate, endDate, untilNoOfOccurrences, customWeekNumber, endByAfter, selectedMonthly ])

  useEffect(() => {
    if(frequency === 'monthly')
      setMonthlyRadio({ first: 'Monthly on the ' + DayNth((new Date(startDate)).getDate()) + ' day', second: 'Monthly on ' + weekAndDay(new Date(startDate)) })
  }, [ startDate, frequency ])

  const _handleStartDateChange = (value) =>{
    setStartDate(new Date(value))
    let currentDay = (new Date(value)).getDay()
    setAllSelectedWeek(weekday[currentDay])
  }

  const _handleEndDateChange = (value) =>{
    setEndDate(new Date(value))
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
    setAllSelectedWeek(remainingDays)
  }

  const _handleOnlyWeekEndChange = (value) =>{
    let selectedDays = [].concat(allSelectedWeek)
    let weekEndDays = [ 'Saturday','Sunday' ]
    let remainingDays = selectedDays.filter(value => !weekEndDays.includes(value))
    if(value)
      remainingDays.push('Saturday','Sunday')
    setAllSelectedWeek(remainingDays)
  }

  const _handleFrequencyClick = (e, value) =>{
    if(value === 'every_custom_week')
      setCustomWeekNumber(1)
    else
      setCustomWeekNumber('')
    setFrequency(value)
  }

  const _handleCustomWeekChange = (e, { value }) =>{
    setCustomWeekNumber(value)
  }

  const _handleEndByAfterChange = (e , value) =>{
    setEndByAfter(value)
  }

  const _handleMonthlyRadioChange = (e, value) =>{
    setSelectedMonthly(value)
  }

  const _handleWeekDayClick = (e ,{ name }) =>{
    let allItem = [].concat(allSelectedWeek)
    const index = allItem.indexOf(name)
    if(index > -1)
      allItem.splice(index, 1)
    else
      allItem.push(name)

    setAllSelectedWeek(allItem)
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

    for (let date of PeekAndFullDay.fullDay) {
      let fullDayExists = selectedDays.find(_ => moment(_).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY'))
      if(fullDayExists) {
        setOverridePopupOpen(true)
        break
      }
    }

    setSelectedDates(selectedDays)
    props.setItem({ ...petReservationDetail.item, selectedDate: selectedDays })
  }

  const  _handleSelectRecurringDaysClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const _handleCancelOverride = () => {
    setOverridePopupOpen(false)
    let selectedDays = [].concat(selectedDates)

    for (let date of PeekAndFullDay.fullDay) {
      let fullDayExists = selectedDays.find(_ => moment(_).format('MM/DD/YYYY') == moment(date).format('MM/DD/YYYY'))
      if(fullDayExists) {
        const index = selectedDays.indexOf(fullDayExists)
        if(index > -1)
          selectedDays.splice(index, 1)
      }
    }

    setSelectedDates(selectedDays)
    props.setItem({ ...petReservationDetail.item, selectedDate: selectedDays })
  }

  const _handleConfirmOverride = () =>{
    setOverridePopupOpen(false)
    setPeekAndFullDay({ peekday: PeekAndFullDay.peekday, fullDay: [] })
  }

  return (
    <>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <Segment className='recurring_date_div section-info-item-step1' style={{ marginTop: '1rem !important' }}>
          <Grid className='mt8'>
            <Grid.Column
              className='pt0 pb0' computer={7} mobile={16}
              tablet={16}>
              <div className='div_align_center'>
                <label  className='wc8'>Start Date</label>
                <Field
                  className='ml8'
                  component={FormField}
                  control={Input}
                  name='check_in'
                  onChange={_handleStartDateChange}
                  type='date'/>
              </div>
            </Grid.Column>
            <Grid.Column
              className='pt0'  computer={9} mobile={16}
              tablet={16}>
              <div className='div_align_center'>
                <label className='wc9'>Check In Time</label>
                <Field
                  component={FormField}
                  control={Input}
                  name='check_in_time'
                  type='time'/>
              </div>
            </Grid.Column>
            <Grid.Column
              className='pt0' width={16}>
              <Header as='h3' className='mt0'>
          Add Recurring Reservations
              </Header>
            </Grid.Column>
            <Grid.Column
              className='grid_border_right pv0'  computer={4} mobile={16}
              tablet={16}>
              <p className='mb0'><b>Recurring:</b></p>
              <Form.Group className='div_align_center mh0'>
                <Field
                  component='input'
                  name='frequency'
                  onChange={_handleFrequencyClick}
                  type='radio' value='every_week'/>
                <label className='mh4'> Every Week</label>
              </Form.Group>
              <Form.Group className='div_align_center mh0'>
                <Field
                  component='input' name='frequency'
                  onChange={_handleFrequencyClick}
                  type='radio' value='every_other_week'/>
                <label className='mh4'> Every Other Week</label>
              </Form.Group>
              <Form.Group className='div_align_center mh0'>
                <Field
                  className='pt0'
                  component='input' name='frequency'
                  onChange={_handleFrequencyClick}
                  type='radio' value='every_custom_week'/>
                <label className='mh4'> Every</label>
                <Form.Field
                  className='ml8 mv8 w_input_3'
                  control={Input}
                  name='custom_week_number'
                  onChange={_handleCustomWeekChange}
                  readOnly={frequency !== 'every_custom_week'}
                  type='number'
                  value={customWeekNumber}/>
                <label className='ml8'>Week(s)</label>
              </Form.Group>
              <Form.Group  className='div_align_center mh0'>
                <Field
                  className='pt0'
                  component='input'
                  name='frequency'
                  onChange={_handleFrequencyClick}
                  type='radio' value='monthly'/>
                <label className='mh4'> Monthly</label>
              </Form.Group>
            </Grid.Column>
            <Grid.Column
              className='pv0'  computer={12} mobile={16}
              tablet={16}>
              {
                frequency === 'monthly' ? <>
                  <Form.Group className='div_align_center'>
                    <Field
                      component='input' name='monthy_radio'
                      onChange={_handleMonthlyRadioChange}
                      type='radio' value='monthly_date'/>
                    <label className='mh4'>{monthlyRadio.first}</label>
                  </Form.Group>
                  <Form.Group className='mt8 div_align_center'>
                    <Field
                      component='input' name='monthy_radio'
                      onChange={_handleMonthlyRadioChange}
                      type='radio' value='monthly_day'/>
                    <label className='mh4'>{monthlyRadio.second}</label>
                  </Form.Group>
                </>
                  : <>
                    <p className='mb0'><b>On Days:</b></p>
                    <Form.Group width='equl'>
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
                  </>
              }

            </Grid.Column>
          </Grid>

          <Header as='h3' className='pv16'>
        Recurrence Range
          </Header>
          <Grid>
            <Grid.Column
              className='pt8'  computer={6} mobile={16}
              tablet={16}>
              <div className='div_align_center'>
                <Form.Group className='wc8 div_align_center mh0 mv0'>
                  <Field
                    component='input' name='endby_until_no'
                    onChange={_handleEndByAfterChange} type='radio' value='end_by'/>
                  <label className='mh4'> End by</label>
                </Form.Group>
                <Field
                  className='ml8'
                  component={FormField}
                  control={Input}
                  name='check_out'
                  onChange={_handleEndDateChange}
                  readOnly={endByAfter !== 'end_by'}
                  type='date'/>
              </div>
            </Grid.Column>
            <Grid.Column
              className='pt8'  computer={6} mobile={16}
              tablet={16}>
              <div className='div_align_center'>
                <Form.Group className='wc8 div_align_center mh0 mv0'>
                  <Field
                    component='input' name='endby_until_no'
                    onChange={_handleEndByAfterChange} type='radio' value='end_after'/>
                  <label className='mh4'> End after</label>
                </Form.Group>
                <Field
                  className='w_input_set'
                  component={FormField}
                  control={Input}
                  name='until_no_of_occurrences'
                  onChange={_handleUntilNoChange}
                  readOnly={endByAfter !== 'end_after'}
                  type='number'/>
                <label className='ml8'>occurrences</label>
              </div>
            </Grid.Column>
            <Grid.Column
              className='div_align_center'
              computer={3} mobile={16} tablet={16}>
              <Form.Group className='wc8 mb8 div_align_center mh0 mv0'>
                <Field
                  component='input' name='endby_until_no'
                  onChange={_handleEndByAfterChange} type='radio' value='no_end_date'/>
                <label className='mh4'> No End Date</label>
              </Form.Group>
            </Grid.Column>
          </Grid>
          <Accordion className='mt32'>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={_handleSelectRecurringDaysClick}>
              <Header as='h3' className='mb0'>
              Manually Add/Edit Dates
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
                  fixedWeeks
                  fromMonth={startDate}
                  modifiers={PeekAndFullDay}
                  month={startDate}
                  numberOfMonths={calendarDates.numberOfMonths}
                  onDayClick={_handleDayClick}
                  selectedDays={selectedDates}
                  toMonth={calendarDates.endDate}/>
              </div>
              <Grid.Column className='ml16 div_align_center' floated='right' width={16}>
                <Label className='service_full' size='mini'>&nbsp;</Label>&nbsp;&nbsp;Full&nbsp;&nbsp;
                <Label className='color_peak' size='mini'>&nbsp;   </Label>&nbsp;&nbsp;Peak
              </Grid.Column >
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
        <Confirm
          cancelButton='No'
          confirmButton='Yes'
          content='The reservation is full on some of the selected dates, do you want to overwrite and select the dates?'
          onCancel={_handleCancelOverride}
          onConfirm={_handleConfirmOverride}
          open={overridePopupOpen}/>
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
        state,
        petReservationDetail,
        initialValues: { ...petReservationDetail.item }
      }
    },
    {
      setItem: petReservationDetailDuck.creators.setItem
    }
  )
)(RecurringDaysForm)
