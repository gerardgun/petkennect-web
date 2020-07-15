import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Dropdown, Form, Header, Input, Select } from 'semantic-ui-react'
import * as Yup from 'yup'
import YupFields from '@lib/constants/yup-fields'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import userDuck from '@reducers/user'
import rolDuck from '@reducers/rol'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

import { useDebounce } from '@hooks/Shared'
import useZipInputSearch from '@components/useZipInputSearch'

const ClientCreateFormStep1 = (props) => {
  const {
    location,
    zip,
    zipDetail,
    user,
    error,
    handleSubmit,
    reset
  } = props

  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  const [ customUser, setCustomUser ] = useState({ id: 'CUSTOM_USER_OPTION_ID', email: '' })
  useEffect(() => {
    props.getUsers()
    props.getLocations()
  }, [])

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
        <Field component='input' name='id' type='hidden'/>
        <Field component='input' name='user' type='hidden'/>
        <Field
          component='input' defaultValue={true} name='user_exists'
          type='hidden'/>
        <span className='text-regular'>
          <span className='text-black'>
            Step 1
          </span>
          <span className='text-gray'>{' '}of 2</span>
        </span><br/>
        <span className='text-regular text-gray'>
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
              ({ key: _location.id, value: _location.id, text: `${_location.name}` }))
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
            autoFocus
            component={FormField}
            control={Input}
            label='Cell Phone'
            name='phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Home Phone'
            name='phones[1]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Work Phone'
            name='phones[2]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Other Phone'
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

        <Header as='h6' className='section-header' color='blue'>COMPANY ADDRESS</Header>
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

        {error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )}

        {/* <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              content='Cancel'
              disabled={submitting}
              onClick={_handleClose}
              type='button'/>
            <Button
              color='teal'
              content='Continue'
              disabled={submitting}
              loading={submitting}/>
          </Form.Field>
        </Form.Group> */}
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
        user_exists  : formValueSelector('client-create-step-1-form')(state, 'user_exists'),
        email        : formValueSelector('client-create-step-1-form')(state, 'email')
      }
    },
    {
      getUsers      : userDuck.creators.get,
      getLocations  : locationDuck.creators.get,
      getZipes      : zipDuck.creators.get,
      setUserFilters: userDuck.creators.setFilters,
      setZip        : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'client-create-step-1-form',
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
        zip_code    : YupFields.zip,
        location    : Yup.mixed().required('Location is required'),
        email       : Yup.string().email().required('Email is required'),
        contact_date: Yup.mixed().required('Contact date is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientCreateFormStep1)
