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

const selector = formValueSelector('service-boarding-activity')

const ServiceReservationCreateForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)
  const price = useSelector(state => selector(state, 'price'))

  useEffect(() => {
    if(editing)
      dispatch(serviceVariationDetailDuck.creators.editBoardingActivity())
    else
      dispatch(serviceVariationDetailDuck.creators.createBoardingActivity())

    if(!editing)
      initialize(ServiceReservationDefaultConfig)
  }, [])

  useEffect(() => {
    if(editing && detail.item?.service_variation_ids?.length > 0) {
      const lastPrice = _last(detail.item.prices)

      initialize({
        ...detail.item,
        locations: detail.item.locations.map(({ id }) => id),
        price    : lastPrice ? ({
          ...lastPrice,
          started_at: lastPrice.started_at.split('T')[0],
          ended_at  : lastPrice.ended_at.split('T')[0]
        }) : ({
          ...ServiceReservationDefaultConfig.price
        })
      })
    }
  }, [ detail.item.service_variation_ids ])

  const _handleClose = () => {
    dispatch(
      serviceVariationDetailDuck.creators.resetItem()
    )
  }

  const _handleServiceTypeIdsChange = serviceTypeIds => {
    dispatch(
      serviceVariationDetailDuck.creators.createBoardingActivityGetReservations({
        service_type_ids: serviceTypeIds
      })
    )

    change('service_variation_ids', [])
  }

  const _handleSubmit = values => {
    if(values.sku_id === detail.item.sku_id)
      delete values.sku_id

    if(editing)
      return dispatch(serviceVariationDetailDuck.creators.putBoardingActivity({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(serviceVariationDetailDuck.creators.postBoardingActivity(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='service-boarding-activity' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Service Group'
          readOnly
          required
          value={detail.form.service_group_name}/>
        <Form.Input
          label='Price Code'
          readOnly
          required
          value={detail.form.service_sku_id}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Activity Name'
          name='name'
          placeholder='Enter Activity Name'
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
          label='Service Types'
          multiple
          name='service_type_ids'
          onChange={_handleServiceTypeIdsChange}
          options={detail.form.service_type_options}
          placeholder='Select service types'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Reservations'
          multiple
          name='service_variation_ids'
          options={detail.form.service_variation_options}
          placeholder='Select reservations'
          required
          search
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
      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Select}
          label='Charge on Checkout Day'
          name='config.checkout_charge_type'
          options={detail.form.checkout_charge_type_options}
          placeholder='Select Type'
          required
          selectOnBlur={false}/>
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
  form    : 'service-boarding-activity',
  validate: values => {
    let extra = {}

    if(values?.price?.is_set_additional_pet_price === true)
      extra = {
        additional_pet_price: yup.number().typeError('Price must be a number').required('Price is required')
      }

    const schema = {
      name                 : yup.string().required('Name is required'),
      type                 : yup.mixed().required('Reservation Type is required'),
      service_type_ids     : yup.array().required('Choose at least one service type'),
      service_variation_ids: yup.array().required('Choose at least one reservation'),
      sku_id               : yup.string().required('Custom Acct Cd is required'),
      price                : yup.object().shape({
        price     : yup.number().typeError('Price must be a number').required('Price is required'),
        started_at: yup.date().min(moment().subtract(1, 'days').toString(), 'Start Date must be a valid date').required('Start Date is required'),
        ended_at  : yup.date().min(moment().subtract(1, 'days').toString(), 'Start Date must be a valid date').required('End Date is required'),
        ...extra
      }),
      config: yup.object().shape({
        checkout_charge_type: yup.mixed().required('Checkout Charge Type is required')
      })
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ServiceReservationCreateForm)
