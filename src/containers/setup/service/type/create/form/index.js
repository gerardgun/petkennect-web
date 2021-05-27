import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Input, Select, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { ServiceDefaultConfig } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import serviceDetailDuck from '@reducers/service/detail'

import './styles.scss'

const selector = formValueSelector('service-type')

const ServiceTypeCreateForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(serviceDetailDuck.selectors.detail)
  const {
    service_group = null,
    locations = []
  } = useSelector(state => selector(state, 'service_group', 'locations'))

  useEffect(() => {
    // Get default data to create a new service type
    dispatch(serviceDetailDuck.creators.create())
  }, [])

  useEffect(() => {
    if(detail.status === 'GOT' && detail.form.service_group_options.length > 0)
      if(editing)
        change('service_group', detail.item.service_group)
      else
        change('service_group', detail.form.service_group_options[0].value)
  }, [ detail.status ])

  useEffect(() => {
    if(editing) {
      initialize({
        ...detail.item,
        pet_classes: detail.item.pet_classes.map(({ id }) => id),
        locations  : detail.item.locations.map(({ id }) => id)
      })

      dispatch(
        serviceDetailDuck.creators.createGetLocations({
          pet_class_ids: detail.item.pet_classes.map(({ id }) => id)
        })
      )
    } else {
      // Set default data for new register
      initialize(ServiceDefaultConfig)
    }
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      serviceDetailDuck.creators.resetItem()
    )
  }

  const _handlePetClassChange = petClassIds => {
    dispatch(
      serviceDetailDuck.creators.createGetLocations({
        pet_class_ids: petClassIds
      })
    )

    // Validating if current selected locations are valid
    const validSelectedLocationIds = locations.filter(locationId => {
      return detail.form.location_options.some(({ value }) => value === locationId)
    })

    change('locations', validSelectedLocationIds)
  }

  const _handleServiceGroupBtnClick = e => {
    change('service_group', parseInt(e.currentTarget.dataset.id))
  }

  const _handleSubmit = values => {
    if(values.sku_id === detail.item.sku_id)
      delete values.sku_id

    if(editing)
      return dispatch(serviceDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(serviceDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='service-type' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>

      {
        !editing && (
          <Button.Group basic className='service-type-form-buttons' fluid>
            {
              detail.form.service_group_options.map(({ value, text }) => (
                <Button
                  color={value === service_group ? 'teal' : null}
                  content={text}
                  data-id={value}
                  key={value}
                  onClick={_handleServiceGroupBtnClick}
                  type='button'/>
              ))
            }
          </Button.Group>
        )
      }

      <Form.Group widths={2}>
        <Form.Input
          label='Service Group'
          readOnly
          required
          value={detail.form.service_group_options.find(({ value }) => value === service_group)?.text}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Service Type'
          name='name'
          placeholder='Enter Service Type Name'
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

      <Header as='h6' className='section-header' color='blue'>Applies to</Header>

      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Species'
          multiple
          name='pet_classes'
          onChange={_handlePetClassChange}
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
  form    : 'service-type',
  validate: values => {
    const schema = {
      name       : yup.string().required('Name is required'),
      pet_classes: yup.array().required('Choose at least one service group'),
      locations  : yup.array().required('Choose at least one service group'),
      sku_id     : yup.string().required('Custom Acct Cd is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ServiceTypeCreateForm)
