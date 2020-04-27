import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Form, Grid, Header, Image } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import FormField from '../../../components/Common/FormField'
import FormError from '../../../components/Common/FormError'
import * as Yup from 'yup'
import { syncValidate } from '../../../lib/utils/functions'
import YupFields from '../../../lib/constants/yup-fields'

const ResetPassword = props => {
  const {
    // auth,
    error,
    reset
  } = props

  return (
    <Container className='forgot-password'>
      <Grid columns={2}>
        <Grid.Column style={{ padding: '0 3rem' }}>
          <Image src='/images/sign-in.svg'/>
        </Grid.Column>
        <Grid.Column style={{ alignSelf: 'center' }}>
          <Header as='h2'>Reset Password</Header>
          <p>
            Enter your new password
          </p>

          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={() => null}>
            <Form.Group widths='equal'>
              <Field
                autoFocus
                component={FormField}
                control={Form.Input}
                name='password'
                placeholder='New password...'
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
            <Form.Group>
              <Form.Field
                control={Button}
                disabled={false}
                loading={false}
                type='submit'>
                Reset Password
              </Form.Field>
            </Form.Group>
          </Form>

        </Grid.Column>
      </Grid>
    </Container>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {

}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form    : 'auth-sign-in',
    validate: values => {
      const schema = {
        password: YupFields.password
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })

)(ResetPassword)
