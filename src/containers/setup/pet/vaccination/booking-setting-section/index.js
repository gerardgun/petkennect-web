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

const SetupPetVaccinationBookingSettingIndex = props => {
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
                    <p>Customize the message to your clients when they book online with missing/expired vaccinations</p>
                    <Header.Subheader>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width='1'/>
                <Grid.Column textAlign='left' width='8'>
                  <Field
                    component={FormField}
                    control={TextArea}
                    name='book_message'
                    placeholder='Thank your for your reservation request. Please remember we must have updated vaccinations by the time you drop off for services. You can upload, fax, or email your records at test@petkennect.com'
                    rows={5}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider/>

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
})(SetupPetVaccinationBookingSettingIndex)
