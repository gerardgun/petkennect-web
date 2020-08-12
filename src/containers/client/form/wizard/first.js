import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Dropdown, Form, Header, Input, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import useZipInputSearch from '@components/useZipInputSearch'
import { useDebounce } from '@hooks/Shared'
import { syncValidate } from '@lib/utils/functions'
import YupFields from '@lib/constants/yup-fields'
import { formId } from './../'

import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import userDuck from '@reducers/user'
import rolDuck from '@reducers/rol'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

const ClientFormWizardFirst = props => {
  const {
    location,
    user,
    zip,
    zipDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)
  const [ customUser, setCustomUser ] = useState({ id: 'CUSTOM_USER_OPTION_ID', email: '' })

  useEffect(() => {
    props.getUsers()
    props.getLocations()
  }, [])

  const _handleClose = () => {
    props.resetItem()
  }

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
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>
        <Field
          component='input' defaultValue={true} name='user_exists'
          type='hidden'/>
        <span>
          <span className='text-black'>
            Step 1
          </span>
          <span className='text-gray'>{' '}of 2</span>
        </span><br/>
        <span className='text-gray'>
          Complete Client Info
        </span>

        <Header as='h6' className='section-header' color='blue'>Search user</Header>
        <Form.Group widths={3}>
          <Field
            additionLabel='Invite '
            allowAdditions
            closeOnChange
            component={FormField}
            control={Dropdown}
            fluid
            format={value => [ value ]}
            icon='search'
            label='Email user'
            multiple
            name='email'
            onAddItem={_handleUserOptionAddItem}
            onChange={_handleUserOptionChange}
            onSearchChange={_handleSearchChange}
            options={[ ...user.items, customUser ].map((_user) => ({
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
            autoFocus
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
            readOnly={!!props.user_exists}
            required/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Contact date'
            name='contact_date'
            required
            type='date'/>
          <Field
            component={FormField}
            control={Select}
            label='Location'
            name='location'
            options={location.items.map(_location =>
              ({ key: _location.id, value: _location.id, text: `${_location.code}` }))
            }
            placeholder='Contact Location'
            required
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Select}
            label='Status'
            name='status'
            options={[
              { key: 1, value: 1, text: 'DECLINED' },
              { key: 2, value: 2, text: 'GREEN' },
              { key: 3, value: 3, text: 'RED - See notes' },
              { key: 4, value: 4, text: 'VIP CLIENT' }
            ]}
            placeholder='Select status'
            selectOnBlur={false}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>CONTACT DETAILS</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Cell Phone'
            mask='+1 999-999-9999'
            name='phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Home Phone'
            mask='+1 999-999-9999'
            name='phones[1]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Work Phone'
            mask='+1 999-999-9999'
            name='phones[2]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Other Phone'
            mask='+1 999-999-9999'
            name='phones[3]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Alt Email'
            name='alt_email'
            placeholder='Enter email'
            type='email'/>
          <Field
            component={FormField}
            control={Select}
            label='Referred'
            name='referred'
            options={[
              { key: 1, value: 1, text: 'Drive-by' },
              { key: 2, value: 2, text: 'Event' },
              { key: 3, value: 3, text: 'Internet search' },
              { key: 4, value: 4, text: 'Referral' },
              { key: 5, value: 5, text: 'Other' }
            ]}
            placeholder='Select an option'
            selectOnBlur={false}/>

        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Client Address</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Address 1'
            name='addresses[0]'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Address 2'
            name='addresses[1]'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            disabled={zip.status === 'GETTING'}
            label='Zip'
            loading={zip.status === 'GETTING'}
            name='zip_code'
            onChange={_handleZipChange}
            onSearchChange={_handleZipSearchChange}
            options={zipOptions}
            placeholder='Search zip'
            required
            search
            selectOnBlur={false}/>
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='Country'
              readOnly
              value={zipDetail.item.country_code}/>
          </Form.Field>
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='State'
              readOnly
              value={zipDetail.item.state}/>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='City'
              readOnly
              value={zipDetail.item.city}/>
          </Form.Field>
          <Form.Field/>
          <Form.Field/>
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
              color='teal'
              content='Cancel'
              onClick={_handleClose}
              type='button'/>
            <Button
              className='w120'
              color='teal'
              content='Continue'
              type='submit'/>
          </Form.Field>
        </Form.Group>

        <Field component='input' name='id' type='hidden'/>
        <Field component='input' name='user' type='hidden'/>
      </Form>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ zip ,...state }) => {
      const zipDetail = zipDetailDuck.selectors.detail(state)
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        zip,
        zipDetail,
        initialValues: clientDetail.item,
        user         : userDuck.selectors.list(state),
        location     : locationDuck.selectors.list(state),
        role         : rolDuck.selectors.list(state),
        user_exists  : formValueSelector(formId)(state, 'user_exists'),
        email        : formValueSelector(formId)(state, 'email')
      }
    },
    {
      getUsers      : userDuck.creators.get,
      getLocations  : locationDuck.creators.get,
      getZipes      : zipDuck.creators.get,
      resetItem     : clientDetailDuck.creators.resetItem,
      setUserFilters: userDuck.creators.setFilters,
      setZip        : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : formId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        email       : Yup.string().email().required('Email is required'),
        first_name  : Yup.string().required('Name is required'),
        last_name   : Yup.string().required('Last name is required'),
        contact_date: Yup.mixed().required('Contact date is required'),
        location    : Yup.mixed().required('Location is required'),
        alt_email   : Yup.string().email('Email address is not valid').nullable(),
        zip_code    : YupFields.zip
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientFormWizardFirst)
