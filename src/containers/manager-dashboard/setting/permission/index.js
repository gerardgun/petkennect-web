import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useLocation } from 'react-router-dom'
import { Grid,Segment, Card, Button, Header } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import ManagerShortcut from '../../manager-shortcut/manager-shortcut'
import HeaderLink from '../../manager-shortcut/header-link'
import SettingMenu from '../setting-menu'

import Table from '@components/Table'
import permissionConfig from '@lib/constants/list-configs/manager-dashboard/setting/permission'
import permissionDuck from '@reducers/manager-dashboard/setting/permission'
import permissionDetailDuck from '@reducers/manager-dashboard/setting/permission/detail'

const SettingPermission = (props) => {
  const location = useLocation()
  const [ showSideBar ] =  useState(location.state ? !location.state.isSideBarHidden : false)

  const [ sidebarHidden, setSidebarHidden ] = useState()

  useEffect(() => {
    props.getPermissions()
  }, [])

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
                    <SettingMenu/>
                  </Grid.Column >
                </Grid>
                <Grid>
                  <Grid.Column
                    className='pt20'
                    computer={16} mobile={16} tablet={6}>
                    <Table
                      config={permissionConfig}
                      duck={permissionDuck}/>
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

export default compose(
  connect(
    (state) => {
      const permissionDetail = permissionDetailDuck.selectors.detail(state)

      return {
        permissionDetail,
        permission: permissionDuck.selectors.list(state)
      }
    },
    {
      getPermissions: permissionDuck.creators.get,
      setItem       : permissionDetailDuck.creators.setItem
    }
  )
)(SettingPermission)

