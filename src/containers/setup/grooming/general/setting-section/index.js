import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Checkbox, Divider, Form, Grid, Header, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Layout from '@components/Common/Layout'
import Menu from '@containers/settings/components/Menu'
import Tab from '@containers/setup/grooming/general/components/Tab'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import SetupGroomingGeneralServiceTypeIndex from '@containers/setup/grooming/general/service-option-section'

const SetupGroomingGeneralSettingIndex = props => {
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
            <Breadcrumb className='p0'>
              <Breadcrumb.Section active>
                <Link to='/setup/admin-item'><Icon name='setting'/>Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/service-setting'>Services</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/service-setting'>Grooming Settings</Link>
              </Breadcrumb.Section>
            </Breadcrumb>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form onSubmit={handleSubmit(_handleSubmit)}>

            <Header as='h4' color='teal'>Grooming Settings</Header>
            <Header.Subheader>
              Add service options to grooming appointments and reservations.  
              These options will show up as a list that can be added when making a reservation.
            </Header.Subheader>

            <SetupGroomingGeneralServiceTypeIndex/>

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
  form              : 'setup-grooming-setting',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupGroomingGeneralSettingIndex)
