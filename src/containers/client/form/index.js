import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form'
import { Button, Divider, Header, Input, TextArea, Select, Form, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import InputMask from '@components/Common/InputMask'
import YupFields from '@lib/constants/yup-fields'
import { ReferredOptions } from '@lib/constants/client'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import PhoneList from '@containers/online-request/clientSubmission/show/sections/information/PhoneList'
import PeopleList from '@containers/online-request/clientSubmission/show/sections/information/PeopleList'
import AddressList from '@containers/online-request/clientSubmission/show/sections/information/AddressList'

import CommentForm from './../show/CommentSection/form/modal'

import clientCommentDetailDuck from '@reducers/client/comment/detail'
import clientDetailDuck from '@reducers/client/detail'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

export const formId = 'client-form'

const ClientForm = props => {
  const {
    clientDetail: { mode },
    location,
    zip,
    zipDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const history = useHistory()
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Client')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const _handleSubmit = values => {
    values = parseFormValues(values)

    let payload = Object.entries(values).reduce((obj, [ fieldname, value ]) => {
      const isIncluded = [
        'first_name', 'last_name', 'spouse', 'co_owner_name', 'location', 'contact_date', // Basic Information
        'phones', 'alt_email', // Contact Details
        'addresses', // Adresses
        'authorized_people_pick_up', // Authorized people to pickup
        'emergency_contact_phones', 'emergency_contact_comment', // Emergency Contact
        'emergency_vet_name', 'emergency_vet_location', 'emergency_vet_phones' // Veterinarian Contact
      ].includes(fieldname)

      return isIncluded ? { ...obj, [fieldname]: value } : obj
    }, {})

    if(mode === 'UPDATE')
      return props.put({ id: values.id,...payload })
        .catch(parseResponseError)
    else
      return props.post(payload)
        .then(result => {
          props.resetItem()
          history.push(`/client/${result.id}`)
        })
        .catch(parseResponseError)
  }

  const _handleButtonReviewClient = () => {}

  const _handleChangeStatus = item => {
    props.setChangeStatusItem(item, 'CREATE')
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
            <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
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
                label='Co-Owner/Spouse First Name'
                name='spouse'
                required
                type='text'/>
              <Field
                autoFocus
                component={FormField}
                control={Input}
                label='Co-Owner/Spouse Last Name'
                name='co_owner_name'
                required
                type='text'/>
            </Form.Group>

            <Form.Group widths='2'>
              <Field
                component={FormField}
                control={Select}
                label='Status'
                name='status'
                onChange={_handleChangeStatus}
                options={[
                  { key: 1, value: 'active', text: 'Active', image: (<Icon name='user circle' style={{ color: 'gray', fontSize: '20px' }}></Icon>) },
                  { key: 2, value: 'caution', text: 'Caution', image: (<Icon name='user circle' style={{ color: 'yellow', fontSize: '20px' }}></Icon>) },
                  { key: 3, value: 'declined', text: 'Decline Client', image: (<Icon name='user circle' style={{ color: 'red', fontSize: '20px' }}></Icon>) },
                  { key: 4, value: 'vip', text: 'VIP Client', image: (<Icon name='user circle' style={{ color: 'green', fontSize: '20px' }}></Icon>) }
                ]}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Primary Location'
                name='location'
                options={location.items.map(_location =>
                  ({ key: _location.id, value: _location.id, text: `${_location.name}` }))
                }
                placeholder='Contact Location'
                selectOnBlur={false}/>
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

            <Form.Group widths='2'>
              {
                props.hasStatusDeclined === 'declined' && (
                  <Form.Field>
                    <Button
                      className='w120'
                      color='teal'
                      content='Enable'
                      onClick={_handleButtonReviewClient}
                      type='button'/>
                  </Form.Field>

                )
              }
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>Contact Details</Header>
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

            <FieldArray
              component={PhoneList}
              name='phones'/>

            <Divider/>

            <FieldArray
              component={AddressList}
              getZipes={props.getZipes}
              name='addresses'
              setZip={props.setZip}
              zip={zip}
              zipDetail={zipDetail}/>

            <Divider/>

            <FieldArray
              component={PeopleList}
              name='authorized_people_pick_up'/>

            <Header as='h6' className='section-header' color='blue'>Package Discount</Header>
            <Form.Group widths={2}>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Discount'
                name='package_discount'
                placeholder='Enter Discount'/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Emergency'  && (
          <>
            <FieldArray
              component={PeopleList}
              name='emergency_contact_phones'
              type='contact'/>

            {/* emergency_contact_name, emergency_contact_relationship WIP Deleted fields */}

            <br/>

            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                label='Other Notes'
                name='emergency_contact_comment'
                placeholder='Enter other notes'/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Vet'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>VETERINARIAN CONTACT</Header>
            <Form.Group widths={2}>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Veterinarian Name'
                name='emergency_vet_name'
                placeholder='Enter veterinarian name'/>
              <Field
                autoComplete='off'
                component={FormField}
                control={InputMask}
                label='Veterinarian Phone Number'
                mask='(999) 999-9999'
                name='emergency_vet_phones[0]'
                placeholder='Enter phone number'
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
      <CommentForm/>
    </>
  )
}

export default compose(
  connect(
    ({ location, zip, ...state }) => {
      const zipDetail = zipDetailDuck.selectors.detail(state)
      const clientDetail = clientDetailDuck.selectors.detail(state)
      const status  = formValueSelector(formId)(state, 'status')

      return {
        clientDetail,
        location,
        zip,
        zipDetail,
        initialValues    : { ...clientDetail.item },
        hasStatusDeclined: status
      }
    },
    {
      getZipes           : zipDuck.creators.get,
      setZip             : zipDetailDuck.creators.setItem,
      post               : clientDetailDuck.creators.post,
      put                : clientDetailDuck.creators.put,
      resetItem          : clientDetailDuck.creators.resetItem,
      setChangeStatusItem: clientCommentDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        first_name  : Yup.string().required('Name is required'),
        contact_date: Yup.mixed().required('Contact date is required'),
        last_name   : Yup.string().required('Last name is required'),
        location    : Yup.mixed().required('Location is required'),
        // Addresses
        addresses   : Yup.array().of(
          Yup.object().shape({
            description: Yup.string().required('Street address is required'),
            zip_code   : Yup.mixed().required('Zip code is required'),
            type       : Yup.mixed().required('Type is required')
          })
        ).min(1).required('Must have at least 1 item'),
        // Authorized People to Pickup
        authorized_people_pick_up: Yup.array().of(
          Yup.object().shape({
            name    : Yup.string().required('Name is required'),
            relation: Yup.string().required('Relation is required')
          })
        ),
        // Emergency Contacts
        emergency_contact_phones: Yup.array().of(
          Yup.object().shape({
            name    : Yup.string().required('Name is required'),
            relation: Yup.string().required('Relation is required'),
            phone   : Yup.string().required('Phone number is required')
          })
        )
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientForm)
