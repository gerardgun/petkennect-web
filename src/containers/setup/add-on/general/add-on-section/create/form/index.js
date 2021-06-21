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
import { TrueAddonServiceDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import moment from 'moment'
import setupAddonServiceSettingDetailDuck from '@reducers/service/addon/general/add-on-service/detail'
import InputColor from '@components/Common/InputColor'
import _uniq from 'lodash/uniq'

const selector = formValueSelector('setup-addon-service')

const SetupAddonServiceSettingFormModal = (props) => {
  const {
    error,
    handleSubmit,
    reset,
    change,
    untouch,
    initialize // redux-form
  } = props
  const dispatch = useDispatch()
  const detail = useSelector(
    setupAddonServiceSettingDetailDuck.selectors.detail
  )
  const {
    service,
    service_group,
    price: { started_at = null } = {},
    service_true_addon: { service_variations = [] } = {},
    locations = []
  } = useSelector((state) =>
    selector(state, 'service_group', 'service', 'service_true_addon', 'locations', 'price')
  )

  useEffect(() => {
    // Get default data to create a new service package
    dispatch(setupAddonServiceSettingDetailDuck.creators.create())
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
        ...TrueAddonServiceDefaultConfig
      })
  }, [ detail.item.id ])

  useEffect(() => {
    if(service_variations.length > 0) {
      const variationsLocations = _uniq(detail.form.true_addons_options
        .filter(({ value }) => service_variations.includes(value))
        .flatMap(({ locations }) => [ ...locations ]))

      dispatch(setupAddonServiceSettingDetailDuck.creators.set({ form: {
        ...detail.form,
        location_options: detail.form.location_total_options.filter(option => variationsLocations.includes(option.value))
      } }))
      change('locations', locations.filter(location => variationsLocations.includes(location)))
      setTimeout(() => {
        untouch('locations')
      }, 10)
    } else {
      dispatch(setupAddonServiceSettingDetailDuck.creators.set({ form: {
        ...detail.form,
        location_options: detail.form.location_total_options
      } }))
    }
  }, [ service_variations ])

  const _handleClose = () => {
    dispatch(setupAddonServiceSettingDetailDuck.creators.resetItem())
  }

  const _handleSubmit = (values) => {
    if(editing)
      return dispatch(
        setupAddonServiceSettingDetailDuck.creators.put({
          id: detail.item.id,
          ...values
        })
      )
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(setupAddonServiceSettingDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const _handleGetServiceTypes = (value) => {
    change('service', '')
    setTimeout(() => {
      untouch('service')
    }, 10)
    dispatch(
      setupAddonServiceSettingDetailDuck.creators.getServiceTypes({
        service_group__id: value
      })
    )
  }
  const _handleGetReservationsTypes = (value) => {
    change('service_true_addon.service_variations', [])
    setTimeout(() => {
      untouch('service_true_addon.service_variations')
    }, 10)
    dispatch(
      setupAddonServiceSettingDetailDuck.creators.getReservationTypes({
        service: value,
        type   : 'A,R'
      })
    )
  }

  const editing = Boolean(detail.item.id)

  return (
    <Form
    // eslint-disable-next-line react/jsx-handler-names
      id='setup-addon-service' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Add-On Name'
          name='name'
          placeholder='Enter Add-On Name'
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
          label='Services'
          name='service_group'
          onChange={_handleGetServiceTypes}
          options={detail.form.service_group_options}
          placeholder='Select Service'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={!service_group}
          label='Service Types'
          name='service'
          onChange={_handleGetReservationsTypes}
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
          disabled={!service}
          label='Reservation Types'
          multiple
          name='service_true_addon.service_variations'
          options={detail.form.true_addons_options}
          placeholder='Select Reservation Types (All is Default)'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Header as='h6' className='section-header' color='blue'>
        Pricing
      </Header>

      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Input}
          label='Price'
          name='price.price'
          parse={parseFloat}
          placeholder='$0.00'
          required
          step='0.01'
          type='number'/>
        <Field
          component={FormField}
          control={Input}
          label="Add'l Price"
          name='price.additional_pet_price'
          parse={parseFloat}
          placeholder='$0.00'
          type='number'/>
      </Form.Group>
      <Form.Group widths={2}>
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
          disabled={!started_at}
          label='End Date'
          name='price.ended_at'
          required
          type='date'/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>
        Other Settings
      </Header>
      <Form.Group className='flex flex-row align-center' widths={3}>
        <Field
          component={FormField}
          control={Input}
          label='Duration'
          name='duration_minutes'
          placeholder='Enter duration'
          step='0.01'
          toggle
          type='number'/>
        <Field
          component={FormField}
          control={Select}
          label='Time Offered'
          name='employee_schedule'
          options={detail.form.calendar_options}
          placeholder='Select Calendar'
          required
          search/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Show to Customer'
          name='is_bookable_by_client'
          toggle
          type='checkbox'/>
      </Form.Group>
      <Form.Group className='flex flex-row align-center' widths={3}>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is taxable'
          name='is_taxable'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is scheduled'
          name='is_scheduled'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Input}
          label='Custom Acct Cd'
          name='sku_id'
          placeholder='Enter Custom Code'
          required/>
      </Form.Group>
      <Form.Group className='flex flex-row align-center' widths={3}>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Active'
          name='is_active'
          toggle
          type='checkbox'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={InputColor}
          name='service_true_addon.color_code'
          readOnly
          required/>
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
  form    : 'setup-addon-service',
  validate: (values) => {
    const schema = {
      name              : Yup.string().required('Package Name is required'),
      locations         : Yup.array().required('Choose at least one location'),
      service_group     : Yup.string().required('Service is required'),
      service           : Yup.string().required('Service Type is required'),
      service_true_addon: Yup.object().shape({
        color_code        : Yup.string().required('Color is required'),
        service_variations: Yup.array().required(
          'Choose at least one reservation type'
        )
      }),
      price: Yup.object().shape({
        price: Yup.number()
          .typeError('Price must be a number')
          .required('Price is required'),
        started_at: Yup.date()
          .min(
            moment().subtract(1, 'days').toString(),
            'Start Date must be at least today'
          )
          .required('Start Date is required'),
        ended_at: Yup.string().when([ 'price.started_at' ], (price, schema) => {
          const { price: { ended_at = null, started_at = null } = {} } = values
          if(started_at)
            return ended_at
              ? schema.test(
                'price.ended_at',
                'Cannot be less than the Start Date',
                (value) => {
                  return moment(value).isSameOrAfter(moment(started_at))
                }
              )
              : schema.required('End Date is required')
          else return schema.required('End Date is required')
        })
      }),
      employee_schedule: Yup.string().required('Time Offered is required'),
      sku_id           : Yup.string().required('Custom Code is required')
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupAddonServiceSettingFormModal)
