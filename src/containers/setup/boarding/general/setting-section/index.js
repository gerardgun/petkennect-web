import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Breadcrumb, Icon, Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'
import Tab from '@containers/setup/boarding/general/components/Tab'
import SetupBoardingGeneralBelongingIndex from '@containers/setup/boarding/general/belonging-section'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

const SetupBoardingGeneralSettingIndex = props => {
  const[showTable, setShowTable]=useState(false)
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
            {/*<Divider/>*/}
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
            {/*<Divider/>*/}

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
            {/*<Divider/>*/}
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
            {/*<Divider/>*/}

            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Enable Photo upload for belongings?</p>
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
            {/*<Divider/>*/}
            <Grid style={{ padding: '1rem' }}>
              <Grid.Row>
                <Grid.Column width='7'>
                  <Header as='h4'>
                    <p>Add Belongings Areas to a drop down list.</p>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign='center' width='4'>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    name='add_belongig_areas_to_dropdown '
                    toggle
                    type='checkbox'
                    onChange={(event)=> setShowTable(event)}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          {showTable && <SetupBoardingGeneralBelongingIndex/>}

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
  form              : 'setup-boarding-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupBoardingGeneralSettingIndex)
