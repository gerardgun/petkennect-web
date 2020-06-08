import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Container, Form, Grid, Image, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

const ForgotPassword = props => {
  const {
    auth,
    requestPasswordReset,
    // from redux form
    error,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props

  const _handleConfirmBtnClick = () => {
    props.history.replace('/auth/sign-in')
  }

  const _handleSubmit = values => {
    return requestPasswordReset(values)
      .catch(parseResponseError)
  }

  return (
    <Container className='sign-in'>
      <Grid columns={2}>
        <Grid.Column style={{ padding: '0 3rem' }}>
          <Image src='/images/Forgot-password.svg'/>
        </Grid.Column>
        <Grid.Column style={{ alignSelf: 'center' }}>
          <Header as='h2' className='auth-heading'>Forgot your password?</Header>
          <p>
            Well help you reseat it and get back on track.
          </p>

          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                autoFocus
                className='txt-field'
                component={FormField}
                control={Form.Input}
                label='Email'
                name='email'
                placeholder='Enter email'
                type='email'/>
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

            <Form.Group widths='equal'>
              <Form.Field>
                <Button
                  as={Link} className='Link-button' content='Back to Sign In'
                  text='Back to Sign In' to='/auth/sign-in'/>
              </Form.Field>
              <Form.Field
                className='send-button'
                control={Button}
                disabled={pristine || submitting}
                loading={auth.status === 'PATCHING'}
                type='submit'>
                Send email
              </Form.Field>
            </Form.Group>
          </Form>

        </Grid.Column>
      </Grid>

      <Modal
        closeOnDimmerClick={false}
        onClose={props.onClose}
        open={auth.status === 'PATCHED'}
        size='tiny'>
        <Header content='Success!'/>
        <Modal.Content>
          <p>
            We have sent the instructions to your email.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='teal' content='Ok' onClick={_handleConfirmBtnClick}/>
        </Modal.Actions>
      </Modal>
    </Container>
  )
}

export default compose(
  connect(
    ({ auth }) => ({
      auth,
      initialValues: {
        email: process.env.NODE_ENV === 'development' ? 'martincruz.cs@gmail.co' : ''
      }
    }),
    {
      requestPasswordReset: authDuck.creators.requestPasswordReset
    }
  ),
  reduxForm({
    form    : 'auth-forgot-password',
    validate: values => {
      const schema = {
        email: YupFields.email
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ForgotPassword)
