import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { Button, Form, Header, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import { formId, AuthorizedPeopleList } from './../'

import clientDetailDuck from '@reducers/client/detail'

const ClientFormWizardSecond = props => {
  const {
    clientDetail: { status },
    error, handleSubmit, reset // redux-form
  } = props

  const history = useHistory()

  const _handleSubmit = values => {
    values = parseFormValues(values)

    // Set phone as array value
    if(values.emergency_contact_phone) {
      values.emergency_contact_phones = [ values.emergency_contact_phone ]
      delete values.emergency_contact_phone
    }

    if(!values.user_exists) delete values.user

    delete values.user_exists

    return props.post(values)
      .then(result => history.replace(`/client/${result.id}`))
      .catch(parseResponseError)
  }

  const saving = [ 'POSTING', 'PUTTING' ].includes(status)

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <span>
          <span className='text-black'>
            Step 2
          </span>
          <span className='text-gray'>{' '}of 2</span>
        </span><br/>
        <span className='text-gray'>
          Complete Emergency Data
        </span>

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
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Phone'
            mask='+1 999-999-9999'
            name='emergency_contact_phones[0]'
            placeholder='Enter phone number'
            required
            type='tel'/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>VETERINARIAN CONTACT</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Vet name'
            name='emergency_vet_name'
            placeholder='Enter vet name'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Vet location'
            name='emergency_vet_location'
            placeholder='Enter vet location'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Vet phone'
            mask='+1 999-999-9999'
            name='emergency_vet_phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>

        <FieldArray
          component={AuthorizedPeopleList}
          name='authorized_people_pick_up'
          title='People Authorized to Pick Up'/>

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
              content='Previous'
              disabled={saving}
              onClick={props.onPreviousStep}
              type='button'/>
            <Button
              color='teal'
              content='Add Client'
              disabled={saving}
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>

      </Form>
    </>
  )
}

export default compose(
  connect(
    state => {
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        initialValues: { ...clientDetail.item }
      }
    },
    {
      post: clientDetailDuck.creators.post
    }
  ),
  reduxForm({
    form                    : formId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        emergency_contact_name        : Yup.string().required('Contact name is required'),
        emergency_contact_relationship: Yup.string().required('Relation is required'),
        emergency_contact_phone       : Yup.mixed().required('Phone is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientFormWizardSecond)
