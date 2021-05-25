import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Segment, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import { syncValidate } from '@lib/utils/functions'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/vaccination/components/Tab'

const SetupPetVaccinationSettingIndex = props => {
  const {
    error, handleSubmit // redux-form
  } = props

  const _handleSubmit = values => {
    console.log(values)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onSubmit={handleSubmit(_handleSubmit)}>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p className='mb0'>Auto email notification to clients about missing/expired vaccines</p>
                    <Header.Subheader className='ml8 mt4'>
                      Enable to email vaccination reminders to clients
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='1'/>
                <Grid.Column width='3'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enable_notification'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
                <Grid.Column width='6'>
                  <Button className='mt12' color='teal' content='Customize Email'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p className='mb0'>Days prior to expiration when notification should be sent</p>
                    <Header.Subheader className='ml8 mt4'>
                      Sets the days before expiration that emails should be sent
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='1'/>
                <Grid.Column width='4'>
                  <Field
                    className='mt20 w50'
                    component={FormField}
                    control={Input}
                    name='expiration_days'
                    placeholder='0'
                    type='number'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p className='mb0'>Allow clients to book online reservations with expired vaccines</p>
                    <Header.Subheader className='ml8 mt4'>
                      if enabled, clients can still book reservations online. They will be notified to
                      submit updated records and it will be documented in the system.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='1'/>
                <Grid.Column textAlign='left' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label='Day Services'
                    name='book_day_service'
                    toggle
                    type='checkbox'/>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label='Boarding'
                    name='book_boarding'
                    toggle
                    type='checkbox'/>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label='Training'
                    name='book_training'
                    toggle
                    type='checkbox'/>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label='Grooming'
                    name='book_grooming'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p className='mb0'>Customize the message to your clients when they book online with missing/expired vaccinations</p>
                    <Header.Subheader className='ml8 mt4'>
                      Enter the message for clients to receive when they submit reservations with expired or missing vaccinations.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='1'/>
                <Grid.Column textAlign='left' width='9'>
                  <Field
                    component={FormField}
                    control={TextArea}
                    name='book_message'
                    placeholder='Thank your for your reservation request. Please remember we must have updated vaccinations by the time you drop off for services. You can upload, fax, or email your records at test@petkennect.com'
                    rows={5}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/* <Divider className='mt40'/> */}

            {
              error && (
                <FormError message={error}/>
              )
            }

          </Form>
        </Tab>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form              : 'setup-pet-vaccination-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupPetVaccinationSettingIndex)
