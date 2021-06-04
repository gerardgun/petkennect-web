import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Form, Header, Icon, Input, Label, Select, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { ServiceVariationGroupClassDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import serviceVariationDetailDuck from '@reducers/service/variation/detail'

const ServiceReservationCreateForm = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(serviceVariationDetailDuck.creators.createGroupClass())
  }, [])

  useEffect(() => {
    if(editing)
      initialize({
        ...detail.item,
        locations: detail.item.locations.map(({ id }) => id)
      })
    else
      initialize(ServiceVariationGroupClassDefaultConfig)
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      serviceVariationDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(values.sku_id === detail.item.sku_id)
      delete values.sku_id

    if(editing)
      return dispatch(serviceVariationDetailDuck.creators.putGroupClass({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(serviceVariationDetailDuck.creators.postGroupClass(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='service-group-class' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Service Group'
          readOnly
          required
          value={detail.form.service_group_name}/>
        <Form.Input
          label='Service Type'
          readOnly
          required
          value={detail.form.service_name}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Class Name'
          name='name'
          placeholder='Enter Class Name'
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
          control={Input}
          label='Class Size Limit'
          name='capacity'
          parse={parseInt}
          placeholder='Enter capacity'
          required
          type='number'/>
        <Field
          component={FormField}
          control={Input}
          iconPosition='left'
          label='Length'
          labelPosition='right'
          name='duration_minutes'
          placeholder='Enter length'
          required
          type='number'>
          <Icon name='clock outline'/>
          <input/>
          <Label content='minutes'/>
        </Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Duration'
          name='config.duration_value'
          parse={parseFloat}
          placeholder='Enter duration'
          required
          type='number'/>
        <Field
          component={FormField}
          control={Select}
          label='&nbsp;'
          name='config.duration_type'
          options={detail.form.duration_type_options}
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
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
          label='Locations'
          multiple
          name='locations'
          options={detail.form.location_options}
          placeholder='Select Locations'
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
          label='Active'
          name='is_active'
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
  form    : 'service-group-class',
  validate: values => {
    const schema = {
      name            : yup.string().required('Name is required'),
      capacity        : yup.number().typeError('Class size limit must be a number').required('Class size limit is required'),
      duration_minutes: yup.number().typeError('Length must be a number').required('Length is required'),
      locations       : yup.array().required('Choose at least one location'),
      sku_id          : yup.string().required('Custom Acct Cd is required'),
      config          : yup.object().shape({
        duration_value: yup.number().typeError('Duration must be a number').required('Duration is required')
      })
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ServiceReservationCreateForm)
