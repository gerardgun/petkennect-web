import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Segment, Icon, Breadcrumb } from 'semantic-ui-react'
import loadable from '@loadable/component'

import './styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))
const QuickLinks = loadable(() => import('./quick-link'))
const EditableField = loadable(() => import('./editable-field'))

const FeedingSetting = ()=>{
  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header'>
          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h2' className='cls-MainHeader'>Feeding Settings</Header>
            <hr></hr>
            <Breadcrumb className='p0'>
              <Breadcrumb.Section>
                <Link to=''><Icon name='setting'/>Setting</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to=''>Animal Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to=''>Feeding</Link>
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

export default FeedingSetting
