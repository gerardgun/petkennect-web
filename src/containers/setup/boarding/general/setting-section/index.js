import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'
import Tab from '@containers/setup/boarding/general/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupBoardingGeneralSettingIndex = props => {
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

            <Header as='h4' color='teal'>Boarding Types and Reservations Settings</Header>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Boarding Service Types Filter</p>
                    <Header.Subheader>
                      Tip: Types are not required but simplify reservations offered for ex: 3 boarding types.
                      Could exist with 5 reservations each allowing for 15 possibilities. Filtering by type,
                      the list is limited to only 5 options.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enable_service_type_filter'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider className='mt20'/>

            <Header as='h4' color='teal'>Reservation Settings</Header>

            {/* Check In questions */}
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='4'>
                  <Header as='h4'>
                    <p>Check-in Prompt Question 1</p>
                  </Header>
                </Grid.Column>
                <Grid.Column width='8'>
                  <Field
                    component={FormField}
                    control={Input}
                    name='checkin_questions[0]'
                    placeholder='Enter question to be asked at client in Check In by Staff'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='4'>
                  <Header as='h4'>
                    <p>Check-in Prompt Question 2</p>
                  </Header>
                </Grid.Column>
                <Grid.Column width='8'>
                  <Field
                    component={FormField}
                    control={Input}
                    name='checkin_questions[1]'
                    placeholder='Enter question to be asked at client in Check In by Staff'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>

            {/* Check Out questions */}
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='4'>
                  <Header as='h4'>
                    <p>Check-out Prompt Question 1</p>
                  </Header>
                </Grid.Column>
                <Grid.Column width='8'>
                  <Field
                    component={FormField}
                    control={Input}
                    name='checkout_questions[0]'
                    placeholder='Enter question to be asked at client in Check Out by Staff'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='4'>
                  <Header as='h4'>
                    <p>Check-out Prompt Question 2</p>
                  </Header>
                </Grid.Column>
                <Grid.Column width='8'>
                  <Field
                    component={FormField}
                    control={Input}
                    name='checkout_questions[1]'
                    placeholder='Enter question to be asked at client in Check Out by Staff'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Photo upload for belongigs?</p>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enable_photo_upload_for_belongigs'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Add Belongigs Areas to a drop down list.</p>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='add_belongig_areas_to_dropdown '
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider className='mt20'/>

            <Header as='h4' color='teal'>Multiple Location Setup</Header>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Multiple Location Setup</p>
                    <Header.Subheader>
                      If prices vary by location, enable this options.
                      If all locations charge the same prices for services, do not enable this option.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='multiple_location_setup_enabled'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider className='mt20'/>

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
  form              : 'setup-boarding-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupBoardingGeneralSettingIndex)
