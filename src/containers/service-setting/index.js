import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Segment, Breadcrumb, Icon } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import TrainingSetting from './training-setting'
import EditableFieldTab from './training-setting/editable-field-tab'

const ServiceSetting = ()=>{
  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header'>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h2' className='cls-MainHeader'>Training Settings</Header>
            <hr></hr>
            <Breadcrumb className='p0'>
              <Breadcrumb.Section>
                <Link to=''><Icon name='setting'/>Setting</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to=''>Services</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to=''>Training Settings</Link>
              </Breadcrumb.Section>
            </Breadcrumb>

          </Grid.Column>
          <Grid.Column
            className='pl0'
            computer={16} mobile={16} tablet={16}>
            <TrainingSetting/>
          </Grid.Column>
          <Grid.Column
            className='pl0'
            computer={16} mobile={16} tablet={16}>
            <EditableFieldTab/>
          </Grid.Column>
        </Grid>

      </Segment>
    </Layout>

  )
}

export default ServiceSetting

