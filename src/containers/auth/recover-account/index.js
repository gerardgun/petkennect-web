import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Container, Form, Grid, Image, Input, Header } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

const RecoverAccount = props => {
  const {
    auth,
    recoverAccount,
    // from redux form
    error,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props

  useEffect(() => {
    if(auth.status === 'POSTED') {
      props.history.replace('/auth/sign-in')
    }
  }, [ auth.status ])

  const _handleSubmit = values => {
    return recoverAccount({
      password: values.password,
      token: props.match.params.token
    })
      .catch(parseResponseError)
  }

  return (
    <Container className='sign-in'>
      <Grid columns={2}>
        <Grid.Column style={{ padding: '0 3rem', }}>
          <Image src='/images/sign-in.svg' />
        </Grid.Column>
        <Grid.Column style={{ alignSelf: 'center' }}>
          <Header as='h2'>Reset password</Header>
          <p>
            Change your password and sign in.
          </p>

          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Form.Group widths='equal'>
              <Field
                name='password'
                component={FormField}
                control={Form.Input}
                label='New password'
                placeholder='Enter your new password'
                type='password'
              />
            </Form.Group>

            {
              error && (
                <Form.Group widths="equal">
                  <Form.Field>
                    <FormError message={error} />
                  </Form.Field>
                </Form.Group>
              )
            }

            <Form.Group>
              <Form.Field
                control={Button}
                disabled={pristine || submitting}
                loading={auth.status === 'PATCHING'}
                type='submit' 
              >
                Submit
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
        password: '',
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
        password: YupFields.password
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(RecoverAccount)