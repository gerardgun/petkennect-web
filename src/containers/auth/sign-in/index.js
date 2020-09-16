import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Container, Form, Grid, Header, Image, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import useToggle from '@hooks/useToggle'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

import './styles.scss'

const SignIn = props => {
  const {
    auth,
    signIn,
    // redux-form
    error,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props

  const [ isPassShown, tooglePass ] = useToggle()

  const _handlePassIconClick = () => {
    tooglePass()
  }

  const _handleSubmit = values => {
    const { email: username_or_email, password } = values

    return signIn({ username_or_email, password })
      .catch(parseResponseError)
  }

  return (
    <Container className='sign-in'>
      <Grid columns={2}>
        <Grid.Column width={10}>
          <Image className='image' src='/images/sign-in.svg'/>
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as='h2'>Welcome to PetKennect</Header>
          <p>
            We’re here to help you. Please sign in to your account.
          </p>

          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                autoFocus
                component={FormField}
                control={Input}
                label='Email'
                name='email'
                placeholder='Enter email'
                type='email'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                action={{
                  basic  : true,
                  icon   : isPassShown ? 'eye' : 'eye slash',
                  onClick: _handlePassIconClick,
                  type   : 'button'
                }}
                autoComplete='off'
                className='action-wo-border'
                component={FormField}
                control={Input}
                label='Password'
                name='password'
                placeholder='Enter your password'
                type={isPassShown ? 'text' : 'password'}/>
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

            <Form.Group widths='equal checkbox-group'>
              <Field
                component={FormField}
                control={Checkbox}
                label='Remember me'/>
              <Form.Field className='link'>
                <Link to='/auth/forgot-password'>Forgot your password?</Link>
              </Form.Field>
            </Form.Group>

            <Form.Group>
              <Form.Field
                color='teal'
                control={Button}
                disabled={pristine || submitting}
                fluid
                loading={auth.status === 'SIGNING_IN'}
                type='submit'
                width={16}>
                Sign in
              </Form.Field>
            </Form.Group>

            {/* BEGIN Delete */}
            <br/>
            <Form.Group widths='equal'>
              <Form.Field>
                <strong>Credentials for demo</strong>
                <span style={{ color: 'gray' }}>
                  <br/>
                  superadmin user: martincruz.cs@gmail.com<br/>pass: Abc1234=
                  <br/>
                  <br/>
                  admin user - all companies: patricia93@yahoo.com <br/>pass: usermultitenant1
                </span>
              </Form.Field>
            </Form.Group>
            {/* END Delete */}

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
)(SignIn)
