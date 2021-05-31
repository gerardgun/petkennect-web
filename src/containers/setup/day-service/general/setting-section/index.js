import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'
import Tab from '@containers/setup/day-service/general/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupDayServiceGeneralSettingIndex = props => {
  const [dropStatus, setDropStatus] = useState(false)
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

            <Header as='h4' color='teal'>Day Service Types and Reservations</Header>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Limit participation in Group Play Services</p>
                    <Header.Subheader>
                      Limit participation in Group Play Services to only pets that have "Pass"
                      in the temperament section of pet profile
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='limit_participation_in_group_play_services'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/*<Divider/>*/}
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enforce incident limits to restrict participation in group play</p>
                    <Header.Subheader>
                      Tip: If enforcing limits, such as 3 strike policy, edit the incident
                      types, actions and limits in the Animal Settings section.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enforce_incident_limit'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Header as='h4' color='teal'>Early Drop Off/Late Pick Up Charges</Header>
            <p>If enabled, clients that check in/out outside the hours will be automatically charged.</p>

            <Divider className='mt20'/>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable special pricing for pick up/drop off times within X minutes of Business Hours?</p>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='special_pricing_enabled'
                    toggle
                    type='checkbox'
                    onChange={(event) => setDropStatus(event)}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            
            {dropStatus &&
              <>
                <Grid style={{ padding: '1rem' }}>
                  <Grid.Row>
                    <Grid.Column width='4'>
                      <Header as='h4'>
                          <p>Early Drop Off</p>
                      </Header>
                      </Grid.Column>
                      <Grid.Column width='4'>
                        <Field
                          component={FormField}
                          control={Input}
                          name='early_drop_off'
                          placeholder='0 minutes of'
                          type='number'/>
                      </Grid.Column>
                      <Grid.Column width='5'>
                        <Field
                          component={FormField}
                          control={Select}
                          name='early_drop_off_option'
                          options={[
                            { value: 1, text: 'Custom Time' },
                            { value: 2, text: 'Business Opening Hours' }
                          ]}
                          placeholder='Select option'
                          search
                          selectOnBlur={false}/>
                      </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid style={{ padding: '1rem' }}>
                  <Grid.Row>
                    <Grid.Column width='4'>
                      <Header as='h4'>
                        <p>Late Pick up</p>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width='4'>
                      <Field
                        component={FormField}
                        control={Input}
                        name='late_pickup_off'
                        placeholder='0 minutes of'
                        type='number'/>
                    </Grid.Column>
                    <Grid.Column width='5'>
                      <Field
                        component={FormField}
                        control={Select}
                        name='late_pickup_off_option'
                        options={[
                          { value: 1, text: 'Custom Time' },
                          { value: 2, text: 'Business Closing Hours' }
                        ]}
                        placeholder='Select option'
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              
                <Grid style={{ padding: '1rem' }}>
                  <Grid.Row>
                    <Grid.Column width='4'>
                      <Header as='h4'>
                        <p>Pricing</p>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width='4'>
                      <Field
                        component={FormField}
                        control={Input}
                        name='pricing_amount'
                        placeholder='$0.00'
                        type='number'/>
                    </Grid.Column>
                    <Grid.Column width='5'>
                      <Field
                        component={FormField}
                        control={Select}
                        name='pricing_amount_option'
                        options={[
                          { value: 1, text: 'Per Dog' },
                          { value: 2, text: 'Per Drop Off/Pick up' }
                        ]}
                        placeholder='Select option'
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </>}

          {/*<Header as='h4' color='teal'>Multiple Location Setup</Header>

          <Divider/>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Multiple Location Setup</p>
                    <Header.Subheader>
                      If prices vary by location, enable this options. If all locations charge the same prices for services, do not enable this option.
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
            <Divider className='mt20'/>*/}

            {
              error && (
                <FormError message={error}/>
              )
            }

          </Form>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form              : 'setup-day-service-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupDayServiceGeneralSettingIndex)
