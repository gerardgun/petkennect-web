import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Header, Input, TextArea, Segment, Select, Form } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import InputMask from '@components/Common/InputMask'
import useZipInputSearch from '@components/useZipInputSearch'
import YupFields from '@lib/constants/yup-fields'
import { ReferredOptions } from '@lib/constants/client'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

export const formId = 'client-form'

export const AuthorizedPeopleList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddBtnClick = () => fields.push({ ...authorizedPersonInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const authorizedPersonInitialState = {
    name    : '',
    relation: ''
  }

  return (
    <>
      <Header as='h6' className='section-header' color='blue'>PEOPLE AUTHORIZED TO PICK UP</Header>
      <Segment className='form-primary-segment'>
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
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Phone Number'
                mask='(999) 999-9999'
                name={`${item}.phone_number`}
                placeholder='Enter phone number'
                type='tel'/>
              <Form.Button
                data-index={index} icon='trash alternate outline' label='&nbsp;'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
          ))
        }
        <div style={{ textAlign: 'center' }}>
          <Button
            color='teal' content='Add person'
            onClick={_handleAddBtnClick}
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
      </Segment>
    </>
  )
}

export const ContactDetailList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddBtnClick = () => fields.push({ ...contactDetailInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const contactDetailInitialState = {
    phoneNumber      : '',
    typeOfPhoneNumber: ''
  }

  return (
    <>
      <Segment className='form-primary-segment'>
        {
          fields.map((item, index) => (
            <Form.Group key={index} widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Phone number'
                mask='(999) 999-9999'
                name={`${item}.contact_detail_phone_number`}
                placeholder='Enter phone number'
                type='tel'/>
              <Field
                component={FormField}
                control={Select}
                label='Type of phone number'
                name={`${item}.type_of_phone_number`}
                options={typeOfPhoneNumberOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Form.Button
                data-index={index} icon='trash alternate outline' label='&nbsp;'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
          ))
        }
        <div style={{ textAlign: 'center' }}>
          <Button
            basic
            color='teal'  icon='plus icon'
            onClick={_handleAddBtnClick}
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
      </Segment>
    </>
  )
}

const booleanOptions = [
  {
    key  : 1,
    value: true,
    text : 'Yes'
  },
  {
    key  : 2,
    value: false,
    text : 'No'
  }
]
const typeOfPhoneNumberOptions = [
  {
    key  : 1,
    value: 'Cell Phone',
    text : 'Cell Phone'
  },
  {
    key  : 2,
    value: 'Home Phone',
    text : 'Home Phone'
  },
  {
    key  : 3,
    value: 'Work Phone',
    text : 'Work Phone'
  },
  {
    key  : 4,
    value: 'Other Phone',
    text : 'Other Phone'
  }
]

const ClientForm = props => {
  const {
    clientDetail: { mode },
    location,
    zip,
    zipDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const history = useHistory()
  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Client')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const _handleSubmit = values => {
    values = parseFormValues(values)

    if(mode === 'UPDATE')
      return props.put(values)
        .catch(parseResponseError)
    else
      return props.post(values)
        .then(payload => {
          props.resetItem()
          history.push(`/client/${payload.id}`)
        })
        .catch(parseResponseError)
  }

  return (
    <>
      <div className='mb32 div-client-info-button'>
        <Button
          basic={ActiveInfoItem !== 'Client'} color='teal'
          content='Client Information' name='Client'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'Emergency'} color='teal'
          content='Emergency Contact' name='Emergency'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'Vet'} color='teal'
          content='Vet Information' name='Vet'
          onClick={_handleInfoItemClick}/>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        {ActiveInfoItem === 'Client'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='First Name'
                name='first_name'
                placeholder='Enter name'
                readOnly
                required/>
              <Field
                component={FormField}
                control={Input}
                label='Last Name'
                name='last_name'
                placeholder='Enter lastname'
                readOnly
                required/>
            </Form.Group>

            <Form.Group widths={2}>
              <Field
                autoFocus
                component={FormField}
                control={Input}
                label='Spouse/Co-owner First Name'
                name='spouse'
                required
                type='text'/>
              <Field
                autoFocus
                component={FormField}
                control={Input}
                label='Last Name '
                name='spouse_lastname'
                required
                type='text'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                autoFocus
                component={FormField}
                control={Input}
                label='Contact Date'
                name='contact_date'
                required
                type='date'/>
              <Field
                component={FormField}
                control={Select}
                label='Referred'
                name='referred'
                options={ReferredOptions}
                placeholder='Select an option'
                selectOnBlur={false}/>
            </Form.Group>

            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Active'
                name='is_active'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
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
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>CONTACT DETAILS</Header>

            <FieldArray
              component={ContactDetailList}
              name='contact_detail'
              title='Contact Details'/>

            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Cell Phone'
                mask='(999) 999-9999'
                name='phones[0]'
                placeholder='Enter phone number'
                type='tel'/>
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Home Phone'
                mask='(999) 999-9999'
                name='phones[1]'
                placeholder='Enter phone number'
                type='tel'/>
            </Form.Group>

            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Work Phone'
                mask='(999) 999-9999'
                name='phones[2]'
                placeholder='Enter phone number'
                type='tel'/>
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Other Phone'
                mask='(999) 999-9999'
                name='phones[3]'
                placeholder='Enter phone number'
                type='tel'/>
            </Form.Group>

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
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Alt Email'
                name='alt_email'
                placeholder='Enter email'
                type='email'/>
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>Client Address</Header>
            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='First Address'
                name='addresses[0]'
                placeholder='Enter address'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Second Address'
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
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  autoComplete='off'
                  label='State'
                  readOnly
                  value={zipDetail.item.state}/>
              </Form.Field>
              <Form.Field>
                <Form.Input
                  autoComplete='off'
                  label='City'
                  readOnly
                  value={zipDetail.item.city}/>
              </Form.Field>
            </Form.Group>

            <FieldArray
              component={AuthorizedPeopleList}
              name='authorized_people_pick_up'
              title='People Authorized to Pick Up'/>

          </>
        )}
        {ActiveInfoItem === 'Emergency'  && (
          <>
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
                control={InputMask}
                label='Phone'
                mask='(999) 999-9999'
                name='emergency_contact_phones[0]'
                placeholder='Enter phone number'
                required
                type='tel'/>
              <Form.Field/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                label='Other Notes'
                name='emergency_contact_other_notes[0]'
                placeholder='Enter other notes'/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Vet'  && (
          <>
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
                label='Veterinary Facility Name'
                name='emergency_vet_facility_name'
                placeholder='Enter name'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Vet Phone'
                mask='(999) 999-9999'
                name='emergency_vet_phones[0]'
                placeholder='Enter phone number'
                type='tel'/>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Vet Location'
                name='emergency_vet_location'
                placeholder='Enter vet location'/>
            </Form.Group>
          </>
        )}
        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }

        <Field component='input' name='id' type='hidden'/>
      </Form>
    </>
  )
}

export default compose(
  connect(
    ({ location, zip, ...state }) => {
      const zipDetail = zipDetailDuck.selectors.detail(state)
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        location,
        zip,
        zipDetail,
        initialValues: { ...clientDetail.item }
      }
    },
    {
      getZipes : zipDuck.creators.get,
      setZip   : zipDetailDuck.creators.setItem,
      post     : clientDetailDuck.creators.post,
      put      : clientDetailDuck.creators.put,
      resetItem: clientDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        email                         : Yup.string().email().required('Email is required'),
        first_name                    : Yup.string().required('Name is required'),
        last_name                     : Yup.string().required('Last name is required'),
        contact_date                  : Yup.mixed().required('Contact date is required'),
        location                      : Yup.mixed().required('Location is required'),
        alt_email                     : Yup.string().email('Email address is not valid').nullable(),
        zip_code                      : YupFields.zip,
        emergency_contact_name        : Yup.string().required('Contact name is required'),
        emergency_contact_relationship: Yup.string().required('Relation is required'),
        emergency_contact_phone       : Yup.mixed().required('Phone is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientForm)
