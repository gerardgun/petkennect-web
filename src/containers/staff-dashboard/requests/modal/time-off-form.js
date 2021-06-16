/* eslint-disable react/jsx-handler-names */
import React,  { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Form, Select, Modal, TextArea, Input, Checkbox, Button, Header } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import {  parseFormValues } from '@lib/utils/functions'
import employeeTimeOffDetailDuck from '@reducers/staff-management/employee-time-off/requests/upcoming/detail'
import '../styles.scss'

const formId = 'time-off-redux-form'

const TimeRequestForm = (props)=>{
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
      open={isOpened}
      size='small'>
      <div className='flex align-center' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)', height: '50px' }}>
        <Header as='h3' className='mb0' style={{ marginLeft: '40px' }}>
            Time Off Request
        </Header>
      </div>
      <Modal.Content>
        <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)} >
          <div className='flex align-baseline justify-between mb20'>
            <label>Employee</label>
            <div style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={Select}
                fluid
                name='employee_name'
                options={[
                  {
                    key: 1, value: 1, text: 'Chirs Morries'
                  },{
                    key: 2, value: 2, text: 'Dale Stayne'
                  },{
                    key: 3, value: 3, text: 'Quanten D'
                  } ]}
                placeholder='Employee Name'/>
            </div>
          </div>
          <div className='flex align-baseline justify-between mb20'>
            <label>Category</label>
            <div style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={Select}
                name='category'
                options={[
                  {
                    key: 1, value: 1, text: 'Paid Time Off'
                  },{
                    key: 2, value: 2, text: 'Unpaid Time Off'
                  } ]}
                placeholder='Category'/>
            </div>
          </div>
          <div className='flex align-baseline justify-between mb20'>
            <label>Reason</label>
            <div style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={Select}
                name='reason'
                options={[
                  {
                    key: 1, value: 1, text: 'Vacation(Unpaid)'
                  },{
                    key: 2, value: 2, text: 'Reason 2'
                  } ]}
                placeholder='Reason'/>
            </div>
          </div>
          <div className='flex justify-between mb20'>
            <label>Note</label>
            <div style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={TextArea}
                name='notes'
                placeholder='Write here....'/>
            </div>
          </div>
          <div className='flex align-baseline justify-between mb20'>
            <label>Start Date</label>
            <div style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={Input}
                name='start_date'
                type='date'/>
            </div>
          </div>
          <div className='flex align-baseline justify-between mb20'>
            <label>End Date</label>
            <div style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={Input}
                name='end_date'
                type='date'/>
            </div>
          </div>
          <div className='flex align-center justify-between mb20'>
            <label>Whole Day</label>
            <div className='label-toggle' style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                name='whole_day'
                toggle
                type='checkbox'/>
            </div>
          </div>
          <div className='flex align-baseline justify-between mb20'>
            <label>Total Hours</label>
            <div style={{ width: '80%' }}>
              <Field
                component={FormField}
                control={Input}
                max={24}
                name='total_hours'
                type='number'/>
            </div>
          </div>
          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }
          <Button
            className='w120 mv20' color='teal' content='Save'
            floated='right'/>
          <Button
            className='w120 mv20' content='Cancel' floated='right'
            onClick={_handleClose}
            type='button'/>
        </Form>

      </Modal.Content>
    </Modal>
  )
}
export default compose(
  connect(
    state => {
      const employeeTimeOffDetail = employeeTimeOffDetailDuck.selectors.detail(state)

      return {
        employeeTimeOffDetail,
        initialValues: employeeTimeOffDetailDuck.item
      }
    },
    {
      resetItem: employeeTimeOffDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true

  })
)(TimeRequestForm)

