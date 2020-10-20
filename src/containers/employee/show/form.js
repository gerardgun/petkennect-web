import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Header, Input, Select, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import employeeDetailDuck from '@reducers/employee/detail'
import employeeTitleDuck from '@reducers/employee/title'
import locationDuck from '@reducers/location'
import rolDuck from '@reducers/rol'
import { syncValidate, parseResponseError } from '@lib/utils/functions'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

export const formId = 'employee-edit-form'

const EmployeeEditForm = (props) => {
  const {
    employeeDetail,
    employeeTitle,
    location,
    role,
    error,
    handleSubmit,
    reset
  } = props

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getEmployee(id)
    props.getEmployeeTitles()
    props.getLocations()
    props.getRoles()
  }, [])

  const _handleSubmit = (values) => {
    return props
      .put({ id: employeeDetail.item.id, ...values })
      .then(()=> history.replace('/employee'))
      .catch(parseResponseError)
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='First Name'
            name='first_name'
            placeholder='Enter first name'
            readOnly={true}
            required/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Last Name'
            name='last_name'
            placeholder='Enter last name'
            readOnly={true}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Email'
            labelPosition='left'
            name='email'
            placeholder='Enter Email'
            readOnly={true}
            required>
          </Field>
          <Field
            component={FormField}
            control={Select}
            label='Title'
            name='title'
            options={employeeTitle.items.map((_employeeTitle) => ({
              key  : _employeeTitle.id,
              value: _employeeTitle.id,
              text : `${_employeeTitle.name}`
            }))}
            placeholder='Select title'
            required
            search
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Field
            component={FormField}
            control={Select}
            label='Role'
            name='role'
            options={role.items.map((_location) => ({
              key  : _location.id,
              value: _location.id,
              text : `${_location.name}`
            }))}
            placeholder='Select role'
            required
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Select}
            label='Location'
            name='location'
            options={location.items.map((_location) => ({
              key  : _location.id,
              value: _location.id,
              text : `${_location.name}`
            }))}
            placeholder='Select location'
            required
            search
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            label='Active'
            name='is_active'
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
    </>
  )
}

export default compose(
  connect(
    (state) => {
      const employeeDetail = employeeDetailDuck.selectors.detail(state)

      return {
        employeeDetail,
        initialValues: employeeDetail.item,
        employeeTitle: employeeTitleDuck.selectors.list(state),
        location     : locationDuck.selectors.list(state),
        role         : rolDuck.selectors.list(state)
      }
    },
    {
      getEmployee      : employeeDetailDuck.creators.get,
      put              : employeeDetailDuck.creators.put,
      resetItem        : employeeDetailDuck.creators.resetItem,
      getEmployeeTitles: employeeTitleDuck.creators.get,
      getLocations     : locationDuck.creators.get,
      getRoles         : rolDuck.creators.get
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        role    : Yup.string().required('Role is required'),
        location: Yup.mixed().required('Location is required'),
        title   : Yup.mixed().required('Title is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmployeeEditForm)
