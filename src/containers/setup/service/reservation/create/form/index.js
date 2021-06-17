import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Checkbox, Form, Header, Input, Select, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'
import _last from 'lodash/last'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { ServiceReservationDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import serviceVariationDetailDuck from '@reducers/service/variation/detail'

const selector = formValueSelector('service-reservation')

const ServiceReservationCreateForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)
  const {
    price = {},
    service_id = null,
    service_group = null
  } = useSelector(state => selector(state, 'service_group', 'service_id', 'price'))

  useEffect(() => {
    if(editing)
      dispatch(serviceVariationDetailDuck.creators.edit())
    else
      dispatch(serviceVariationDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing) {
      const lastPrice = _last(detail.item.prices)

      initialize({
        ...detail.item,
        service_id: detail.item.service.id,
        locations : detail.item.locations.map(({ id }) => id),
        price     : lastPrice ? ({
          ...lastPrice,
          started_at: lastPrice.started_at.split('T')[0],
          ended_at  : lastPrice.ended_at.split('T')[0]
        }) : ({
          ...ServiceReservationDefaultConfig.price
        })
      })
    } else {
      initialize(ServiceReservationDefaultConfig)
    }
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      serviceVariationDetailDuck.creators.resetItem()
    )
  }

  const _handleServiceGroupChange = () => {
    change('service_id', null)

    dispatch(
      serviceVariationDetailDuck.creators.set({
        ...detail,
        form: {
          ...detail.form,
          service_type_options: []
        }
      })
    )
  }

  const _handleServiceTypeChange = serviceId => {
    dispatch(
      serviceVariationDetailDuck.creators.createGetLocations({
        service_id: serviceId
      })
    )

    change('locations', [])
  }

  const _handleServiceTypeSearchChange = (e, { searchQuery }) => {
    dispatch(
      serviceVariationDetailDuck.creators.createGetServiceTypes({
        search           : searchQuery,
        service_group__id: service_group
      })
    )
  }

  const _handleSubmit = values => {
    if(values.sku_id === detail.item.sku_id)
      delete values.sku_id

    if(editing)
      return dispatch(serviceVariationDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(serviceVariationDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='service-reservation' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      {
        editing ? (
          <Form.Group widths='equal'>
            <Form.Input
              label='Service Group'
              readOnly
              required
              value={detail.item.service.service_group_name}/>
            <Form.Input
              label='Service Type'
              readOnly
              required
              value={detail.item.service.name}/>
          </Form.Group>
        ) : (
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Service Group'
              name='service_group'
              onChange={_handleServiceGroupChange}
              options={detail.form.service_group_options}
              placeholder='Select Service Group'
              required
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Select}
              disabled={service_group === null}
              label='Service Type'
              name='service_id'
              onChange={_handleServiceTypeChange}
              onSearchChange={_handleServiceTypeSearchChange}
              options={detail.form.service_type_options}
              placeholder='Select Service Type'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
        )
      }
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Reservation Name'
          name='name'
          placeholder='Enter Reservation Name'
          required/>
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
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Reservation Type'
          name='type'
          options={detail.form.type_options}
          placeholder='Select Reservation Type'
          required
          selectOnBlur={false}/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Group Play Service'
          name='is_group_play_required'
          toggle
          type='checkbox'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Time Offered'
          name='employee_schedule'
          options={detail.form.employee_schedule_options}
          placeholder='Select Time Offered'
          selectOnBlur={false}/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is Scheduled'
          name='is_scheduled'
          toggle
          type='checkbox'/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Applies to</Header>

      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={service_id === null && !editing}
          label='Location'
          multiple
          name='locations'
          options={detail.form.location_options}
          placeholder='Select Locations'
          required
          selectOnBlur={false}/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Pricing</Header>

      <Form.Group widths={3}>
        <Field
          component={FormField}
          control={Input}
          label='Price'
          name='price.price'
          parse={parseFloat}
          placeholder='$0.00'
          required
          type='number'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label="Create Add'l Pet Reservation"
          name='price.is_set_additional_pet_price'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Input}
          label="Add'l Price"
          name='price.additional_pet_price'
          parse={parseFloat}
          placeholder='$0.00'
          required={price?.is_set_additional_pet_price === true}
          type='number'/>
      </Form.Group>
      <Form.Group widths={3}>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Active'
          name='is_active'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Input}
          label='Start Date'
          name='price.started_at'
          required
          type='date'/>
        <Field
          component={FormField}
          control={Input}
          label='End Date'
          name='price.ended_at'
          required
          type='date'/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Other settings</Header>

      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Input}
          label='Custom Acct Cd'
          name='sku_id'
          placeholder='Enter code'
          required/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Enable in Client Portal'
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
  form    : 'service-reservation',
  validate: values => {
    let extra = {}

    if(values?.price?.is_set_additional_pet_price === true)
      extra = {
        additional_pet_price: yup.number().typeError('Price must be a number').required('Price is required')
      }

    const schema = {
      service_group: yup.mixed().required('Service Group is required'),
      service_id   : yup.mixed().required('Service Type is required'),
      name         : yup.string().required('Name is required'),
      type         : yup.mixed().required('Reservation Type is required'),
      locations    : yup.array().required('Choose at least one service group'),
      sku_id       : yup.string().required('Custom Acct Cd is required'),
      price        : yup.object().shape({
        price     : yup.number().typeError('Price must be a number').required('Price is required'),
        started_at: yup.date().min(moment().subtract(1, 'days').toString(), 'Start Date must be a valid date').required('Start Date is required'),
        ended_at  : yup.date().min(moment().subtract(1, 'days').toString(), 'End Date must be a valid date').required('End Date is required'),
        ...extra
      })
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ServiceReservationCreateForm)
