/* eslint-disable react/jsx-handler-names */
import React,  { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Form, Modal, TextArea, Input, Checkbox, Button, Header } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import {  parseFormValues } from '@lib/utils/functions'
import employeeTimeOffOtherDetailDuck from '@reducers/staff-management/employee-time-off/requests/other/detail'
import '../styles.scss'

const formId = 'availability-change-redux-form'

const items = [
  {
    id  : 1,
    day : 'Monday',
    name: 'monday'
  },
  {
    id  : 2,
    day : 'Tuesday',
    name: 'tuesday'
  },
  {
    id  : 3,
    day : 'Wednesday',
    name: 'wednesday'
  },
  {
    id  : 4,
    day : 'Thursday',
    name: 'thursday'
  },
  {
    id  : 5,
    day : 'Friday',
    name: 'friday'
  },
  {
    id  : 6,
    day : 'Saturday',
    name: 'saturday'
  },
  {
    id  : 7,
    day : 'Sunday',
    name: 'sunday'
  }

]

const AvailabilityChangeForm = (props)=>{
  const  { employeeTimeOffDetail, error, handleSubmit,
    reset // redux-form
  } = props

  const _handleSubmit = values => {
    values = parseFormValues(values)
    console.log(values)
    console.log('submit runs')
  }

  const getIsOpened = (mode) => mode === 'CREATE' ||  mode === 'UPDATE'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(employeeTimeOffDetail.mode), [
    employeeTimeOffDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <div className='flex align-center' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)', height: '50px' }}>
        <Header as='h3' className='mb0' style={{ marginLeft: '40px' }}>
            Submit Availability Change Request
        </Header>
      </div>
      <Modal.Content>
        <div style={{ marginTop: '-10px' }}>
          <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)} >
            <label>Starting On</label>
            <Field
              className='mt4'
              component={FormField}
              control={Input}
              name='start_date'
              type='date'/>
            <div className='mv24'>
              <div className='flex justify-between align-center mb16'>
                <div style={{ width: '15%' }}><label className='av-change-h'>Day</label></div>
                <div style={{ width: '17%' }}><label className='av-change-h'>From</label></div>
                <div style={{ width: '17%' }}><label className='av-change-h'>To</label></div>
                <div className='flex justify-center' style={{ width: '10%' }}><label className='av-change-h'>Anytime</label></div>
                <div className='flex justify-center' style={{ width: '10%' }}><label className='av-change-h'>Unavailable</label></div>
              </div>
              {
                items && items.map(({ day, name }, index)=>{
                  return (
                    <div className='flex justify-between align-center mb16' key={index}>
                      <div  style={{ width: '15%' }}>
                        <label>{day}</label>
                      </div>
                      <div style={{ width: '17%' }}>
                        <Field
                          component={FormField}
                          control={Input}
                          name={`${name}_start_time`}
                          type='time'/>
                      </div>
                      <div  style={{ width: '17%' }}>
                        <Field
                          component={FormField}
                          control={Input}
                          name={`${name}_end_time`}
                          type='time'/>
                      </div>
                      <div className='flex justify-center' style={{ width: '10%' }}>
                        <Field
                          component={FormField}
                          control={Checkbox}
                          format={Boolean}
                          name={`${name}_anytime`}/>
                      </div>
                      <div className='flex justify-center' style={{ width: '10%' }}>
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
            <label>Ends On</label>
            <Field
              className='mt4'
              component={FormField}
              control={Input}
              name='end_date'
              type='date'/>
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
            <Button
              className='w120 mv20' content='Cancel' floated='right'
              onClick={_handleClose}
              type='button'/>

          </Form>

        </div>
      </Modal.Content>
    </Modal>
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
)(AvailabilityChangeForm)

