import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Container, Form, Grid, Header, Image, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

import '@containers/auth/sign-in/styles.scss'

const RecoverAccount = props => {
  const {
    auth,
    recoverAccount,
    // redux-form
    error,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props

  useEffect(() => {
    if(auth.status === 'POSTED')
      props.history.replace('/auth/sign-in')
  }, [ auth.status ])

  const _handleSubmit = values => {
    return recoverAccount({
      password: values.password,
      token   : props.match.params.token
    })
      .catch(parseResponseError)
  }

  return (
    <Container className='recover-account'>
      <Grid columns={2}>
        <Grid.Column width={10}>
          <Image src='/images/New-password.svg'/>
        </Grid.Column>
        <Grid.Column width={6}>
          {/* <Header as='h2'>Reset password</Header> */}
          <Header as='h2'>New password</Header>
          <p>
            Enter the new password then your password will change.
          </p>

          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='New password'
                name='password'
                placeholder='Enter new password'
                type='password'/>
            </Form.Group>

            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Confirm password'
                name='confirm_password'
                placeholder='Confirm password'
                type='password'/>
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

            <Form.Group className='action-group' widths='equal'>
              <Form.Field>
                <Button
                  as={Link} basic color='teal'
                  content='Back to Sign In' fluid
                  text='Back to Sign In' to='/auth/sign-in'/>
              </Form.Field>
              <Form.Field>
                <Button
                  color='teal'
                  content='Reset password'
                  disabled={pristine || submitting}
                  fluid
                  loading={auth.status === 'POSTING'}
                  type='submit'/>
              </Form.Field>
            </Form.Group>

          </Form>

        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default compose(
  connect(
    ({ auth }) => ({
      auth,
      initialValues: {
        password: ''
      }
    }),
    {
      recoverAccount: authDuck.creators.recoverAccount
    }
  ),
  reduxForm({
    form    : 'auth-recover-account',
    validate: values => {
      const schema = {
        password        : YupFields.password,
        confirm_password: Yup.string()
          .test('passwords-match', 'Passwords do not match', password => password === values.password)
          .required('Enter your new password again')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(RecoverAccount)
