import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Input, Select, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'
import _times from 'lodash/times'

import CheckboxGroup from '@components/Common/CheckboxGroup'
import CommonInput from '@components/Common/Input'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import Radio from '@components/Common/Radio'
import { ServiceVariationGroupClassSessionDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import serviceVariationReleaseDetailDuck from '@reducers/service/variation/release/detail'

import './styles.scss'

const initialRangeState = {
  from: null,
  to  : null
}

const selector = formValueSelector('service-variation-release')

const ServiceVariationReleaseCreateForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationReleaseDetailDuck.selectors.detail)
  const {
    config = {},
    started_at = null
  } = useSelector(state => selector(state, 'config', 'started_at', 'started_at_time'))
  const [ picker, setPicker ] = useState({
    frequencies      : [],
    fromMonth        : new Date(),
    selectedDayRanges: []
  })

  useEffect(() => {
    if(editing)
      dispatch(serviceVariationReleaseDetailDuck.creators.edit())
    else
      dispatch(serviceVariationReleaseDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing) {
      const rest = detail.item

      initialize({
        ...rest,
        locations           : rest.locations.map(({ id }) => id),
        service_variation_id: rest.service_variation.id,
        started_at          : rest.started_at.split('T')[0],
        started_at_time     : rest.started_at.split('T')[1].substring(0, 5),
        trainer_employee    : rest.trainer_employee.id
      })
    } else {
      initialize(ServiceVariationGroupClassSessionDefaultConfig)
    }
  }, [ detail.item.id ])

  useEffect(() => {
    if(
      (config.recurring_type !== 'every_custom_week' || Number.isInteger(config.recurring_value))
      && ((config.recurring_ended_type === 'end_by' && config.recurring_ended_at) || (config.recurring_ended_type === 'end_after' && Number.isInteger(config.recurring_ended_value)))
      && (Array.isArray(config.recurring_week_days) && config.recurring_week_days.length > 0)
    ) {
      let interval_value = 1

      if(config.recurring_type === 'every_other_week') interval_value = 2
      if(config.recurring_type === 'every_custom_week') interval_value = config.recurring_value

      let ended_at = `${config.recurring_ended_at}T00:00:00`

      if(config.recurring_ended_type === 'end_after')
        ended_at = moment(`${started_at}T00:00:00`)
          .add(interval_value * (config.recurring_ended_value - 1), config.recurring_type === 'monthly' ? 'M' : 'w')
          .format('YYYY-MM-DD[T]HH:mm:ss')

      const frequency = {
        interval_type: config.recurring_type === 'monthly' ? 'M' : 'W',
        interval_value,
        week_day     : null,
        // week_day_order: null,
        time_start   : '00:00:00',
        time_end     : '00:00:00',
        started_at   : `${started_at}T00:00:00`,
        ended_at
      }

      const recurringWeekDays = [ ...config.recurring_week_days ].sort()

      const frequencies = recurringWeekDays.map(weekDay => ({
        ...frequency,
        week_day: weekDay
      }))

      // Set daypicker ranges
      const times = moment(frequency.ended_at)
        .diff(moment(frequency.started_at), frequency.interval_type === 'M' ? 'M' : 'w') / frequency.interval_value + 1

      const weekDayRanges = recurringWeekDays.reduce((a, b) => {
        let range = { from: b, to: b }

        if(a.length > 0) {
          const last = a[a.length - 1]

          if((last.to + 1) === b)
            return a.map(item => {
              return item === last ? { ...last, to: b } : item
            })
          else
            return [ ...a, range ]
        } else {
          return [ ...a, range ]
        }
      }, [])

      const selectedDayRanges = _times(times, index => {
        const endedAt = moment(frequency.ended_at)
        const startedAt = moment(frequency.started_at)

        const day = moment(frequency.started_at)
          .add(frequency.interval_value * index, frequency.interval_type === 'M' ? 'M' : 'w')

        return weekDayRanges.map(range => {
          let from = day.clone().isoWeekday(range.from)
          let to = day.clone().isoWeekday(range.to)

          if(from.isBefore(startedAt) && startedAt.isSameOrBefore(to))
            from = startedAt

          if(to.isAfter(endedAt) && endedAt.isSameOrAfter(from) && config.recurring_ended_type === 'end_by')
            to = endedAt

          return { from: from.toDate(), to: to.toDate() }
        })
      })

      setPicker(prev => {
        return {
          ...prev,
          frequencies,
          selectedDayRanges: [].concat(...selectedDayRanges)
        }
      })
    }
  }, [ config ])

  const _handleClose = () => {
    dispatch(
      serviceVariationReleaseDetailDuck.creators.resetItem()
    )
  }

  const _handleDayClick = day => {
    setPicker(prev => {
      let ranges = prev.selectedDayRanges
        .filter(item => !(item instanceof Date)) // Remove selection from
      const rangeInSelection = ranges
        .find(range => range.to === null)
      const existingRange = ranges
        .find(range => {
          return day >= range.from && day <= range.to
        })

      let range = DateUtils.addDayToRange(day, initialRangeState)

      if(rangeInSelection) {
        if(existingRange) {
          range = DateUtils.addDayToRange(rangeInSelection.from, existingRange)

          ranges = ranges
            .map(item => {
              return item === existingRange ? range : item
            })
            .filter(item => item !== rangeInSelection)
        } else {
          range = DateUtils.addDayToRange(day, rangeInSelection)

          ranges = ranges
            .map(item => {
              return item === rangeInSelection ? range : item
            })
        }
      } else if(existingRange) {
        range = DateUtils.addDayToRange(day, existingRange)

        const isNull = range.from === null && range.to === null

        if(isNull)
          ranges = ranges
            .filter(item => item !== existingRange)
        else
          ranges = ranges
            .map(item => {
              return item === existingRange ? range : item
            })
      } else {
        ranges.push(range.from) // Add selection from

        ranges.push(range) // Add the range in selection
      }

      // console.log(ranges)

      return {
        ...prev,
        selectedDayRanges: ranges
      }
    })
  }

  const _handleRecurringEndedAt = () => {
    change('config.recurring_ended_type', 'end_by')
  }

  const _handleRecurringEndedValue = () => {
    change('config.recurring_ended_type', 'end_after')
  }

  const _handleServiceVariationChange = serviceVariationId => {
    dispatch(
      serviceVariationReleaseDetailDuck.creators.createGetLocations({
        service_variation_id: serviceVariationId
      })
    )

    change('locations', [])
  }

  const _handleStartedAtChange = startedAt => {
    setPicker(prev => ({
      ...prev,
      fromMonth: new Date(`${startedAt}T00:00:00`)
    }))
  }

  const _handleSubmit = values => {
    if(values.sku_id === detail.item.sku_id)
      delete values.sku_id

    values = {
      ...values,
      started_at : `${values.started_at}T${values.started_at_time}:00`,
      frequencies: picker.frequencies
    }

    if(editing)
      return dispatch(serviceVariationReleaseDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(serviceVariationReleaseDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='service-variation-release' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Service Group'
          readOnly
          required
          value={detail.form.service_group_name}/>
        <Form.Input
          label='Service Type'
          readOnly
          required
          value={detail.form.service_name}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Class Name'
          name='service_variation_id'
          onChange={_handleServiceVariationChange}
          options={detail.form.service_variation_options}
          placeholder='Select Service Type'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={TextArea}
          label='Description'
          name='description'
          placeholder='Enter some description'
          rows={5}/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Applies to</Header>

      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Locations'
          multiple
          name='locations'
          options={detail.form.location_options}
          placeholder='Select Locations'
          required
          selectOnBlur={false}/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Class Sessions</Header>

      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Input}
          label='Start Date'
          name='started_at'
          onChange={_handleStartedAtChange}
          required
          type='date'/>
        <Field
          component={FormField}
          control={Input}
          label='Start Time'
          name='started_at_time'
          required
          type='time'/>
      </Form.Group>

      <Form.Group>
        <Form.Field width={5}>
          <label style={{ paddingBottom: '1.2rem' }}>Recurring</label>
          <div className='recurring-type'>
            <Field
              component={Radio}
              disabled={!started_at}
              label='Every Week'
              name='config.recurring_type' type='radio' value='every_week'/>
          </div>
          <div className='recurring-type'>
            <Field
              component={Radio}
              disabled={!started_at}
              label='Every Other Week'
              name='config.recurring_type' type='radio' value='every_other_week'/>
          </div>
          <div className='recurring-type'>
            <Field
              component={Radio}
              disabled={!started_at}
              label='Every'
              name='config.recurring_type' type='radio' value='every_custom_week'/>
            <Field
              component={CommonInput}
              disabled={!started_at}
              name='config.recurring_value'
              parse={parseInt}
              placeholder='0'
              type='number'/>
            <span className={!started_at ? 'disabled' : ''}> &nbsp;&nbsp;Week(s)</span>
          </div>
          <div className='recurring-type'>
            <Field
              component={Radio}
              disabled={!started_at}
              label='Monthly'
              name='config.recurring_type' type='radio' value='monthly'/>
          </div>

          <br/>

          <div className='recurring-type'>
            <Field
              component={Radio}
              disabled={!started_at}
              label='End by'
              name='config.recurring_ended_type' type='radio' value='end_by'/>
            <Field
              className='input-date'
              component={CommonInput}
              disabled={!started_at}
              name='config.recurring_ended_at'
              onChange={_handleRecurringEndedAt}
              type='date'/>
          </div>
          <div className='recurring-type'>
            <Field
              component={Radio}
              disabled={!started_at}
              label='End after'
              name='config.recurring_ended_type' type='radio' value='end_after'/>
            <Field
              component={CommonInput}
              disabled={!started_at}
              name='config.recurring_ended_value'
              onChange={_handleRecurringEndedValue}
              parse={parseInt}
              placeholder='0'
              type='number'/>
            <span className={!started_at ? 'disabled' : ''}> &nbsp;&nbsp;ocurrence(s)</span>
          </div>
        </Form.Field>
        <Form.Field width={3}>
          <Field
            component={FormField}
            control={CheckboxGroup}
            disabled={!started_at}
            inline={false}
            label='On days'
            name='config.recurring_week_days'
            options={[
              { key: 1, text: 'Monday', value: 1 },
              { key: 1, text: 'Tuesday', value: 2 },
              { key: 1, text: 'Wednesday', value: 3 },
              { key: 1, text: 'Thursday', value: 4 },
              { key: 1, text: 'Friday', value: 5 },
              { key: 1, text: 'Saturday', value: 6 },
              { key: 1, text: 'Sunday', value: 7 }
            ]}/>
        </Form.Field>
        <Form.Field width={8}>
          <label style={{ paddingBottom: '1.2rem' }}>Manually Select Dates</label>
          <DayPicker
            className={`Selectable ${!started_at ? 'disabled' : ''}`}
            fromMonth={picker.fromMonth}
            modifiers={{
              disabled: { before: picker.fromMonth },
              selected: picker.selectedDayRanges,
              start   : picker.selectedDayRanges.map(({ from }) => from),
              end     : picker.selectedDayRanges.map(({ to }) => to)
            }}
            // onDayClick={_handleDayClick}
            month={picker.fromMonth}
            numberOfMonths={2}/>
        </Form.Field>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Pricing and Roster</Header>

      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Input}
          label='Price'
          name='price'
          parse={parseFloat}
          placeholder='$0.00'
          required
          type='number'/>
        <Field
          component={FormField}
          control={Select}
          label='Trainer'
          name='trainer_employee'
          options={detail.form.employee_trainer_options}
          placeholder='Select Trainer'
          required
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Select}
          label='Commission'
          name='commission_unit'
          options={detail.form.commission_unit_options}
          placeholder='Select commission unit'
          required
          selectOnBlur={false}/>
        <Field
          component={FormField}
          control={Input}
          label='&nbsp;'
          name='commission_value'
          parse={parseFloat}
          placeholder='Enter commission value'
          type='number'/>
      </Form.Group>

      {
        editing && (
          <Form.Group>
            <Form.Input
              label='Students'
              readOnly
              value='0 students'
              width={4}/>
            <Form.Field width={12}>
              <br/>
              <Button
                color='violet'
                content='View Roster'
                disabled
                type='button'/>
              <Button
                color='olive'
                content='Grad Certificates'
                disabled
                type='button'/>
              <Button
                color='google plus'
                content='Cancel Class'
                disabled
                type='button'/>
            </Form.Field>
          </Form.Group>
        )
      }

      <Header as='h6' className='section-header' color='blue'>Other settings</Header>

      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Input}
          label='Custom Acct Cd'
          name='sku_id'
          placeholder='Enter code'
          required/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Enable Client Portal Signup'
          name='is_bookable_by_client'
          toggle
          type='checkbox'/>
      </Form.Group>

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
  )
}

export default reduxForm({
  form    : 'service-variation-release',
  validate: values => {
    const schema = {
      service_variation_id: yup.mixed().required('Group Class is required'),
      locations           : yup.array().required('Choose at least one location'),
      started_at          : yup.date().min(moment().subtract(1, 'days').toString(), 'Start date must be a valid date').required('Start Date is required'),
      started_at_time     : yup.mixed().required('Start time is required'),
      config              : yup.object().shape({

      }),
      price           : yup.number().typeError('Price must be a number').required('Price is required'),
      trainer_employee: yup.mixed().required('Trainer is required'),
      commission_unit : yup.mixed().required('Commission type is required'),
      commission_value: yup.number().typeError('Commision value must be a number').required('Commision value is required'),
      sku_id          : yup.string().required('Custom Acct Cd is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ServiceVariationReleaseCreateForm)

