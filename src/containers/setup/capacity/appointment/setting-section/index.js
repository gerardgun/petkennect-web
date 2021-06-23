import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Segment } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import Tab from '@containers/setup/capacity/appointment/components/Tab'
import { parseResponseError } from '@lib/utils/functions'

import tenantDetailDuck from '@reducers/tenant/detail'

const SetupCapacityAppointmentSettingIndex = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(tenantDetailDuck.selectors.detail)

  useEffect(() => {
    if(detail.item.id) initialize(detail.item.service_config.appointment_capacity)
  }, [ detail.item.id ])

  const _handleSubmit = values => {
    return dispatch(tenantDetailDuck.creators.put({
      service_config: {
        ...detail.item.service_config,
        appointment_capacity: {
          ...detail.item.service_config.appointment_capacity,
          ...values
        }
      }
    }))
      .catch(parseResponseError)
  }

  const saving = [ 'PUTTING' ].includes(detail.status)

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='6'>
                  <Header as='h4'>
                    <p>Booking Override</p>
                    <Header.Subheader>
                      Enable to allow employees to book appointments past the capacity limit.
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
                <Form.Group widths='equal'>
                  <Form.Field>
                    <FormError message={error}/>
                  </Form.Field>
                </Form.Group>
              )
            }

            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  color='teal'
                  content='Save changes'
                  disabled={saving}
                  loading={saving}
                  type='submit'/>
              </Form.Field>
            </Form.Group>

          </Form>
        </Tab>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form: 'setup-capacity-appointment-setting'
})(SetupCapacityAppointmentSettingIndex)
