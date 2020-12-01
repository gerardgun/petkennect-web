import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Checkbox, TextArea, Select, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import calendarDetailDuck from '@reducers/calendar/detail'

const CalendarCreateForm = props => {
  const {
    calendarDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: calendarDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(calendarDetail.mode), [ calendarDetail.mode ])
  const isUpdating = Boolean(calendarDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>Edit Calendar</Header>
          <Field component='input' name='id' type='hidden'/>

          <Form.Group widths='equal'>
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
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Location'
              multiple={true}
              name='location'
              options={[
                { key: 1, value: 1, text: 'All' },
                { key: 2, value: 2, text: 'location1' },
                { key: 3, value: 3, text: 'location2' },
                { key: 4, value: 4, text: 'location3' }
              ]}
              placeholder='Select option'
              selectOnBlur={false}/>
          </Form.Group>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Peak Pricing Applies'
              name='peak_pricing_applies'
              type='checkbox'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Services at Max Capacity'
              name='services_at_max_capacity'
              type='checkbox'/>
          </Form.Group>

          {

            props.hasServicesAtMaxCapacity && (
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Service'
                  multiple={true}
                  name='service_type'
                  options={[
                    { key: 1, value: 1, text: 'Daycamp' },
                    { key: 2, value: 2, text: 'Boarding' },
                    { key: 3, value: 3, text: 'Training' }
                  ]}
                  placeholder='Select option'
                  selectOnBlur={false}/>
              </Form.Group>
            )
          }
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Holiday'
              name='holiday'
              type='checkbox'/>
          </Form.Group>
          {
            props.hasHoliday && (
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={TextArea}
                  label='Holiday Description'
                  name='holiday_desc'
                  placeholder='Enter holiday description'/>
              </Form.Group>
            )
          }
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
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
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
      const calendarDetail = calendarDetailDuck.selectors.detail(state)
      const { holiday, services_at_max_capacity } = formValueSelector('calendar-form')(state, 'holiday', 'services_at_max_capacity')

      return {
        calendarDetail,
        initialValues           : calendarDetail.item,
        hasHoliday              : Boolean(holiday),
        hasServicesAtMaxCapacity: Boolean(services_at_max_capacity)
      }
    },
    {
      post     : calendarDetailDuck.creators.post,
      put      : calendarDetailDuck.creators.put,
      resetItem: calendarDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'calendar-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CalendarCreateForm)
