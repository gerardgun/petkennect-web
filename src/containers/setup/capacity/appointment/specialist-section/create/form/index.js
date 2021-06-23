import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Select } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import employeeServiceTypeDetailDuck from '@reducers/employee/service-type/detail'

const EmployeeServiceTypeForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(employeeServiceTypeDetailDuck.selectors.detail)

  useEffect(() => {
    if(editing) {
      initialize({
        id                      : detail.item.id,
        employee_id             : detail.item.employee_id,
        service_type_id         : detail.item.service,
        reservation_type_ids    : detail.item.service_variation_ids,
        max_reservations_per_day: detail.item.max_reservations_per_day
      })

      dispatch(
        employeeServiceTypeDetailDuck.creators.edit()
      )
    } else {
      dispatch(
        employeeServiceTypeDetailDuck.creators.create()
      )
    }
  }, [])

  const _handleClose = () => {
    dispatch(
      employeeServiceTypeDetailDuck.creators.resetItem()
    )
  }

  const _handleServiceTypeChange = serviceTypeId => {
    dispatch(
      employeeServiceTypeDetailDuck.creators.createGetReservationTypes({
        service_type_id: serviceTypeId
      })
    )

    change('reservation_type_ids', [])
  }

  const _handleSubmit = (values) => {
    if(editing)
      return dispatch(employeeServiceTypeDetailDuck.creators.put(values))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(employeeServiceTypeDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='employee-service-type' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Field component='input' name='id' type='hidden'/>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={editing}
          label='Employee'
          name='employee_id'
          options={detail.form.employee_options}
          placeholder='Select Employee'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={editing}
          label='Service Type'
          name='service_type_id'
          onChange={_handleServiceTypeChange}
          options={detail.form.service_type_options}
          placeholder='Select Service Type'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Applies to Appointments'
          multiple
          name='reservation_type_ids'
          options={detail.form.reservation_type_options}
          placeholder='Select reservations'
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Max Scheduled Per Day'
          name='max_reservations_per_day'
          placeholder='0'
          required
          type='number'/>
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
  form    : 'employee-service-type',
  validate: values => {
    const schema = {
      employee_id             : yup.mixed().required('Employee is required'),
      service_type_id         : yup.mixed().required('Service Type is required'),
      max_reservations_per_day: yup.number().typeError('Max scheduled per day must be a number').required('Max scheduled per day is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(EmployeeServiceTypeForm)
