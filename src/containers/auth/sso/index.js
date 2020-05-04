import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Container, Form, Grid, Image, Header } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

const SSO = props => {
  const {
    auth,
    signIn,
    // from redux form
    error,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props

  const _handleSubmit = values => {
    const { email: username_or_email, password } = values

    return signIn({ username_or_email, password })
      .catch(parseResponseError)
  }

  return (
    <Container className='sign-in'>
      <Grid columns={2}>
        <Grid.Column style={{ padding: '0 3rem' }}>
          <Image src='/images/sign-in.svg'/>
        </Grid.Column>
        <Grid.Column style={{ alignSelf: 'center' }}>
          <Header as='h2'>¡Welcome!</Header>
          <p>
            Enter your email and password for sign in.
          </p>

          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                autoFocus
                component={FormField}
                control={Form.Input}
                label='Email'
                name='email'
                placeholder='Enter email'
                type='email'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Form.Input}
                label='Password'
                name='password'
                placeholder='Enter your password'
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

            {/* BEGIN Delete */}
            <Form.Group widths='equal'>
              <Form.Field>
                <span style={{ color: 'gray' }}>Credentials for demo <br/> superadmin user: martincruz.cs@gmail.com <br/> pass: Abc1234=<br/><br/> admin user: test@aron.mail <br/> pass: Abc1234=</span>
              </Form.Field>
            </Form.Group>
            {/* END Delete */}

            <Form.Group widths='equal'>
              <Form.Field>
                <Link to='/auth/forgot-password'>Forgot your password?</Link>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field
                control={Button}
                disabled={pristine || submitting}
                loading={auth.status === 'SIGNING_IN'}
                type='submit'>
                Sign in
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
        email   : process.env.NODE_ENV === 'development' ? 'martincruz.cs@gmail.com' : '',
        password: process.env.NODE_ENV === 'development' ? '' : ''
      }
    }),
    {
      signIn: authDuck.creators.signIn
    }
  ),
  reduxForm({
    form    : 'auth-sign-in',
    validate: values => {
      const schema = {
        email   : YupFields.email,
        password: YupFields.password
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(SSO)