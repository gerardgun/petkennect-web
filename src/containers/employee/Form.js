import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import {
  Button,
  Form,
  Header,
  Modal,
  FormGroup

} from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import { parseResponseError, syncValidate } from '@lib/utils/functions'

import employeeDetailDuck from '@reducers/employee/detail'
import employeeTitleDuck from '@reducers/employee/title'
import locationDuck from '@reducers/location'
import userDuck from '@reducers/user'
import { useStateDerivedFromProps } from '@hooks/Shared'

const EmployeeForm = (props) => {
  const {
    employeeDetail,
    employeeTitle,
    location,
    user,
    setFieldValue,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const [ userOptions, setUserOptions ] = useStateDerivedFromProps(user.items)
  useEffect(() => {
    props.getUsers()
    props.getEmployeeTitles()
    props.getLocations()
  }, [])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => props.resetItem()

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

  const isOpened = useMemo(() => getIsOpened(employeeDetail.mode), [
    employeeDetail.mode
  ])
  const isUpdating = Boolean(employeeDetail.item.id)

  const _handleUserOptionChange = (value) => {
    const latestValue = value[value.length  ? value.length - 1 : 0]

    const user = userOptions.find(_user => _user.email === latestValue)
    if(user) {
      setFieldValue('employee-form','user_exists', true)
      setFieldValue('employee-form','first_name', user.first_name)
      setFieldValue('employee-form','last_name', user.last_name)
      setFieldValue('employee-form','user', user.id)
      setUserOptions(userOptions.filter(_user => _user.id !== 'CUSTOM_USER_OPTION_ID'))

      return
    }
    setFieldValue('employee-form','user_exists', false)
    setFieldValue('employee-form','first_name', '')
    setFieldValue('employee-form','last_name', '')
  }

  const _handleUserOptionAddItem = (_, data) => {
    const  user = userOptions.find(({ id }) => id === 'CUSTOM_USER_OPTION_ID')
    if(user) {
      setUserOptions(
        userOptions.map((_user) =>
          _user.id === 'CUSTOM_USER_OPTION_ID'
            ? { id: 'CUSTOM_USER_OPTION_ID', email: data.value }
            : _user
        )
      )

      return
    }
    setUserOptions([
      ...userOptions,
      { id: 'CUSTOM_USER_OPTION_ID', email: data.value }
    ])
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Employee
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Field component='input' name='user' type='hidden'/>
          <Field
            component='input' defaultValue={true} name='user_exists'
            type='hidden'/>
          {/* <Field component='input' name='email' type='hidden'/> */}
          <FormGroup widths='equal'>
            <Field
              additionLabel='Invite '
              allowAdditions
              closeOnChange
              component={FormField}
              control={Form.Dropdown}
              disabled={isUpdating}
              fluid
              format={value=> {
                return [ value ]
              }}
              label='Add or Search some PetKennect User*'
              multiple
              name='email'
              onAddItem={_handleUserOptionAddItem}
              onChange={_handleUserOptionChange}
              options={userOptions.map((_user) => ({
                key  : _user.id,
                value: _user.email,
                text : `${_user.email}`
              }))}
              parse={value =>
                value[value.length > 0 ? value.length - 1 : 0]
              }
              placeholder='Search user by email'
              search
              selection
              selectOnBlur={false}/>
          </FormGroup>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              disabled={!!props.user_exists || isUpdating}
              label='Name *'
              name='first_name'
              placeholder='Enter name'/>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              disabled={!!props.user_exists || isUpdating}
              label='Lastname'
              name='last_name'
              placeholder='Enter lastname'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Select}
              label='Title *'
              name='title'
              options={employeeTitle.items.map((_employeeTitle) => ({
                key  : _employeeTitle.id,
                value: _employeeTitle.id,
                text : `${_employeeTitle.name}`
              }))}
              placeholder='Select title'
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Location *'
              name='location'
              options={location.items.map((_location) => ({
                key  : _location.id,
                value: _location.id,
                text : `${_location.name}`
              }))}
              placeholder='Select location'
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Checkbox}
              label='ACTIVE'
              name='status'
              toggle
              type='checkbox'/>
          </Form.Group>

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
    (state) => {
      const employeeDetail = employeeDetailDuck.selectors.detail(state)

      return {
        employeeDetail,
        initialValues: employeeDetail.item,
        user         : userDuck.selectors.list(state),
        employeeTitle: employeeTitleDuck.selectors.list(state),
        location     : locationDuck.selectors.list(state),
        user_exists  : formValueSelector('employee-form')(state, 'user_exists'),
        email        : formValueSelector('employee-form')(state, 'email')
      }
    },
    {
      post             : employeeDetailDuck.creators.post,
      put              : employeeDetailDuck.creators.put,
      resetItem        : employeeDetailDuck.creators.resetItem,
      getUsers         : userDuck.creators.get,
      getEmployeeTitles: employeeTitleDuck.creators.get,
      getLocations     : locationDuck.creators.get,
      setFieldValue    : change
    }
  ),
  reduxForm({
    form              : 'employee-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        first_name: Yup.string().when('user_exists', {
          is  : true,
          then: (s) => s.required('Name is required')
        }),
        user: Yup.mixed().when('user_exists', {
          is  : true,
          then: (m) => m.required('User is Required')
        }),
        location: Yup.mixed().required('Location is required'),
        title   : Yup.mixed().required('Title is required'),
        email   : Yup.string().email().required('Email is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmployeeForm)
