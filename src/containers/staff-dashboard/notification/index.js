import React, { useState } from 'react'
import { Grid,Segment, Card, Header } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import Menu from '../menu'

import EmployeeNotice from './employee-notice'
import NotificationSetting from './notification-setting'
import HeaderLink from '../header-link'

const MyNotification = ()=>{
  const [ sidebarHidden, setSidebarHidden ] = useState()

  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  return (
    <Layout sidebarHandle={_onHandleSideBar}>
      <Segment className='segment-dashboard-content' >
        <Grid>
          <Grid.Column className='pb12 pt0 ' computer={16}>
            <HeaderLink sideBarHidden={sidebarHidden}/>
          </Grid.Column>
          <Grid.Column computer={3}>
            <Menu/>
          </Grid.Column>
          <Grid.Column computer={13}>
            <Card fluid>
              <div className='pv12' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                <Header as='h3' className='mb0 ml16' style={{ opacity: '0.9' }}>
                 My Notifications
                </Header>
              </div>
              <Grid className='p16'>
                <Grid.Column width={8}>
                  <EmployeeNotice/>
                </Grid.Column>
                <Grid.Column width={8}>
                  <NotificationSetting hideSidebar={sidebarHidden}/>
                </Grid.Column>
              </Grid>
            </Card>

          </Grid.Column>

        </Grid>

      </Segment>
    </Layout>
  )
}

export default MyNotification
