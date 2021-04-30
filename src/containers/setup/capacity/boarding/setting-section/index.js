import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Segment, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import Tab from '@containers/setup/capacity/boarding/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupCapacityBoardingSettingIndex = props => {
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
                <Grid.Column width='8'>
                  <Header as='h4'>
                    <p>Check-Out Day Occupancy</p>
                    <Header.Subheader>
                      Enable to show kennel as occupied on check-out day
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enable_booking_override'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider/>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='8'>
                  <Header as='h4'>
                    <p>Show Kennel ID</p>
                    <Header.Subheader>
                      This will display the ID instead of the full kennel description.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enable_booking_override'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider/>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='8'>
                  <Header as='h4'>
                    <p>Allow Client Selection on Portal</p>
                    <Header.Subheader>
                      Enable to allow customers to select accomodations and see photos of lodging types if applicable.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enable_booking_override'
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
  form              : 'setup-capacity-service-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupCapacityBoardingSettingIndex)
