import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Checkbox, Form, Header, Input, Select, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { ServiceDefaultConfig } from '@lib/constants/service'
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
    service_group = null
  } = useSelector(state => selector(state, 'service_group', 'service_type', 'is_additional_dog_price'))

  useEffect(() => {
    dispatch(serviceVariationDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing)
      initialize(detail.item)
    else
      initialize(ServiceDefaultConfig)
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      serviceVariationDetailDuck.creators.resetItem()
    )
  }

  const _handleServiceGroupChange = () => {
    change('service_type', null)

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
          name='service_type'
          onChange={_handleServiceTypeChange}
          onSearchChange={_handleServiceTypeSearchChange}
          options={detail.form.service_type_options}
          placeholder='Select Service Type'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
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
          required
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
          name='price'
          placeholder='$0.00'
          required
          type='number'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label="Create Add'l Pet Reservation"
          name='is_additional_dog_price'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Input}
          label="Add'l Price"
          name='price'
          placeholder='$0.00'
          required
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
          name='start_date'
          required
          type='date'/>
        <Field
          component={FormField}
          control={Input}
          label='End Date'
          name='end_date'
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
    const schema = {
      name       : yup.string().required('Name is required'),
      pet_classes: yup.array().required('Choose at least one service group'),
      locations  : yup.array().required('Choose at least one service group'),
      sku_id     : yup.string().required('Custom Acct Cd is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ServiceReservationCreateForm)
