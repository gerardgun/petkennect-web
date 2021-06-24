import React from 'react'
import {  Header, Breadcrumb, Icon, Divider, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Layout from '@components/Common/Layout'
import Tab from '@containers/setup/pet/medication/components/Tab'
import SetupPetMedicationSettingIndex from './setting-section'

const SetupPetMedicationIndex = () => {

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>

        <Header>Medication Settings</Header>
          <Breadcrumb className='p0'>
            <Breadcrumb.Section active>
              <Link to='/setup'><Icon name='setting'/>Settings</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider className='mh12' icon='right chevron'/>
            <Breadcrumb.Section active>
              <Link to='/setup/pet/kind'>Animal Settings</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider className='mh12' icon='right chevron'/>
            <Breadcrumb.Section active>
              <Link to='/setup/pet/medication/time'>Medication Settings</Link>
            </Breadcrumb.Section>
          </Breadcrumb>

        <Divider/>

        <SetupPetMedicationSettingIndex/>
        <Header as='h4' color='teal'>
          Adjust Editable Field Values
        </Header>
        <Tab/>

      </Segment>
    </Layout>
  )
}

export default SetupPetMedicationIndex
