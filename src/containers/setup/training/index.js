import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/training/components/Menu'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupTrainingIndex = props => {
  const {
    error, handleSubmit // redux-form
  } = props

  const dispatch = useDispatch()

  const _handleSubmit = values => {
    console.log(values)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onSubmit={handleSubmit(_handleSubmit)}>
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='5'>
                <Header as='h4'>
                  <p>Enable Client Training Questionnaire</p>
                  <Header.Subheader>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
                  </Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center' width='4'>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  name='client_training_questionnaire'
                  toggle
                  type='checkbox'/>
              </Grid.Column>
              <Grid.Column width='7'>
                <Button className='mt12' color='teal' content='Customize Form'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider/>
          <Grid style={{ padding: '1rem' }}>
            <Grid.Row>
              <Grid.Column width='5'>
                <Header as='h4'>
                  <p>Enable Training Rating System</p>
                  <Header.Subheader>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
                  </Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center' width='4'>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  name='training_rating'
                  toggle
                  type='checkbox'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>

        {
          error && (
            <FormError message={error}/>
          )
        }

      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form              : 'setup-training',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupTrainingIndex)
