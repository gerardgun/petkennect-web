import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Grid, Header, Form, Input, Button, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import { syncValidate } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import InputMask from '@components/Common/InputMask'
import DepartmentRole from './department-role'

import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'

export const formId = 'personal-info-form'

function PersonalInformationForm(props) {
  const {
    error, handleSubmit, reset // redux-form
  } = props

  const _handleSubmit = () => {
  }

  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <>
              <Grid>
                <Grid.Column width={8}>
                  <Header as='h6' className='section-header' color='teal'>Basics</Header>
                  <Field
                    component={FormField}
                    control={Input}
                    label='First Name'
                    name='first_name'
                    placeholder='Enter name'
                    required/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Last Name'
                    name='last_name'
                    placeholder='Enter lastname'
                    required/>
                  <Field
                    autoComplete='off'
                    component={FormField}
                    control={Input}
                    label='Work Email'
                    name='work_email'
                    placeholder='Enter work email'
                    type='email'
                    required/>
                  <Field
                    autoComplete='off'
                    component={FormField}
                    control={Input}
                    label='Personal Email'
                    name='personal_email'
                    placeholder='Enter personal email'
                    type='email'/>
                  <Field
                    autoComplete='off'
                    component={FormField}
                    control={InputMask}
                    label='Mobile Phone'
                    mask='(999) 999-9999'
                    name='mobile_phone'
                    placeholder='Enter mobile number'
                    type='tel'
                    required/>
                  <Field
                    autoComplete='off'
                    component={FormField}
                    control={InputMask}
                    label='SSN'
                    mask='999-99-9999'
                    name='ssn'
                    placeholder='Enter SSN'
                    type='number'
                    required/>
                  <Field
                    autoFocus
                    component={FormField}
                    control={Input}
                    label='Birthday'
                    name='birthday'
                    required
                    type='date'/>
                </Grid.Column>

                <Grid.Column width={8}>
                  <Header as='h6' className='section-header' color='teal'>Emergency Contact</Header>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Full Name'
                    name='full_name'
                    placeholder='Enter full name'
                    required/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Relation'
                    name='relation'
                    placeholder='Enter relation'
                    required/>
                  <Field
                    autoComplete='off'
                    component={FormField}
                    control={InputMask}
                    label='Phone Number'
                    mask='(999) 999-9999'
                    name='phone_number'
                    placeholder='Enter phone number'
                    type='tel'
                    required/>

                  <Grid  className='mt40 pt36'>
                    <Grid.Column className='pb0' width={7}>
                      <Header as='h6' className='section-header mt8' color='teal'>Login Credentials</Header>
                    </Grid.Column>
                    <Grid.Column className='pb0' width={9}>
                      <Button
                        color='teal'
                        content='Change Password' name='password'/>
                    </Grid.Column>
                    <Grid.Column width={16}>
                      <Field
                        component={FormField}
                        control={Input}
                        label='User Id'
                        name='user_id'
                        placeholder='Enter user id'
                        required/>
                      <Field
                        component={FormField}
                        control={Input}
                        label='Pin'
                        name='pin'
                        placeholder='Enter pin'
                        required/>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid>

              <Grid>
                <Grid.Column className='pt28' width={8}>
                  <Header as='h6' className='section-header' color='teal'>Home Address</Header>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Address Line 1'
                    name='address_line1'
                    placeholder='Enter Address'
                    required/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Address Line 2'
                    name='address_line2'
                    placeholder='Enter Address'/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Zip/Postal Code'
                    name='zip_postal_code'
                    placeholder='Enter zip/postal code'
                    required/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='City'
                    name='city'
                    placeholder='Enter city'
                    required/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='State/Province'
                    name='state_province'
                    placeholder='Enter state/province'
                    required/>
                </Grid.Column>

                <Grid.Column className='pt28' width={8}>
                  <Header as='h6' className='section-header' color='teal'>Company Information</Header>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Primary Location'
                    name='primary_location'
                    placeholder='Enter Primary Location'
                    required/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Hire Date'
                    name='hire_date'
                    required
                    type='date'/>
                  <Field
                    component={FormField}
                    control={Input}
                    label='Annual PTO Days'
                    name='annual_PTO_days'
                    placeholder='Enter annual PTO days'
                    required/>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    label='Active'
                    name='status'
                    type='checkbox'/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='mt20' width={16}>
                  <Header as='h6' className='section-header' color='teal'>Department {' & '} Role</Header>
                  <FieldArray
                    component={DepartmentRole}
                    name='department_role'/>
                </Grid.Column>
              </Grid>
            </>
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

        </Grid.Column>
      </Grid>
    </>
  )
}

export default compose(
  connect(
    state => ({
      personalInformationDetail: personalInformationDetailDuck.selectors.detail(state)
    }), {
      setItem: personalInformationDetailDuck.creators.setItem
    }),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        work_email: Yup.string().required('Email is required'),
        mobile_phone: Yup.string().required('Mobile Number is required'),
        ssn: Yup.string().required('SSN is required'),
        birthday: Yup.string().required('Birthday is required'),
        full_name: Yup.string().required('Name is required'),
        relation: Yup.string().required('Relation is required'),
        phone_number: Yup.string().required('Phone Number is required'),
        user_id: Yup.string().required('User Id is required'),
        pin: Yup.string().required('Pin is required'),
        address_line1: Yup.string().required('Address is required'),
        zip_postal_code: Yup.string().required('Zip/Postal Code is required'),
        primary_location: Yup.string().required('Location is required'),
        hire_date: Yup.string().required('Hire Date is required'),
        annual_PTO_days: Yup.string().required('Annual PTO Days is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PersonalInformationForm)
