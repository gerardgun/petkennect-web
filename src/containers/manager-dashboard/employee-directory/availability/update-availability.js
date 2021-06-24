/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Form, TextArea, Input, Checkbox, Button, Header } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
// import {  parseFormValues } from '@lib/utils/functions'
import employeeTimeOffOtherDetailDuck from '@reducers/staff-management/employee-time-off/requests/other/detail'
import '../styles.scss'

const formId = 'availability-change-redux-form'

const items = [
  {
    id  : 1,
    day : 'Mon',
    name: 'monday'
  },
  {
    id  : 2,
    day : 'Tue',
    name: 'tuesday'
  },
  {
    id  : 3,
    day : 'Wed',
    name: 'wednesday'
  },
  {
    id  : 4,
    day : 'Thu',
    name: 'thursday'
  },
  {
    id  : 5,
    day : 'Fri',
    name: 'friday'
  },
  {
    id  : 6,
    day : 'Sat',
    name: 'saturday'
  },
  {
    id  : 7,
    day : 'Sun',
    name: 'sunday'
  }

]

const UpdateAvailabilityForm = (props)=>{
  const  { error, handleSubmit,
    reset // redux-form
  } = props

  const _handleSubmit = () => {
    // values = parseFormValues(values)
  }

  return (
    <>
      <div>
        <Header as='h3' className='mv8' color='teal'>Update Availability</Header>
      </div>
      <div className='update-time-input-padding'>
        <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)} >
          <Form.Group widths='equal'>
            <Field
              className='mt4'
              component={FormField}
              control={Input}
              label='Starting'
              name='start_date'
              style={{ width: '70%' }}
              type='date'/>

            <Field
              className='mt4'
              component={FormField}
              control={Input}
              label='Ending'
              name='end_date'
              style={{ width: '70%' }}
              type='date'/>
          </Form.Group>
          <div className='mv24 pr8'>
            <div className='flex justify-between align-center mb16'>
              <div style={{ width: '10%' }}><label className='av-change-h'>Day</label></div>
              <div style={{ width: '24%' }}><label className='av-change-h'>From</label></div>
              <div style={{ width: '24%' }}><label className='av-change-h'>To</label></div>
              <div className='flex justify-center' style={{ width: '17%' }}><label className='av-change-h'>Anytime</label></div>
              <div className='flex justify-center' style={{ width: '15%' }}><label className='av-change-h'>Unavailable</label></div>
            </div>
            {
              items && items.map(({ day, name }, index)=>{
                return (
                  <div className='flex justify-between align-center mb16' key={index}>
                    <div  style={{ width: '10%' }}>
                      <label>{day}</label>
                    </div>
                    <div style={{ width: '24%' }}>
                      <Field
                        component={FormField}
                        control={Input}
                        name={`${name}_start_time`}
                        type='time'/>
                    </div>
                    <div style={{ width: '24%' }}>
                      <Field
                        component={FormField}
                        control={Input}
                        name={`${name}_end_time`}
                        type='time'/>
                    </div>
                    <div className='flex justify-center' style={{ width: '15%' }}>
                      <Field
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        name={`${name}_anytime`}/>
                    </div>
                    <div className='flex justify-center' style={{ width: '15%' }}>
                      <Field
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        name={`${name}_unavailable`}/>
                    </div>
                  </div>

                )
              })
            }
          </div>
          <label>Add Note</label>
          <Field
            className='mt4'
            component={FormField}
            control={TextArea}
            name='notes'
            placeholder='Write here....'/>
          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }<Button
            className='w120 mv20' color='teal' content='Submit'
            floated='right'
            onClick={_handleSubmit}/>
        </Form>

      </div>
    </>

  )
}
export default compose(
  connect(
    state => {
      const employeeTimeOffDetail = employeeTimeOffOtherDetailDuck.selectors.detail(state)

      return {
        employeeTimeOffDetail,
        initialValues: employeeTimeOffOtherDetailDuck.item
      }
    },
    {
      resetItem: employeeTimeOffOtherDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true

  })
)(UpdateAvailabilityForm)
