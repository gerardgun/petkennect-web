import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Segment, Icon, Breadcrumb } from 'semantic-ui-react'
import loadable from '@loadable/component'

import './styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))
const QuickLinks = loadable(() => import('./quick-link'))
const EditableField = loadable(() => import('./editable-field'))

const MedicationSetting = ()=>{
  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header'>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h2' className='cls-MainHeader'>Medication Settings</Header>
            <hr></hr>
            <Breadcrumb className='p0'>
              <Breadcrumb.Section active>
                <Link to='/setup/admin-item'><Icon name='setting'/>Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/animal-setting'>Animal Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/animal-setting/medication'>Medication</Link>
              </Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <QuickLinks/>
          </Grid.Column>
        </Grid>

        <Grid>
          <Grid.Column
            className='search-width'
            computer={16} mobile={14} tablet={16}>
            <EditableField/>
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  )
}

export default MedicationSetting
