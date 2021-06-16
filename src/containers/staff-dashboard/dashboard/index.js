import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid,Segment } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import Menu from '../menu'
import RoutineCard from './routine-card'
import Notification from './notification'
import TimeCard from './time-card'
import SharedFileCard from './shared-file-card'
import ScheduleCard from './schedule-card'
import TimeCardOff from './time-off-card'
import HeaderLink from '../header-link'

const StaffDashboard = ()=>{
  const location = useLocation()
  const [ sidebarHidden, setSidebarHidden ] = useState()
  const [ showSideBar ] =  useState(location.state ? !location.state.isSideBarHidden : false)
  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  return (
    <Layout showSidebar={showSideBar} sidebarHandle={_onHandleSideBar}>
      <Segment className='segment-dashboard-content' >
        <Grid>
          <Grid.Column className='pb12 pt0 ' computer={16}>
            <HeaderLink sideBarHidden={sidebarHidden}/>
          </Grid.Column>
          <Grid.Column computer={3}>
            <Menu/>
          </Grid.Column>
          <Grid.Column computer={13}>
            <Grid>
              <Grid.Column computer={9} style={{ paddingRight: '2px' }}>
                <RoutineCard/>
                <TimeCard/>
              </Grid.Column>
              <Grid.Column computer={7}>
                <Notification/>
                <TimeCardOff/>
              </Grid.Column>
              <Grid.Column className='pt0' computer={16}>
                <ScheduleCard/>
              </Grid.Column>
              <Grid.Column className='pt0' computer={16}>
                <SharedFileCard/>
              </Grid.Column>
            </Grid>
          </Grid.Column>

        </Grid>
      </Segment>
    </Layout>
  )
}

export default StaffDashboard
