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
import { TransportAddonServiceDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import moment from 'moment'
import setupTransportAddonServiceSettingDetailDuck from '@reducers/service/addon/general/transport-service/detail'
import _uniq from 'lodash/uniq'

const selector = formValueSelector('setup-transport-addon-service')
let startedAt = null
const SetupTransportAddonServiceSettingForm = (props) => {
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
    setupTransportAddonServiceSettingDetailDuck.selectors.detail
  )
  const {
    service_types = [],
    service_groups = [],
    price: { started_at = null } = {},
    service_transport_addon: { service_variations = [] } = {},
    locations = []
  } = useSelector((state) =>
    selector(
      state,
      'service_groups',
      'service_types',
      'service_transport_addon',
      'locations',
      'price'
    )
  )

  useEffect(() => {
    // Get default data to create a new service package
    dispatch(setupTransportAddonServiceSettingDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing) {
      startedAt = detail.item.price.started_at
      initialize({
        ...detail.item
      })
    }
    // Set default data for new register
    else
    {initialize({
      ...TransportAddonServiceDefaultConfig
    })}
  }, [ detail.item.id ])

  useEffect(() => {
    // to get only the location options that use the selected reservation types
    if(
      service_variations.length > 0
      && detail.form.location_total_options.length > 0
    ) {
      const variationsLocations = _uniq(
        detail.form.transport_addons_options
          .filter(({ value }) => service_variations.includes(value))
          .flatMap(({ locations }) => [ ...locations ])
      )
      dispatch(
        setupTransportAddonServiceSettingDetailDuck.creators.set({
          form: {
            ...detail.form,
            location_options: detail.form.location_total_options.filter(
              (option) => variationsLocations.includes(option.value)
            )
          }
        })
      )
      change(
        'locations',
        locations.filter((location) => variationsLocations.includes(location))
      )
      setTimeout(() => {
        untouch('locations')
      }, 10)
    } else {
      dispatch(
        setupTransportAddonServiceSettingDetailDuck.creators.set({
          form: {
            ...detail.form,
            location_options: detail.form.location_total_options
          }
        })
      )
    }
  }, [ service_variations, detail.form.location_total_options ])

  useEffect(() => {
    if(
      detail.form.service_type_options.length > 0
    ) {
      const serviceOptionsSelected = detail.form.service_type_options.filter(
        ({ service_group }) => service_groups.includes(service_group)
      ).map(({ value }) => value)

      change(
        'service_types',
        service_types.filter((type) => serviceOptionsSelected.includes(type))
      )
      setTimeout(() => {
        untouch('service_types')
      }, 10)

      // reservations
      const reservationOptionsSelected = detail.form.transport_addons_options.filter(
        ({ service }) => service_types.includes(service)
      ).map(({ value }) => value)
      change(
        'service_transport_addon.service_variations',
        service_variations.filter((variation) => reservationOptionsSelected.includes(variation))
      )
      setTimeout(() => {
        untouch('service_transport_addon.service_variations')
      }, 10)
      if(service_types.length > 0)
        dispatch(
          setupTransportAddonServiceSettingDetailDuck.creators.getReservationTypes({
            services: service_types,
            type    : 'A,R'
          })
        )
    }
  }, [ service_groups, detail.form.service_type_options ])

  const _handleClose = () => {
    dispatch(setupTransportAddonServiceSettingDetailDuck.creators.resetItem())
  }

  const _handleSubmit = (values) => {
    if(editing)
      return dispatch(
        setupTransportAddonServiceSettingDetailDuck.creators.put({
          id: detail.item.id,
          ...values
        })
      )
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(setupTransportAddonServiceSettingDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const _handleGetServiceTypes = (values) => {
    if(values.length > 0) {
      dispatch(
        setupTransportAddonServiceSettingDetailDuck.creators.getServiceTypes({
          service_group__ids: values
        })
      )
    } else {
      change('service_types', [])
      setTimeout(() => {
        untouch('service_types')
      }, 10)
    }
  }

  const _handleGetReservationsTypes = (values) => {
    if(values.length > 0) {
      dispatch(
        setupTransportAddonServiceSettingDetailDuck.creators.getReservationTypes({
          services: values,
          type    : 'A,R'
        })
      )
    } else {
      change('service_transport_addon.service_variations', [])
      setTimeout(() => {
        untouch('service_transport_addon.service_variations')
      }, 10)
    }
  }

  const editing = Boolean(detail.item.id)

  return (
    <Form
      // eslint-disable-next-line react/jsx-handler-names
      id='setup-transport-addon-service' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Route Name'
          name='name'
          placeholder='Enter Rute Name'
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
          multiple
          name='service_groups'
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
          disabled={service_groups.length === 0}
          label='Service Types'
          multiple
          name='service_types'
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
          disabled={service_types.length === 0}
          label='Reservation Types'
          multiple
          name='service_transport_addon.service_variations'
          options={detail.form.transport_addons_options}
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
          control={Checkbox}
          format={Boolean}
          label='Show to Customer'
          name='is_bookable_by_client'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is Active'
          name='is_active'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Input}
          label='Custom Acct Cd'
          name='sku_id'
          placeholder='Enter Custom Code'/>

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
  form    : 'setup-transport-addon-service',
  validate: (values) => {
    let validationStartedAt = Yup.date()
      .min(
        moment().subtract(1, 'days').toString(),
        'Start Date must be at least today'
      )
      .required('Start Date is required')
      .typeError('Start Date is required')

    if(values.id && startedAt)
      validationStartedAt = Yup.date()
        .min(
          startedAt,
          `Start Date must be at least ${moment(startedAt).format('DD/MM/YYYY')}`
        )
        .required('Start Date is required')
        .typeError('Start Date is required')

    const schema = {
      name                   : Yup.string().required('Package Name is required'),
      locations              : Yup.array().required('Choose at least one location'),
      service_groups         : Yup.array().required('Choose at least one service'),
      service_types          : Yup.array().required('Choose at least one service type'),
      service_transport_addon: Yup.object().shape({
        service_variations: Yup.array().required(
          'Choose at least one reservation type'
        )
      }),
      price: Yup.object().shape({
        price: Yup.number()
          .typeError('Price must be a number')
          .required('Price is required'),
        started_at: validationStartedAt,
        ended_at  : Yup.string().when([ 'price.started_at' ], (price, schema) => {
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
      })
      // sku_id: Yup.string().required('Custom Code is required')
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupTransportAddonServiceSettingForm)
