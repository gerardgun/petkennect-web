/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Form, TextArea, Input, Checkbox, Header } from 'semantic-ui-react'
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

const CurrentAvailabilityForm = (props)=>{
  const  { error, handleSubmit,
    reset // redux-form
  } = props

  const _handleSubmit = () => {
    // console.log(values)
  }

  return (
    <>
      <div>
        <Header as='h3' className='mv8' color='teal'>Current Availability</Header>
      </div>
      <div className='current-time-input-padding'>
        <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)} >
          <Form.Group widths='equal'>
            <Field
              className='mt4'
              component={FormField}
              control={Input}
              label='Starting'
              name='current_start_date'
              style={{ width: '60%' }}/>

            <Field
              className='mt4'
              component={FormField}
              control={Input}
              label='Ending'
              name='current_end_date'
              style={{ width: '60%' }}/>
          </Form.Group>

          <div className='mv24 pr16'>
            <div className='flex justify-between align-center mb16'>
              <div style={{ width: '10%' }}><label className='av-change-h'>Day</label></div>
              <div style={{ width: '20%' }}><label className='av-change-h'>From</label></div>
              <div style={{ width: '20%' }}><label className='av-change-h'>To</label></div>
              <div className='flex justify-center' style={{ width: '15%' }}><label className='av-change-h'>Anytime</label></div>
              <div className='flex justify-center' style={{ width: '15%' }}><label className='av-change-h'>Unavailable</label></div>
            </div>
            {
              items && items.map(({ day, name }, index)=>{
                return (
                  <div className='flex justify-between align-center mb16' key={index}>
                    <div  style={{ width: '10%' }}>
                      <label>{day}</label>
                    </div>
                    <div style={{ width: '20%' }}>
                      <Field
                        component={FormField}
                        control={Input}
                        name={`${name}_current_start_time`}/>
                    </div>
                    <div  style={{ width: '20%' }}>
                      <Field
                        component={FormField}
                        control={Input}
                        name={`${name}_current_end_time`}/>
                    </div>
                    <div className='flex justify-center' style={{ width: '15%' }}>
                      <Field
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        name={`${name}_current_anytime`}/>
                    </div>
                    <div className='flex justify-center' style={{ width: '15%' }}>
                      <Field
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        name={`${name}_current_unavailable`}/>
                    </div>
                  </div>

                )
              })
            }
          </div>
          <label>Notes</label>
          <Field
            className='mt4'
            component={FormField}
            control={TextArea}
            name='notes'/>
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
)(CurrentAvailabilityForm)
