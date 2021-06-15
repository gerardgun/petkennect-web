import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid,Segment, Card } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import ManagerShortcut from '../../manager-shortcut/manager-shortcut'
import HeaderLink from '../../manager-shortcut/header-link'
import EmployeeMenu from '../employee-menu'
import EmployeeDetail from './../../../staff-dashboard/information/personal-detail/show-detail'

import '../styles.scss'

const PersonalDetail = ()=>{
  const location = useLocation()
  const [ showSideBar ] =  useState(location.state ? !location.state.isSideBarHidden : false)

  const [ sidebarHidden, setSidebarHidden ] = useState()

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
          <Grid.Column style={{ width: '17%' }}>
            <ManagerShortcut/>
          </Grid.Column>
          <Grid.Column className='pl0' style={{ width: '83%' }}>
            <Card fluid>
              <div className='pv20 ph16'>
                <Grid style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                  <Grid.Column
                    className='pb4'
                    computer={16} mobile={16} tablet={6}>
                    <EmployeeMenu/>
                  </Grid.Column >
                </Grid>
                <Grid>
                  <Grid.Column
                    className='employee-directory-style'
                    computer={16} mobile={16} tablet={6}>
                    <EmployeeDetail/>
                  </Grid.Column >
                </Grid>
              </div>
            </Card>

          </Grid.Column>

        </Grid>

      </Segment>
    </Layout>
  )
}

export default PersonalDetail

