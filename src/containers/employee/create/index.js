import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Checkbox, Dropdown, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import { parseResponseError, syncValidate } from '@lib/utils/functions'

import employeeDetailDuck from '@reducers/employee/detail'
import employeeTitleDuck from '@reducers/employee/title'
import locationDuck from '@reducers/location'
import userDuck from '@reducers/user'
import rolDuck from '@reducers/rol'
import { useDebounce } from '@hooks/Shared'

const EmployeeCreateForm = (props) => {
  const {
    employeeDetail,
    employeeTitle,
    location,
    user,
    role,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const [ customUser, setCustomUser ] = useState({ id: 'CUSTOM_USER_OPTION_ID', email: '' })
  useEffect(() => {
    props.getUsers()
    props.getEmployeeTitles()
    props.getLocations()
    props.getRoles()
  }, [])

  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    return props
      .post({ ...values })
      .then(_handleClose)
      .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(employeeDetail.mode), [ employeeDetail.mode ])

  const { _handleDebounce } = useDebounce((text)=> {
    props.setUserFilters({ search: text })
    props.getUsers()
  })

  const _handleSearchChange = (_, { searchQuery }) => _handleDebounce(searchQuery)

  const _handleUserOptionChange = (value) => {
    const latestValue = value[value.length  ? value.length - 1 : 0]

    if(!latestValue) {
      props.setUserFilters({ search: '' })
      props.getUsers()
    }

    const _user = user.items.find(_user => _user.email === latestValue)
    if(_user) {
      props.change('user_exists', true)
      props.change('first_name', _user.first_name)
      props.change('last_name', _user.last_name)
      props.change('user', _user.id)
      setCustomUser({ id: 'CUSTOM_USER_OPTION_ID', email: '' })

      return
    }
    props.change('user_exists', false)
    props.change('first_name', '')
    props.change('last_name', '')
  }

  const _handleUserOptionAddItem = (_, data) => {
    setCustomUser({
      id: 'CUSTOM_USER_OPTION_ID', email: data.value
    })
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
            New Employee
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Field component='input' name='user' type='hidden'/>
          <Field
            component='input' defaultValue={true} name='user_exists'
            type='hidden'/>
          <Header as='h6' className='section-header' color='blue'>SEARCH USER</Header>

          <Form.Group widths='equal'>
            <Field
              additionLabel='Invite '
              allowAdditions
              closeOnChange
              component={FormField}
              control={Dropdown}
              fluid
              format={value=>
                [ value ]
              }
              icon='search'
              label='Email user'
              multiple
              name='email'
              onAddItem={_handleUserOptionAddItem}
              onChange={_handleUserOptionChange}
              onSearchChange={_handleSearchChange}
              options={[ ...user.items,customUser ].map((_user) => ({
                key  : _user.id,
                value: _user.email,
                text : `${_user.email}`
              }))}
              parse={value =>
                value[value.length > 0 ? value.length - 1 : 0]
              }
              placeholder='Search email'
              required
              search
              selection
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Input}
              label='Name'
              name='first_name'
              placeholder='Enter name'
              readOnly={!!props.user_exists}
              required/>
            <Field
              component={FormField}
              control={Input}
              label='Lastname'
              name='last_name'
              placeholder='Enter lastname'
              readOnly={!!props.user_exists}/>
          </Form.Group>

          <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>

          <Form.Group widths='equal'>
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
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Active'
              name='status'
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
                content='Add employee'
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
        role         : rolDuck.selectors.list(state),
        user_exists  : formValueSelector('employee-create-form')(state, 'user_exists'),
        email        : formValueSelector('employee-create-form')(state, 'email')
      }
    },
    {
      post             : employeeDetailDuck.creators.post,
      resetItem        : employeeDetailDuck.creators.resetItem,
      getUsers         : userDuck.creators.get,
      setUserFilters   : userDuck.creators.setFilters,
      getEmployeeTitles: employeeTitleDuck.creators.get,
      getLocations     : locationDuck.creators.get,
      getRoles         : rolDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'employee-create-form',
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
)(EmployeeCreateForm)
