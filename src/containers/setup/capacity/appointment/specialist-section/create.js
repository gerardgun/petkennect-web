import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'

const EmployeeForm = (props) => {
  const {
    employeeDetail,
    employeeList,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(()=> {
    if(employeeDetail.item.id) props.get(employeeDetail.item.id)
  }, [ employeeDetail.item.id ])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: employeeDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(employeeDetail.item.id)
  const open = [ 'CREATE', 'UPDATE' ].includes(employeeDetail.mode)

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
            {isUpdating ? 'Update' : 'New'} Specialist
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Role'
              name='role_id'
              options={[
                { value: 1, text: 'Groomer' },
                { value: 2, text: 'Bather' },
                { value: 3, text: 'Trainer' },
                { value: 4, text: 'Dog Walker' }
              ]}
              placeholder='Select Role'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Specialist'
              name='employee_id'
              options={
                employeeList.items.map(({ id, first_name, last_name }) => ({
                  value: id,
                  text : `${first_name} ${last_name}`
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
              label='Service Type'
              name='service_id'
              options={[
                { value: 1, text: 'Grooming' },
                { value: 2, text: 'Bathing' },
                { value: 3, text: 'Training' },
                { value: 4, text: 'Dog Walking' }
              ]}
              placeholder='Select Service Type'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Max Scheduled Per Day'
              name='max_scheduled_per_day'
              placeholder='0'
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
      const employeeDetail = employeeDetailDuck.selectors.detail(state)

      return {
        employeeDetail,
        employeeList : employeeDuck.selectors.list(state),
        initialValues: employeeDetail.item
      }
    },
    {
      get      : employeeDetailDuck.creators.get,
      post     : employeeDetailDuck.creators.post,
      put      : employeeDetailDuck.creators.put,
      resetItem: employeeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'employee-appointment-capacity',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmployeeForm)
