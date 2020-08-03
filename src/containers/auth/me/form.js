import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Checkbox, Header, Form, Label, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import InputFile from '@components/Common/InputFile'
import YupFields from '@lib/constants/yup-fields'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

export const formId = 'auth-me-form'

function AuthMeForm(props) {
  const {
    error, handleSubmit, reset // redux-form
  } = props

  const _handleSubmit = values => {
    const { first_name, last_name, username, image = null, password = null } = parseFormValues(values)

    let payload = { first_name, last_name, username }

    if(typeof image !== 'string' && image !== null) payload.image = image
    if(password) payload.password = password

    return props.patch(payload)
      .catch(parseResponseError)
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Input}
            label='First Name'
            name='first_name'
            placeholder='Enter first name'
            required/>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Input}
            label='Last Name'
            name='last_name'
            placeholder='Enter last name'
            required/>
        </Form.Group>
        <Form.Group widths={2}>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Username'
            labelPosition='left'
            name='username'
            placeholder='Enter username'
            required>
            <Label color='teal' content='@'/>
            <input/>
          </Field>
          <Field
            component={FormField}
            control={InputFile}
            label='Profile Image'
            name='image'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Change Password?'
            name='change_password'
            parse={Number}
            type='checkbox'/>
        </Form.Group>

        {
          props.hasChangePasswordChecked && (
            <>
              <Header as='h6' className='section-header' color='blue'>Password</Header>
              <Form.Group widths='equal'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  label='New Password'
                  name='password'
                  placeholder='Enter new password'
                  required
                  type='password'/>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  label='Confirm Password'
                  name='confirm_password'
                  placeholder='Confirm your password'
                  required
                  type='password'/>
              </Form.Group>
            </>
          )
        }

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </Form>
    </>
  )
}

export default compose(
  connect(
    ({ auth, ...state }) => {
      const change_password = formValueSelector(formId)(state, 'change_password')

      return {
        auth,
        // for redux form
        initialValues           : { ...auth.item, image: auth.item.image_path },
        hasChangePasswordChecked: Boolean(change_password)
      }
    },
    {
      patch: authDuck.creators.patch
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        first_name      : Yup.string().required('First name is required'),
        last_name       : Yup.string().required('Last name is required'),
        username        : Yup.string().lowercase('The username must be lowercase').matches(/^[\w-]+$/, 'Enter a valid username').required('Username is required'),
        password        : YupFields.password,
        confirm_password: YupFields.password.test('passwords-match', 'Passwords do not match', password => password === values.password)
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(AuthMeForm)
