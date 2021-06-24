import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import {
  Checkbox,
  Form,
  Header,
  Input,
  Select,
  TextArea
} from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { ServicePackageDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import servicePackageDetailDuck from '@reducers/service/package/detail'

import './styles.scss'

const selector = formValueSelector('service-package')

const ServicePackageForm = (props) => {
  const {
    error,
    handleSubmit,
    reset,
    change,
    initialize // redux-form
  } = props
  const dispatch = useDispatch()
  const detail = useSelector(servicePackageDetailDuck.selectors.detail)
  const service = useSelector((state) =>
    selector(state, 'service')
  )

  useEffect(() => {
    // Get default data to create a new service package
    dispatch(servicePackageDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing)
      initialize({
        ...detail.item
        // applies_reservation_types: detail.item.applies_reservation_types.map(
        //  ({ id }) => id
        // )
      })
    // Set default data for new register
    else
      initialize({
        service_group: detail.item.service_group,
        ...ServicePackageDefaultConfig
      })
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(servicePackageDetailDuck.creators.resetItem())
  }

  const _handleSubmit = (values) => {
    const form = {
      name                    : values.name,
      description             : values.description,
      service                 : values.service,
      locations               : values.locations,
      service_variation_addons: values.service_variation_addons,
      price                   : values.price,
      config                  : {
        credits          : values.credits,
        days_valid       : values.days_valid,
        days             : values.days,
        is_limited       : values.is_limited,
        is_hourly_credits: values.is_hourly_credits,
        is_suscription   : values.is_suscription,
        frequency        : values.frequency
      },
      is_bookable_by_client: values.is_bookable_by_client,
      sku_id               : values.sku_id
    }

    if(editing)
      return dispatch(
        servicePackageDetailDuck.creators.put({ id: detail.item.id, ...form })
      )
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(servicePackageDetailDuck.creators.post(form))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const _handleGetLocationsAndReservations = (value) => {
    change('locations', [])
    change('applies_reservation_types', [])
    dispatch(
      servicePackageDetailDuck.creators.createGetLocations({
        service_id: value
      })
    )
    dispatch(
      servicePackageDetailDuck.creators.createGetReservations({
        service: value,
        type   : 'A,R'
      })
    )
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='service-package' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Package Name'
          name='name'
          placeholder='Enter Package Name'
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
      <Header as='h6' className='section-header' color='blue'>
        Applies to
      </Header>

      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Service Type'
          name='service'
          onChange={_handleGetLocationsAndReservations}
          options={detail.form.service_type_options}
          placeholder='Select Service'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={!service}
          label='Locations'
          multiple
          name='locations'
          options={detail.form.location_options}
          placeholder='Select Locations (All is Default)'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={!service}
          label='Reservation Types'
          multiple
          name='service_variation_addons'
          options={detail.form.reservation_options}
          placeholder='Select Reservation Types (All is Default)'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths={4}>
        <Field
          component={FormField}
          control={Input}
          label='Price'
          min={0}
          name='price'
          placeholder='Price'
          required
          step='0.01'
          type='number'/>
        <Field
          component={FormField}
          control={Input}
          label='Credits'
          min={0}
          name='credits'
          placeholder='Quantity/Credits'
          required
          type='number'/>
        <Field
          component={FormField}
          control={Input}
          label='Days Valid'
          min={0}
          name='days_valid'
          placeholder='Valid for Days'
          type='number'/>
      </Form.Group>
      <Header as='h6' className='section-header' color='blue'>
        Miscellaneous Options
      </Header>
      <Form.Group>
        <Form.Field width={12}>
          <Header as='h5' className='package-label'>
            Email Client Prior to Expiration (# of days)
          </Header>
        </Form.Field>
        <Form.Field width={4}>
          <Field
            component={FormField}
            control={Input}
            min={0}
            name='days'
            placeholder='Enter Days'
            type='number'
            width={4}/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={12}>
          <Header as='h5' className='package-label'>
            Limit Use on Peak Days{' '}
            <span className='package-span'>
              (if enabled, days set to peak in calendar will not be elegible for
              package use)
            </span>
          </Header>
        </Form.Field>
        <Form.Field width={4}>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            name='is_limited'
            toggle
            type='checkbox'/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={12}>
          <Header as='h5' className='package-label'>
            Package is used for hourly credits{' '}
            <span className='package-span'>
              (if enabled, each hour in the reservation type will count as 1
              credit)
            </span>
          </Header>
        </Form.Field>
        <Form.Field width={4}>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            name='is_hourly_credits'
            toggle
            type='checkbox'/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={12}>
          <Header as='h5' className='package-label'>
            Package is a suscription
          </Header>
        </Form.Field>
        <Form.Field width={4}>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            name='is_suscription'
            toggle
            type='checkbox'/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={12}>
          <Header as='h5' className='package-label'>
            Subscription Frequency
          </Header>
        </Form.Field>
        <Form.Field width={4}>
          <Field
            component={FormField}
            control={Select}
            name='frequency'
            options={[
              { text: 'Bi-Weekly', value: 1 },
              { text: 'Monthly', value: 2 },
              { text: 'Yearly', value: 3 }
            ]}
            placeholder='Frequency'
            required
            selectOnBlur={false}/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={12}>
          <Header as='h5' className='package-label'>
            Package Available in Client Portal
          </Header>
        </Form.Field>
        <Form.Field width={4}>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            name='is_bookable_by_client'
            toggle
            type='checkbox'/>
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={12}>
          <Header as='h5' className='package-label'>
            Custom Account Code <Header as='span' color='red'>
            *
            </Header>
          </Header>
        </Form.Field>
        <Form.Field width={4}>
          <Field
            component={FormField}
            control={Input}
            name='sku_id'
            placeholder='Enter Custom Code'
            required/>
        </Form.Field>
      </Form.Group>
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
  form    : 'service-package',
  validate: (values) => {
    const schema = {
      name              : Yup.string().required('Package Name is required'),
      service           : Yup.string().required('Service Type is required'),
      locations         : Yup.array().required('Choose at least one location'),
      service_addons_ids: Yup.array().required('Choose at least one reservation type'),
      price             : Yup.number().required('Price is required'),
      credits           : Yup.number().required('Credits is required'),
      sku_id            : Yup.string().required('Custom Code is required')
      /*
      started_at          : Yup.mixed().when('days_valid', {
        is       : value => !!value,
        then     : Yup.string().required('Start Date is required'),
        otherwise: Yup.mixed()
      })*/

    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(ServicePackageForm)
