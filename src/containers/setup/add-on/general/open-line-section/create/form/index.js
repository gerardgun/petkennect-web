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
import { OpenLineAddonServiceDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import moment from 'moment'
import setupOpenLineAddonServiceSettingDetailDuck from '@reducers/service/addon/general/open-line-service/detail'

const selector = formValueSelector('setup-open-line-addon-service')

let startedAt = null
const SetupOpenLineAddonServiceSettingForm = (props) => {
  const {
    error,
    handleSubmit,
    reset,
    initialize // redux-form
  } = props
  const dispatch = useDispatch()
  const detail = useSelector(
    setupOpenLineAddonServiceSettingDetailDuck.selectors.detail
  )
  const price = useSelector((state) =>
    selector(
      state,
      'price'
    )
  ) || {}
  const { started_at = null } = price

  useEffect(() => {
    // Get default data to create a new open line
    dispatch(setupOpenLineAddonServiceSettingDetailDuck.creators.create())
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
      ...OpenLineAddonServiceDefaultConfig
    })}
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(setupOpenLineAddonServiceSettingDetailDuck.creators.resetItem())
  }

  const _handleSubmit = (values) => {
    if(editing)
      return dispatch(
        setupOpenLineAddonServiceSettingDetailDuck.creators.put({
          id: detail.item.id,
          ...values
        })
      )
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(setupOpenLineAddonServiceSettingDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    <Form
      // eslint-disable-next-line react/jsx-handler-names
      id='setup-open-line-addon-service' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Item Name'
          name='name'
          placeholder='Enter Item Name'
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
      <Form.Group className='flex flex-row align-center' widths={2}>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Can be Negative (Credit)'
          name='service_open_line_addon.can_be_credit_negative'
          toggle
          type='checkbox'/>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is taxable'
          name='is_taxable'
          toggle
          type='checkbox'/>
      </Form.Group>
      <Form.Group className='flex flex-row align-center' widths={2}>
        <Field
          component={FormField}
          control={Checkbox}
          format={Boolean}
          label='Is Tip'
          name='service_open_line_addon.is_tip'
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
  form    : 'setup-open-line-addon-service',
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
      name     : Yup.string().required('Item Name is required'),
      locations: Yup.array().required('Choose at least one location'),
      price    : Yup.object().shape({
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
      }),
      sku_id: Yup.string().required('Custom Code is required')
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupOpenLineAddonServiceSettingForm)
