import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Container, Form, Grid, Header, Image } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import FormField from '../../../components/Common/FormField';
import FormError from '../../../components/Common/FormError';
import * as Yup from 'yup';
import { syncValidate } from '../../../lib/utils/functions';
import YupFields from '../../../lib/constants/yup-fields';

const ForgotPassword = props => {
  const {
    auth,
    error,
    handleSubmit,
    pristine,
    reset,
    submitting
  } = props

  return (
    <Container className='forgot-password'>
      <Grid columns={2}>
        <Grid.Column style={{ padding: '0 3rem', }}>
          <Image src='/images/sign-in.svg' />
        </Grid.Column>
        <Grid.Column style={{ alignSelf: 'center' }}>
          <Header as='h2'>Forgot Password?</Header>
          <p>
            Enter your email address and we’ll send you a link to reset your password.
          </p>

          <Form onReset={reset} onSubmit={() => null}>
            <Form.Group widths='equal'>
              <Field
                name='email'
                component={FormField}
                control={Form.Input}
                placeholder='Email'
                type='email'
                autoFocus
                autoComplete='off'
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
                disabled={false}
                loading={false}
                type='submit'
              >
                Send Password Reset Link
              </Form.Field>
            </Form.Group>
          </Form>

        </Grid.Column>
      </Grid>
    </Container>
  )
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {

};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form    : 'auth-sign-in',
    validate: values => {
      const schema = {
        email   : YupFields.email,
      };

      return syncValidate(Yup.object().shape(schema), values)
    }
  })

)(ForgotPassword);
