import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Container, Form, Grid, Image, Input, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

import '@containers/auth/sign-in/styles.scss'

const ForgotPassword = props => {
  const {
    auth,
    error, handleSubmit, pristine, reset, submitting // redux-form
  } = props

  const _handleConfirmBtnClick = () => {
    props.history.replace('/auth/sign-in')
  }

  const _handleSubmit = values => {
    return props.requestPasswordReset(values)
      .catch(parseResponseError)
  }

  return (
    <Container className='forgot-password'>
      <Grid columns={2}>
        <Grid.Column computer={10} mobile={16} tablet={9}>
          <Image className='image' src='/images/Forgot-password.svg'/>
        </Grid.Column>
        <Grid.Column computer={6} mobile={16} tablet={7}>
          <Header as='h2'>Forgot your password?</Header>
          <p>
            Well help you reseat it and get back on track.
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
                  content='Back to Sign In'
                  fluid
                  text='Back to Sign In' to='/auth/sign-in'/>
              </Form.Field>
              <Form.Field>
                <Button
                  color='teal'
                  content='Send email'
                  disabled={pristine || submitting}
                  fluid
                  loading={auth.status === 'PATCHING'}
                  type='submit'/>
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
