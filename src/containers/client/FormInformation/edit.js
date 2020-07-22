import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Checkbox, Divider, Header, Input, Select, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import useZipInputSearch from '@components/useZipInputSearch'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import rolDuck from '@reducers/rol'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

function AuthorizedPeopleList({ fields, meta: { error, submitFailed } }) {
  const _handleAddBtnClick = () => fields.push({ ...authorizedPersonInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const authorizedPersonInitialState = {
    name    : '',
    relation: ''
  }

  return (
    <>
      <Divider/>
      <Header as='h6' className='section-header' color='blue'>PEOPLE AUTORIZED TO PICKE UP</Header>
      <div>
        {
          fields.map((item, index) => (
            <Form.Group key={index} widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Name'
                name={`${item}.name`}
                placeholder='Enter names'/>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Relation'
                name={`${item}.relation`}
                placeholder='Enter relation'/>
              <Form.Button
                data-index={index} icon='trash alternate outline' label='&nbsp;'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
          ))
        }
        <div>
          <Button
            content='Add person' onClick={_handleAddBtnClick}
            type='button'/>
        </div>
        {
          submitFailed && error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </div>
    </>
  )
}

function Edit(props) {
  const {
    clientDetail,
    location,
    zip,
    zipDetail,
    error,
    handleSubmit,
    initialized,
    reset
  } = props

  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  useEffect(() => {
    props.getLocations()
  }, [])

  useEffect(() => {
    if(clientDetail.status === 'GOT' && !initialized) props.initialize(clientDetail.item)
  }, [ clientDetail.status ])

  return (
    <div className='ph40 pv32'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Field component='input' name='id' type='hidden'/>

        <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Email'
            name='email'
            placeholder='Enter email'
            readOnly
            required/>

          <Field
            component={FormField}
            control={Input}
            label='Name'
            name='first_name'
            placeholder='Enter name'
            readOnly
            required/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Last Name'
            name='last_name'
            placeholder='Enter lastname'
            readOnly/>
          <Field
            component={FormField}
            control={Input}
            label='Contact date'
            name='contact_date'
            required
            type='date'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Location'
            name='location'
            options={location.items.map(_location =>
              ({ key: _location.id, value: _location.id, text: `${_location.name}` }))
            }
            placeholder='Contact Location'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Checkbox}
            label='Active'
            name='is_active'
            type='checkbox'/>
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
        </Form.Group>

        <Form.Group widths='equal'>

          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Work Phone'
            name='phones[2]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Other Phone'
            name='phones[3]'
            placeholder='Enter phone number'
            type='tel'/>

        </Form.Group>

        <Form.Group widths='equal'>
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
            <Input
              autoComplete='off'
              label='Country'
              readOnly
              value={zipDetail.item.country_code}/>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <Input
              autoComplete='off'
              label='State'
              readOnly
              value={zipDetail.item.state}/>
          </Form.Field>
          <Form.Field>
            <Input
              autoComplete='off'
              label='City'
              readOnly
              value={zipDetail.item.city}/>
          </Form.Field>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>EMERGENCY CONTACT</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Name'
            name='emergency_contact_name'
            placeholder='Enter names'
            required/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Relation'
            name='emergency_contact_relationship'
            placeholder='Enter relationship'
            required/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Phone'
            name='emergency_contact_phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>VETERINARIAN CONTACT</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Vet Name'
            name='emergency_vet_name'
            placeholder='Enter vet name'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Vet Location'
            name='emergency_vet_location'
            placeholder='Enter vet location'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Vet Phone'
            name='emergency_vet_phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
          <Form.Field/>
        </Form.Group>

        <FieldArray
          component={AuthorizedPeopleList}
          name='authorized_people_pick_up'
          title='People Authorized to Pick Up'/>

        {error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )}
      </Form>
    </div>
  )
}

export default compose(
  connect(
    ({ zip ,...state }) => {
      const zipDetail = zipDetailDuck.selectors.detail(state)
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        zip,
        zipDetail,
        initialValues: clientDetail.item ,
        location     : locationDuck.selectors.list(state),
        role         : rolDuck.selectors.list(state)
      }
    },
    {
      getLocations: locationDuck.creators.get,
      getZipes    : zipDuck.creators.get,
      setZip      : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'client-edit-information',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        zip_code    : YupFields.zip,
        location    : Yup.mixed().required('Location is required'),
        email       : Yup.string().email().required('Email is required'),
        contact_date: Yup.mixed().required('Contact date is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(Edit)
