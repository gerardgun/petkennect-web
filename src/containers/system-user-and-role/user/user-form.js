import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Select, Modal, Grid, Input, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import { syncValidate } from '@lib/utils/functions'

import userDetailDuck from '@reducers/system-user-and-role/user/detail'
import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'
import locationDuck from '@reducers/location'

import EmployeeCreateForm from '../../manager-dashboard/employee-directory/form/modal'
import '../styles.scss'

const UserForm = (props) => {
  const {
    userDetail,
    locations,
    create_employee_form,
    error, handleSubmit, reset // redux-form
  } = props

  const [ KennelAccess, setKennelAccess ] = useState()
  const [ StaffManagerAccess, setStaffManagerAccess ] = useState()
  const [ hasStaffManager, setHasStaffManager ] = useState(true)

  useEffect(()=> {
    props.getLocations()
    setHasStaffManager(true)
  }, [ ])

  const saving = [ 'POSTING', 'PUTTING' ].includes(userDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(userDetail.mode)

  const _handleKennelAccess = (e, { name }) => setKennelAccess(name)
  const _handleStaffManagerAccess = (e, { name }) => setStaffManagerAccess(name)

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = () => {
    if(userDetail.mode !== 'UPDATE')
      if(create_employee_form === true) {
        props.setEmployeeItem(null, 'CREATE')
      }
    props.reset()
    props.resetItem()
  }

  const isUpdating = userDetail.mode === 'UPDATE' ? true : false

  return (
    <>
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='medium'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='user-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} System User
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Grid>
            <Grid.Column width={16}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='First Name'
                  name='first_name'
                  required/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Last Name'
                  name='last_name'
                  required/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Email Address'
                  name='use_email'
                  required
                  type='email'/>
                <Field
                  component={FormField}
                  control={InputMask}
                  label='Phone Number'
                  mask='(999) 999-9999'
                  name='phone_number'/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Primary Location'
                  name='primary_location'
                  options={locations.items.map((_location) => ({
                    key  : _location.id,
                    value: _location.id,
                    text : `${_location.name}`
                  }))}
                  required/>
                <Field
                  component={FormField}
                  control={Select}
                  label='Other Available Locations'
                  multiple={true}
                  name='other_available_locations'
                  options={locations.items.map((_location) => ({
                    key  : _location.id,
                    value: _location.id,
                    text : `${_location.name}`
                  }))}
                  required/>
              </Form.Group>
              <Form.Group widths='equal'>
                {
                  userDetail.mode === 'UPDATE' && (
                    <Field
                      component={FormField}
                      control={Input}
                      label='Password'
                      name='user_password'
                      type='password'/>
                  )
                }
                <Field
                  className='mt28'
                  component={FormField}
                  control={Checkbox}
                  label='Active'
                  name='status'
                  type='checkbox'/>
              </Form.Group>
            </Grid.Column>
            <Grid.Column width={16}>
              <Header as='h3' className='pb0 mb12' color='teal'>Kennel Application Permission Group:</Header>
              <Button
                basic={KennelAccess !== 'no_access'} color='teal'
                content='No Access' name='no_access'
                onClick={_handleKennelAccess} type='button'/>
              <Button
                basic={KennelAccess !== 'read_only'} color='teal'
                content='Read Only' name='read_only'
                onClick={_handleKennelAccess} type='button'/>
              <Button
                basic={KennelAccess !== 'customer_service'} color='teal'
                content='Customer Service' name='customer_service'
                onClick={_handleKennelAccess} type='button'/>
              <Button
                basic={KennelAccess !== 'manager'} color='teal'
                content='Manager' name='manager'
                onClick={_handleKennelAccess} type='button'/>
              <Button
                basic={KennelAccess !== 'admin'} color='teal'
                content='Admin' name='admin'
                onClick={_handleKennelAccess} type='button'/>
              <Button
                basic={KennelAccess !== 'supervisor'} color='teal'
                content='Supervisor' name='supervisor'
                onClick={_handleKennelAccess} type='button'/>
            </Grid.Column>
            {
              hasStaffManager === true && (
                <Grid.Column className='button-color-user-staff' width={16}>
                  <Header as='h3' className={userDetail.mode !== 'UPDATE' ? 'pb0 mb0' : 'pb0 mb12'} style={{ color: '#306EFF' }}>Staff Manager Access Level:</Header>
                  {
                    userDetail.mode !== 'UPDATE' && (
                      <Form.Group  className='mt8' widths='equal'>
                        <Field
                          component={FormField}
                          control={Checkbox}
                          label='Create Employee after saving user'
                          name='create_employee_form'
                          type='checkbox'/>
                      </Form.Group>
                    )
                  }
              <Button
                basic={StaffManagerAccess !== 'employee'}
                content='Employee' name='employee'
                onClick={_handleStaffManagerAccess}
                style={{ backgroundColor: StaffManagerAccess !== 'employee' ? '' : '#306EFF',
                color: StaffManagerAccess !== 'employee' ? '' : 'white' }}
                type='button'/>
              <Button
                basic={StaffManagerAccess !== 'manager'}
                content='Manager' name='manager'
                onClick={_handleStaffManagerAccess}
                style={{ backgroundColor: StaffManagerAccess !== 'manager' ? '' : '#306EFF',
                color: StaffManagerAccess !== 'manager' ? '' : 'white' }}
                type='button'/>
              <Button
                basic={StaffManagerAccess !== 'admin'}
                content='Admin' name='admin'
                onClick={_handleStaffManagerAccess}
                style={{ backgroundColor: StaffManagerAccess !== 'admin' ? '' : '#306EFF',
                color: StaffManagerAccess !== 'admin' ? '' : 'white' }}
                type='button'/>
              <Button
                basic={StaffManagerAccess !== 'supervisor'}
                content='Supervisor' name='supervisor'
                onClick={_handleStaffManagerAccess}
                style={{ backgroundColor: StaffManagerAccess !== 'supervisor' ? '' : '#306EFF',
                color: StaffManagerAccess !== 'supervisor' ? '' : 'white' }}
                type='button'/>
            </Grid.Column>
              )
            }
            {
              hasStaffManager !== true && (
                <Grid.Column className='mt20' width={10}>
                  <Field
                  component={FormField}
                  control={Select}
                  label='Assign Role'
                  multiple={true}
                  name='assign_roles'
                  options={[
                    { key: 1, value: 'manager', text: 'Manager' },
                    { key: 2, value: 'trainer', text: 'Trainer' },
                    { key: 3, value: 'groomer', text: 'Groomer' }
                  ]}/>
                </Grid.Column>
              )
            }

            <Grid.Column width={16}>
            <Form.Group widths='equal'>
              <Field
                className='mb0'
                  component={FormField}
                  control={Checkbox}
                  label='Send SMS instructions to User'
                  name='sms_instruction'
                  type='checkbox'/>
              </Form.Group>
              <Form.Group className='mt8' widths='equal'>
                <Field
                  component={FormField}
                  control={Checkbox}
                  label='Send e-mail instructions to User'
                  name='email_instruction'
                  type='checkbox'/>
              </Form.Group>
            </Grid.Column>
          </Grid>
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={saving}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save Changes' : 'Save'}
                disabled={saving}
                loading={saving}
                type='submit'/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
    <EmployeeCreateForm/>
    </>
  )
}

export default compose(
  connect(
    (state) => {
      const userDetail = userDetailDuck.selectors.detail(state)
      const create_employee_form = formValueSelector('user-form')(state, 'create_employee_form')

      return {
        userDetail,
        create_employee_form,
        locations    : locationDuck.selectors.list(state),
        initialValues: { sms_instruction: true, email_instruction: true, create_employee_form: true }
      }
    },
    {
      getLocations   : locationDuck.creators.get,
      setEmployeeItem: personalInformationDetailDuck.creators.setItem,
      post           : userDetailDuck.creators.post,
      put            : userDetailDuck.creators.put,
      resetItem      : userDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'user-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        user_email: Yup.string().required('Email is required'),
        primary_location: Yup.string().required('Primary Location is required'),
        other_available_locations: Yup.string().required('Other Locations is required')

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(UserForm)

