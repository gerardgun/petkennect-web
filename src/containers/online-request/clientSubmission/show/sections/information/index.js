import React, { useEffect } from 'react'
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form'
import { Checkbox, Divider, Form, Header, Input, Radio, Select } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import FormError from '@components/Common/FormError'
// import YupFields from '@lib/constants/yup-fields'
import { ReferredOptions } from '@lib/constants/client'
import { syncValidate } from '@lib/utils/functions'
import AddressList from './AddressList'
import PeopleList from './PeopleList'
import PhoneList from './PhoneList'

import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

const formId = 'client-form'

const services = [
  { type: 'B', name: 'Boarding' },
  { type: 'D', name: 'Day Camp' },
  { type: 'T', name: 'Training' },
  { type: 'G', name: 'Grooming' }
]

const boardingDaycampFrecuencyOptions = [
  { key: 1, value: 'daily', text: 'Daily' },
  { key: 2, value: 'weekly', text: 'Weekly' },
  { key: 3, value: 'multiple', text: 'Multiple times per week' }
]

const groomingFrecuencyOptions = [
  { key: 1, value: 'weekly', text: 'Weekly' },
  { key: 2, value: 'monthly', text: 'Monthly' },
  { key: 3, value: 'variable', text: 'As need it' }
]

const ClientForm = props => {
  const {
    zip,
    zipDetail,
    location,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    if(location.items.length === 0) props.getLocations()
  }, [])

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit}>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>

        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Input}
            label='First Name'
            name='first_name'
            placeholder='Enter first name'
            required/>
          <Field
            component={FormField}
            control={Input}
            label='Last Name'
            name='last_name'
            placeholder='Enter last name'
            required/>
        </Form.Group>

        <Form.Group widths={2}>
          <Field
            component={FormField}
            control={Input}
            label='Co-Owner/Spouse First Name'
            name='spouse'
            placeholder='Enter first name'/>
          <Field
            component={FormField}
            control={Input}
            label='Co-Owner/Spouse Last Name'
            name='co_owner_name'
            placeholder='Enter last name'/>
        </Form.Group>

        <FieldArray
          component={PhoneList}
          name='phones'/>

        <Form.Group widths={3}>
          <Field
            component={FormField}
            control={Input}
            label='Email Address'
            name='email'
            placeholder='Enter email'
            required/>
        </Form.Group>

        <Divider/>

        <FieldArray
          component={AddressList}
          getZipes={props.getZipes}
          name='addresses'
          setZip={props.setZip}
          zip={zip}
          zipDetail={zipDetail}/>

        <Divider/>

        <Header as='h6' className='section-header' color='blue'>Details</Header>

        <Form.Group widths={2}>
          <Field
            component={FormField}
            control={Select}
            label='Which location are you interested in?'
            name='location'
            options={
              location.items.map(item => ({ key: item.id, value: item.id, text: `${item.name}` }))
            }
            placeholder='Select location'
            required
            selectOnBlur={false}/>
        </Form.Group>

        <Form.Group style={{ marginBottom: '2rem' }} widths={2}>
          <Form.Field>
            <label>How did you hear about us?</label>
            {
              ReferredOptions.map((item, index) => (
                <Form.Group key={index} widths={2}>
                  <Field
                    component={FormField}
                    control={Radio}
                    key={item.value}
                    label={item.text}
                    name='referred'
                    type='radio'
                    value={String(item.value)}/>
                  {
                    [ '1', '6', '7' ].includes(props.referred) && String(item.value) === props.referred && (
                      <Field
                        autoComplete='off'
                        component={FormField}
                        control={Input}
                        label={
                          props.referred === '1' ? 'Their name'
                            : props.referred === '6' ? 'Referral\'s Name' : 'Description'
                        }
                        name='referred_description'
                        placeholder={
                          [ '1', '6' ].includes(props.referred) ? 'Enter their name' : 'Enter description'
                        }/>
                    )
                  }
                </Form.Group>
              ))
            }
          </Form.Field>
          <Form.Field required>
            <label>What services are you interested in?</label>

            {
              services.map((item, index) => {
                const needsFrecuency = (
                  props.interested_services
                  && item.type !== 'T'
                  && typeof props.interested_services === 'object'
                  && item.type in props.interested_services
                  && props.interested_services[item.type].selected
                )

                return (
                  <Form.Group key={index} widths={2}>
                    <Field
                      component={FormField}
                      control={Checkbox}
                      label={item.name}
                      name={`interested_services.${item.type}.selected`}
                      type='checkbox'/>
                    {
                      needsFrecuency && (
                        <Field
                          component={FormField}
                          control={Select}
                          label='How often do you plan on using this service?'
                          name={`interested_services.${item.type}.frecuency`}
                          options={item.type === 'G' ? groomingFrecuencyOptions : boardingDaycampFrecuencyOptions}
                          placeholder='Select a frecuency'
                          required
                          selectOnBlur={false}/>
                      )
                    }
                  </Form.Group>
                )
              })
            }
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Veterinarian Name'
            name='emergency_vet_name'
            placeholder='Enter Veterinarian Name'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Veterinarian Phone Number'
            mask='(999) 999-9999'
            name='emergency_vet_phones[0]'
            placeholder='Enter Veterinarian Phone Number'
            type='tel'/>
        </Form.Group>

        <Form.Group widths={2}>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Veterinarian Facility'
            name='emergency_vet_location'
            placeholder='Enter veterinarian facility'/>
        </Form.Group>

        <Divider/>

        <FieldArray
          component={PeopleList}
          name='authorized_people_pick_up'/>

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }

        {/* <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              onClick={_handleCancelBtnClick}
              type='button'/>
            <Button
              className='w120'
              color='teal'
              content='Continue'
              type='submit'/>
          </Form.Field>
        </Form.Group> */}
      </Form>
    </>
  )
}

export default compose(
  connect(
    ({ location, zip, ...state }) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        location,
        zip,
        zipDetail    : zipDetailDuck.selectors.detail(state),
        // redux-form
        initialValues: {
          ...clientDetail.item,
          referred: String(clientDetail.item.referred)
        },
        referred           : formValueSelector(formId)(state, 'referred'),
        interested_services: formValueSelector(formId)(state, 'interested_services')
      }
    },
    {
      getLocations: locationDuck.creators.get,
      getZipes    : zipDuck.creators.get,
      setZip      : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        // Basic information
        first_name: Yup.string().required('First Name is required'),
        last_name : Yup.string().required('Last Name is required'),
        phones    : Yup.array().of(
          Yup.object().shape({
            number: Yup.string().required('Phone is required'),
            type  : Yup.mixed().required('Type is required')
          })
        ),
        email    : Yup.string().email().required('Email is required'),
        // Addresses
        addresses: Yup.array().of(
          Yup.object().shape({
            description: Yup.string().required('Street address is required'),
            zip_code   : Yup.mixed().required('Zip code is required'),
            type       : Yup.mixed().required('Type is required')
          })
        ),
        // Details
        location: Yup.mixed().required('Location is required'),
        services: Yup.array().of(
          Yup.object().shape({
            frecuency: Yup.string().required('Choose a frecuency')
          })
        ),
        // Authorized People to Pickup
        authorized_people_pick_up: Yup.array().of(
          Yup.object().shape({
            name    : Yup.string().required('Name is required'),
            relation: Yup.string().required('Relation is required')
          })
        )
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientForm)
