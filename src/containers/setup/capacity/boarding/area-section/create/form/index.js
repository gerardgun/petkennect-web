import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Form, Input, Select } from 'semantic-ui-react'
import * as yup from 'yup'

import CheckboxGroup from '@components/Common/CheckboxGroup'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { KennelAreaDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import kennelAreaDetailDuck from '@reducers/order/service/boarding/kennel/area/detail'

const selector = formValueSelector('kennel-area')

const KennelAreaCreateForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(kennelAreaDetailDuck.selectors.detail)
  const is_surcharge = useSelector(state => selector(state, 'is_surcharge'))

  useEffect(() => {
    // Get default data to create a new kennel area
    dispatch(kennelAreaDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing)
      initialize({
        ...detail.item,
        pet_class: detail.item.pet_class.id,
        location : detail.item.location.id
      })
    else
      // Set default data for new register
      initialize(KennelAreaDefaultConfig)
  }, [ detail.item.id ])

  const getChargeTypeOptions = isSurcharge => {
    return detail.form.charge_type_options
      .filter(({ value }) => isSurcharge ? value !== 'no_charge' : value === 'no_charge')
  }

  const _handleClose = () => {
    dispatch(
      kennelAreaDetailDuck.creators.resetItem()
    )
  }

  const _handleIsSurchargeChange = isSurcharge => {
    if(isSurcharge) change('charge_type', null)
    else change('charge_type', 'no_charge')
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(kennelAreaDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(kennelAreaDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const chargeTypeOptions = useMemo(() => getChargeTypeOptions(is_surcharge), [ is_surcharge, detail.form.charge_type_options ])
  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='kennel-area' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Area Name'
          name='name'
          placeholder='Enter area name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Species'
          name='pet_class'
          options={detail.form.pet_kind_options}
          placeholder='Select Species'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Location'
          name='location'
          options={detail.form.location_options}
          placeholder='Select Location'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={CheckboxGroup}
          label='Applies To Service Groups'
          name='service_group_ids'
          options={detail.form.service_group_options}
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Surcharge'
          name='is_surcharge'
          onChange={_handleIsSurchargeChange}
          options={detail.form.is_surcharge_options}
          placeholder='Surcharge'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={!is_surcharge}
          label='Charge Type'
          name='charge_type'
          options={chargeTypeOptions}
          placeholder='Select charge type'
          required
          search
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Price'
          name='price'
          placeholder='0.00'
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
  form    : 'kennel-area',
  validate: values => {
    const schema = {
      name             : yup.string().required('Name is required'),
      pet_class        : yup.mixed().required('Pet species is required'),
      location         : yup.mixed().required('Location is required'),
      service_group_ids: yup.array().required('Choose at least one service group'),
      price            : yup.number('Price is Required').min(0).typeError('Price must be a number').required('Price is Required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(KennelAreaCreateForm)
