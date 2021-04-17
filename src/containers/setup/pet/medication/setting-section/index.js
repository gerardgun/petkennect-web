import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/pet/components/Menu'
import Tab from '@containers/setup/pet/medication/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupPetMedicationSettingIndex = props => {
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
                    <p>Do you charge for Medication Administration?</p>
                    <Header.Subheader>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam mi, eros vitae, elementum luctus elit.
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='7'>
                  <Field
                    autoFocus
                    component={FormField}
                    control={Select}
                    name='charge_type'
                    options={[
                      {
                        key: 1, value: 1, text: 'No Charges Apply'
                      },
                      {
                        key: 2, value: 2, text: 'Yes, Per Day '
                      },
                      {
                        key: 3, value: 3, text: 'Yes, Per Administration Time'
                      },
                      {
                        key: 4, value: 4, text: 'Yes, Per Administration For Each Medication'
                      }
                    ]}
                    placeholder='Select Charges'
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider/>
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Header as='h4'>
                    <p>Enter the daily charges for medication adminstration</p>
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
                    name='daily_charge'
                    placeholder='$0'
                    type='number'/>
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
  form              : 'setup-pet-vaccination-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupPetMedicationSettingIndex)
