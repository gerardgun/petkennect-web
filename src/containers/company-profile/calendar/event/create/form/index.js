import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Input,
  Select,
  TextArea
} from 'semantic-ui-react'
import * as Yup from 'yup'
import moment from 'moment'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import InputColor from '@components/Common/InputColor'
import companyProfileCalendarEventDetailDuck from '@reducers/company-profile/calendar/event/detail'
import { CompanyProfileCalendarEventConfig } from '@lib/constants/company'

const selector = formValueSelector('company-profile-calendar-event')
const CalendarEventForm = (props) => {
  const {
    error,
    handleSubmit,
    reset,
    change,
    untouch,
    initialize // redux-form
  } = props
  const dispatch = useDispatch()
  const [ isFirstMount, setIsFirstMount ] = useState(true)
  const [ lastColor, setLastColor ] = useState('')
  const detail = useSelector(
    companyProfileCalendarEventDetailDuck.selectors.detail
  )
  const editing = Boolean(detail.item.id)
  const {
    is_all_day: isAllDay,
    start_date,
    start_time,
    is_exception,
    color,
    is_recurring,
    frequency: { week_days = [] } = {}
  } = useSelector((state) =>
    selector(
      state,
      'is_all_day',
      'start_date',
      'start_time',
      'is_exception',
      'color',
      'is_recurring',
      'frequency'
    )
  )

  useEffect(() => {
    if(editing)
      initialize({
        ...CompanyProfileCalendarEventConfig,
        ...detail.item,
        type: 'E'
      })
    // Set default data for new register
    else
      initialize({
        ...CompanyProfileCalendarEventConfig,
        calendarId: detail.item.calendarId,
        type      : 'E'
      })
  }, [ detail.item.id ])

  useEffect(() => {
    if(isAllDay) {
      change('start_time', '')
      change('end_time', '')
    }
  }, [ isAllDay ])

  useEffect(() => {
    if(!start_date && !isFirstMount) {
      change('end_date', '')
      change('end_time', '')
    } else {
      setIsFirstMount(false)
    }
  }, [ start_date ])

  useEffect(() => {
    if(is_exception) {
      setLastColor(color)
      change('color', '#777777')
    } else {
      if(editing)
        if(lastColor) change('color', lastColor)
        else change('color', color)
      else change('color', lastColor)
    }
  }, [ is_exception ])

  const _handleClose = () => {
    dispatch(companyProfileCalendarEventDetailDuck.creators.resetItem())
  }

  const _handleSubmit = (values) => {
    if(editing)
      return dispatch(
        companyProfileCalendarEventDetailDuck.creators.put({
          id: detail.item.id,
          ...values
        })
      )
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(
        companyProfileCalendarEventDetailDuck.creators.post(values)
      )
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const _handleAddDay = (day) => {
    if(week_days.includes(day))
      change(
        'frequency.week_days',
        week_days.filter((weekday) => weekday !== day)
      )
    else change('frequency.week_days', [ ...week_days, day ])
    setTimeout(() => {
      untouch(
        'name',
        'description',
        'start_date',
        'start_time',
        'end_date',
        'end_time',
        'color'
      )
    }, 10)
  }

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='company-profile-calendar-event' onReset={reset}onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Event Name'
          name='name'
          placeholder='Enter Event Name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={TextArea}
          label='Description'
          name='description'
          placeholder='Enter Description'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field>
          <Form.Group widths='equal'>
            <Form.Field>
              <Field
                component={FormField}
                control={Input}
                label='Start Date'
                name='start_date'
                required
                type='date'/>
            </Form.Field>
            <Form.Field>
              <Field
                component={FormField}
                control={Input}
                disabled={isAllDay}
                label='Start Time'
                name='start_time'
                type='time'/>
            </Form.Field>
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group widths='equal'>
            <Form.Field>
              <Field
                component={FormField}
                control={Input}
                disabled={isAllDay ? !start_date : !(start_date && start_time)}
                label='End Date'
                name='end_date'
                type='date'/>
            </Form.Field>
            <Form.Field>
              <Field
                component={FormField}
                control={Input}
                disabled={isAllDay || !(start_date && start_time)}
                label='End Time'
                name='end_time'
                type='time'/>
            </Form.Field>
          </Form.Group>
        </Form.Field>
      </Form.Group>
      <Form.Group widths='3'>
        <Field
          autoComplete='off'
          component={FormField}
          control={InputColor}
          disabled={is_exception}
          name='color'
          readOnly
          required/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='All Day'
          name='is_all_day'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is Exception'
          name='is_exception'
          toggle
          type='checkbox'/>
      </Form.Group>
      <Form.Group>
        <Field
          className='mv20 checkbox-recurring fw700'
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is Recurring?'
          name='is_recurring'
          toggle
          type='checkbox'/>
      </Form.Group>
      {is_recurring && (
        <>
          <Form.Group className='align-center' widths='3'>
            <Header as='p' className='m0 fw400 f16'>
              Repeat every
            </Header>
            <Field
              className='w120'
              component={FormField}
              control={Input}
              name='interval_value'
              required
              type='number'/>
            <Field
              className='w200'
              component={FormField}
              control={Select}
              name='frequency.interval_type'
              options={[
                { text: 'Daily', value: 'D' },
                { text: 'Weekly', value: 'W' },
                { text: 'Monthly', value: 'M' },
                { text: 'Yearly', value: 'Y' }
              ]}
              required
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group>
            <Grid.Row className='flex flex-row mv20'>
              <Button
                circular
                className='button-day first'
                color={week_days.includes(6) ? 'teal' : undefined}
                content='D'
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => _handleAddDay(6)}/>
              <Button
                circular
                className='button-day'
                color={week_days.includes(0) ? 'teal' : undefined}
                content='L'
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => _handleAddDay(0)}/>
              <Button
                circular
                className='button-day'
                color={week_days.includes(1) ? 'teal' : undefined}
                content='M'
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => _handleAddDay(1)}/>
              <Button
                circular
                className='button-day'
                color={week_days.includes(2) ? 'teal' : undefined}
                content='X'
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => _handleAddDay(2)}/>
              <Button
                circular
                className='button-day'
                color={week_days.includes(3) ? 'teal' : undefined}
                content='J'
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => _handleAddDay(3)}/>
              <Button
                circular
                className='button-day'
                color={week_days.includes(4) ? 'teal' : undefined}
                content='V'
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => _handleAddDay(4)}/>
              <Button
                circular
                className='button-day'
                color={week_days.includes(5) ? 'teal' : undefined}
                content='S'
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => _handleAddDay(5)}/>
            </Grid.Row>
          </Form.Group>
          <Form.Group className='align-center' widths='2'>
            <Form.Field className='flex flex-row align-center p0'>
              <Header as='p' className='m0 fw400 f16 mr8'>
                Until
              </Header>
              <Field
                className='w100'
                component={FormField}
                control={Input}
                name='frequency.ended_at'
                type='date'/>
            </Form.Field>
            <Form.Field>
              <Header as='p' className='m0 fw600 f12 ml20' color='grey'>
                Leave blank if it never ends
              </Header>
            </Form.Field>
          </Form.Group>
        </>
      )}
      {error && (
        <Form.Group widths='equal'>
          <Form.Field>
            <FormError message={error}/>
          </Form.Field>
        </Form.Group>
      )}
    </Form>
  )
}

export default reduxForm({
  form    : 'company-profile-calendar-event',
  validate: (values) => {
    const schema = {
      name      : Yup.string().required('Event Name is required'),
      color     : Yup.string().required('Color is required'),
      start_date: Yup.string().required('Start Date is required'),
      start_time: Yup.mixed().when('is_all_day', {
        is       : (val) => !val,
        then     : Yup.string().required('Start Time is required'),
        otherwise: Yup.mixed()
      }),
      end_date: Yup.string().when([ 'start_date' ], (start_date, schema) => {
        const { end_date } = values
        if(start_date)
          return end_date
            ? schema.test(
              'end_date',
              'Cannot be less than the Start Date',
              (value) => {
                return moment(value).isSameOrAfter(moment(start_date))
              }
            )
            : schema.required('End Date is required')
        else return schema.required('End Date is required')
      }),
      end_time: Yup.string().when(
        [ 'is_all_day', 'start_date', 'start_time', 'end_date' ],
        (is_all_day, start_date, start_time, end_date, schema) => {
          const { end_time } = values
          if(is_all_day) return schema
          if(start_date && start_time)
            return end_date && end_time
              ? schema.test(
                'end_time',
                'Cannot be less than 30 minutes after the Start Date Time',
                (value) => {
                  if(moment(end_date).isBefore(moment(start_date)))
                    return schema

                  return moment(`${end_date} ${value}`).isSameOrAfter(
                    moment(`${start_date} ${start_time}`).add(30, 'minutes')
                  )
                }
              )
              : schema.required('End Time is required')
          else return schema.required('End Time is required')
        }
      ),
      interval_value: Yup.mixed().when('is_recurring', {
        is  : true,
        then: Yup.number()
          .integer('The number of intervals is not valid')
          .required('The number of intervals is not valid')
          .typeError('The number of intervals is not valid'),
        otherwise: Yup.mixed()
      })
      /*
      frequency: Yup.object().shape({
        interval_value: Yup.mixed().when('is_recurring', {
          is  : true,
          then: Yup.number()
            .integer('The number of intervals is not valid')
            .required('The number of intervals is not valid')
            .typeError('The number of intervals is not valid'),
          otherwise: Yup.mixed()
        })
      })
      */
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(CalendarEventForm)
