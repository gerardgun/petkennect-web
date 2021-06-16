import React, { useState } from 'react'
import { Grid,Segment, Card, Header } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import Menu from '../menu'
import TimeOffRequest from './time-off-requests'
import TimeOffCard from './time-off-card'
import HeaderLink from '../header-link'
import './styles.scss'

const MyRequest = ()=>{
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
                 My Requests
                </Header>
              </div>
              <div className='flex'>
                <div className='pr16'style={{ width: '60%', borderRight: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                  <TimeOffRequest/>
                </div>
                <div className='flex justify-center'style={{ width: '40%' }}>
                  <div style={{ width: '90%' }}>
                    <TimeOffCard/>
                  </div>
                </div>
              </div>
            </Card>

          </Grid.Column>

        </Grid>

      </Segment>
    </Layout>
  )
}

export default MyRequest
