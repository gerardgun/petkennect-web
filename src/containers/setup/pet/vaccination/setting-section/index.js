import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Segment, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/vaccination/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupPetVaccinationSettingIndex = props => {
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

        <Tab>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onSubmit={handleSubmit(_handleSubmit)}>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p>Auto email notification to clients about missing/expired vaccines</p>
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
                    name='enable_notification'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
                <Grid.Column width='7'>
                  <Button className='mt12' color='teal' content='Customize Email'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p>Days prior to expiration when notification should be sent</p>
                    <Header.Subheader>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column className='flex justify-center' width='4'>
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
                    <p>Allow clients to book online reservations with expired vaccines</p>
                    <Header.Subheader>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
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

            <Divider className='mt40'/>

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
