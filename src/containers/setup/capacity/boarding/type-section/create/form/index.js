import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Form, Input, Select, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'

import CheckboxGroup from '@components/Common/CheckboxGroup'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { KennelTypeDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import kennelTypeDetailDuck from  '@reducers/order/service/boarding/kennel/type/detail'

const selector = formValueSelector('kennel-type')

const KennelTypeCreateForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(kennelTypeDetailDuck.selectors.detail)
  const is_surcharge = useSelector(state => selector(state, 'is_surcharge'))

  useEffect(() => {
    // Get default data to create a new kennel type
    dispatch(kennelTypeDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(editing)
      initialize(detail.item)
    else
      // Set default data for new register
      initialize(KennelTypeDefaultConfig)
  }, [ detail.item.id ])

  const getChargeTypeOptions = isSurcharge => {
    return detail.form.charge_type_options
      .filter(({ value }) => isSurcharge ? value !== 'no_charge' : value === 'no_charge')
  }

  const _handleClose = () => {
    dispatch(
      kennelTypeDetailDuck.creators.resetItem()
    )
  }

  const _handleIsSurchargeChange = isSurcharge => {
    if(isSurcharge) change('charge_type', null)
    else change('charge_type', 'no_charge')
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(kennelTypeDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(kennelTypeDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const chargeTypeOptions = useMemo(() => getChargeTypeOptions(is_surcharge), [ is_surcharge, detail.form.charge_type_options ])
  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='kennel-type' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Lodging Type Name'
          name='name'
          placeholder='Enter lodging type name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={CheckboxGroup}
          label='Applies To Areas'
          name='kennel_area_ids'
          options={detail.form.kennel_area_options}
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={TextArea}
          label='Description'
          name='description'
          placeholder='Description'
          rows={5}/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Input}
          label='Size Width (cm)'
          name='size_width'
          placeholder='0'
          required
          type='number'/>
        <Field
          component={FormField}
          control={Input}
          label='Size Height (cm)'
          name='size_height'
          placeholder='0'
          required
          type='number'/>
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
  form    : 'kennel-type',
  validate: values => {
    const schema = {
      name           : yup.string().required('Name is required'),
      kennel_area_ids: yup.array().required('Choose at least one kennel area'),
      size_width     : yup.number().min(0).typeError('Size width be a number').required('Size width is Required'),
      size_height    : yup.number().min(0).typeError('Size height be a number').required('Size height is Required'),
      price          : yup.number().min(0).typeError('Price must be a number').required('Price is Required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(KennelTypeCreateForm)
