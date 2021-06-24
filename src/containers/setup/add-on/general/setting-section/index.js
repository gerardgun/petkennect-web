import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/add-on/components/Menu'
import Tab from '@containers/setup/add-on/general/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import tenantDetailDuck from '@reducers/tenant/detail'

const SetupAddOnGeneralSettingIndex = (props) => {
  const {
    error,
    handleSubmit,
    initialize // redux-form
  } = props
  const detail = useSelector(tenantDetailDuck.selectors.detail)
  const dispatch = useDispatch()
  const saving = [ 'PUTTING' ].includes(detail.status)
  const [ confirmText, setConfirmText ] = useState(false)
  useEffect(() => {
    const { service_config: { addon = {} } = {} } = detail.item
    initialize({
      ...addon
    })
  }, [ detail.item.id ])

  const _handleShowMessage = () => {
    setConfirmText(true)
    setTimeout(() => {
      setConfirmText(false)
    }, 3000)
  }

  const _handleSubmit = (values) => {
    return dispatch(
      tenantDetailDuck.creators.put({
        service_config: {
          ...detail.item.service_config,
          addon: {
            ...detail.item.service_config.addon,
            ...values
          }
        }
      })
    )
      .then(_handleShowMessage)
      .catch(parseResponseError)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form id='setup-add-on-setting' onSubmit={handleSubmit(_handleSubmit)}>
            <Header as='h4' color='teal'>
              Basic Configuration
            </Header>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Add-on Services</p>
                    <Header.Subheader>
                      Use this section to create all your additional services.
                      Each add-on can be applied to all service groups, types
                      and reservations. Open Line Items are add-ons that the
                      price is unknown until time of sale (ex. Gift
                      certiticates)
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                {/*
                  <Grid.Column textAlign='center' width='4'>
                    <Field
                      component={FormField}
                      control={Checkbox}
                      format={Boolean}
                      name='enable_additional'
                      toggle
                      type='checkbox'/>
                  </Grid.Column>
                */}
              </Grid.Row>
            </Grid>

            <Divider/>

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Transport Services</p>
                    <Header.Subheader>
                      If services offer include transport to/from locations or
                      even intra-location, enable this option to set up
                      transport settings. If enabled, all pets with transport
                      will be tagged and a daily transport report will be
                      viewable.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='enable_additional'
                    toggle
                    type='checkbox'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {/*
            <Divider className='mt20'/>
            <Header as='h4' color='teal'>
              Multiple Location Setup
            </Header>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Multiple Location Setup</p>
                    <Header.Subheader>
                      If prices vary by location, enable this options. If all
                      locations charge the same prices for services, do not
                      enable this option.
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
            */}

            {error && <FormError message={error}/>}
            {confirmText && (
              <Header as='p' className='f14' color='green'>
                ¡Add-ON Settings Updated Succesfully!
              </Header>
            )}

            <Divider className='mt20'/>
            <Grid className='flex flex-row justify-center mt20'>
              <Button
                color='teal'
                content='Save changes'
                form='setup-add-on-setting'
                loading={saving}
                size='big'
                type='submit'/>
            </Grid>
          </Form>
        </Tab>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form    : 'setup-add-on-setting',
  validate: (values) => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupAddOnGeneralSettingIndex)
