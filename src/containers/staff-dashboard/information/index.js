import React, { useState } from 'react'
import { Grid,Segment } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import Menu from '../menu'
import PersonalDetails from './personal-detail'
import Availability from './availability'
import Wages from './wages'
import HeaderLink from '../header-link'

const StaffInformation = ()=>{
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
            <Grid>
              <Grid.Column computer={16}>
                <PersonalDetails/>
              </Grid.Column>
            </Grid>
            <Grid.Column className='mt16' computer={16}>
              <Grid>
                <Grid.Column width={16}><Availability/></Grid.Column>
                <Grid.Column width={16}><Wages/></Grid.Column>
              </Grid>
            </Grid.Column>

          </Grid.Column>

        </Grid>
      </Segment>
    </Layout>
  )
}

export default StaffInformation
