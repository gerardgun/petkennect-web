import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Grid, Header, Segment, Image, Breadcrumb, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import Layout from '@components/Common/Layout'

import employeeDetailDuck from '@reducers/employee/detail'
import employeeTitleDuck from '@reducers/employee/title'
import locationDuck from '@reducers/location'
import userDuck from '@reducers/user'
import rolDuck from '@reducers/rol'
import { syncValidate, parseResponseError } from '@lib/utils/functions'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputFile from '@components/Common/InputFile'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const EmployeeEditForm = (props) => {
  const {
    employeeDetail,
    employeeTitle,
    location,

    role,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getEmployee(id)
    props.getUsers()
    props.getEmployeeTitles()
    props.getLocations()
    props.getRoles()

    return () => {
      reset()
      props.resetItem()
    }
  }, [])

  const _handleSubmit = (values) => {
    return props
      .put({ id: employeeDetail.item.id, ...values })
      .then(()=> history.replace('/employee'))
      .catch(parseResponseError)
  }

  const fullname = `${employeeDetail.item.first_name || ''} ${employeeDetail.item.last_name || ''}`

  return (
    <Layout>

      <Segment className='segment-content' padded='very'>
        <Grid>
          <Grid.Column textAlign='left' width={8}>
            <Breadcrumb>
              <Breadcrumb.Section link>
                <Link to='/employee'>Employees</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active link>
                {fullname}
              </Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column >
          <Grid.Column textAlign='right' width={8}>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel' disabled={submitting}
              size='small'
              to={()=> history.goBack()}/>
            <Button
              className='ml16'
              color='teal'
              content='Save Changes'
              disabled={submitting}
              loading={submitting}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={handleSubmit(_handleSubmit)}
              size='small'/>
          </Grid.Column>

        </Grid>
        <div  className='flex align-center mt35'>
          <Image avatar className='img-40' src={employeeDetail.item.image_url || defaultImage}/>
          <div className='c-thumbnail'>
            <div className='title'>{fullname}</div>
            <div className='description'>Employee</div>
          </div>
        </div>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>

          <Field component='input' name='id' type='hidden'/>
          <Field component='input' name='user' type='hidden'/>
          <Field
            component='input' defaultValue={true} name='user_exists'
            type='hidden'/>
          <Header as='h4' className='form-section-header mt35' color='blue'>BASIC INFORMATION</Header>

          <Form.Group widths='equal'>

            <Field
              component={FormField}
              control={Form.Input}
              label='Email *'
              name='email'
              placeholder='Enter email'
              readOnly/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Name *'
              name='first_name'
              placeholder='Enter name'
              readOnly/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Lastname'
              name='last_name'
              placeholder='Enter lastname'
              readOnly/>
          </Form.Group>
          <Form.Group widths='equal'>
            <InputFile
              change={props.change} label='Profile picture' name='profile_picture'
              onlyImage placeholder='Upload image'/>

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
              label='Role *'
              name='role'
              options={role.items.map((_location) => ({
                key  : _location.id,
                value: _location.id,
                text : `${_location.name}`
              }))}
              placeholder='Select role'
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
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
            <Field
              className='mt35'
              component={FormField}
              control={Form.Checkbox}
              label='Active'
              name='status'
              type='checkbox'/>
            <Form.Field/>
          </Form.Group>

          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}
        </Form>

      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => {
      const employeeDetail = employeeDetailDuck.selectors.detail(state)

      return {
        employeeDetail,
        initialValues: { ...employeeDetail.item, profile_picture: null },
        user         : userDuck.selectors.list(state),
        employeeTitle: employeeTitleDuck.selectors.list(state),
        location     : locationDuck.selectors.list(state),
        role         : rolDuck.selectors.list(state),
        user_exists  : formValueSelector('employee-edit-form')(state, 'user_exists'),
        email        : formValueSelector('employee-edit-form')(state, 'email')
      }
    },
    {
      getEmployee      : employeeDetailDuck.creators.get,
      put              : employeeDetailDuck.creators.put,
      resetItem        : employeeDetailDuck.creators.resetItem,
      getUsers         : userDuck.creators.get,
      setUserFilters   : userDuck.creators.setFilters,
      getEmployeeTitles: employeeTitleDuck.creators.get,
      getLocations     : locationDuck.creators.get,
      getRoles         : rolDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'employee-edit-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        first_name: Yup.string().required('Name is required'),
        location  : Yup.mixed().required('Location is required'),
        title     : Yup.mixed().required('Title is required'),
        email     : Yup.string().email().required('Email is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmployeeEditForm)
