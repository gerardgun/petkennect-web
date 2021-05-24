import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import locatioDuck from '@reducers/location'
import serviceDuck from '@reducers/service'
import serviceDetailDuck from '@reducers/service/detail'

const ServiceFormModal = (props) => {
  const {
    locationList,
    serviceDetail,
    serviceList,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(() => {
    // if(serviceDetail.item.id) props.get(serviceDetail.item.id)

    if(serviceList.items.length === 0) props.getServices()
  }, [ serviceDetail.item.id ])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: serviceDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(serviceDetail.item.id)
  const open = [ 'CREATE', 'UPDATE' ].includes(serviceDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'New'} Service Type
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Service Group'
              name='service_group_id'
              options={[
                { text: 'Day Services', value: 'Day Services' },
                { text: 'Boarding', value: 'Boarding' },
                { text: 'Training', value: 'Training' },
                { text: 'Grooming', value: 'Grooming' }
              ]}
              placeholder='Select Service Group'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Service Type'
              name='service_id'
              options={
                serviceList.items.map(({ id, name }) => ({
                  value: id,
                  text : name
                }))
              }
              placeholder='Select Service Type'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Applies to location'
              name='location_id'
              options={
                locationList.items.map(({ id, name }) => ({
                  value: id,
                  text : name
                }))
              }
              placeholder='Select Locations'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Applies to Species'
              name='pet_kind_id'
              options={[
                { value: 1, text: 'Dog' },
                { value: 2, text: 'Cat' },
                { value: 3, text: 'Rabbit' },
                { value: 4, text: 'Bird' }
              ]}
              placeholder='Select Species'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Group Play Service'
              name='group_play_service_enabled'
              type='checkbox'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Type'
              name='pet_kind_id'
              options={[
                { value: 1, text: 'Reservation' },
                { value: 2, text: 'Appointment' }
              ]}
              placeholder='Select type'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Is Scheduled'
              name='is_scheduled'
              type='checkbox'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Time Offered'
              name='time_offered'
              options={[
                { value: 1, text: 'Business Hours' },
                { value: 2, text: 'Custom' }
              ]}
              placeholder='Select Time Offered'
              required
              search
              selectOnBlur={false}/>
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

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                className='w120'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Done'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const serviceDetail = serviceDetailDuck.selectors.detail(state)

      return {
        serviceDetail,
        locationList : locatioDuck.selectors.list(state),
        serviceList  : serviceDuck.selectors.list(state),
        initialValues: serviceDetail.item
      }
    },
    {
      get        : serviceDetailDuck.creators.get,
      getServices: serviceDuck.creators.get,
      post       : serviceDetailDuck.creators.post,
      put        : serviceDetailDuck.creators.put,
      resetItem  : serviceDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'service-capacity',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ServiceFormModal)
